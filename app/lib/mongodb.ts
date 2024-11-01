import mongoose from "mongoose";

const dbKey = process.env.MONGODB_URI

export const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(dbKey as string);
    if (connection) {
      console.log("Connected to database")
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}