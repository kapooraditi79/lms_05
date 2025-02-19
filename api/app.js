import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import methodOverride from "method-override";
import studentRoute from "./routes/studentRouter.js";
import classRoute from "./routes/classRouter.js";
import parentRoute from "./routes/parentRouter.js";
import studentModel from "./models/student.js";
import { faker } from "@faker-js/faker";

dotenv.config();
const app = express();
const MongoURL = process.env.MONGO_URL;
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/student", studentRoute);
app.use("/api/class", classRoute);
app.use("/api/parent", parentRoute);

app.get("/", (req, res) => {
  res.send("hehehehe");
});

mongoose
  .connect(MongoURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    // generateStudents();
  })
  .catch((err) => {
    console.log(err);
  });
