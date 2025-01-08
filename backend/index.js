import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js"
dotenv.config(); //load environment variables
const app = express();


const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World,Backend works well ");
});
app.use(express.json());//Parse incoming requests:req.body
app.use(cookieParser());//Parse incoming cookies
app.use("/api/auth",authRoutes)
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
