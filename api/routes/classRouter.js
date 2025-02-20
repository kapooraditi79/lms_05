import express from "express";
import {
  createClass,
  deleteClassByIdOrName,
  getAllClass,
  getClassByIdOrName,
  updateClass,
} from "../controllers/classController.js";
const router = express.Router();

// Get all the classes
router.get("/", getAllClass);

// Create a new class or Add a new class
router.post("/", createClass);

// Get a specific class by ID
router.get("/:id", getClassByIdOrName);

// Update a specific class by ID
router.put("/:id", updateClass);

// Delete a specific class by ID
router.delete("/:id", deleteClassByIdOrName);

export default router;
