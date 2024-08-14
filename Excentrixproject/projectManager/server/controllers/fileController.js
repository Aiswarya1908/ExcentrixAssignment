

const File = require("../models/fileModel");
const multer = require("multer");
const mime = require("mime-types");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = mime.extension(file.mimetype);
    cb(null, file.fieldname + "-" + uniqueSuffix + `.${extension}`);
  },
});

const upload = multer({ storage: storage });

if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}

exports.uploadFile = [
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file provided" });
      }

      console.log("File: ", req.file);
      console.log(req.body);

      // Construct the host URL using the protocol, host, and port from the request
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const fileUrl = `${baseUrl}/public/${req.file.filename}`;

      const fileObj = {
        filename: req.file.originalname,
        path: fileUrl, // Save the URL instead of the local path
        projectId: req.body.projectId,
      };

      const document = await File.create(fileObj);

      res
        .status(200)
        .json({ message: `File uploaded successfully`, file: document });
    } catch (error) {
      console.log(`Uploaded File Error: ${error}`);
      res.status(500).json({ message: "Something went wrong" });
    }
  },
];
