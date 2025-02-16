import Parent from "../models/parent.js";

export const getAllParent = async (req, res) => {
  try {
    const parents = await Parent.find();
    res.status(200).json(parents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createParent = async (req, res) => {
  try {
    const parent = new Parent(req.body);
    await parent.save();
    res.status(201).json(parent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getParentById = async (req, res) => {
  try {
    const parentData = await Parent.findById(req.params.id);
    if (!parentData)
      return res.status(404).json({ message: "Parent not found" });
    res.status(200).json(parentData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateParent = async (req, res) => {
  try {
    const updatedParent = await Parent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedParent)
      return res.status(404).json({ message: "Parent not found" });
    res.status(200).json(updatedParent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteParent = async (req, res) => {
  try {
    const deletedParent = await Parent.findByIdAndDelete(req.params.id);
    if (!deletedParent)
      return res.status(404).json({ message: "Parent not found" });
    res.status(200).json({ message: "Parent deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
