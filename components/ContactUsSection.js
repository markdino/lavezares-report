import React from "react";
import ContactUsCard from "./ContactUsCard";

const ContactUsSection = () => {
  return (
    <section className="w-full py-28 px-10">
      <section className="text-center max-w-5xl mx-auto">
        <h2 className="font-bold lg:text-5xl text-4xl text-center mb-4">
          Contact Us
        </h2>
        <p className="text-gray-600 mb-14">Let&apos;s Stay Connected</p>
        <ContactUsCard />
      </section>
    </section>
  );
};

export default ContactUsSection;
