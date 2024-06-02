"use client";

import React, { useEffect, useState } from "react";
import Campaign from "../../../../Campaign";
import Link from "next/link";
import Layout from "../../../../components/Layout";
const page = ({ params }) => {
  //   const [requests, setRequests] = useState({
  //     receiver: "",
  //     approvalsCount: "",
  //     amount: "",
  //     description: "",
  //     isApproved: "",
  //     approvals: "",
  //   });
  const [requests, setRequests] = useState([]);
  const contractAddress = params.address;

  useEffect(() => {
    async function fetchRequests() {
      try {
        const campaign = Campaign(contractAddress);
        const temp = await campaign.methods.requests().call();
        setRequests(temp);
        console.log("temp", temp);
        setRequests(temp);
      } catch (e) {
        console.log(e);
      }
    }
    fetchRequests();
  }, [contractAddress]);

  return (
    <div>
      <Layout />
      <div className="grid  grid-cols-2">
        <div>
          <h4>Requests of Contract {contractAddress}</h4>
        </div>

        <div>
          <Link href={`/campaigns/${contractAddress}/requests/new`}>
            <button className="w-48 h-10 bg-yellow-500 rounded-md absolute right-10 ">
              Add Request
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
