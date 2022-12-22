import * as fs from "fs";

class Tree {
  constructor(public x: number, public y: number) {}
}

fs.readFile("./input.txt", "utf8", (err: any, fileData: string) => {
  if (err) {
    console.error(err);
  }

  const grid = fileData
    .replaceAll("\r", "")
    .split("\n")
    .map((row) => row.split(""));
  console.log(grid);
  const outerCount = grid.length * 2 + grid[0].length * 2 - 4;
  console.log(outerCount);

  const visibleTrees: Tree[] = [];
  // idk how to do this

  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[0].length - 1; x++) {
      let currentHeight = grid[y][x];
      let leftSafe = true;
      let rightSafe = true;
      let topSafe = true;
      let botSafe = true;
      for (let i = y + 1; i < grid.length; i++) {
        if (grid[i][x] >= currentHeight) {
          botSafe = false;
          break;
        }
      }
      for (let i = y - 1; i >= 0; i--) {
        if (grid[i][x] >= currentHeight) {
          topSafe = false;
          break;
        }
      }
      for (let j = x + 1; j < grid[0].length; j++) {
        if (grid[y][j] >= currentHeight) {
          rightSafe = false;
          break;
        }
      }
      for (let j = x - 1; j >= 0; j--) {
        if (grid[y][j] >= currentHeight) {
          leftSafe = false;
          break;
        }
      }

      if (leftSafe || rightSafe || topSafe || botSafe) {
        visibleTrees.push(new Tree(x, y));
      }
    }
  }
  console.log(visibleTrees);
  console.log(visibleTrees.length);
  console.log(visibleTrees.length + outerCount);
});
