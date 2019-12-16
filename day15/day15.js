const readInput = require('../getInput');
const start = Date.now();
const calc = require('../intCode');
let shipMap = [];
let forwards = true;
let found = false;
for (let i = 0; i < 41; i++) {
    shipMap[i] = [];
    for (let j = 0; j < 41; j++) {
        shipMap[i][j] = ' ';
    }
}

let currentLocation = {x:21, y:21};
let directionsTravelled = [];
let p1 = async () => {
    let data = await readInput('day15/d15.txt');
    data = data.split(',');
    let comp = calc(data);
    let output = comp.next();
    let movement;
    shipMap[currentLocation.y][currentLocation.x] = '.';
    let i = 0;
    while (true) {
        if (!shipMap[currentLocation.y-1]) {
            shipMap[currentLocation.y-1] = [];
        }
        if (!shipMap[currentLocation.y+1]) {
            shipMap[currentLocation.y+1] = [];
        }
        movement = getMovement();
        output = comp.next(movement);
        updateMapAndMove(movement, output.value);
        output = comp.next();
        console.log('**************************');
        await wait(50);
        let mapToPrint = shipMap.map((row, i) => {
            let stringToPrint = row.toString().replace(/,/g, '');
            if (i === currentLocation.y) {
                stringToPrint = stringToPrint.substring(0, currentLocation.x) + '8' + stringToPrint.substring(currentLocation.x+1)
            }
            return stringToPrint + '\n';
        });
        mapToPrint = mapToPrint.toString().replace(/,/g, '');
        console.log(mapToPrint);
        i++;
    }
};
let p2 = async () => {
    let data = await readInput('day15/d15.txt');
    data = data.split(',');
    let comp = calc(data);
    let output = comp.next();
    let movement;
    shipMap[currentLocation.y][currentLocation.x] = '.';
    let i = 0;
    while (true) {
        if (!shipMap[currentLocation.y-1]) {
            shipMap[currentLocation.y-1] = [];
        }
        if (!shipMap[currentLocation.y+1]) {
            shipMap[currentLocation.y+1] = [];
        }
        movement = getMovement();
        if (movement === 0) {
            break;
        }
        output = comp.next(movement);
        updateMapAndMove(movement, output.value);
        output = comp.next();
    }

    let o2Location = {};
    shipMap.forEach((row, i) => {
       if (row.includes('o')) {
           o2Location = {x:row.indexOf('o'), y: i};
       }
    });

    // console.log(o2Location);

    console.log(fillWithOxygen(o2Location.x, o2Location.y) - 1);
    // let mapToPrint = shipMap.map((row, i) => {
    //     let stringToPrint = row.toString().replace(/,/g, '');
    //     if (i === currentLocation.y) {
    //         stringToPrint = stringToPrint.substring(0, currentLocation.x) + '8' + stringToPrint.substring(currentLocation.x+1)
    //     }
    //     return stringToPrint + '\n';
    // });
    // mapToPrint = mapToPrint.toString().replace(/,/g, '');
    // console.log(mapToPrint);
};

let getMovement = () => {
    let north = shipMap[currentLocation.y - 1][currentLocation.x];
    let east = shipMap[currentLocation.y][currentLocation.x + 1];
    let west = shipMap[currentLocation.y][currentLocation.x - 1];
    let south = shipMap[currentLocation.y + 1][currentLocation.x];

    // go to any adjacent unknown location first
    forwards = true;
    if (!north || north === ' ') {
        return 1;
    } else if (!east || east === ' ') {
        return 4;
    } else if (!south || south === ' ') {
        return 2;
    } else if (!west || west === ' ') {
        return 3;
    }

    // if no unknown locations adjacent, go back to previous location
    let previousDirection = directionsTravelled.pop();
    forwards = false;
    if (previousDirection === 1) {
        return 2;
    } else if (previousDirection === 2) {
        return 1;
    } else if (previousDirection === 3) {
        return 4;
    } else if (previousDirection === 4) {
        return 3;
    }

    // console.log('finished mapping', north, south, east, west, previousDirection);
    return 0;
};
let updateMapAndMove = async (movement, response) => {
    if (response === 2) {
        found = directionsTravelled.length + 1;
    }
    // console.log('movement', movement, response);
    if (found) {
        // console.log('FOUND', found);
    }
    if (movement === 1) {
        if (response === 0) {
            shipMap[currentLocation.y - 1][currentLocation.x] = '#';
        } else {
            shipMap[currentLocation.y - 1][currentLocation.x] = response === 1 ? '.' : 'o';
            currentLocation.y--;
            if (forwards) {
                directionsTravelled.push(movement);
            }
        }
    } else if (movement === 3) {
        if (response === 0) {
            shipMap[currentLocation.y][currentLocation.x - 1] = '#';
        } else {
            shipMap[currentLocation.y][currentLocation.x - 1] = response === 1 ? '.' : 'o';
            currentLocation.x--;
            if (forwards) {
                directionsTravelled.push(movement);
            }
        }
    } else if (movement === 4) {
        if (response === 0) {
            shipMap[currentLocation.y][currentLocation.x + 1] = '#';
        } else {
            shipMap[currentLocation.y][currentLocation.x + 1] = response === 1 ? '.' : 'o';
            currentLocation.x++;
            if (forwards) {
                directionsTravelled.push(movement);
            }
        }
    } else if (movement === 2) {
        if (response === 0) {
            shipMap[currentLocation.y + 1][currentLocation.x] = '#';
        } else {
            shipMap[currentLocation.y + 1][currentLocation.x] = response === 1 ? '.' : 'o';
            currentLocation.y++;
            if (forwards) {
                directionsTravelled.push(movement);
            }
        }
    }
};
let wait = (sleepTime) => {
    return new Promise(resolve => {setTimeout(resolve, sleepTime)});
}
let fillWithOxygen = async (x, y) => {
    shipMap[y][x] = 'O';
    let north = shipMap[y - 1][x];
    let east = shipMap[y][x + 1];
    let west = shipMap[y][x - 1];
    let south = shipMap[y + 1][x];
    let directionsToFill = [];

    if (north === '.') {
        directionsToFill.push({name: 'north', x, y:y-1});
    }
    if (south === '.') {
        directionsToFill.push({name: 'south', x, y:y+1});
    }
    if (east === '.') {
        directionsToFill.push({name: 'east', x: x+1, y});
    }
    if (west === '.') {
        directionsToFill.push({name: 'west', x: x-1, y});
    }
    console.log('******')
    console.log('filling', x, y);
    let mapToPrint = shipMap.map(row => {
        let stringToPrint = row.toString().replace(/,/g, '');
        return stringToPrint + '\n';
    });
    mapToPrint = mapToPrint.toString().replace(/,/g, '');
    console.log(mapToPrint);
    console.log(directionsToFill);
    await wait(100);
    if (directionsToFill.length === 0) {
        return 1;
    } else {
        let depth = 0;
        directionsToFill.forEach(dir => {
            depth = Math.max(depth, fillWithOxygen(dir.x, dir.y) +1);
        });
        return depth;
    }

};
// p1();
p2();
