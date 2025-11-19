import React from "react";
import CateComponent from "../../components/Home_Components/modulerSolution/CateComponent";
import Title from "../../components/Home_Components/modulerSolution/Title";
import Seo from "../../components/common/Seo";
import Navbar from "../../components/Navbar/Navbar";

const Category = () => {
  const props = {
    one: "Our Products",
    two: "",
  };
  return (
    <>
      <Seo
        title="Category | ATC Chain India"
        description="ATC Chains India manufactures modular belts, chains and conveyor components for food, packaging and automation industries with reliable custom solutions.
"
        url="https://www.atcchain.com/category"
      />

      <Navbar navStyle={"white"} />

      <section className="container mx-auto grid-center-box-100 px-4 md:px-10 lg:px-5 xl:px-15 2xl:px-25 bg-white">
        <Title props={props} />
        <CateComponent />
      </section>
    </>
  );
};

export default Category;
