const express = require("express");
const multer = require("multer");
const fs = require("fs");
const app = express();
const port = 3005;
const directoryPath = require("./dir");

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.headers.folder;
    console.log(
      "file to save",
      (folder ? folder + "/" : "") + file.originalname
    );
    const folderPath = directoryPath + (folder ? "/" + folder : "");
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);

    cb(null, folderPath);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    message: "File uploaded successfully",
    filename: req.file.filename,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
