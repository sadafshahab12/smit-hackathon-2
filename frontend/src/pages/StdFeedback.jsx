import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const StdFeedback = () => {
  const [feedback, setFeeback] = useState({
    name: "",
    email: "",
    course: "",
    rating: "",
    comments: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFeeback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (
      !feedback.name ||
      !feedback.email ||
      !feedback.course ||
      !feedback.rating ||
      !feedback.comments
    ) {
      toast.error("All fields are required", {
        position: "top-right",
        duration: 2000,
      });
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/feedback`,
        {
          ...feedback,
          rating: Number(feedback.rating), // Ensure number
        }
      );

      toast.success(res.data.message, {
        position: "top-right",
        duration: 2000,
      });

      setFeeback({
        name: "",
        email: "",
        course: "",
        rating: "",
        comments: "",
      });
    } catch (error) {
      // console.log("Error Creating Event", error.response.data);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message, {
          position: "top-right",
          duration: 2000,
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <form
        onSubmit={handleFeedbackSubmit}
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Student Feedback
        </h2>

        <input
          type="text"
          placeholder="Student Name"
          name="name"
          value={feedback.name}
          onChange={handleOnChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={feedback.email}
          onChange={handleOnChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <select
          name="course"
          value={feedback.course}
          onChange={handleOnChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">-- Select a Course --</option>
          <option value="React">React</option>
          <option value="NodeJS">NodeJS</option>
          <option value="Mern Stack Development">Mern Stack Development</option>
          <option value="Tailwind">Tailwind</option>
        </select>

        <input
          type="number"
          placeholder="Rating (1-5)"
          name="rating"
          value={feedback.rating}
          onChange={handleOnChange}
          min="1"
          max="5"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <textarea
          name="comments"
          value={feedback.comments}
          onChange={handleOnChange}
          cols="30"
          rows="4"
          placeholder="Your Comments"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Submit Your Feedback
        </button>
      </form>
    </div>
  );
};

export default StdFeedback;
