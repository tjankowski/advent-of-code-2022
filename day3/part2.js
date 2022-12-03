const fs = require("fs");

const contents = fs.readFileSync("input.txt", "utf-8");
let groups = [];
let group = [];

contents.split(/\r?\n/).forEach((line) => {
  group = [...group, [...line]];
  if (group.length === 3) {
    groups = [...groups, group];
    group = [];
  }
});

const items = groups.map(([rucksackA, rucksackB, rucksackC]) => {
  return rucksackA.find(
    (type) => rucksackB.includes(type) && rucksackC.includes(type)
  );
});

const toPriority = (item) => {
  const charCode = item.charCodeAt(0);
  if (charCode < 97) {
    return (charCode % 65) + 27;
  }
  return charCode % 96;
};

console.log("Items: ", items);

console.log(
  "Priority: ",
  items.map(toPriority).reduce((sum, priority) => sum + priority, 0)
);
