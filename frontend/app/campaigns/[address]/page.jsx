"use client";

import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Campaign from "../../../Campaign";

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
          minimumContribution: temp[0].toString(),
          balance: temp[1].toString(),
          requestsCount: temp[2].toString(),
          approversCount: temp[3].toString(),
          manager: temp[4].toString(),
        };

        setSummary(summaryData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchSummary();
    console.log(summary);
  }, [contractAddress]);
  return (
    <div>
      <Layout />

      <h1>Campaign {params.address}</h1>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <div className="border border-black w-96 h-16 ">
              Minimum Contribution {summary.minimumContribution}
            </div>
            <div className="border border-black w-96 h-16 ">
              Campaign balance {summary.balance}
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="border border-black w-96 h-16 ">
              No of Requests {summary.requestsCount}
            </div>
            <div className="border border-black w-96 h-16 ">
              Manager : {summary.manager}
            </div>
          </div>
        </div>
        <div>
          <h1>Contribute to the Campagin</h1>
        </div>
      </div>
    </div>
  );
};

export default page;
