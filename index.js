const path = require('path');

const pattern = function (file) {
  return {
    pattern: file,
    included: true,
    served: true,
    watched: false,
  };
};

const initkintuba = function (files) {
  files.unshift(pattern(`${path.dirname(require.resolve('kintuba'))}/index.js`));
  files.unshift(pattern(path.join(__dirname, 'adapter.js')));
};

initkintuba.$inject = ['config.files'];

module.exports = {
  'framework:kintuba': ['factory', initkintuba],
};
