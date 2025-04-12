import User from '../models/User.js';


//get all users
export const getAllUsers = async(req, res) => {
  try {
    const users = await User.find(); //finds all users from database
    res.status(200).json(users); 
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Error occurred!! please try again later" });
  }
}