const fs = require("fs");

const contents = fs.readFileSync("input.txt", "utf-8");
let elfs = [];

let elfBag = [];
contents.split(/\r?\n/).forEach((line) => {
  if (line) {
    elfBag = [...elfBag, Number.parseInt(line, 10)];
    return;
  }
  elfs = [...elfs, elfBag];
  elfBag = [];
});

const entries = elfs.map((bag, index) => [
  index,
  bag.reduce((prev, curr) => prev + curr, 0),
]);
const sortedEntries = entries.sort((a, b) => b[1] - a[1]);
const calloriesMap = Object.fromEntries(entries);
console.log("Elf with most callories", sortedEntries[0]);

const topThree = sortedEntries.slice(0, 3);
console.log("Top three elfs with most callories", topThree);
console.log(
  "Sum of callories for top three",
  topThree.reduce((sum, elf) => sum + elf[1], 0)
);
