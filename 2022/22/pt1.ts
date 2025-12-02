import * as fs from "fs";

fs.readFile("./input.txt", "utf8", (err: any, fileData: string) => {
  if (err) {
    console.error(err);
  }
  init(fileData);
});

enum Rotations {
  Right = "R", // Clockwise
  Left = "L", // Counter-Clockwise
}

class Player {
  constructor(
    public x: number,
    public y: number,
    public rotation: 0 | 90 | 180 | 270 = 0
  ) {}
}

const WALL = "#";
const VOID = "=";
const TILE = ".";
let player: Player;

function init(data: string) {
  const parsedData = data.replaceAll("\r", "").split("\n\n");

  const map = parsedData[0].split("\n");
  const instructions = parsedData[1].split("");

  let mapWidth = Math.max(...map.map((el) => el.length));
  for (let i = 0; i < map.length; i++) {
    map[i] = map[i].padEnd(mapWidth, "=").replaceAll(" ", "=");
  }

  console.log(map, instructions);

  for (const instruction of instructions) {
    switch (instruction) {
      case Rotations.Right:
        break;
      case Rotations.Left:
        break;
    }
  }
}
