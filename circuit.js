const calc = require('./intCode');
let circuit = (data, phases, numOfComputers) => {
    let output = {value: 0, done: false};
    let computers = [];
    for (let i = 0; i < numOfComputers; i++) {
        if (i === 0) {
            computers.push(calc(data, phases[i], output.value));
        } else {
            output = computers[i-1].next();
            computers.push(calc(data, phases[i], output.value));
        }
    }
    output = computers[numOfComputers-1].next();
    while (!output.done) {
        computers.forEach(computer => {
            output = computer.next(output.value);
        });
    }
    return output.value;
};
module.exports = circuit;