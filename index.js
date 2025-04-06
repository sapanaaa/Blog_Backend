import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectdb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
connectdb();//connect mongodb

app.use(cors());
app.use(express.json());
app.use(cookieParser());


//routes
app.use('/api',userRoutes);

//start server
const PORT= 8080;

app.listen(PORT, ()=>{
    console.log("The server is currently running at port 8080 ");
});
