/**
 * @author songxiwen
 * @date 2021/03/05 14:19
 */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./test'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsconfig: {
        allowJs: true
      }
    }
  }
};
