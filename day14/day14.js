const readInput = require('../getInput');
let createdElements = {};
const start = Date.now();
let p1 = async () => {
    let data = await readInput('day14/d14.txt');
    data = data.split('\n').map(datum => datum.split(' => '));

    let recipes = {};
    data.forEach(rec => {
        let producedItem = rec[1].split(' ')[1];
        let quantityProduced = Number(rec[1].split(' ')[0]);
        let costList = rec[0].split(', ');
        let requiredElements = {};
        for (let i = 0; i < costList.length; i ++) {
            let temp = costList[i].split(' ');
            requiredElements[temp[1]] = Number(temp[0]);
        }
        recipes[producedItem] = {quantityProduced, requiredElements}
    });
    let totalOre = getRequiredOre(recipes, 'FUEL');
    console.log(totalOre);
    console.log(`total time: ${Date.now() - start}ms`)
};
let p2 = async () => {
    let data = await readInput('day14/d14.txt');
    data = data.split('\n').map(datum => datum.split(' => '));

    let recipes = {};
    data.forEach(rec => {
        let producedItem = rec[1].split(' ')[1];
        let quantityProduced = Number(rec[1].split(' ')[0]);
        let costList = rec[0].split(', ');
        let requiredElements = {};
        for (let i = 0; i < costList.length; i++) {
            let temp = costList[i].split(' ');
            requiredElements[temp[1]] = Number(temp[0]);
        }
        recipes[producedItem] = {quantityProduced, requiredElements}
    });
    Object.keys(recipes).forEach(key => {
        createdElements[key] = 0;
    });
    let totalOre = 0;
    let unitsOfFuel = 0;
    let reset = false;
    while (totalOre < 1000000000000){
        totalOre += getRequiredOre(recipes, 'FUEL');
        unitsOfFuel++;
        let totalLeftover = Object.keys(createdElements).reduce((acc, val) => {return acc + createdElements[val]}, 0);
        if (totalLeftover === 0) {
            reset = true;
            break;
        }
    }
    if (reset) {
        unitsOfFuel = Math.floor(unitsOfFuel * 1000000000000 / totalOre);
    }
    console.log(unitsOfFuel-1);
    console.log(`total time: ${Date.now() - start}ms`)

};
let getRequiredOre = (recipes, desiredElement) => {
    let cost = recipes[desiredElement].requiredElements;
    let total = 0;

    // base element
    if (cost.ORE) {
        total = cost.ORE;
    } else {
        Object.keys(cost).forEach(key => {
            let tempCost = cost[key];

            if (createdElements[key]) {
                while (createdElements[key] > 0 && tempCost > 0) {
                    tempCost--;
                    createdElements[key]--;
                }
            }

            if (tempCost > 0) {
                let multiplier = Math.ceil(tempCost / recipes[key].quantityProduced);
                for (let i = 0; i < multiplier; i++) {
                    total += getRequiredOre(recipes, key);
                }
                if (recipes[key].quantityProduced*multiplier > tempCost) {
                    if (createdElements[key]) {
                        createdElements[key] += recipes[key].quantityProduced*multiplier - tempCost;
                    } else {
                        createdElements[key] = recipes[key].quantityProduced*multiplier - tempCost;
                    }
                }
            }
        });
    }
    // console.log('returning', total, desiredElement, JSON.stringify(createdElements));

    return total;
};
// p1();
p2();