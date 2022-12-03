const fs = require("fs");

const contents = fs.readFileSync("input.txt", "utf-8");
let rucksacks = [];

contents.split(/\r?\n/).forEach((line) => {
  const length = line.length;
  rucksacks = [
    ...rucksacks,
    [line.slice(0, length / 2), line.slice(length / 2)],
  ];
});

const items = rucksacks.map(([partA, partB]) => {
  return [...partA].find((type) => [...partB].includes(type));
});

const toPriority = (item) => {
  const charCode = item.charCodeAt(0);
  if (charCode < 97) {
    return (charCode % 65) + 27;
  }
  return charCode % 96;
};

console.log(items);

console.log(items.map(toPriority).reduce((sum, priority) => sum + priority, 0));
