import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { request, response } from 'express';

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all values 😭🙏" });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "You already have an account, don't you remember?" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      res
        .status(201)
        .json({ message: "Wauuu account created successfully 🥳🎈" });
    } catch (error) {
      console.error(error); // helpful for debugging
      res.status(500).json({ message: "Error occurred, please try again later" });
    }
  };


export const loginUser = async(req,res)=>
  {
  const {email,password}= req.body;
  if(!email || !password){
    return res.status(400).json({message:"You are not authorized user😡🤬!!"});
  }
  try {
    const user = await User.findOne({email});
    if (!user)
    {
      res.status(400).json({message:"Email not found😒"});
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
      return res.status(400).json({message:"Wrong password please write correct password"});
    }
    const token= jwt.sign({userID:user._id}, process.env.JWTTOKEN, {expiresIn:'10m'});
    res.cookie('token', token, {httpOnly: true, //token has 4 properties which accepts http requests
                                secure:process.env.NODE_ENV=== 'Production', //secure
                                sameSite:'strict',
                              maxAge:60*60*1000});//time till token remains in cookie
    const {password:_, ...userData}=user.toObject();
    res.status(200).json({message:"Successfully logged in 🥳🥳", user:userData});
    }


  catch (error) {
    console.error(error); // helpful for debugging
    res.status(500).json({ message: "Error occurred, please try again later" });
  }
}