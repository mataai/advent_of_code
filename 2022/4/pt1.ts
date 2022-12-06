import * as fs from 'fs';


fs.readFile('./input.txt', 'utf8', (err: any, file: string) => {
    if (err) {
        console.error(err);
    }
    let collisions = 0;
    file.replaceAll('\r', '').trim().split('\n').map(pair => {
        const [min1, max1, min2, max2] = pair.split(',').map(x => x.split('-')).flat().map(x => parseInt(x));

        if (min1 <= min2 && max1 >= max2 || min2 <= min1 && max2 >= max1) {
            collisions++;
        }
    })
    console.log(collisions)
});