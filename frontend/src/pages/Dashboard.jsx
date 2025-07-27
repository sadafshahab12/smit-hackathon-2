import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";

const Dashboard = () => {
  const [stdFeedback, setStdFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/feedback`
        );
        setStdFeedback(response.data.feedbacks);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        toast.error("Error While Fetching Data. Please try again later.", {
          position: "top-right",
          duration: 2000,
        });
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="px-4 py-10 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Student Feedbacks Management System
      </h2>

      {stdFeedback.length === 0 ? (
        <div>
          <p className="text-center text-gray-600">No Feedback Found.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {stdFeedback.map((feedback) => (
            <div
              key={feedback._id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200 w-full md:w-[95%] max-w-[500px] mx-auto"
            >
              <h3 className="text-lg font-semibold mb-1 text-gray-900">
                {feedback.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{feedback.email}</p>
              <p className="text-sm font-medium text-indigo-600 mb-2">
                Course: {feedback.course}
              </p>
              <p className="mb-2">
                Rating:{" "}
                <span className="font-semibold text-yellow-500">
                  {"★".repeat(feedback.rating)}{" "}
                  {"☆".repeat(5 - feedback.rating)}
                </span>
              </p>
              <p className="text-gray-700 mb-4 break-words whitespace-pre-wrap max-h-40 overflow-y-auto">
                {feedback.comments}
              </p>
              <p className="text-xs text-gray-400">
                Submitted on:{" "}
                {new Date(feedback.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
