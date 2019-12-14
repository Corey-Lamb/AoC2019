const readInput = require('../getInput');
const start = Date.now();
let p1 = async () => {
    let data = await readInput('day12/d12.txt');
    let positions = data.split('\n');
    let bodies = getBodies(positions);

    for (let i = 0; i < 1000; i++) {
        updateVelocity(bodies);
        updatePosition(bodies);
    }
    const total = bodies.reduce(getTotalEnergy, 0);
    console.log(total);
};
let p2 = async () => {
    let data = await readInput('day12/d12.txt');
    let positions = data.split('\n');
    let bodies = getBodies(positions);
    let initialState = {};
    bodies.forEach((body, i) => {
        initialState[i] = JSON.parse(JSON.stringify(body.pos));
    });
    let i = 0;
    let xPeriod;
    let yPeriod;
    let zPeriod;

    // console.log(initialState);
    while (!(xPeriod && yPeriod && zPeriod)) {
        updateVelocity(bodies);
        updatePosition(bodies);
        i++;
        if (!xPeriod
            && bodies[0].pos.x === initialState[0].x
            && bodies[0].vel.x === 0
            && bodies[1].pos.x === initialState[1].x
            && bodies[1].vel.x === 0
            && bodies[2].pos.x === initialState[2].x
            && bodies[2].vel.x === 0
            && bodies[3].pos.x === initialState[3].x
            && bodies[3].vel.x === 0) {
            xPeriod = i;
        }
        if (!yPeriod
            && bodies[0].pos.y === initialState[0].y
            && bodies[0].vel.y === 0
            && bodies[1].pos.y === initialState[1].y
            && bodies[1].vel.y === 0
            && bodies[2].pos.y === initialState[2].y
            && bodies[2].vel.y === 0
            && bodies[3].pos.y === initialState[3].y
            && bodies[3].vel.y === 0) {
            yPeriod = i;
        }
        if (!zPeriod
            && bodies[0].pos.z === initialState[0].z
            && bodies[0].vel.z === 0
            && bodies[1].pos.z === initialState[1].z
            && bodies[1].vel.z === 0
            && bodies[2].pos.z === initialState[2].z
            && bodies[2].vel.z === 0
            && bodies[3].pos.z === initialState[3].z
            && bodies[3].vel.z === 0) {
            zPeriod = i;
        }
    }

    let total = [xPeriod, yPeriod, zPeriod].reduce(getLCM);
    console.log(total);
    console.log(`total time: ${Date.now() - start}ms`)
};
let getBodies = (listOfPositions) => {
  return listOfPositions.map(pos => {
      const coord = pos.replace(/[<xyz=>]/g, '').split(',').map(Number);
      return {
          pos: {
              x: coord[0],
              y: coord[1],
              z: coord[2]
          },
          vel: {
              x: 0,
              y: 0,
              z: 0,
          }
      };
  })
};
let updateVelocity = (listOfBodies) => {
    for (let i = 0; i < listOfBodies.length; i++) {
        for (let j = 0; j < listOfBodies.length; j++) {
            if (i < j) {
                let body1 = listOfBodies[i];
                let body2 = listOfBodies[j];

                if (body1.pos.x > body2.pos.x) {
                    body2.vel.x++;
                    body1.vel.x--;
                } else if (body1.pos.x < body2.pos.x) {
                    body2.vel.x--;
                    body1.vel.x++;
                }

                if (body1.pos.y > body2.pos.y) {
                    body2.vel.y++;
                    body1.vel.y--;
                } else if (body1.pos.y < body2.pos.y) {
                    body2.vel.y--;
                    body1.vel.y++;
                }

                if (body1.pos.z > body2.pos.z) {
                    body2.vel.z++;
                    body1.vel.z--;
                } else if (body1.pos.z < body2.pos.z) {
                    body2.vel.z--;
                    body1.vel.z++;
                }
            }
        }
    }
};
let updatePosition = (listOfBodies) => {
    listOfBodies.forEach(body => {
        body.pos.x += body.vel.x;
        body.pos.y += body.vel.y;
        body.pos.z += body.vel.z;
    })
};
let getPotential = (body) => {
    return Math.abs(body.pos.x) + Math.abs(body.pos.y) + Math.abs(body.pos.z);
};
let getKinetic = (body) => {
    return Math.abs(body.vel.x) + Math.abs(body.vel.y) + Math.abs(body.vel.z);
};
let getTotalEnergy = (acc, body) => {
    const potential = getPotential(body);
    const kinetic = getKinetic(body);
    return acc + (potential * kinetic);
};
let getLCM = (a, b) => {
    return (a*b) / getGCD(a, b);
};
let getGCD = (a, b) => {
    if (a < b) {
        let temp = a;
        a = b;
        b = temp;
    }
    if (b === 0) {
        return a;
    } else {
        return getGCD(b, a % b);
    }
};
// p1();
p2();