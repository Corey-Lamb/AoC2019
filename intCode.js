let relativePointer = 0;
function* calc(data, phase, input) {
    let i = 0;
    let output = 0;
    while (true) {
        let opcode = Number(data[i]) % 100;
        // these won't matter if opcode is 3 or 4
        let paramModes = getParamModes(data[i], 2);
        let operands = getOperands(paramModes, data, i);
        let writeTo = Number(data[i + 3]);
        if (paramModes[2] === 2) {
            writeTo = Number(data[i+3])+relativePointer;
        }
        if (opcode === 1) {
            // add all operands
            data[writeTo] = (Number(operands[0]) + Number(operands[1])).toString();
            i += 4;
        } else if (opcode === 2) {
            data[writeTo] = (Number(operands[0]) * Number(operands[1])).toString();
            i += 4;
        } else if (opcode === 3) {
            // save input to specified position
            if (i === 0) {
                data[operands[0]] = phase;
            } else {
                if (paramModes[0] === 2) {
                    data[Number(data[i+1])+relativePointer] = input;
                } else {
                    data[data[i+1]] = input;
                }
            }
            i += 2;
        } else if (opcode === 4) {
            // print output from specified position
            output = operands[0];
            i += 2;
            let temp = yield output;
            if (temp || temp === 0) {
                input = temp;
            }
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
            data[writeTo] = operands[0] < operands[1] ? '1' : '0';
            i += 4;
        } else if (opcode === 8) {
            // equals comparison
            data[writeTo] = operands[0] === operands[1] ? '1' : '0';
            i += 4;
        } else if (opcode === 9) {
            // relative pointer modification
            relativePointer += operands[0];
            i += 2;
        } else if (opcode === 99) {
            // halt
            return;

        } else {
            console.error('Unknown opcode reached', opcode,data[i], i);
            return;
        }
    }
}

let getParamModes = (code, numOfParams) => {
    return code
        .toString()
        .substring(0, code.length-2)
        .padStart(numOfParams, '0')
        .split('')
        .map(Number)
        .reverse();
};
let getOperands = (paramModes, arr, index) => {
    return paramModes.map((mode, i) => {
        if (mode === 0) {
            return arr[arr[i+index+1]];
        } else if (mode === 1) {
            return arr[i+index+1];
        } else if (mode === 2) {
            return arr[Number(arr[i+index+1])+relativePointer];
        } else {
            console.error('BAD MODE', mode);
        }
    }).map(Number);
};
module.exports = calc;