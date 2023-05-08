const common = `
  --require runner/assertions.js
  --require runner/hooks.js 
  --require features/support/steps.js
  --publish-quiet
  `;

module.exports = {
  default: `${common} features/**/*.feature`
};