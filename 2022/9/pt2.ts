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
  constructor(public x: number, public y: number, public id: string = "#") {}
}
class Knot {
  public child?: Knot;
  constructor(
    public parent: Knot,
    public position: Vector = new Vector(0, 0)
  ) {}
}

fs.readFile("./input.txt", "utf8", (err: any, fileData: string) => {
  if (err) {
    console.error(err);
  }

  const headPosition: Knot = new Knot(null);
  headPosition.position.id = "H";
  const visited: Vector[] = [];
  init();

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
          headPosition.position.x++;
          break;
        case Direction.Left:
          headPosition.position.x--;
          break;
        case Direction.Up:
          headPosition.position.y++;
          break;
        case Direction.Down:
          headPosition.position.y--;
          break;
      }
      calculateKnotPosition(headPosition.child);
      // drawPosition();
    }
  }
  drawPosition();

  console.log(visited.length + 1);
  console.log(visited);

  function init() {
    let knot = headPosition;
    for (let i = 0; i < 9; i++) {
      knot.child = new Knot(knot);
      knot = knot.child;
      knot.position.id = (i + 1).toString();
    }
  }

  function moveKnotTo(knot: Knot, vector: Vector) {
    if (
      !knot.child &&
      !visited.find((v) => v.x === vector.x && v.y === vector.y)
    ) {
      visited.push(vector);
    }
    knot.position.x = vector.x;
    knot.position.y = vector.y;
  }

  function calculateKnotPosition(knot: Knot) {
    if (!knot) {
      return;
    }
    if (
      Math.hypot(
        knot.parent.position.x - knot.position.x,
        knot.parent.position.y - knot.position.y
      ) >= 2
    ) {
      let distance = new Vector(
        knot.parent.position.x - knot.position.x,
        knot.parent.position.y - knot.position.y
      );
      moveKnotTo(
        knot,
        new Vector(
          knot.position.x + Math.sign(distance.x),
          knot.position.y + Math.sign(distance.y)
        )
      );
      calculateKnotPosition(knot.child);
    }
  }

  // Draw in the console a grid with all the values in the array named visited
  function drawPosition(array: Vector[] = visited) {
    const minX = Math.min(...array.map((v) => v.x));
    const maxX = Math.max(...array.map((v) => v.x));
    const minY = Math.min(...array.map((v) => v.y));
    const maxY = Math.max(...array.map((v) => v.y));
    let output = "";
    for (let y = maxY; y >= minY; y--) {
      for (let x = minX; x <= maxX; x++) {
        if (array.find((v) => v.x === x && v.y === y)) {
          output += "X";
        } else {
          if (x === 0 && y === 0) {
            output += "S";
            continue;
          }
          output += ".";
        }
      }
      output += "\n";
    }
    output += "\n";

    console.log(output);
  }
});
