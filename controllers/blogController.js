import Blog from "../models/Blog";
import jwt from "jsonwebtoken";

//creating new blog
export const createBlogPost = async(req, res)=>{
    try{
        const token = req.cookie.token;

        if(!token){
            return res.status(401).json({message: "You are not authorized user!!! Token not found in cookies"});
        }

    }
    catch{}
}