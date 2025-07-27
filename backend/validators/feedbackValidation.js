import { body } from "express-validator";

export const validateFeedback = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 4 })
    .withMessage("Name must be at least 4 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("course")
    .notEmpty()
    .withMessage("Course is required")
    .isIn(["React", "NodeJS", "Mern Stack Development", "Tailwind" , "Nextjs"])
    .withMessage("Invalid course selected"),

  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),

  body("comments")
    .notEmpty()
    .withMessage("Comments are required")
    .isLength({ min: 50 })
    .withMessage("Comments must be at least 20 characters"),
];
