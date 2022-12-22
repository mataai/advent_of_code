import * as fs from "fs";
enum Direction {
  Right = "R",
  Left = "L",
  Up = "U",
  Down = "D",
}
class Move {
  constructor(public direction: Direction, public distance: number) {}
}
class Vector {
  constructor(public x: number, public y: number) {}
}

fs.readFile("./input.txt", "utf8", (err: any, fileData: string) => {
  if (err) {
    console.error(err);
  }

  const headPosition: Vector = new Vector(0, 0);
  const tailPosition: Vector = new Vector(0, 0);
  const visited: Vector[] = [];

  const moves: Move[] = fileData
    .replace("\r", "")
    .split("\n")
    .map((line) => {
      const move = line.split(" ");
      return new Move(move[0] as Direction, parseInt(move[1]));
    });
  console.clear();

  for (const move of moves) {
    for (let i = 0; i < move.distance; i++) {
      switch (move.direction) {
        case Direction.Right:
          headPosition.x++;
          break;
        case Direction.Left:
          headPosition.x--;
          break;
        case Direction.Up:
          headPosition.y++;
          break;
        case Direction.Down:
          headPosition.y--;
          break;
      }
      calculateTailPosition();
      console.log(move);
      console.log(tailPosition);
      //   drawPosition();
    }
  }

  console.log(visited.length);

  function moveTailTo(vector: Vector) {
    if (!visited.find((v) => v.x === vector.x && v.y === vector.y)) {
      visited.push(vector);
    }
    tailPosition.x = vector.x;
    tailPosition.y = vector.y;
  }

  function calculateTailPosition() {
    if (
      Math.hypot(
        headPosition.x - tailPosition.x,
        headPosition.y - tailPosition.y
      ) >= 2
    ) {
      let distance = new Vector(
        headPosition.x - tailPosition.x,
        headPosition.y - tailPosition.y
      );
      moveTailTo(
        new Vector(
          tailPosition.x + Math.sign(distance.x),
          tailPosition.y + Math.sign(distance.y)
        )
      );
    }
  }

  function drawPosition() {
    let grid: string[][] = [];
    for (let i = 0; i < 10; i++) {
      grid[i] = [];
      for (let j = 0; j < 10; j++) {
        grid[i][j] = ".";
      }
    }
    for (const visitedPosition of visited) {
      grid[visitedPosition.y + 5][visitedPosition.x + 5] = "X";
    }
    console.log(grid.map((row) => row.join("")).join("\n"));
  }
});
