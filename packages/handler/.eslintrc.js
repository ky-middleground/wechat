module.exports = {
  extends: require.resolve('@ky-infra/common/eslint'),
  parseOptions: {
    project: 'tsconfig.json',
    createDefaultProgram: true,
    impliedStrict: true
  }
};
