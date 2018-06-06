var path = require('path');

var createPattern = function(file) {
    return {pattern: file, included: true, served: true, watched: false};
};

var initkintuba = function(files) {
    var kintubaPath = path.dirname(require.resolve('kintuba')) + '/index.js';
    files.unshift(createPattern(kintubaPath));
};

initkintuba.$inject = ['config.files'];

module.exports = {
    'framework:kintuba': ['factory', initkintuba]
};
