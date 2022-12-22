import * as fs from 'fs';


fs.readFile('./input.txt', 'utf8', (err: any, fileData: string) => {
    if (err) {
        console.error(err);
    }

    // console.log(fileData)
    for (let i = 0; i <= fileData.length -14; i++) {
        let stack = [];
        for (let y = i; y < i+14; y++) {
            if (!stack.includes(fileData[y])) {
                stack.push(fileData[y]);
            } 
        }
        // console.log(stack.length)
        if (stack.length === 14) {
            console.log(stack.join(''))
            console.log(i+14) 
            break;
        }
        
    }

});