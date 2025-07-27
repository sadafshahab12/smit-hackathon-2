import express from "express";
import { validateFeedback } from './../validators/feedbackValidation.js';
import { createStudentFeedback, getAllFeedback } from "../controllers/feedbackController.js";
import { adminLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/feedback", validateFeedback, createStudentFeedback);
router.get("/feedback", getAllFeedback);
router.post("/admin-auth/login", adminLogin);

export default router;
