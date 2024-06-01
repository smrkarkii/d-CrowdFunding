"use client";
import React, { useEffect, useState } from "react";

import SpinningCircles from "react-loading-icons/dist/esm/components/spinning-circles";
import Campaign from "../../Campaign";
import web3 from "../../web3";

const page = ({ address }) => {
  const [message, setMessage] = useState("");
  const [contribution, setContribution] = useState("");
  const contractAddress = address;
  console.log("Contract address from form", contractAddress);
  const [isComplete, setComplete] = useState(true);

  const submitForm = async (event) => {
    event.preventDefault();
    setComplete(false);

    try {
      console.log("contributing ");
      const ac = await web3.eth.getAccounts();
      const campaign = Campaign(address);
      await campaign.methods.contribute().send({
        value: web3.utils.toWei(contribution, "ether"),
        from: ac[0],
      });
      setComplete(true);
      setMessage("Successfully contributed");
    } catch (e) {
      console.log(e);
      setMessage(e);
    } finally {
      setComplete(true);
      setContribution("");
    }
  };

  return (
    <div>
      <form
        onSubmit={submitForm}
        action="
        "
      >
        <div>
          <h1 className="text-sm">Contribute to the Campagin</h1>

          <input
            type="text"
            value={contribution}
            onChange={(event) => {
              setContribution(event.target.value);
            }}
            className=" m-2 border border-gray-400 rounded "
          />
          <span>Ether</span>
          <button className="m-2 w-32 h-10 bg-yellow-500 rounded-md  mt-3 block ">
            Contribute{" "}
          </button>
        </div>

        {!isComplete ? (
          <SpinningCircles fill="black" className="w-10 h-10 inline pl-3" />
        ) : (
          ""
        )}

        <p className="absolute right-0   bg-green-500 rounded-lg">{message}</p>
      </form>
    </div>
  );
};

export default page;
