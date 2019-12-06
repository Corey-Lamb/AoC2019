const calc = require('../intCode');
const fs = require('fs').promises;
let readInput = async(path) => {
    let res = await fs.readFile(path);
    return res.toString();
};
let p1 = async () => {
    let data = await readInput('day5/d5.txt');
    data = data.split(',');
    let i = 0;
    let input = '1';
    while (Number(data[i]) !== 99) {
        let opcode = Number(data[i]) % 100;
        let writeTo;
        let operands;
        let paramModes;
        if (opcode < 3) {
            paramModes = data[i].substring(0, data[i].length - 2).split('').reverse();
            if (paramModes.length === 0) {
                paramModes = ['0', '0'];
            } else if (paramModes.length === 1) {
                paramModes = ['1', '0'];
            }
            writeTo = data[i + 3];
            operands = paramModes.map((mode, j) => {
                if (Number(mode) === 0) {
                    return data[data[j+i+1]];
                } else if (Number(mode) === 1) {
                    return data[j+i+1];
                } else {
                    console.error('BAD MODE', mode);
                }
            }).map(Number);
        } else {
        }
        if (opcode === 1) {
            data[writeTo] = operands.reduce((acc, val) => {
                return acc + val;
            }).toString();
            i += 4;
        } else if (opcode === 2) {
            data[writeTo] = operands.reduce((acc, val) => {
                return acc * val;
            }).toString();
            i += 4;
        } else if (opcode === 3) {
            data[data[i+1]] = input;
            i += 2;
        } else if (opcode === 4) {
            console.log(data[data[i+1]]);
            i += 2;
        } else {
            console.error('Unknown opcode reached', opcode, i);
            break;
        }
    }
};
let p2 = async () => {
    let data = await readInput('day5/d5.txt');
    data = data.split(',');
    let input = '5';
    calc(data, input);
};


p1();
p2();