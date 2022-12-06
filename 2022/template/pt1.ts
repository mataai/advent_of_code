import * as fs from 'fs';


fs.readFile('./input.txt', 'utf8', (err: any, fileData: string) => {
    if (err) {
        console.error(err);
    }

});