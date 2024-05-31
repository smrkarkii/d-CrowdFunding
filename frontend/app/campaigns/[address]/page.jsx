"use client";

import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import contractfactory from "../../../contractFactory";

const page = ({ params }) => {
  const [summary, setSummary] = useState([]);
  const contractAddress = params.address;

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const temp = await contractfactory.methods.getSummary().call();
        setSummary(temp);
      } catch (e) {
        console.log(e);
      }
    };
    fetchSummary();
    console.log("summary", summary);
  }, []);
  return (
    <div>
      <Layout />

      <h1>Campaign {params.address}</h1>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <div className="border border-black w-64 h-16 ">
              Campaign balance
            </div>
            <div className="border border-black w-64 h-16 ">
              Campaign balance
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="border border-black w-64 h-16 ">
              Campaign balance
            </div>
            <div className="border border-black w-64 h-16 ">
              Campaign balance
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
