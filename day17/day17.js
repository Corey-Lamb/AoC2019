const readInput = require('../getInput');
const start = Date.now();
const calc = require('../intCode');

let p1 = async () => {
    let data = await readInput('day17/d17.txt');
    data = data.split(',');
    let view = '';
    const comp = calc(data);
    let output = comp.next();
    while (!output.done) {
        view += (String.fromCharCode(output.value));
        output = comp.next();
    }
    console.log(view);
    view = view.split('\n');
    view = view.map(row => row.split(''));
    view.pop();
    view.pop();


    let sum = 0;
    view.forEach((row, y) => {
        row.forEach((char, x) => {
            if (y > 0 && x > 0 && y < view.length - 1 && x < row.length - 1) {
                if (char === '#' && view[y-1][x] === '#' && view[y+1][x] === '#' && view[y][x-1] === '#' && view[y][x+1] === '#') {
                    sum += x*y;
                }
            }
        });
    });
    console.log(sum);
};
let p2 = async () => {
    let data = await readInput('day17/d17.txt');
    data = data.split(',');
    data[0] = '2';
    /**
     *
     * Worked this out manually after printing out the map.
     * I hope we don't have to do this for a more complicated map later on. :/
     *
     * main = B,A,B,C,A,C,A,C,B,A
     *
     * A= R,8,L,6,L,4,L,10,R,8
     * B= L,6,L,4,R,8,
     * C= L,4,R,4,L,4,R,8
     */

    let main = 'B,A,B,C,A,C,A,C,B,A\n';//.split('').map(char => char.charCodeAt(0)).reduce((string, char) => {return string+char},'');
    let A = 'R,8,L,6,L,4,L,10,R,8\n';//.split('').map(char => char.charCodeAt(0)).reduce((string, char) => {return string+char},'');
    let B = 'L,6,L,4,R,8\n';//.split('').map(char => char.charCodeAt(0)).reduce((string, char) => {return string+char},'');
    let C = 'L,4,R,4,L,4,R,8\n';//.split('').map(char => char.charCodeAt(0)).reduce((string, char) => {return string+char},'');
    let seeLiveFeed = 'n\n';//.split('').map(char => char.charCodeAt(0)).reduce((string, char) => {return string+char},'');

    let input = (main+A+B+C+seeLiveFeed).split('').map(char => char.charCodeAt(0));
    console.log(main, A, B, C, seeLiveFeed, '\n', input);
    let numOfInput = 0;
    const comp = calc(data);
    let view = '';
    // get to input
    let output = comp.next();
    let i = 0;
    while (!output.done) {

        if (output.value === 'input') {
            console.log(view);
            view = '';
            output = comp.next(input[i]);
            i++;
        } else {
            view += (String.fromCharCode(output.value));
            output = comp.next()
        }
        console.log(output);
    }
    console.log(view);
    // main movement function
    console.log('DONE', output, numOfInput);

};
// p1();
p2();