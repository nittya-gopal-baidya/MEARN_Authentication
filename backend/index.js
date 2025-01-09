import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path"

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors"
dotenv.config(); //load environment variables
const app = express();


const PORT = process.env.PORT||5000;

const __dirname=path.resolve();

// app.get("/", (req, res) => {
//   res.send("Hello World,Backend works well ");
// });
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json());//Parse incoming requests:req.body
app.use(cookieParser());//Parse incoming cookies
app.use("/api/auth",authRoutes)
if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"/frontend/dist")));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));

  });
}
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
