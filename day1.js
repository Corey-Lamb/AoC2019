const fs = require('fs').promises;

let readInput = async(path) => {
    let res = await fs.readFile(path);
    return res.toString();
};
let p1 = async () => {
    let data = await readInput('d1.txt');
    data = data.split('\n').map(num => Number(num));
    const totalUsage = data.reduce((acc, mass) => {
        return acc + (Math.floor(mass / 3) - 2);
    }, 0);
    console.log(`Part 1: ${totalUsage}`);
};
let p2 = async () => {
    let data = await readInput('d1.txt');
    data = data.split('\n').map(num => Number(num));
    const totalUsage = data.reduce((acc, mass) => {
        return acc + getGasTotal(mass);
    }, 0);

    console.log(`Part 2: ${totalUsage}`);
};

let getGasTotal = (mass) => {
    let gasToAdd = (Math.floor(mass / 3)) - 2;
    if (((Math.floor(gasToAdd / 3)) - 2) < 1) {
        return gasToAdd;
    } else {
        return gasToAdd + getGasTotal(gasToAdd);
    }
};
p1();
p2();