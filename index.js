var path = require('path');

var createPattern = function(file) {
    return {pattern: file, included: true, served: true, watched: false};
};

var initKinmock = function(files) {
    var kinmockPath = path.dirname(require.resolve('kinmock')) + '/index.js';
    files.unshift(createPattern(kinmockPath));
};

initKinmock.$inject = ['config.files'];

module.exports = {
    'framework:kinmock': ['factory', initKinmock]
};
