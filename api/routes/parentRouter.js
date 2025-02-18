import express from "express";
import {
  createParent,
  deleteParent,
  getAllParent,
  getParentById,
  updateParent,
} from "../controllers/parentController.js";
const router = express.Router();

router.get("/", getAllParent);
router.post("/", createParent);
router.get("/:id", getParentById);
router.put("/:id", updateParent);
router.delete("/:id", deleteParent);

export default router;
