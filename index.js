import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/database.config.js";
import userRouter from "./routes/user.router.js";
import candidateRouter from "./routes/candidate.router.js";


const app = express();
const port = process.env.PORT;

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/candidate", candidateRouter);


// connect database
connectDB();

app.listen(port, () => {
    console.log("server is live; running at port ",port);
});