import mongoose from "mongoose";
const studentFeedback = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [4, "Name must be at least 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      enum: {
        values: ["React", "NodeJS", "Mern Stack Development", "Tailwind"],
        message: "{VALUE} is not a valid course",
      },
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must be at most 5"],
    },
    comments: {
      type: String,
      required: [true, "Comments are required"],
      minlength: [50, "Comments must be at least 100 characters"],
    },
  },
  {
    timestamps: true,
  }
);

export const Feedback = mongoose.model("StudentFeedback", studentFeedback);
