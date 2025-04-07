import Blog from "../models/Blog";
import jwt from "jsonwebtoken";

//creating new blog
export const createBlogPost = async(req, res)=>{
    try{
        const token = req.cookie.token;

        if(!token){
            return res.status(401).json({message: "You are not authorized user!!! Token not found in cookies"});
        }
        //verify token and get the user details
        const decoded = jwt.verify(token, process.env.JWT_SECRET);//verify the token in the cookie with environment variable token

    }
    catch{}
}