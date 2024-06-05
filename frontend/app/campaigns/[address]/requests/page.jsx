"use client";

import React, { useEffect, useState } from "react";
import Campaign from "../../../../Campaign";
import Link from "next/link";
import Layout from "../../../../components/Layout";

const Page = ({ params }) => {
  const [requests, setRequests] = useState([]);
  const contractAddress = params.address;
  const [approverCount, setApproverCount] = useState();

  useEffect(() => {
    console.log("Contract Address: ", contractAddress);

    const fetchRequests = async () => {
      try {
        const campaign = Campaign(contractAddress);
        console.log("Campaign Instance: ", campaign);

        const requestCount = await campaign.methods.getRequestsCount().call();
        console.log("Request count: ", requestCount);

        const tempRequests = [];
        for (let i = 0; i < requestCount; i++) {
          try {
            const request = await campaign.methods.requests(i).call();
            console.log(`Request ${i}: `, request);
            let temp = await campaign.methods.approversCount().call();
            console.log("approve cont", temp);
            setApproverCount(Number(temp));
            tempRequests.push(request);
          } catch (e) {
            console.error(`Error fetching request ${i}: `, e);
          }
        }
        setRequests(tempRequests);
        console.log("Fetched Requests: ", tempRequests);
      } catch (e) {
        console.error("Error fetching requests: ", e);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div>
      <Layout>
        <div className="grid grid-cols-2">
          <div>
            <h4 className="text-xl ml-5 font-bold">
              Requests of Contract {contractAddress}
            </h4>
          </div>
          {/* {requests.map((request, index) => (
            <div key={index}>
              <p>{request.description}</p>
            </div>
          ))} */}
          <div>
            <Link href={`/campaigns/${contractAddress}/requests/new`}>
              <button className="w-48 h-10 bg-yellow-500 rounded-md absolute right-10">
                Add Request
              </button>
            </Link>
          </div>
        </div>
        <div>
          <table className="mt-10 w-[70%] mx-auto">
            <tr className="border border-black">
              <th className="border border-black">Request I.D </th>
              <th className="border border-black">Receiver</th>
              <th className="border border-black">Description</th>
              <th className="border border-black">Amount in Ethers</th>
              <th className="border border-black">Approval Count</th>
              <th className="border border-black">Approved ?</th>
            </tr>

            {requests.map((request, index) => (
              <tr className="border border-black">
                <td className="border border-black">{index}</td>
                <td className="border border-black">{request.receiver}</td>
                <td className="border border-black" py-5 my-5>
                  {request.description}
                </td>
                <td className="border border-black" py-5 my-5>
                  {Number(request.amount) / 10 ** 18}
                </td>
                <td className="border border-black" py-5 my-5>
                  {Number(request.approvalCount)}/{approverCount}
                </td>
                <td className="border border-black" py-5 my-5>
                  {request.isapproved ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </Layout>
    </div>
  );
};

export default Page;
