import { validationResult } from "express-validator";
import { Feedback } from "./../models/Feedback.js";
export const createStudentFeedback = async (req, res) => {
  // const { name, email, course, rating, comments } = req.body;
  // console.log(req.body);
  const errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const feedback = await Feedback.create(req.body);
    console.log(feedback);
    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      data: feedback,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      console.log("error while creating", messages);
      res.status(400).json({
        success: false,
        errors: messages,
      });
    }
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This email has already submitted feedback.",
      });
    }
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }); //newest feedback
    res.status(200).json({
      success: true,
      data: feedbacks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
