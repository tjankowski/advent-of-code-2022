const { readLinesFromFile } = require("../utils");

const lines = readLinesFromFile("input.txt");

const bufferSize = 14;
let buffer;

const results = lines.map((line, index) => {
  const stream = line.split("");
  console.log("stream:", line);
  for (let i = 0; i < stream.length; i++) {
    buffer = stream.slice(i, i + bufferSize);
    const set = new Set(buffer);
    if (set.size === bufferSize) {
      const result = i + bufferSize;
      console.log("result", result);
      return result;
    }
  }
});
