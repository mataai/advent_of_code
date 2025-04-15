import * as fs from "fs";

var data: string;

fs.readFile("C:\\Users\\matei\\projects\\advent_of_code\\2022\\10\\input.txt", "utf8", (err: any, fileData: string) => {
  if (err) {
    console.error(err);
  } else {
    data = fileData;
  }
});
