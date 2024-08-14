const express = require("express");
const { uploadFile } = require("../controllers/fileController");
const router = express.Router();
const File = require("../models/fileModel");

router.post("/", uploadFile);
router.get("/", async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving files" });
  }
});

module.exports = router;
