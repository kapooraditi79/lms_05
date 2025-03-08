import mongoose from "mongoose";
import studentClassModel from "../models/class.js";
import { body, validationResult } from "express-validator";
import Teacher from "../models/teacher.js";
import Student from "../models/student.js";

export const createClass = async function (req, res) {
  try {
    const { session, studentClassName, status, students } = req.body;
    const newClass = new studentClassModel({
      session,
      studentClassName,
      status,
      students,
    });
    await newClass.save();
    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Class creation failed",
      error: error.message,
    });
  }
};
//get only those class which are active
export const getAllClass = async function (req, res) {
  try {
    const studentclasses = await studentClassModel.find({ status: "active" });
    res.status(200).json({
      success: true,
      message: "Classes fetched successfully",
      data: studentclasses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch classes",
      error: error.message,
    });
  }
};

export const getClassByNameandSession = async function (req, res) {
  try {
    const { studentClassName, session } = req.params;
    const studentclass = await studentClassModel
      .findOne({
        studentClassName,
        session,
      })
      .populate({ path: "students", select: "regNo firstName lastName" });
    if (!studentclass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Class fetched successfully",
      data: studentclass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch class",
      error: error.message,
    });
  }
};

export const updateClass = async function (req, res) {
  try {
    const { studentClassName, session } = req.body;
    const updates = req.body;
    const updatedClass = await studentClassModel.findOneAndUpdate(
      { studentClassName, session },
      { $set: updates },
      { new: true }
    );
    if (!updatedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Class updated successfully",
      data: updatedClass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update class",
      error: error.message,
    });
  }
};

export const deleteClass = async function (req, res) {
  try {
    const { studentClassName } = req.body;
    const deletedClass = await studentClassModel.findOneAndUpdate(
      {
        studentClassName,
      },
      { $set: { status: "inactive" } },
      { new: true }
    );
    if (!deletedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Class deleted successfully",
      data: deletedClass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete class",
      error: error.message,
    });
  }
};
