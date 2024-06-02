"use client";

import React, { useState } from "react";
import Campaign from "../../../../../Campaign";
import Layout from "../../../../../components/Layout";
import Link from "next/link";
import web3 from "../../../../../web3";

const page = ({ params }) => {
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
    } catch (e) {
      console.log(e);
      setError(e.message);
      clearErrorMessage();
    }
  };

  return (
    <div className=" ">
      <Layout />
      <h1>Create a new request for Contract {contractAddress}</h1>
      <div className="w-[70%] mx-auto">
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
          </div>
        </form>
      </div>
    </div>
  );
};
export default page;
