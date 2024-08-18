import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { authRouter } from "./routes/authRoutes.js";
import { dataRouter } from "./routes/dataRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

if (process.env.NODE_ENV != "production") {
    dotenv.config();
}

main()
    .then(() => {
        console.log("connected to database");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/user", authRouter);
app.use("/data", dataRouter);

let port = process.env.PORT || 8080;

app.listen(port, (req, res) => {
    console.log(`server is listening to port ${port}`)
})