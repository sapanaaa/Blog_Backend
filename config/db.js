import {connect} from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectdb = async () => {
  try {
    await connect(process.env.mongodburl);
    console.log("connected to database successfully");
    
} 
  catch (error) {
    console.log("couldn't connect to database", error.message);
    process.exit(1);
  }
};
export default connectdb; 