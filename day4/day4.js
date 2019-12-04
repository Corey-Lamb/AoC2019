const fs = require('fs').promises;
let readInput = async(path) => {
    let res = await fs.readFile(path);
    return res.toString();
};
let p1 = async () => {
    const data = await readInput('day4/d4.txt');
    const min = data.split('-')[0];
    const max = data.split('-')[1];
    let passcodes = [];
    for (let i = min; i < max; i++) {
        if (onlyIncreases(i) && hasDoubleDigits(i)) {
            passcodes.push(i);
        }
    }
    console.log(`Part 1: ${passcodes.length}`)
};
let p2 = async () => {
    const data = await readInput('day4/d4.txt');
    const min = data.split('-')[0];
    const max = data.split('-')[1];
    let passcodes = [];
    for (let i = min; i < max; i++) {
        if (onlyIncreases(i) && hasOnlyDoubleDigits(i)) {
            passcodes.push(i);
        }
    }
    console.log(`Part 2: ${passcodes.length}`)
};
let onlyIncreases = (input) => {
    let charArr = input.toString().split('');
    let onlyIncreases = true;
    charArr.forEach((char, i) => {
        if (i !== charArr.length - 1 && char > charArr[i+1]) {
            onlyIncreases = false;
        }
    });
    return onlyIncreases;
};
let hasDoubleDigits = (input) => {
    let charArr = input.toString().split('');
    let hasDouble = false;
    charArr.forEach((char, i) => {
        if (i !== charArr.length - 1 && char === charArr[i+1]) {
            hasDouble = true;
        }
    });
    return hasDouble;
};
let hasOnlyDoubleDigits = (input) => {
    let charArr = input.toString().split('');
    let hasDouble = false;
    let matches = {};
    charArr.forEach((char, i) => {
        if (i !== charArr.length - 1 && char === charArr[i+1]) {
            matches[char] = matches[char] ? matches[char] + 1 : 1;
        }
    });
    Object.keys(matches).forEach(key => {
        if (matches[key] === 1) {
            hasDouble = true;
        }
    });
    return hasDouble;
};
p1();
p2();