import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// * ---------------------------Routers-----------------------------
import authRouter from "./routers/authRouter.js";

// * ---------------------------public-----------------------------

// * --------------General middleware for set up-------------------

// * -----------Dynamic storing of multimedia-------------------------

if (process.env.NODE_ENV === "develop") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());

// * -----------------------------------------------------------

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

// * -----------------Building-Blocks---------------------------------
app.use("/api/v1/auth", authRouter);
// * -----------------------------------------------------------

const port = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
