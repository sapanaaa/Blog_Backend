import mongoose from "mongoose";

const userSchema= new mongoose.Schema({//create a new schema
    name:{
        type:String,
        required:true,
        unique:false
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:false
    },
    role:{
        type:String,
        enum:['user','admin','superadmin'],
        default:'user'//user is default role
    },
    refreshToken:{
        type:String
    },

});

const User= mongoose.model("User", userSchema);//create a new model

export default User;
