const readInput = require('../getInput');
const calc = require('../intCode');
let p1 = async () => {
    let data = await readInput('day11/d11.txt');
    data = data.split(',');
    for (let i = 0; i < 1000000; i++) {
        data.push('0');
    }
    const comp = calc(data, 0);
    let canvas = [];
    for (let i = 0; i < 10; i++) {
        let arrToPush = [];
        for (let j = 0; j < 20; j++) {
            arrToPush.push('0');
        }
        canvas.push(arrToPush);
    }
    let currentPosition = {x:0, y:0, direction:'U'};
    let pointsTouched = {};
    let output = comp.next(canvas[currentPosition.y][currentPosition.x]);
    while (!output.done) {
        if (!pointsTouched[`${currentPosition.y},${currentPosition.x}`]) {
            pointsTouched[`${currentPosition.y},${currentPosition.x}`] = true;
        }
        // get color to paint
        output = comp.next();
        //paint
        // console.log('paint', output.value);
        canvas[currentPosition.y][currentPosition.x] = output.value;

        // get move instruction
        output = comp.next();
        // console.log('move instruction', output.value);

        // move
        currentPosition = turn(currentPosition, output.value);
        // console.log('current position', currentPosition);

        //feed in current positions color
        output = comp.next(canvas[currentPosition.y][currentPosition.x]);

    }
    canvas.forEach(can => {
        console.log(can.toString().replace(/0/g, ' ').replace(/,/g, '').replace(/1/g, '█'))
    });
    console.log(Object.keys(pointsTouched).length);
};
let turn = (currentPosition, moveInstruction) => {
    // console.log(currentPosition, moveInstruction);
    if (currentPosition.direction === 'U') {
        if (moveInstruction === 1) {
            return {direction: 'R', x: currentPosition.x+1, y:currentPosition.y};
        } else if (moveInstruction === 0) {
            return {direction: 'L', x: currentPosition.x-1, y:currentPosition.y};
        }
    }  else if (currentPosition.direction === 'L') {
        if (moveInstruction === 1) {
            return {direction: 'U', x: currentPosition.x, y:currentPosition.y-1};
        } else if (moveInstruction === 0) {
            return {direction: 'D', x: currentPosition.x, y:currentPosition.y+1};
        }
    }  else if (currentPosition.direction === 'R') {
        if (moveInstruction === 1) {
            return {direction: 'D', x: currentPosition.x, y:currentPosition.y+1};
        } else if (moveInstruction === 0) {
            return {direction: 'U', x: currentPosition.x, y:currentPosition.y-1};
        }
    }  else if (currentPosition.direction === 'D') {
        if (moveInstruction === 1) {
            return {direction: 'L', x: currentPosition.x-1, y:currentPosition.y};
        } else if (moveInstruction === 0) {
            return {direction: 'R', x: currentPosition.x+1, y:currentPosition.y};
        }
    }
};
p1();