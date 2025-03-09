const fs = require("fs");

function readFile(FilePath) {
    if (!fs.existsSync(FilePath)){
        return null;
    }
    return JSON.parse(fs.readFileSync(FilePath, "utf-8"));
}

module.exports = readFile;