import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/connectDb.js";
import router from "./routes/feedbackRoutes.js";



dotenv.config();
const app = express();
connectDb();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to feedback management system");
});

app.use("/api", router);
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
