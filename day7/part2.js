const { readLinesFromFile } = require("../utils");

const createFile = (name, size) => ({
  type: "file",
  size: Number.parseInt(size, 10),
  name,
});
const createDir = (name, parent, id) => ({
  id,
  type: "dir",
  name,
  parent,
  files: [],
  dirs: {},
});
const isDir = (line) => line.startsWith("dir");
const isListCommand = (line) => line.startsWith("$ ls");
const isChangeCommand = (line) => line.startsWith("$ cd");

const [first, second, ...lines] = readLinesFromFile("input.txt");

const topRoot = createDir("/", null, -1);
let currentDir = topRoot;

lines.forEach((line, index) => {
  if (isListCommand(line)) {
    return;
  }
  if (isChangeCommand(line)) {
    const dirName = line.split("$ cd ")[1];
    currentDir =
      dirName === ".." ? currentDir.parent : currentDir.dirs[dirName];
    return;
  }
  if (isDir(line)) {
    const dirName = line.split(" ")[1];
    const dir = createDir(dirName, currentDir, index);
    currentDir.dirs[dirName] = dir;
    return;
  }
  const [size, fileName] = line.split(" ");
  const file = createFile(fileName, size);
  currentDir.files.push(file);
});

const printFileSystem = (root, level = 0) => {
  console.log(root.name.padStart(root.name.length + level, " "));
  Object.keys(root.dirs).forEach((dirName) => {
    printFileSystem(root.dirs[dirName], level + 1);
  });
  root.files.forEach((file) => {
    const fileString = `${file.name} ${file.size}`;
    console.log(fileString.padStart(fileString.length + level + 1));
  });
};

const createDirKey = (dir) => `${dir.name}-${dir.id}`;

const sizes = {};

const calculateSize = (root) => {
  const filesSize = root.files.reduce((sum, file) => sum + file.size, 0);
  const dirsSize = Object.keys(root.dirs).reduce((sum, dirName) => {
    return sum + calculateSize(root.dirs[dirName]);
  }, 0);
  const sum = filesSize + dirsSize;
  sizes[createDirKey(root)] = sum;
  return sum;
};

calculateSize(topRoot);
printFileSystem(topRoot);
console.log(Object.keys(sizes).length);

const spaceToFree = 30000000 - (70000000 - sizes[createDirKey(topRoot)]);

console.log(spaceToFree);

const possibleToDelete = Object.values(sizes)
  .filter((size) => size >= spaceToFree)
  .sort((a, b) => a - b);

console.log(possibleToDelete[0], possibleToDelete[1], possibleToDelete[2]);
