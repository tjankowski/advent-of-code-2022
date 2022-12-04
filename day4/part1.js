const fs = require("fs");

const contents = fs.readFileSync("input.txt", "utf-8");
let assignments = [];

const parseSections = (rangeString) => {
  const edgesAsStrings = rangeString.split("-");
  return [
    Number.parseInt(edgesAsStrings[0], 10),
    Number.parseInt(edgesAsStrings[1], 10),
  ];
};

contents.split(/\r?\n/).forEach((line) => {
  const sectionsPair = line.split(",");
  assignments = [
    ...assignments,
    [parseSections(sectionsPair[0]), parseSections(sectionsPair[1])],
  ];
});

const checkIfContains = ([startA, endA], [startB, endB]) => {
  if (startA <= startB && endA >= endB) {
    return true;
  }
  return false;
};

const checkIfAssignmentContains = ([A, B]) => {
  return checkIfContains(A, B) || checkIfContains(B, A);
};

const overlaps = assignments.filter((assignment) =>
  checkIfAssignmentContains(assignment)
);

console.log(overlaps.length);
