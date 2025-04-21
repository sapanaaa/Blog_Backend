import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectdb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app = express();
connectdb(); // Connect to MongoDB

// Middleware to parse JSON request body
app.use(express.json()); // This is the key to fixing the "undefined" error

// Enable CORS
app.use(cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true, // Allow cookies to be sent with requests
    
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
}));

// Cookie parser middleware
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
