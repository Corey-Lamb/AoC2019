const readInput = require('../getInput');
const start = Date.now();
const calc = require('../intCode');
let data;
let space = [];
let p1 = async () => {
    data = await readInput('day19/d19.txt')
    data = data.split(',')
    let numOfSpots = 0;

    for (let i = 0; i < 50; i++) {
        for (let j = 0; j < 50; j++){
           if (!space[i]) {
               space[i] = [];
           }
           if (checkCoordinate(i, j)) {
               space[i][j] = '#';
               numOfSpots++
           } else {
               space[i][j] = '.';
           }
        }
    }
    space.forEach(row => {
        console.log(row.toString().replace(/,/g, ''));
    });
    console.log(numOfSpots);
};
let p2 = async () => {
    data = await readInput('day19/d19.txt');
    data = data.split(',');

    let x = 0;
    let y = 0;
    let found = false;

    while (!found) {
        let point1 = checkCoordinate(x+99, y);
        let point2 = checkCoordinate(x, y+99);
        if (point1 && point2) {
            found = true;
        }
        if (!point1) {
            y++;
        }
        if (!point2) {
            x++
        }
    }
    console.log((x*10000) + y);
    // console.log(numOfSpots);
};
let checkCoordinate = (x, y) => {
    if (x < 0 || y < 0) {
        return false;
    }
    let memory = data.slice(0);
    let comp = calc(memory);
    comp.next();
    comp.next(x);
    let output = comp.next(y);
    return output.value === 1;
};
p1();
p2();