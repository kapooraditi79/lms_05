import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import methodOverride from "method-override";
import studentRoute from "./routes/studentRouter.js";
import classRoute from "./routes/classRouter.js";
import teacherRoute from "./routes/teacherRouter.js";
// import parentRoute from "./routes/parentRouter.js";
import studentModel from "./models/student.js";
import { faker } from "@faker-js/faker";
import classModel from "./models/class.js";
import teacherModel from "./models/teacher.js";
dotenv.config();
const app = express();
const MongoURL =
  "mongodb+srv://thinktank7997:QKWYiKVRt62o9cCE@cluster0.tqoji.mongodb.net/";
const PORT = 6555;

app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/student", studentRoute);
app.use("/api/class", classRoute);
app.use("/api/teacher", teacherRoute);

// const seedTeachers = async function () {
//   await teacherModel.deleteMany();
//   await teacherModel.insertMany([
//     {
//       name: "John",
//       email: "john@example.com",
//       teacherId: "T001",
//     },
//     {
//       name: "Jane",
//       email: "jane@example.com",
//       teacherId: "T002",
//     },
//   ]);
//   console.log("Teachers seeded successfully");
// };

// seedTeachers();

app.get("/", (req, res) => {
  res.send("hehehehe");
});

mongoose
  .connect(MongoURL)
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    // const students = Array.from({ length: 10 }, generateStudent);
    // await studentModel.insertMany(students);
    // generateClasses();
    console.log("done");
  })
  .catch((err) => {
    console.log(err);
  });
