var fs = require('fs');

// return a special webified version of traverse
exports.source = function () {
    return [ 'traverse.js', 'hash.js' ].map(scrub).join('\n');
};

function scrub (filename) {
    return fs.readFileSync(__dirname + '/' + filename)
        .toString()
        .replace(/^module\..*/mg, '')
        .replace(/^var \S+\s*=\s*require\(.*\);/mg, '')
    ;
}

