const fs = require('fs').promises;

let readInput = async(path) => {
    let res = await fs.readFile(path);
    return res.toString();
};
module.exports = readInput;