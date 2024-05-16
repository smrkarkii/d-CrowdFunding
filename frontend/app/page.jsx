"use client";

import React, { useEffect, useState } from "react";
import contractfactory from "../contractFactory";

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
    <div>
      <h1>List of Deployed Contracts</h1>
      <ul>
        {campaigns.map((campaign, index) => (
          <li key={index}>{campaign}</li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
