import React from "react";
import Navbar from "../../../components/Navbar/Navbar";

import blo1 from '../../../assets/images/blo1.jpg'

const BlogDetails = () => {
  return (
    <>
      <Navbar navStyle={"white"} />

      <div className="container mx-auto mt-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20">
        <p className="font-[700] text-[16px]">
          Shivam Patel{" "}
          <span className="font-[500] text-[#999999] ms-4">16 March 2023</span>
        </p>

        <h1 className="font-[400] text-[64px]">The Future of Digital Innovation</h1>
        <img src={blo1} className="lg:w-[100%] lg:h-[650px] object-cover" alt="blo1" />
      </div>
    </>
  );
};

export default BlogDetails;
