const Project = require("../models/projectModel");

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve projects" });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve project" });
  }
};

const createProject = async (req, res) => {
  try {
    const { projectName, description } = req.body;
    const file = req.file; // The uploaded file

    const newProject = new Project({
      projectName,
      description,
      files: file ? [file.filename] : [], // Store file reference if available
    });

    await newProject.save();
    res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    res.status(500).json({ message: "Failed to create project" });
  }
};

module.exports = { getProjects, getProjectById, createProject };
