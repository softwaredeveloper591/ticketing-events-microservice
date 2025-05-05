import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if(!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to MongoDB");
    
    app.listen(3000, () => {1
      console.log("Listening on port 3000!!!");
    });
  } catch (err) {
    console.error(err); 
    process.exit(1);
  }
};

start();
