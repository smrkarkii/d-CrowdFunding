"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Campaign from "../../../Campaign";
import ContributeForm from "../../../components/ContributeForm/page";
import Link from "next/link";

const page = ({ params }) => {
  const [summary, setSummary] = useState({
    minimumContribution: "",
    balance: "",
    requestsCount: "",
    approversCount: "",
    manager: "",
  });
  const contractAddress = params.address;

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const campaign = Campaign(contractAddress);
        const temp = await campaign.methods.getSummary().call();

        const summaryData = {
          minimumContribution: Number(temp[0].toString()) / 1000000000000000000,
          balance: Number(temp[1].toString()) / 100000000000000000,
          requestsCount: temp[2].toString(),
          approversCount: temp[3].toString(),
          manager: temp[4].toString(),
        };
        console.log(summaryData);

        setSummary(summaryData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchSummary();
  }, [contractAddress]);
  return (
    <div>
      <Layout />

      <div className="w-[75%] mx-auto pt-10">
        <h1 className="text-sm italic ">Campaign {params.address}</h1>
        <div className=" block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-300 dark:border-gray-400 dark:hover:bg-gray-400 w-fit h-fit ">
          <p className="pt-4 text-center inline">Manager of Contract: </p>
          <p className="text-center inline text-sm">{summary.manager}</p>
          <p className="italic text-sm font-extralight text-center">
            The manager created the campaign and can request to withdraw money.
          </p>
        </div>
        <div className="flex flex-row gap-10 pt-6  ">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <div className=" block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-300 dark:border-gray-400 dark:hover:bg-gray-400 w-80 h-40 ">
                <p className="text-center text-3xl">
                  {summary.minimumContribution} Ethers
                </p>

                <p className="pt-4 text-center">Minimum Contribution</p>
                <p className="italic text-sm font-extralight text-center">
                  This is the amount that contributer must contribute at least.
                </p>
              </div>
              <div className=" block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-300 dark:border-gray-400 dark:hover:bg-gray-400 w-80 h-40 ">
                <p className="text-center text-3xl">{summary.balance} Ethers</p>
                <p className="pt-4 text-center">Balance</p>
                <p className="italic text-sm font-extralight text-center">
                  This is the amount remaining for the project.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className=" block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-300 dark:border-gray-400 dark:hover:bg-gray-400 w-80 h-40 ">
                <p className="text-center text-3xl">{summary.requestsCount}</p>
                <p className="pt-4 text-center">Total no of Requests</p>
                <p className="italic text-sm font-extralight text-center ">
                  This represents the total no of withdraw requested by the
                  manager.
                </p>
              </div>

              {/* <div className="border border-black w-96 h-32 ">
                Manager : {summary.manager}
              </div> */}
            </div>
          </div>

          <ContributeForm address={contractAddress} />
        </div>
        <Link href={`/campaigns/${contractAddress}/requests`}>
          <button className="w-40 h-10 border text-lg border-yellow-500 rounded-md ml-3 mt-3 ">
            View Requests{" "}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default page;
