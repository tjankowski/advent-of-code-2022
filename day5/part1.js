const fs = require("fs");

const contents = fs.readFileSync("input.txt", "utf-8");
let stacksStrings = [];
let moves = [];
let readMode = "stacks";
let numberOfStacks = 0;

contents.split(/\r?\n/).forEach((line) => {
  if (line.length < 1) {
    readMode = "moves";
    return;
  }
  if (readMode === "stacks") {
    const crates = line.match(/.{1,4}/g);
    numberOfStacks = crates.length;
    stacksStrings = [...stacksStrings, crates];
  }
  if (readMode === "moves") {
    const move = line.split(" ");
    moves = [...moves, [move[1], move[3], move[5]]];
  }
});

const parse = (crateString) => {
  const trimmed = crateString.trim();
  return trimmed.length === 3 ? trimmed[1] : null;
};

const stacks = Array.from(Array(numberOfStacks), () => []);

for (let stackIndex = 0; stackIndex < numberOfStacks; stackIndex++) {
  for (
    let stackDepth = stacksStrings.length - 2;
    stackDepth >= 0;
    stackDepth--
  ) {
    const crate = parse(stacksStrings[stackDepth][stackIndex]);
    if (crate) {
      stacks[stackIndex].push(crate);
    }
  }
}

moves.forEach((move) => {
  const taken = stacks[move[1] - 1].splice(move[0] * -1);
  stacks[move[2] - 1] = [...stacks[move[2] - 1], ...taken.reverse()];
});

console.log(stacks);

const topOnes = stacks.map((stack) =>
  stack.length > 0 ? stack[stack.length - 1] : null
);

console.log(topOnes.join(""));
