import mongoose from "mongoose";

const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const connectionString = `mongodb+srv://${userName}:${password}@cluster0.yzpnu.mongodb.net/referral-management?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("database connected");
  } catch (error) {
    console.log("error in connecting database");
    console.log("db error", error);
  }
};

export default connectDB;
