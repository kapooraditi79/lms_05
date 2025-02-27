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
import classModel from "./models/class.js";

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
app.use("/api/parent", parentRoute);

app.get("/", (req, res) => {
  res.send("hehehehe");
});

// const generateStudent = () => ({
//   session: faker.date.past().getFullYear().toString(),
//   name: faker.person.fullName(),
//   regNo: faker.string.alphanumeric(10).toUpperCase(),
//   rollNo: faker.number.int({ min: 10000, max: 99999 }).toString(),
//   gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
//   class: faker.number.int({ min: 1, max: 12 }).toString(),
//   section: faker.helpers.arrayElement(["A", "B", "C", "D"]),
//   status: faker.helpers.arrayElement(["Active", "Inactive"]),
//   grade: faker.helpers.arrayElement(["A", "B", "C", "D", "E"]),
//   profileImage: faker.image.avatar(),
//   age: faker.number.int({ min: 6, max: 18 }),
//   dob: faker.date.birthdate({ min: 6, max: 18, mode: "age" }),
//   parentName: new mongoose.Types.ObjectId(), // Replace with valid Parent ID if needed
//   aadhar_number: faker.string.numeric(12),
//   address: faker.location.streetAddress(),
//   transport: faker.helpers.arrayElement(["Bus", "Van", "Walk", "Bike"]),
//   attendance: new mongoose.Types.ObjectId(), // Replace with valid Attendance ID if needed
//   studentFee: new mongoose.Types.ObjectId(), // Replace with valid StudentFee ID if needed
// });

// const generateClasses = async () => {
//   try {
//     // Define session and sections
//     const session = "2024-25";
//     const sections = ["A", "B"];
//     const romanNumerals = ["I", "II", "III", "IV", "V"];

//     const classes = [];

//     for (let i = 0; i < romanNumerals.length; i++) {
//       for (const section of sections) {
//         classes.push({
//           session,
//           regNo: faker.string.alphanumeric(5).toUpperCase(),
//           className: `${romanNumerals[i]}`,
//           section,
//           status: "Active",
//           noOfStudent: 45, // Default value
//           noOfSubjects: 6, // Default value
//           teacher: [],
//           student: [],
//         });
//       }
//     }

//     // Insert classes into the database
//     await classModel.insertMany(classes);
//     console.log("Classes generated successfully!");
//   } catch (error) {
//     console.error("Error generating classes:", error);
//   }
// };
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
