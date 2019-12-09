function* calc(data, input1, input2) {
    let i = 0;
    let output = 0;
    while (Number(data[i]) !== 99) {
        let opcode = Number(data[i]) % 100;

        // these won't matter if opcode is 3 or 4
        let writeTo = i + 3;
        let paramModes = getParamModes(data[i], 2);
        let operands = getOperands(paramModes, data, i);


        if (opcode === 1) {
            // add all operands
            data[data[writeTo]] = operands.reduce((acc, val) => {
                return acc + val;
            }).toString();
            i += 4;
        } else if (opcode === 2) {
            // multiple all operands
            data[data[writeTo]] = operands.reduce((acc, val) => {
                return acc * val;
            }).toString();
            i += 4;
        } else if (opcode === 3) {
            // save input to specified position
            if (i === 0) {
                data[data[i+1]] = input1;
            } else {
                data[data[i+1]] = input2;
            }
            i += 2;
        } else if (opcode === 4) {
            // print output from specified position
            output = operands[0];

            i += 2;
            input2 = yield output;
        } else if (opcode === 5) {
            // jump if true
            if (operands[0] !== 0) {
                i = operands[1];
            } else {
                i += 3;
            }
        } else if (opcode === 6) {
            // jump if false
            if (operands[0] === 0) {
                i = operands[1];
            } else {
                i += 3;
            }
        } else if (opcode === 7) {
            // less than comparison
            data[data[i+3]] = operands[0] < operands[1] ? '1' : '0';
            i += 4;
        } else if (opcode === 8) {
            // equals comparison
            data[data[i+3]] = operands[0] === operands[1] ? '1' : '0';
            i += 4;
        } else {
            console.error('Unknown opcode reached', opcode,data[i], i);
            break;
        }
    }
    return output;
}

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
module.exports = calc;