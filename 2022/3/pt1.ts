import * as fs from 'fs';


fs.readFile('./input.txt', 'utf8', (err: any, y: string) => {
    if (err) {
        console.error(err);
    }

    const data: { left: string, right: string }[] = y.split('\n').map(x => {
        // split x to have the same number of characters on the left and right
        x = x.replaceAll('\r', '');
        if (x.length % 2 !== 0) {
            throw new Error('Invalid input');
        }
        return { left: x.substring(0, x.length / 2), right: x.substring(x.length / 2) }
    })

    const scores = [];
    for (const x of data) {
        for (let i = 0; i < x.left.length; i++) {
            if (x.right.indexOf(x.left[i]) >= 0) {
                const charCode = x.left.charCodeAt(i);
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