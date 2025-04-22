import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import dotenv from "dotenv";


//creating new blog
export const createBlogPost = async(req, res)=>{
    try{
        const token = req.cookies.AccessToken || req.headers['authorization']?.split(' ')[1]; // Check for token in cookies or headers

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
            user: userId, //attach userId, name, email
            name: name,
            email: email,
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

//get blogs

export const getALLBlogPosts = async (req,res)=>{
    try{
        const blogs= await Blog.find().populate('user', 'email');
        res.status(200).json(blogs);
    }
    catch(error){
        res.status(500).json({message:"Error occured!!!"});
    }
};
//get blog by id
export const getBlogPostById = async (req,res)=>{
    try{
        const blog= await Blog.findById(req.params.id).populate('user', 'email');
        if(!blog){
            return res.status(404).json({message:"Blog not found"});
        }
        res.status(200).json(blog);
    }
    catch(error){
        res.status(500).json({message:"Error occured!!!"});
    }
}