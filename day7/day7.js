const fs = require('fs').promises;
const calc = require('../intCode');
const circuit = require('../circuit');
const readInput = require('../getInput');
const permsOf5 = require('./permutationsOf5');

let p1 = async () => {
    let data = await readInput('day7/d7.txt');
    data = data.split(',');

    let maxOutput = 0;
    permsOf5.forEach(phase => {
        let output = 0;
        for (let i = 0; i < phase.length; i++) {
            output = calc(data, phase[i], output);
        }
        maxOutput = Math.max(maxOutput, output);
    });
    console.log('BROKEN NOW', maxOutput);
};
let p2 = async () => {
    let data = await readInput('day7/d7.txt');
    data = data.split(',');

    let maxOutput = 0;
    permsOf5.forEach(phase => {
        maxOutput = Math.max(circuit(data, phase, 5), maxOutput);
    });
    console.log(maxOutput);
};
// p1();
p2();