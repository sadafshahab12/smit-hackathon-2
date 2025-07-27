import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Thank You!</h1>
        <p className="text-gray-700 mb-6">
          Your feedback has been submitted successfully. We appreciate your input!
        </p>
        <Link
          to="/"
          className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
