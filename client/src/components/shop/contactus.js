import React from "react";
import Layout from "./layout";

const ContactUs = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-24">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
          Have questions, feedback, or need support? Email us at <a href="mailto:support@techware.com" className="text-blue-600 underline">support@techware.com</a> and we'll get back to you as soon as possible.
        </p>
      </div>
    </Layout>
  );
};

export default ContactUs;
