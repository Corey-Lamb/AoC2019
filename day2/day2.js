const fs = require('fs').promises;

let readInput = async(path) => {
    let res = await fs.readFile(path);
    return res.toString();
};
let p1 = async () => {
    let data = await readInput('d2.txt');
    data = data.split(',').map(datum => Number(datum));
    let i = 0;
    data[1] = 12;
    data[2] = 2;
    while (data[i] !== 99) {
        if (data[i] === 1) {
            data[data[i+3]] = data[data[i+1]] + data[data[i+2]];
        } else if (data[i] === 2) {
            data[data[i+3]] = data[data[i+1]] * data[data[i+2]];
        } else {
            console.error('Unknown opcode reached');
            break;
        }
        i += 4;
    }
    console.log(`Part 1: ${data[0]}`)
};
let p2 = async () => {
    let original = await readInput('d2.txt');
    let temp = original.split(',').map(datum => Number(datum));
    let noun = 0;
    let verb = 0;
    while (temp[0] !== 19690720) {
        if (noun === 99 && verb === 99) {
            console.error('Tried all verb and noun combos');
            break;
        } else if (verb === 99) {
            verb = 0;
            noun++;
        } else {
            verb++;
        }
        temp = original.split(',').map(datum => Number(datum));;
        temp[1] = noun;
        temp[2] = verb;
        let i = 0;
        while (temp[i] !== 99) {
            if (temp[i] === 1) {
                temp[temp[i+3]] = temp[temp[i+1]] + temp[temp[i+2]];
            } else if (temp[i] === 2) {
                temp[temp[i+3]] = temp[temp[i+1]] * temp[temp[i+2]];
            } else {
                console.error('Unknown opcode reached', i, temp[i]);
                break;
            }
            i += 4;
        }
    }
    console.log(`Part 2: ${100 * noun + verb}`)
};
p1();
p2();