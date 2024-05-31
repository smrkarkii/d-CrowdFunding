"use client";

import React, { useEffect, useState } from "react";
import contractfactory from "../contractFactory";
import "../src/app/globals.css";
import Layout from "../components/Layout";
import Link from "next/link";
const Page = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const temp = await contractfactory.methods
          .getDeployedCampaigns()
          .call();
        console.log("printing deployed contracts", temp);
        setCampaigns(temp);
      } catch (error) {
        console.error("Error fetching deployed contracts:", error);
      }
    };

    fetchContracts();
  }, []); // Empty dependency array to run the effect only once

  return (
    <Layout>
      <div className="flex flex-row mt-10 pl-5">
        <div>
          <h1 className="font-bold  text-4xl ">List of Open Campaigns</h1>
          <ul>
            {campaigns.map((campaign, index) => (
              <div className="border border-black  h-16 w-96 mb-5 p-2 ml-5 mt-5">
                <li key={index}>{campaign}</li>
                <Link href={`/campaigns/${campaign}`}>
                  <p className="font-bold">View Campaign</p>
                </Link>
              </div>
            ))}
          </ul>
        </div>
        <div>
          <Link href="/campaigns/create">
            <button className="w-48 h-10 bg-yellow-500 rounded-md absolute right-10 ">
              Create Campaign
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
