const readInput = require('../getInput');
const calc = require('../intCode');
let start = Date.now();
let p1 = async () => {
    let data = await readInput('day9/d9.txt');
    data = data.split(',');
    // for (let i = 0; i < 1000000; i++) {
    //     data.push('0');
    // }
    const comp = calc(data, null, 1);
    comp.next();
    let output = comp.next(1);
    while (!output.done) {
        console.log(output.value);
        output = comp.next();
    }
    console.log(`Time taken: ${Date.now() - start} ms`)
}
let p2 = async () => {
    let data = await readInput('day9/d9.txt');
    data = data.split(',');
    const comp = calc(data, null, 2);
    comp.next();

    let output = comp.next(2);

    console.log(output);
    while (!output.done) {
        console.log(output.value);
        output = comp.next();
    }
    console.log(`Time taken: ${Date.now() - start} ms`)
}
p1();
// p2();