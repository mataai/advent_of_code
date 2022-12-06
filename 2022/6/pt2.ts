import * as fs from 'fs';


fs.readFile('./input.txt', 'utf8', (err: any, fileData: string) => {
    if (err) {
        console.error(err);
    }

    let stack = [];
    for (let i = 0; i < fileData.length; i++) {
        let isMatch = false;
        for (let y = 1; y <= 14; y++) {
            if (fileData[i] === fileData[i + y]) {
                isMatch = true;
                break;
            }
        }
        if (!isMatch) {
            stack.push(fileData[i]);
        } else {
            stack = []
        }
        if (stack.length === 14) {
            console.log(stack)
            console.log(i - 1)
            break;
        }
    }

});