var fs = require('fs');

// return a special webified version of traverse
exports.source = function () {
    return fs.readFileSync(__dirname + '/traverse.js')
        .toString()
        .replace(/^module\..*/mg, '')
};

