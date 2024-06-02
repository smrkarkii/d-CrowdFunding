"use client";

import React, { useState } from "react";
import Layout from "../../../components/Layout";
import web3 from "../../../web3";
import contractFactory from "../../../contractFactory";
import LoadingIcons from "react-loading-icons";
import { Bars } from "react-loading-icons";
import SpinningCircles from "react-loading-icons/dist/esm/components/spinning-circles";

const page = () => {
  const [isComplete, setComplete] = useState(true);
  const [minimum, setMinimum] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [errormessage, setErrormessage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  // const router = useRouter();

  const clearErrorMessage = () => {
    setTimeout(() => {
      setErrormessage("");
    }, 3000); // Clear the error message after 5 seconds
  };
  const clearStatusMessage = () => {
    setTimeout(() => {
      setStatusMessage("");
    }, 3000); // Clear the error message after 5 seconds
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    console.log("Creating the campaigns");

    const ac = await web3.eth.getAccounts();
    console.log("ac", ac);
    setAccounts(ac);
    console.log("accounts", accounts.options);

    try {
      setComplete(false);
      clearStatusMessage();
      const contractAddress = await contractFactory.methods
        .createCampaign(minimum * 1000000000000000000)
        .send({ from: ac[0] });
      console.log(contractAddress);

      setStatusMessage("Campaign created successfully");
      clearStatusMessage();
      setComplete(true);
      // Router.pushRoute("/");
    } catch (err) {
      setErrormessage(err.message);
      clearErrorMessage();
      setComplete(true);
    }
  };
  return (
    <Layout>
      <div className="pl-10">
        <p className="text-white bg-red-500 absolute right-0 top-4 w-96">
          {errormessage}
        </p>
        <p className="text-white bg-green-500 absolute right-0 top-4 w-96">
          {statusMessage}
        </p>
        <h1 className="text-2xl font-bold">Create a new campaign</h1>
        <form action="" onSubmit={onSubmit}>
          <label htmlFor="minimum">Minimum Contribution</label>
          <input
            type="text "
            value={minimum}
            onChange={(event) => setMinimum(event.target.value)}
            className="bg-yellow-200 border-yellow-500 ml-5 mt-5"
          />
          <span>Ethers</span>
          <div>
            <button className="w-48 h-10 bg-yellow-500 rounded-md mt-5 text-white ">
              Create Campaign
            </button>

            {!isComplete ? (
              <SpinningCircles fill="black" className="w-10 h-10 inline pl-3" />
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default page;
