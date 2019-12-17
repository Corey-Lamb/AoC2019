const readInput = require('../getInput');
const calc = require('../intCode');
const tiles = {
    '0': ' ',
    '1': '█',
    '2': '□',
    '3': '_',
    '4': 'o'
};
let p1 = async () => {
    let data = await readInput('day13/d13.txt');
    data = data.split(',');
    let screen = [];
    const arcade = calc(data);
    let numOfBlocks = 0;
    let output = arcade.next();
    while (!output.done) {
        let x = output.value;
        output = arcade.next();
        let y = output.value;
        output = arcade.next();
        if (!screen[y]) {
            screen[y] = [];
        }
        screen[y][x] = tiles[output.value];
        output = arcade.next();
    }
    // console.log(screen);
    // console.log(data);
    screen.forEach(row => {
        numOfBlocks += row.reduce((acc, char) => {return acc + (char === tiles[2] ? 1 : 0)}, 0);
    });
    // draw(screen);
    console.log(`Part 1: ${numOfBlocks}`);
};
let p2 = async () => {
    let data = await readInput('day13/d13.txt');
    data = data.split(',');
    data[0] = 2;

    let screen = [];
    const arcade = calc(data);
    let score = 0;
    let output = arcade.next();
    while (!output.done) {
        let x = output.value;
        output = arcade.next();
        if (output.value === 'input') {
            let joyStickMotion = checkJoystickMovement(screen);
            output = arcade.next(joyStickMotion);
        }
        let y = output.value;
        output = arcade.next();
        if (output.value === 'input') {
            let joyStickMotion = checkJoystickMovement(screen);
            output = arcade.next(joyStickMotion);
        }
        if (x === -1 && y === 0) {
            score = output.value;
        } else {
            if (!screen[y]) {
                screen[y] = [];
            }
            screen[y][x] = tiles[output.value];
        }
        output = arcade.next();
        if (output.value === 'input') {
            let joyStickMotion = checkJoystickMovement(screen);
            output = arcade.next(joyStickMotion);
        }
        draw(screen);
        await wait(15);
    }
    console.log(`Part 2: ${score}`);
};
let draw = (screen) => {
    let stringToPrint = screen.map(row => {
        return row.toString().replace(/,/g, '');
    });
    console.log(stringToPrint.toString().replace(/,/g, '\n'));
};
let checkJoystickMovement = (screen) => {
    let xOfBall = 0;
    let xOfPaddle = 0;
    screen.forEach(row => {
        if (row.includes(tiles[4])) {
            xOfBall = row.indexOf(tiles[4]);
        }
        if (row.includes(tiles[3])) {
            xOfPaddle = row.indexOf(tiles[3]);
        }
    });
    if (xOfBall > xOfPaddle) {
        return 1;
    } else if (xOfPaddle > xOfBall) {
        return -1;
    } else {
        return 0;
    }
};
let wait = (sleepTime) => {
    return new Promise(resolve => {setTimeout(resolve, sleepTime)});
}
p1();
p2();