const readInput = require('../getInput');
let p1 = async () => {
    let data = await readInput('day10/d10.txt');
    data = data.split('\n');
    let map = [];
    for (let i = 0; i < data.length; i++) {
        map.push(data[i].split(''));
    }
    let asteroidLocations = [];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === '#') {
                asteroidLocations.push({x: j, y: i})
            }
        }
    }
    let maxInSight = 0;
    let coord;
    asteroidLocations.forEach(coordinates1 => {
        let angles = [];
        asteroidLocations.forEach(coordinates2 => {
            if (!(coordinates2.x === coordinates1.x && coordinates2.y === coordinates1.y)) {
                let angleToCheck = findAngle(coordinates2, coordinates1);
                if (!angles.includes(angleToCheck)) {
                    angles.push(angleToCheck);
                }
            }
        });
        if (maxInSight < angles.length) {
            maxInSight = angles.length;
            coord = coordinates1;
        }
    });
    console.log(`Part 1: asteroid at (${coord.x},${coord.y}) can see ${maxInSight}`);
};
let p2 = async () => {
    let data = await readInput('day10/d10.txt');
    data = data.split('\n');
    let map = [];
    for (let i = 0; i < data.length; i++) {
        map.push(data[i].split(''));
    }
    let asteroidLocations = [];
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === '#') {
                asteroidLocations.push({x: j, y: i})
            }
        }
    }
    // got this from part 1
    let station = {x:20, y:20};
    let asteroids = {};
    asteroidLocations.forEach(coordinates => {
        if (!(coordinates.x === station.x && coordinates.y === station.y)) {
            let polar = convertoToPolar(station, coordinates);
            if (asteroids[polar.angle]) {
                asteroids[polar.angle].push({coordinates, ...polar})
            } else {
                asteroids[polar.angle] = [{coordinates, ...polar}]
            }
        }
    });
    let sortedAngles = Object.keys(asteroids).sort(sortNumber);
    let luckyNumber200 = asteroids[sortedAngles[199]];
    // got lucky that the 200th sorted angle only had one asteroid in it's line of sight
    console.log(`Part 2: ${luckyNumber200[0].coordinates.x*100 + luckyNumber200[0].coordinates.y}`);
};
let findAngle = (coor1, coor2) => {
    return Math.atan2((coor2.y - coor1.y),(coor2.x - coor1.x));
};
let sortNumber = (a, b) => {return a-b};
let convertoToPolar = (origin, coor) => {
    let angle = findAngle(origin, coor);
    if (angle > Math.PI*3/2) {
        angle -= Math.PI*2;
    } else if (angle < -Math.PI/2) {
        angle += Math.PI*2;
    }
    return {distance: (Math.abs(origin.x - coor.x) + Math.abs(origin.y - coor.y)), angle}
};
p1();
p2();