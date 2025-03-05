import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
  } catch (error) {
    throw new Error("Unable to connect to database. Error: " + error);
  }
};

export default connectDB;
