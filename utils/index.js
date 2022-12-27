const fs = require("fs");

const readLinesFromFile = (filename) => {
  const content = fs.readFileSync(filename, "utf-8");
  return content.split(/\r?\n/);
};

module.exports = {
  readLinesFromFile,
};
