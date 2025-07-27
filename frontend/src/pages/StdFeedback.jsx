import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const StdFeedback = () => {
  const navigate = useNavigate();
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

    // ✅ Basic empty fields check
    const { name, email, course, rating, comments } = feedback;
    if (!name || !email || !course || !rating || !comments) {
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
          course: feedback.course.trim(),
          rating: Number(feedback.rating), // Ensure rating is a number
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

      navigate("/thank-you");
    } catch (error) {
      // ✅ Enhanced Error Handling for message and validation errors
      const errorData = error.response?.data;
      console.error("Feedback submission error:", errorData);

      if (errorData?.message) {
        toast.error(errorData.message, {
          position: "top-right",
          duration: 3000,
        });
      } else if (Array.isArray(errorData?.errors)) {
        toast.error(errorData.errors[0]?.msg || errorData.errors[0], {
          position: "top-right",
          duration: 3000,
        });
      } else {
        toast.error("Something went wrong", {
          position: "top-right",
          duration: 3000,
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
          {/* ✅ Values must match enum exactly */}
          <option value="React">React</option>
          <option value="NodeJS">NodeJS</option>
          <option value="Mern Stack Development">Mern Stack Development</option>
          <option value="Tailwind">Tailwind</option>
          <option value="Nextjs">Nextjs</option>
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
