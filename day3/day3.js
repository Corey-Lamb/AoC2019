const fs = require('fs').promises;
let readInput = async(path) => {
    let res = await fs.readFile(path);
    return res.toString();
};
let p1 = async () => {
    const data = await readInput('day3/d3.txt');
    const wires = data.split('\n');
    const wire1Path = wires[0].split(',');
    const wire2Path = wires[1].split(',');
    const wire1Points = chartPoints(wire1Path, {x:0,y:0});
    const wire2Points = chartPoints(wire2Path, {x:0,y:0});
    const intersections = findIntersections(wire1Points, wire2Points);

    let minDistance = 99999999;
    intersections.forEach(intersection => {
        let distance = Math.abs(intersection.x) + Math.abs(intersection.y);
        if (distance < minDistance) {
            minDistance = distance
        }
    });
    console.log(`Part 1: ${minDistance}`);
};
let p2 = async () => {
    const data = await readInput('day3/d3.txt');
    const wires = data.split('\n');
    const wire1Path = wires[0].split(',');
    const wire2Path = wires[1].split(',');
    const wire1Points = chartPoints(wire1Path, {x:0,y:0});
    const wire2Points = chartPoints(wire2Path, {x:0,y:0});
    const intersections = findIntersections(wire1Points, wire2Points);

    let minSteps = 99999999;
    intersections.forEach(intersection => {
        let steps = wire1Points.findIndex(point => point.x === intersection.x && point.y === intersection.y) + 1;
        steps += wire2Points.findIndex(point => point.x === intersection.x && point.y === intersection.y) + 1;
        minSteps = steps < minSteps ? steps : minSteps;
    });
    console.log(`Part 2: ${minSteps}`);
};
let chartPoints = (directionsArr, startingPoint) => {
    let pointsArr = [];
    let previousPoint = startingPoint;
    directionsArr.forEach(direction => {
        let steps = Number(direction.substring(1));
        if (direction.charAt(0) === 'R') {
            for (let i = 0; i < steps; i++) {
                let newPoint = {
                    x: previousPoint.x+1,
                    y: previousPoint.y
                };
                pointsArr.push(newPoint);
                previousPoint = newPoint;
            }
        } else if (direction.charAt(0) === 'U') {
            for (let i = 0; i < steps; i++) {
                let newPoint = {
                    x: previousPoint.x,
                    y: previousPoint.y+1
                };
                pointsArr.push(newPoint);
                previousPoint = newPoint;
            }
        } else if (direction.charAt(0) === 'D') {
            for (let i = 0; i < steps; i++) {
                let newPoint = {
                    x: previousPoint.x,
                    y: previousPoint.y-1
                };
                pointsArr.push(newPoint);
                previousPoint = newPoint;
            }
        } else if (direction.charAt(0) === 'L') {
            for (let i = 0; i < steps; i++) {
                let newPoint = {
                    x: previousPoint.x-1,
                    y: previousPoint.y
                };
                pointsArr.push(newPoint);
                previousPoint = newPoint;
            }
        }
    });
    return pointsArr;
};
let findIntersections = (points1, points2) => {
  let intersections = [];
  points1.forEach(point1 => {
     points2.forEach(point2 => {
        if (arePointsSame(point1, point2)) {
            intersections.push(point1);
        }
     });
  });
  return intersections;
};
let arePointsSame = (point1, point2) => {
    return point1 && point2 && point1.x === point2.x && point1.y === point2.y;
};
p1();
p2();