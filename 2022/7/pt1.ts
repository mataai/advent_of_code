import * as fs from "fs";

class Folder {
  public children: (Folder | File)[] = [];
  public type: "folder" = "folder";
  constructor(public name: string, public parent: Folder) {
    this.children = [];
  }

  public getSize(): number {
    return this.children.reduce((acc, child) => acc + child.getSize(), 0);
  }
}
class File {
  public type: "file" = "file";
  constructor(
    public name: string,
    public parent: Folder,
    public size: number
  ) {}

  public getSize(): number {
    return this.size;
  }
}

fs.readFile("./input.txt", "utf8", (err: any, fileData: string) => {
  if (err) {
    console.error(err);
  }

  const folders:Folder[] = [];
  const operations = fileData.replaceAll("\r", "").split("\n");
  console.log(operations);

  const rootFolder = new Folder("/", null);
  let currentFolder = rootFolder;
  let isLs = false;
  for (const operation of operations) {
    if (operation.startsWith("$")) {
      isLs = false;
      if (operation === "$ ls") {
        isLs = true;
      } else if (operation === "$ cd ..") {
        if(!currentFolder.parent)
            throw new Error("No parent folder");
        currentFolder = currentFolder.parent;
      } else if (operation === "$ cd /") {
        currentFolder = rootFolder;
      } else if (operation.startsWith("$ cd")) {
        const folderName = operation.split(" ")[2];
        const folder: Folder = currentFolder.children.find(
          (child) => child.name === folderName && child instanceof Folder
        ) as Folder;
        if (folder) {
          currentFolder = folder;
        }
      }
    } else {
      if (isLs) {
        if (operation.startsWith("dir")) {
          const newFolder = new Folder(operation.split(" ")[1], currentFolder);
          currentFolder.children.push(newFolder);
          folders.push(newFolder);
        } else {
          const newFile = new File(
            operation.split(" ")[1],
            currentFolder,
            parseInt(operation.split(" ")[0])
          );
          currentFolder.children.push(newFile);
        }
        console.log(operation);
      }
    }
  }
  let applicableFolders = folders.filter(folder => folder.getSize() < 100000);
  console.log(applicableFolders.reduce((a,b)=>a+b.getSize(),0))
});
