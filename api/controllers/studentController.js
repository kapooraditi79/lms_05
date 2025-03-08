import Student from "../models/student.js";
import attendance from "../models/attendance.js";
import teacherModel from "../models/teacher.js";
import studentClassModel from "../models/class.js";

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

//deleting student by marking their status inactive
export const deleteStudent = async function (req, res) {
  try {
    const { regNo } = req.body;
    const student = await Student.findOne({ regNo });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    student.status = "inactive";
    await student.save();
    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete student",
      error: error.message,
    });
  }
};

export const markAttendance = async function (req, res) {
  try {
    console.log("Recieved Payload:", req.body);
    const { regNo, date, attendanceStatus, teacherId, remarks } = req.body;
    const student = await Student.findOne({ regNo });
    if (!student) return res.status(404).json({ message: "student not found" });
    const teacher = await teacherModel.findOne({ teacherId });

    const attendance = new attendance({
      student: student._id,
      date,
      attendanceStatus,
      remarks,
      markedBy: teacher._id,
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
    const attendance = await attendance
      .find({ student: student._id })
      .populate("markedBy", "name");
    if (attendance.length === 0)
      return res.status(404).json({ message: "no attendance found" });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//adding the student to the class
//this should happen automatically whenever
//a new student is created and the class is selected

export const addStudentToClass = async function (req, res) {
  try {
    const { regNo, studentClass } = req.body;
    const student = await Student.findOne({ regNo });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    const requiredClass = await studentClassModel.findOne({
      studentClassName: studentClass,
    });
    if (!requiredClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }
    await studentClassModel
      .findOneAndUpdate(
        { studentClassName: studentClass },
        { $push: { students: student._id } },
        { new: true }
      )
      .populate({ path: "students", select: "regNo firstName lastName" });
    res.status(200).json({
      success: true,
      message: "Student added to class successfully",
      data: requiredClass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add student to class",
      error: error.message,
    });
  }
};

//removing the student from the class
export const removeStudentFromClass = async function (req, res) {
  try {
    const { regNo, studentClass } = req.body;
    const student = await Student.findOne({ regNo });
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
    const requiredClass = await studentClassModel.findOne({
      studentClassName: studentClass,
    });
    if (!requiredClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }
    await studentClassModel
      .findOneAndUpdate(
        { studentClassName: studentClass },
        { $pull: { students: student._id } },
        { new: true }
      )
      .populate({ path: "students", select: "regNo firstName lastName" });
    res.status(200).json({
      success: true,
      message: "Student removed from class successfully",
      data: requiredClass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove student from class",
      error: error.message,
    });
  }
};
