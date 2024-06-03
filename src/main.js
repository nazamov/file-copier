const fs = require("fs");
const axios = require("axios");
const directoryPath = require("./dir");
const url = require("./arg")("url");
const colors = require("colors");

console.log(colors.green("request to:"), url);
const files = [];

async function copyAll(path, folder = "") {
  try {
    const fileList = fs.readdirSync(path);
    for (let item of fileList) {
      const itemPath = path + "/" + item;
      const isDir = fs.lstatSync(itemPath).isDirectory();
      if (isDir) {
        await copyAll(itemPath, item);
      } else {
        files.push([itemPath, folder, item]);
      }
    }
  } catch (err) {
    console.error(colors.red("Error sync dir"), err);
  }
}

async function sendFiles() {
  for (let fileItem of files) {
    const [itemPath, folder, fileName] = fileItem;
    var newFile = fs.readFileSync(itemPath);
    const blob = new Blob([newFile]); // Adjust content type if needed
    const form_data = new FormData();
    form_data.append("file", blob, fileName);
    const fileInfo = folder + "/" + fileName;
    console.log(colors.yellow("file to send:"), fileInfo);
    const request_config = {
      method: "post",
      url,
      headers: {
        "Content-Type": "multipart/form-data",
        folder,
      },
      data: form_data,
    };
    try {
      await axios(request_config);
    } catch (e) {
      console.error(colors.red("Can't send file"), fileInfo, e.message);
    }
  }
}

copyAll(directoryPath);
console.log(colors.green("total files count to copy: "), files.length);
sendFiles();
