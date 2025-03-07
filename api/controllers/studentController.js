import Student from "../models/student.js";
import attendance from "../models/attendance.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    if (students.length > 0) console.log("got all the students");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    console.log("Recieved Payload:", req.body);
    const { regNo, rollNo, studentClass, parentData } = req.body;
    const existingRegNo = await Student.findOne({ regNo });
    if (existingRegNo) {
      return res.status(400).json({
        message: "A student with this Registration Number already exists.",
      });
    }
    const existingRollNo = await Student.findOne({
      rollNo,
      studentClass,
    });
    if (existingRollNo) {
      return res.status(400).json({
        message:
          "A student with this Roll Number already exists in the same class.",
      });
    }
    const newStudent = new Student({
      regNo,
      rollNo,
      studentClass,
      parentData,
      ...req.body,
    });
    const response = await newStudent.save();
    if (response) {
      console.log("created new student", response);
    }
    res.status(201).json(newStudent);
  } catch (error) {
    console.error("Create Student Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const { regNo } = req.params;
    console.log(regNo);
    const student = await Student.findOne({ regNo });
    if (!student) return res.status(404).json({ message: "Student not found" });
    else console.log("found by Id");
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { regNo } = req.params;
    const updates = req.body;
    // const id=req.body._id;
    const updatedStudent = await Student.findOneAndUpdate(
      { regNo },
      { $set: updates },
      {
        new: true,
      }
    );
    if (!updatedStudent)
      return res.status(404).json({ message: "Student not found" });
    else console.log("Updated Student", updatedStudent);
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getStudentByFilter = async (req, res) => {
  try {
    const students = await Student.find(req.body);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent)
      return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAttendance = async function (req, res) {
  try {
    console.log("Recieved Payload:", req.body);
    const { regNo, date, attendanceStatus, markedBy, remarks } = req.body;
    const student = await Student.findOne({ regNo });
    if (!student) return res.status(404).json({ message: "student not found" });
    const attendance = new attendance({
      student: student._id,
      date,
      attendanceStatus,
      remarks,
      markedBy,
    });
    const response = await attendance.save();
    if (response) console.log("Attendance marked successfully", response);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentAttendance = async function (req, res) {
  try {
    const { regNo } = req.params;
    const student = await Student.findOne({ regNo });
    if (!student) return res.status(404).json({ message: "student not found" });
    const attendance = await attendance.find({ student: student._id });
    if (attendance.length === 0)
      return res.status(404).json({ message: "no attendance found" });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
