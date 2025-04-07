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
        const decoded = jwt.verify(token, process.env.JWT_SECRET);//verify the token(1st one) in the cookie with environment variable token
        const userId = decoded.userId;
        const name= decoded.name;
        const email = decoded.email;

        //create a new blog post with the user details
        const blog = new Blog({
            ...req.body,
            user:userId, //attach userId, name, email
            name: name,
            email:email,
        });
        await blog.save();

        //return the blog along with user details
         res.status(201).json({message: "Congratulations 🥳 Your blog has been created!!",
            blog:{
                ...blog.toObject(),
                user:{
                    userId, name, email,
                },
            },
         });

    }
    catch(error){
        res.status(400).json({message:"Error occured please try again later🙏"});
    }
};