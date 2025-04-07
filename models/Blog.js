import mongoose from "mongoose";
import User from "./User.js";

const blogSchema= new mongoose.Schema({//create a new schema
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    
},
{timestamps:true});
    

const Blog= mongoose.model("Blog", blogSchema);//create a new model

export default Blog;
 