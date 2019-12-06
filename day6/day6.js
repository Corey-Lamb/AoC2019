const fs = require('fs').promises;
let readInput = async(path) => {
    let res = await fs.readFile(path);
    return res.toString();
};
let p1 = async () => {
    let data = await readInput('day6/d6.txt');
    data = data.split('\n');
    const orbits = {};
    data.forEach(orbit => {
        const temp = orbit.split(')');
        if (orbits[temp[0]]) {
            orbits[temp[0]].push(temp[1]);
        } else {
            orbits[temp[0]] =[temp[1]];
        }
    });
    // console.log(orbits);
    let count = 0;
    Object.keys(orbits).forEach(planet => {
        count += countOrbits(planet, orbits);
    });
    console.log(`Part 1: ${count}`);
};
let p2 = async () => {
    let data = await readInput('day6/d6.txt');
    data = data.split('\n');
    const orbits = {};
    data.forEach(orbit => {
        const temp = orbit.split(')');
        if (orbits[temp[0]]) {
            orbits[temp[0]].push(temp[1]);
        } else {
            orbits[temp[0]] =[temp[1]];
        }
    });
    let origin;
    let destination;
    Object.keys(orbits).forEach(planet => {
        if (orbits[planet].includes('YOU')) {
            origin = planet;
        }
        if (orbits[planet].includes('SAN')) {
            destination = planet;
        }
    });
    const originPath = [origin].concat(getPathToCom(origin, orbits));
    const destinationPath = [destination].concat(getPathToCom(destination, orbits));
    let diff = originPath.filter(planet => {
        return !destinationPath.includes(planet);
    }).concat(destinationPath.filter(planet => {
        return !originPath.includes(planet);
    }));

    console.log(`Part 2: ${diff.length}`);
};
let countOrbits = (key, orbits) => {
    if (orbits[key]) {
        let count = orbits[key].length;
        orbits[key].forEach(planet => {
            count += countOrbits(planet, orbits);
        });
        return count;
    } else {
        return 0;
    }
};
let getPathToCom = (orbiter, orbits) => {
    let current = orbiter;
    let path = [];
    while (current !== 'COM') {
        current = getOrbitee(current, orbits);
        path.push(current);
    }
    return path;
};
let getOrbitee = (orbiter, orbits) => {
    let orbitee;
    Object.keys(orbits).forEach(planet => {
        if (orbits[planet].includes(orbiter)) {
            orbitee = planet;
        }
    });
    return orbitee;
};
p1();
p2();