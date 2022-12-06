import * as fs from 'fs';


fs.readFile('./input.txt', 'utf8', (err: any, y: string) => {
    if (err) {
        console.error(err);
    }

    const data: string[] = y.split('\n').map(x => {
        // split x to have the same number of characters on the left and right
        return x.replaceAll('\r', '');
    })

    const scores = [];
    for (let y = 0; y < data.length; y += 3) {
        for (let i = 0; i < data[y].length; i++) {
            if (data[y + 1].indexOf(data[y][i]) >= 0 && data[y + 2].indexOf(data[y][i]) >= 0) {
                console.log(data[y], data[y + 1], data[y + 2],'\n', data[y][i])
                const charCode = data[y].charCodeAt(i);
                if (charCode <= 90) {
                    scores.push(charCode - 64 + 26);
                }
                else {
                    scores.push(charCode - 96);
                }
                break;
            }
        }
    }

    console.log(scores)
    console.log(scores.reduce((a, b) => a + b, 0))
});