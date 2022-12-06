import * as fs from 'fs';
console.clear();
fs.readFile('./input.txt', 'utf8', (err: any, data: string) => {
    if (err) {
        console.error(err);
        return;
    }

    let array: string[] = [];
    let rawactions: string[] = [];
    data.split('\n').forEach(x => {
        x = x.replaceAll('\r', '');
        if (x.indexOf('[') >= 0) {
            array.push(x);
        }
        if (x.indexOf('move') >= 0) {
            rawactions.push(x)
        }
    });

    let parssedData: string[][] = [];

    for (let y = array.length - 1; y >= 0; y--) {
        const element = array[y];
        for (let i = 1; i < element.length; i += 4) {
            const data = element[i];
            if (data.trim()) {
                if (!parssedData[i])
                    parssedData[i] = [];
                parssedData[i].push(data);
            }
        }
    }
    parssedData = parssedData.filter(x => x);

    let actions: { count: number, source: number, target: number }[] = [];

    rawactions.forEach(x => {
        const parts = x.split(' ');
        const count = parseInt(parts[1]);
        const source = parseInt(parts[3]) - 1;
        const target = parseInt(parts[5]) - 1;
        actions.push({ count, source, target });
    });
    for (let i = 0; i < actions.length; i++) {
        const action = actions[i];
        const source = parssedData[action.source];
        const target = parssedData[action.target];
        const count = action.count;
        const toMove = source.splice(source.length - count, count+1);
        // for (let i = toMove.length - 1; i >= 0; i--) {
        //     target.push(toMove[i]);
        // }
        target.push(...toMove);
    }

    let output = ''
    console.log(parssedData)
    parssedData.forEach(element => {
        output += element[element.length - 1]
    })
    console.log(output)
})