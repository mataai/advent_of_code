import * as fs from 'fs';


fs.readFile('./input.txt', 'utf8', (err: any, fileData: string) => {
    if (err) {
        console.error(err);
    }

    let stack = [];
    for (let i = 4; i < fileData.length; i++) {
        if (fileData[i] !== fileData[i - 1] && fileData[i] !== fileData[i - 2] && fileData[i] !== fileData[i - 3]) {
            stack.push(fileData[i]);
        } else {
            stack = []
        }
        if (stack.length === 4) {
            console.log(stack)
            console.log(i - 1)
            break;
        }
    }

});