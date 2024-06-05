"use client";

import React, { useState } from "react";
import Campaign from "../../../../../Campaign";
import Layout from "../../../../../components/Layout";
import Link from "next/link";
import web3 from "../../../../../web3";
import SpinningCircles from "react-loading-icons/dist/esm/components/spinning-circles";

// import { useRouter } from "next/router";

const page = ({ params }) => {
  // const router = useRouter();
  const [isComplete, setComplete] = useState(true);

  const contractAddress = params.address;
  const [description, setDescription] = useState("");
  const [amount, setamount] = useState("");
  const [receipent, setreceipent] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setError] = useState("");

  const clearErrorMessage = () => {
    setTimeout(() => {
      setError("");
    }, 6000); // Clear the error message after 5 seconds
  };
  const clearStatusMessage = () => {
    setTimeout(() => {
      setMessage("");
    }, 6000); // Clear the error message after 5 seconds
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      setComplete(false);
      const campaign = Campaign(contractAddress);
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(
          receipent,
          web3.utils.toWei(amount, "ether"),
          description
        )
        .send({
          from: accounts[0],
        });

      setMessage("Request created");
      clearStatusMessage();
      setDescription("");
      setreceipent("");
      setamount("");
      setComplete(true);

      // router.push(`/campaigns/${contractAddress}/requests`);
    } catch (e) {
      console.log(e);
      setError(e.message);
      clearErrorMessage();
      setComplete(true);
    }
  };

  return (
    <div className=" ">
      <Layout />

      <div className="w-[70%] h-96 mx-auto shadow-sm shadow-gray-500 p-10">
        <h1 className="text-center mb-5 font-bold text-3xl">
          Create a new request
        </h1>
        {errorMessage && (
          <p className="text-white bg-red-500 absolute right-0 top-4 w-96 p-2">
            {errorMessage}
          </p>
        )}
        {message && (
          <p className="text-white bg-green-500 absolute right-0 top-4 w-96 p-2">
            {message}
          </p>
        )}
        <form action="" className="" onSubmit={submitForm}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-row pt-5">
              <span>Description</span>
              <input
                type="text"
                onChange={(event) => setDescription(event.target.value)}
                value={description}
                className="  border border-gray-400 rounded  "
              />
            </div>

            <div className="flex flex-row">
              <span>Receiver</span>
              <input
                type="text"
                onChange={(event) => setreceipent(event.target.value)}
                value={receipent}
                className=" border border-gray-400 rounded "
              />
            </div>

            <div className="flex flex-row">
              <span>Amount in Ethers</span>
              <input
                type="text"
                onChange={(event) => setamount(event.target.value)}
                value={amount}
                className=" border border-gray-400 rounded  "
              />
            </div>

            <button className="mt-2 w-48 h-10 bg-yellow-500 rounded-md  ">
              Create Request
            </button>
            <Link href={`/campaigns/${contractAddress}/requests/`}>
              <button className="mt-2 w-48 h-10 bg-yellow-500 rounded-md  ">
                View Requests
              </button>
            </Link>
            {!isComplete ? (
              <SpinningCircles fill="black" className="w-10 h-10 inline pl-3" />
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default page;
