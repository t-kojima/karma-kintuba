const fetchFile = async (dirname, sub, file) =>
  await fetch(`../base/${dirname}/${file}.json`).then(response =>
    response.text().then(content => eval(`kintone.${sub}.${file}.set`)(content)));

(function (window) {
  window.schema = {
    load: async (dirname = '.kintuba/schema') => {
      await fetchFile(dirname, 'schema', 'app');
      await fetchFile(dirname, 'schema', 'fields');
      await fetchFile(dirname, 'schema', 'form');
      await fetchFile(dirname, 'schema', 'views');
    },
  };
  window.fixture = {
    load: async (dirname = '.kintuba/fixture') => {
      await fetchFile(dirname, 'fixture', 'login');
      await fetchFile(dirname, 'fixture', 'records');
    },
  };
}(window));
