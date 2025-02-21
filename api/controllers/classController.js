import mongoose from "mongoose";
import Class from "../models/class.js";
import { body, validationResult } from "express-validator";
import Teacher from "../models/teacher.js";
import Student from "../models/student.js";

export const getAllClass = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createClass = [
  //validating if both session and classname are typed by user
  body("session").notEmpty().withMessage("session is required"),
  body("className").notEmpty().withMessage("className is required"),
  //withMessage is called only if the notEmpty() condition is not met

  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const classExists = await Class.findOne({
        className: req.body.className,
        session: req.body.session,
      });
      if (classExists) {
        return res.status(400).json({ message: "Class already exists" });
      } else {
        const newClass = new Class(req.body);
        await newClass.save();
        res.status(201).json(newClass);
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

// export const getClassById = async (req, res) => {
//   try {
//     const classData = await Class.findById(req.params.id);
//     if (!classData) return res.status(404).json({ message: "Class not found" });
//     res.status(200).json(classData);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

//creating a function to get all classes of a session
export const getClassBySession = async function (req, res) {
  try {
    const { session } = req.params;
    if (!session) {
      return res.status(400).json({ message: "Please provide a session" });
    }
    if (session) {
      const classes = await Class.find({ session: session });
      if (classes.length === 0) {
        return res
          .status(404)
          .json({ message: "No classes found for this session" });
      }
      res.status(200).json(classes);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClassByIdOrName = async function (req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Please provide an id or name" });
    }
    //checking to see if the id is valid
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    let classData;

    if (isObjectId) {
      classData = await Class.findById(id);
    } else {
      //searching by classname if id not valid
      //using regex to make the search case insensitive
      classData = await Class.findOne({
        className: { $regex: new RegExp(`^${id}$`, "i") },
      });
    }

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json(classData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClass)
      return res.status(404).json({ message: "Class not found" });
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// export const deleteClass = async (req, res) => {
//   try {
//     const deletedClass = await Class.findByIdAndDelete(req.params.id);
//     if (!deletedClass)
//       return res.status(404).json({ message: "Class not found" });
//     res.status(200).json({ message: "Class deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const deleteClassByIdOrName = async function (req, res) {
  try {
    const { id } = req.params;

    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    let deletedClass;
    if (isObjectId) {
      deletedClass = await Class.findByIdAndDelete(id);
    } else {
      deletedClass = await Class.findOne({
        className: { $regex: new RegExp(`^${id}$`, "i") },
        isDeleted: false,
      });
      if (!deletedClass) {
        return res.status(404).json({ message: "Class not found" });
      } else {
        const updatedClass = await Class.findByIdAndUpdate(
          deletedClass._id,
          { isDeleted: true },
          { new: true }
        );
        res
          .status(200)
          .json({ message: "Class marked as deleted", class: updatedClass });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//creating a function to add a teacher to the class
export const addTeacherToClass = async function (req, res) {
  try {
    const { teacherId, classId } = req.params;
    const isTeacherId = mongoose.Types.ObjectId.isValid(teacherId);
    const isClassId = mongoose.Types.ObjectId.isValid(classId);
    const classData = isClassId
      ? await Class.findById(classId)
      : await Class.findOne({
          className: { $regex: new RegExp(`^${classId}$`, "i") },
        });

    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }

    const teacherData = isTeacherId
      ? await Teacher.findById(teacherId)
      : await Teacher.findOne({
          teacherName: { $regex: new RegExp(`^${teacherId}$`, "i") },
        });
    if (!teacherData) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    if (classData.teacher.includes(teacherData._id)) {
      return res
        .status(400)
        .json({ message: "Teacher already assigned to class" });
    }
    await Class.findByIdAndUpdate(classData._id, {
      $push: { teacher: teacherData._id },
    });
    res
      .status(200)
      .json({ message: "Teacher added to class", class: classData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//creating a function to add a student to the class

export const addStudentToClass = async function (req, res) {
  try {
    const { studentId, classId } = req.params;
    const isStudentId = mongoose.Types.ObjectId.isValid(studentId);
    const isClassId = mongoose.Types.ObjectId.isValid(classId);

    const classData = isClassId
      ? await Class.findById(classId)
      : await Class.findOne({
          className: { $regex: new RegExp(`^${classId}$`, "i") },
        });
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    const studentData = isStudentId
      ? await Student.findById(studentId)
      : await Student.findOne({
          studentName: { $regex: new RegExp(`^${studentId}$`, "i") },
        });
    if (!studentData) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (classData.student.includes(studentData._id)) {
      return res
        .status(400)
        .json({ message: "Student already assigned to class" });
    }
    await Class.findByIdAndUpdate(classData._id, {
      $push: { student: studentData._id },
    });
    return res
      .status(200)
      .json({ message: "Student added to class", class: classData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add student to a class
