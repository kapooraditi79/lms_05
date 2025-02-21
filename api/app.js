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
const MongoURL = "mongodb://localhost:27017/";
const PORT = 6555;

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

const generateStudent = () => ({
  session: faker.date.past().getFullYear().toString(),
  name: faker.person.fullName(),
  regNo: faker.string.alphanumeric(10).toUpperCase(),
  rollNo: faker.number.int({ min: 10000, max: 99999 }).toString(),
  gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
  class: faker.number.int({ min: 1, max: 12 }).toString(),
  section: faker.helpers.arrayElement(["A", "B", "C", "D"]),
  status: faker.helpers.arrayElement(["Active", "Inactive"]),
  grade: faker.helpers.arrayElement(["A", "B", "C", "D", "E"]),
  profileImage: faker.image.avatar(),
  age: faker.number.int({ min: 6, max: 18 }),
  dob: faker.date.birthdate({ min: 6, max: 18, mode: "age" }),
  parentName: new mongoose.Types.ObjectId(), // Replace with valid Parent ID if needed
  aadhar_number: faker.string.numeric(12),
  address: faker.location.streetAddress(),
  transport: faker.helpers.arrayElement(["Bus", "Van", "Walk", "Bike"]),
  attendance: new mongoose.Types.ObjectId(), // Replace with valid Attendance ID if needed
  studentFee: new mongoose.Types.ObjectId(), // Replace with valid StudentFee ID if needed
});
mongoose
  .connect(MongoURL)
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    // const students = Array.from({ length: 10 }, generateStudent);
    // await studentModel.insertMany(students);
    // console.log("done")
  })
  .catch((err) => {
    console.log(err);
  });
