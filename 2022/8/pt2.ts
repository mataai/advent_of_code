import * as fs from "fs";

class Tree {
  constructor(public x: number, public y: number, public score: number) {}
}

fs.readFile("./input.txt", "utf8", (err: any, fileData: string) => {
  if (err) {
    console.error(err);
  }

  const grid = fileData
    .replaceAll("\r", "")
    .split("\n")
    .map((row) => row.split(""));
  const outerCount = grid.length * 2 + grid[0].length * 2 - 4;

  const visibleTrees: Tree[] = [];
  // idk how to do this

  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[0].length - 1; x++) {
      let currentHeight = grid[y][x];
      let leftSafe = true;
      let leftDistance = 0;
      let rightSafe = true;
      let rightDistance = 0;
      let topSafe = true;
      let topDistance = 0;
      let botSafe = true;
      let botDistance = 0;
      for (let i = y + 1; i < grid.length; i++) {
        const colision = grid[i][x] >= currentHeight;
        if (colision || i == grid.length - 1) {
          botDistance = i - y;
        }
        if (colision) {
          botSafe = false;
          break;
        }
      }
      for (let i = y - 1; i >= 0; i--) {
        const colision = grid[i][x] >= currentHeight;
        if (colision || i == 0) {
          topDistance = y - i;
        }
        if (colision) {
          topSafe = false;
          break;
        }
      }
      for (let j = x + 1; j < grid[0].length; j++) {
        const colision = grid[y][j] >= currentHeight;
        if (colision || j == grid[0].length - 1) {
          rightDistance = j - x;
        }
        if (colision) {
          rightSafe = false;
          break;
        }
      }
      for (let j = x - 1; j >= 0; j--) {
        const colision = grid[y][j] >= currentHeight;
        if (colision || j == 0) {
          leftDistance = x - j;
        }
        if (colision) {
          leftSafe = false;
          break;
        }
      }

      if (leftSafe || rightSafe || topSafe || botSafe) {
        visibleTrees.push(
          new Tree(
            x,
            y,
            leftDistance * topDistance * rightDistance * botDistance
          )
        );
      }
    }
  }
  console.log(visibleTrees.map(x=>x.score).sort((a, b) => b - a));
});
