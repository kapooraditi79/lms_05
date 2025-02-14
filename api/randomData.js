import mongoose from "mongoose";
import faker from "faker";

// Import your models
const FeeComponent = require("./models/feeComponent");
const FeeStructure = require("./models/feeStructure");
const StudentFee = require("./models/studentFee");
const School = require("./models/school");
const Student = require("./models/student");

const url=process.env.MONGO_URL

// Connect to MongoDB
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Function to generate random fee components
const generateFeeComponents = async (count) => {
  word = [
    "annualcharges",
    "admissionfee",
    "tuitionfee",
    "sportsfee",
    "labfee",
    "libraryfee",
    "transportfee",
    "examfee",
    "securityfee",
    "miscellaneousfee",
  ];
  const feeComponents = [];
  for (let i = 0; i < count; i++) {
    const feeComponent = new FeeComponent({
      name: word[i],
      amount: faker.random.number({ min: 10000, max: 90000 }),
    });
    await feeComponent.save();
    feeComponents.push(feeComponent._id);
  }
  return feeComponents;
};

// Function to generate random fee structures
const generateFeeStructures = async (feeComponents, schoolId) => {
  const feeStructure = new FeeStructure({
    class: new mongoose.Types.ObjectId(), // Random class ID
    session: new mongoose.Types.ObjectId(), // Random session ID
    feeComponents: feeComponents,
    school: schoolId,
  });
  await feeStructure.save();
  return feeStructure._id;
};

// Function to generate random schools
const generateSchools = async () => {
  const school = new School({
    name: faker.company.companyName(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    pincode: faker.random.number({ min: 100000, max: 999999 }), // 6 digit pincode
    phone: faker.random.number({ min: 1000000000, max: 9999999999 }), // 10 digit phone number
    email: faker.internet.email(),
    principal: faker.name.findName(),
  });
  await school.save();
  return school._id;
};

// Function to generate random students
const generateStudents = async (count) => {
  const students = [];
  for (let i = 0; i < count; i++) {
    const student = new Student({
      name: faker.name.findName(),
      age: faker.random.number({ min: 5, max: 18 }),
      grade: faker.random.number({ min: 1, max: 12 }),
    });
    await student.save();
    students.push(student._id);
  }
  return students;
};

// Function to generate random student fees
const generateStudentFees = async (students, feeStructureId, feeComponents) => {
  for (const studentId of students) {
    const studentFee = new StudentFee({
      student: studentId,
      feeStructure: feeStructureId,
      feeComponents: feeComponents.map((component) => ({
        component: component,
      })),
      feeCycle: {
        startMonth: faker.date.month(),
        endMonth: faker.date.month(),
      },
      payments: [
        {
          date: faker.date.past(),
          amount: faker.finance.amount(),
        },
      ],
    });
    await studentFee.save();
  }
};

// Main function to generate all data
const generateData = async () => {
  const feeComponents = await generateFeeComponents(5); // Generate 5 fee components
  const schoolId = await generateSchools(); // Generate 1 school
  const feeStructureId = await generateFeeStructures(feeComponents, schoolId); // Generate 1 fee structure
  const students = await generateStudents(10); // Generate 10 students
  await generateStudentFees(students, feeStructureId, feeComponents); // Generate student fees for 10 students

  console.log("Data generation complete!");
  mongoose.disconnect();
};

generateData();
