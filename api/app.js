import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import methodOverride from 'method-override'
import studentRoute from './routes/studentRouter.js'
import classRoute from './routes/classRouter.js'
import parentRoute from './routes/parentRouter.js'
import studentModel from './models/student.js'
import { faker } from '@faker-js/faker';

dotenv.config();
const app = express();
const MongoURL="mongodb://127.0.0.1:27017"
const PORT=3000;

app.use(cors());
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.use('/api/student',studentRoute)
app.use('/api/class',classRoute)
app.use('/api/parent',parentRoute)

app.get("/", (req, res)=>{
  res.send("hehehehe");
});

export const generateStudents = async (count = 10) => {
  const students = [];

  for (let i = 0; i < count; i++) {
    const student = new studentModel({
      session: `2023-2024`,
      name: faker.person.fullName(),
      age: faker.number.int({ min: 5, max: 18 }),
      dob: faker.date.past({ years: 18, refDate: new Date("2018-01-01") }), // Random DOB within 18 years
      parentName: null, // Assuming no parent data for now
      aadhar_number: faker.number.int({ min: 100000000000, max: 999999999999 }).toString(),
      address: faker.location.streetAddress(),
      transport: faker.helpers.arrayElement(["Bus", "Car", "Bicycle", "Walk"]),
      attendance: null, // Assuming no attendance data initially
      studentFee: null, // Assuming no fee data initially
    });

    await student.save();
    console.log("Generated student")
    students.push(student._id);
  }

  return students;
};

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