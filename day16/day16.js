const readInput = require('../getInput');
const start = Date.now();
let stack = [];
let p1 = async () => {
    let data = await readInput('day16/d16.txt');
    data = data.split('').map(Number);
    let basePattern = [0, 1, 0, -1];
    let numberOfPhases = 0;
    let previousInput = data;
    let output;
    while (numberOfPhases < 100) {
        output = [];
        for (let i = 0; i < data.length; i++) {
            let newPattern = repeatAndShift(basePattern, i+1);
            let sum = previousInput.reduce((acc, val, j) => {return acc + (val * newPattern[j%newPattern.length])}, 0);
            output.push(Math.abs(sum % 10));
        }
        // console.log(previousInput.toString().replace(/,/g, ''));
        previousInput = output;

        numberOfPhases++;
    }
    // console.log(output.toString().replace(/,/g, ''));
    // console.log(basePattern)
    console.log(output.toString().replace(/,/g, '').substring(0, 8));
    console.log(`done ${Date.now() - start}ms`);

};
let p2 = async () => {
    let data = await readInput('day16/d16.txt');
    let offset = Number(data.substring(0,7));
    data = data.split('').map(Number);
    let numberOfPhases = 0;
    let output;
    let previousInput = [];
    for (let i = 0; i < 10000; i++) {
        previousInput = previousInput.concat(data);
    }
    previousInput = previousInput.slice(offset);
    console.log(`done appending, ${Date.now() - start}ms`);
    while (numberOfPhases < 100) {
        stack = [];
        for (let j = previousInput.length-1; j >= 0; j--) {
            stack.push((peek() + previousInput[j]) % 10);
        }
        output = stack.reverse();
        previousInput = output;
        numberOfPhases++;
        console.log(`done with phase  ${numberOfPhases}: ${Date.now() - start}ms`);
    }

    // console.log(basePattern)
    console.log(output.toString().replace(/,/g, '').substring(0, 8));
    console.log(`done finally, ${Date.now() - start}ms`);

};
let repeatAndShift = (array, times) => {
    let newArr = [];
    if (times === 1) {
        newArr = array.map(num => num);
    } else {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < times; j++) {
                newArr.push(array[i]);
            }
        }
    }
    let temp = newArr.shift();
    newArr.push(temp);
    return newArr;
};
let peek = () => {
    return stack[stack.length - 1] || 0;
}
// p1();
p2();