import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ContactForm from "../../components/contactUsForm/ContactForm";

const ContactUs = () => {
  return (
    <>
      <Navbar navStyle={"white"} />

      <div className="container mx-auto mt-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20">
        <ContactForm />
      </div>
    </>
  );
};

export default ContactUs;
