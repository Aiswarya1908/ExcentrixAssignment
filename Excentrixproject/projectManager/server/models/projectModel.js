const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  description: { type: String },
  files: [{ type: Array }], // Array of file references
});

module.exports = mongoose.model("Project", projectSchema);
