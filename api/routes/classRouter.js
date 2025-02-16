import express from "express";
import {
  createClass,
  deleteClass,
  getAllClass,
  getClassById,
  updateClass,
} from "../controllers/classController";
const router = express.Router();

// Get all the classes
router.get("/", getAllClass);

// Create a new class or Add a new class
router.post("/create", createClass);

// Get a specific class by ID
router.get("/create/:id", getClassById);

// Update a specific class by ID
router.put("/create/:id", updateClass);

// Delete a specific class by ID
router.delete("/delete/:id", deleteClass);

export default router;
