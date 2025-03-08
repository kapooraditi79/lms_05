import express from "express";
import {
  createClass,
  deleteClass,
  getAllClass,
  updateClass,
} from "../controllers/classController.js";
const router = express.Router();

// Get all the classes
router.get("/", getAllClass);

// Create a new class or Add a new class
router.post("/", createClass);

// Get a specific class by ID

// Update a specific class by ID
router.put("/:id", updateClass);

// Delete a specific class by ID
router.delete("/:id", deleteClass);

export default router;
