"use client";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";
import "../../src/app/globals.css";

const Navbar = () => {
  const [nav, setNav] = useState(true);

  function handleNav() {
    setNav(!nav);
  }
  return (
    <>
      <div className=" flex max-w-[1240px] mx-auto items-center h-24 pl-10">
        <h1 className="text-3xl font-bold text-yellow-500 fixed">K-BLOGS</h1>
        <ul className=" hidden md:flex mx-auto space-evenly">
          {/* <li className="p-12">Discover</li> */}
          {/* <li className="p-12">Home</li> */}
          <Link href="/">
            <li className="p-12">Home</li>
          </Link>
          <Link href="/campaigns/create">
            <li className="p-12">Create Campaign</li>{" "}
          </Link>
          <li className="p-12">Donations</li>
        </ul>
        <div className="fixed right-2 md:hidden" onClick={handleNav}>
          {!nav ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
        <div
          className={
            !nav
              ? "fixed top-0  w-[60%] border-r border-[#e9e9f511] h-full bg-[#232323] ease-in-out duration-200"
              : "fixed left-[-100%]"
          }
        >
          <ul className="pt-24">
            <li className="p-2 border-b border-gray-300">Discover</li>
            <li className="p-2 border-b border-gray-300">Home</li>
            <li className="p-2 border-b border-gray-300">Investor</li>
            <li className="p-2 border-b border-gray-300">
              {" "}
              <a href="">About Us</a>{" "}
            </li>
            <li className="p-2 ">Donations</li>
          </ul>
        </div>
        <button className="text-white w-32 rounded p-2 bg-yellow-500 fixed right-8">
          Create Campaign
        </button>
      </div>
    </>
  );
};

export default Navbar;
