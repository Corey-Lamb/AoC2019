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
    let i = 0;
    let input = '5';
    // console.log(data);
    while (Number(data[i]) !== 99) {
        let opcode = Number(data[i]) % 100;
        let writeTo;
        let operands;
        let paramModes;
        if (opcode === 1) {
            paramModes = getParamModes(data[i], 2);
            operands = getOperands(paramModes, data, i);
            writeTo = i + 3;

            data[data[writeTo]] = operands.reduce((acc, val) => {
                return acc + val;
            }).toString();
            i += 4;
        } else if (opcode === 2) {
            paramModes = getParamModes(data[i], 2);
            operands = getOperands(paramModes, data, i);
            writeTo = i + 3;

            data[data[writeTo]] = operands.reduce((acc, val) => {
                return acc * val;
            }).toString();
            i += 4;
        } else if (opcode === 3) {
            data[data[i+1]] = input;
            i += 2;
        } else if (opcode === 4) {
            console.log(data[data[i+1]]);
            i += 2;
        } else if (opcode === 5) {
            paramModes = getParamModes(data[i], 2);
            operands = getOperands(paramModes, data, i);

            if (operands[0] !== 0) {
                i = operands[1];
            } else {
                i += 3;
            }
        } else if (opcode === 6) {
            paramModes = getParamModes(data[i], 2);
            operands = getOperands(paramModes, data, i);

            if (operands[0] === 0) {
                i = operands[1];
            } else {
                i += 3;
            }
        } else if (opcode === 7) {
            paramModes = getParamModes(data[i], 2);
            operands = getOperands(paramModes, data, i);

            data[data[i+3]] = operands[0] < operands[1] ? '1' : '0';
            i += 4;
        } else if (opcode === 8) {
            paramModes = getParamModes(data[i], 2);
            operands = getOperands(paramModes, data, i);
            data[data[i+3]] = operands[0] === operands[1] ? '1' : '0';
            i += 4;
        } else {
            console.error('Unknown opcode reached', opcode,data[i], i);
            break;
        }
    }
};
let getParamModes = (code, numOfParams) => {
    return code
        .substring(0, code.length-2)
        .padStart(numOfParams, '0')
        .split('')
        .map(Number)
        .reverse();
};
let getOperands = (paramModes, arr, index) => {
    return paramModes.map((mode, j) => {
        if (mode === 0) {
            return arr[arr[j+index+1]];
        } else if (mode === 1) {
            return arr[j+index+1];
        } else {
            console.error('BAD MODE', mode);
        }
    }).map(Number);
};

// p1();
p2();