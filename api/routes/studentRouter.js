import express from "express";
import {
  createStudent,
  deleteStudent,
  getStudentById,
  getAllStudents,
  updateStudent,
  getStudentByFilter,
} from "../controllers/studentController.js";
const router = express.Router();

// Get all the student data
router.get("/edit", getAllStudents);

// Create a new Student or Add a new student
router.post("/create", createStudent);

// Get a student with ID
router.get("/create/:id", getStudentById);

// Edit a student with ID
router.put("/create/:id", updateStudent);

// Search for a student based on the filter
router.post("/edit", getStudentByFilter);

// Delete a student
router.delete("/delete/:id", deleteStudent);

export default router;
