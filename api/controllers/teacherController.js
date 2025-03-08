import express from "express";
import teacherModel from "../models/teacher.js";

export const getAllTeachers = async function (req, res) {
  try {
    const teachers = await teacherModel.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTeacher = async function (req, res) {
  try {
    const { name, email, password, teacherId } = req.body;
    const existingTeacher = await teacherModel.findOne({ teacherId });
    if (existingTeacher) {
      return res.status(400).json({ message: "Teacher already exists" });
    }
    const teacher = new teacherModel({ name, email, password, teacherId });
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTeacherById = async function (req, res) {
  try {
    const { teacherId } = req.params;
    const teacher = await teacherModel.findOne({ teacherId });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
