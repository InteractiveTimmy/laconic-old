const { execute } = require('../utils/index');

function generateConfig(params) {
  const defaultActions = [
    'lint',
    'transpile',
    'test',
    'docs',
    'compile'
  ];

  const output = {};

  const async = params.find((item) => item.argument === 'async');
  const actions = params.find((item) => item.argument === 'actions');

  output.async = (async);
  output.actions = (actions) ? actions.target : defaultActions;

  return output;
}

module.exports = (params) => new Promise((resolve) => {
  console.log(generateConfig(params));
  resolve();
});
