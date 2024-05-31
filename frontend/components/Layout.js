import React from "react";
//reusable componenet and not  visitablee
import Navbar from "./Navbar/page";

const Layout = (props) => {
  return (
    <div className="">
      <Navbar />

      {props.children}
    </div>
  );
};

export default Layout;
