// A - rock - 65
// B - paper - 66
// C - scissors - 67

// X - rock - 88
// Y - papper - 89
// Z - scissors - 90

// 1 - rock
// 2 - paper
// 3 - scissors

// 0 - lost
// 3 - draw
// 6 - win

const fs = require("fs");

const contents = fs.readFileSync("input.txt", "utf-8");
let games = [];

contents.split(/\r?\n/).forEach((line) => {
  games = [...games, line.split(" ")];
});

const normalizeMove = (move, base) => move.charCodeAt(0) % base;

const normalizedGames = games.map((game) => [
  normalizeMove(game[0], 65),
  normalizeMove(game[1], 88),
]);

const calculateResult = (game) => {
  const result = game[0] - game[1];
  let moveResult = game[1] + 1;
  // Win
  if ([-1, 2].includes(result)) {
    return moveResult + 6;
  }
  // Draw
  if (result == 0) {
    return moveResult + 3;
  }
  return moveResult;
};

const gamesResults = normalizedGames.map((game) => {
  const result = calculateResult(game);
  return result;
});

const finalResult = gamesResults.reduce((sum, result) => sum + result, 0);

console.log(finalResult);
