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

    let main = 'B,A,B,C,A,C,A,C,B,A\n';
    let A = 'R,8,L,6,L,4,L,10,R,8\n';
    let B = 'L,6,L,4,R,8\n';
    let C = 'L,4,R,4,L,4,R,8\n';
    let seeLiveFeed = 'n\n';

    let input = (main+A+B+C+seeLiveFeed).split('').map(char => char.charCodeAt(0));
    console.log(main, A, B, C, seeLiveFeed, '\n', input);
    const comp = calc(data);
    // start intCode
    let output = comp.next();
    let view = '';
    let i = 0;
    let initialViewLength = 0;
    let dustCollected = 0;
    while (!output.done) {

        if (output.value === 'input') {
            if (i === 0) {
                initialViewLength = view.length;
            }
            console.log(view);
            view = '';
            output = comp.next(input[i]);
            i++;
        } else {
            view += (String.fromCharCode(output.value));
            output = comp.next()
        }
        // console.log(output);
        if (seeLiveFeed === 'y\n' && initialViewLength && view.length === initialViewLength - 6) {
            console.log(view);
            view = '';
            await wait(500);
        }
        if (output.value) {
            dustCollected = output.value;
        }
    }
    // main movement function
    // console.log(initialViewLength)
    console.log('DONE', dustCollected, `time: ${Date.now() - start}ms`);

};
let wait = (sleepTime) => {
    return new Promise(resolve => {setTimeout(resolve, sleepTime)});
}
// p1();
p2();