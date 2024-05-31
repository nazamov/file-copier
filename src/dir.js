const fs = require("fs");
const dirPath = require("./arg")("dir");

if (!fs.existsSync(dirPath))
  throw Error("Such directory not found: " + dirPath);

module.exports = dirPath;
