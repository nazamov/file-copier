const fs = require("fs");
const axios = require("axios");
const directoryPath = require("./dir");
const url = require("./arg")("--url");

async function copyAll(path, folder = "") {
  try {
    const fileList = fs.readdirSync(path);
    for (let item of fileList) {
      const itemPath = path + "/" + item;
      const isDir = fs.lstatSync(itemPath).isDirectory();
      if (isDir) {
        copyAll(itemPath, item);
      } else {
        console.log("file to copy", itemPath, folder);
        var newFile = fs.readFileSync(itemPath);
        const blob = new Blob([newFile]); // Adjust content type if needed
        const form_data = new FormData();
        form_data.append("file", blob, item);
        const request_config = {
          method: "post",
          url,
          headers: {
            "Content-Type": "multipart/form-data",
            folder,
          },
          data: form_data,
        };
        await axios(request_config);
      }
    }
  } catch (err) {
    console.error("Error", err.message);
  }
}

copyAll(directoryPath);
