import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();
dotenv.config(); //hide mongodb connection

//mongoose
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB!!")
  } catch (error) {
    throw error;
  }
};

//If connect fail -> try to reconnect again and again
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!!")
})
// mongoose.connection.on("connected", () => {
//     console.log("MongoDB connected!!")
// })


//middleware : MAIN URL

//When the app run > trigger all middleware -> check what root is used to execute specific api
/* app.use((req, res, next) => {
  console.log("Hii middleware")

  next();     //Skip all code below con continue next middleware
  //.....
}) */

app.use(cors())
app.use(cookieParser())           //Help to send in4 into cookies
app.use(express.json())           //Help to send JSON object from fe (postman) to be (express server)
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

//Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,         //stack = error detail 
  })
})

app.listen(8800, () => {
    connect()
  console.log("Connected to be!!");
});
