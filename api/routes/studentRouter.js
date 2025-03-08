import express from "express";
import {
  createStudent,
  deleteStudent,
  getStudentById,
  getAllStudents,
  updateStudent,
  getStudentByFilter,
  getStudentAttendance,
  markAttendance,
  removeStudentFromClass,
  addStudentToClass,
} from "../controllers/studentController.js";
const router = express.Router();

// Get all the student data
router.get("/", getAllStudents);

// Create a new Student or Add a new student
router.post("/create", createStudent);

// Get a student with regNo
router.get("/:regNo", getStudentById);

// Edit a student with regNo
router.put("/:regNo", updateStudent);

// Search for a student based on the filter
router.post("/edit", getStudentByFilter);

// Delete a student
router.delete("/delete/:id", deleteStudent);

// Mark attendance for a student
router.post("/attendance", markAttendance);

// Get attendance for a student
router.get("/attendance/:regNo", getStudentAttendance);

// Add a student to a class
router.post("/add-to-class", addStudentToClass);

// Remove a student from a class
router.post("/remove-from-class", removeStudentFromClass);

export default router;
