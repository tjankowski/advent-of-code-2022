// A - rock - 65
// B - paper - 66
// C - scissors - 67

// X - lose - 88
// Y - draw - 89
// Z - win - 90

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

const moves = [0, 1, 2];

const calculateResult = (game) => {
  const gameResult = game[1] * 3 + 1;
  // Lose
  if (game[1] === 0) {
    return gameResult + moves[(game[0] + 2) % 3];
  }
  // Draw
  if (game[1] === 1) {
    return gameResult + game[0];
  }
  // Win
  if (game[1] === 2) {
    return gameResult + moves[(game[0] + 1) % 3];
  }
};

const gamesResults = normalizedGames.map((game) => calculateResult(game));

const finalResult = gamesResults.reduce((sum, result) => sum + result, 0);

console.log("Final result", finalResult);
