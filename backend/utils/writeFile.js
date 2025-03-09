const fs = require("fs");

function writeFile(data, FilePath) {
    fs.writeFileSync(FilePath, JSON.stringify(data, null, 2), "utf-8");
}

module.exports = writeFile;