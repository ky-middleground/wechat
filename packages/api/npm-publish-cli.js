/*
 * @author kaysaith
 * @date 2021/5/21
 */
const fileSystem = require('fs');
const latestVersion = require('latest-version');
const { exec, execSync } = require('child_process');

// todo 待调试 by songxiwen
// const getStatus = execSync('git status', {
//   encoding: 'utf-8'
// });
// console.log(getStatus);
// execSync('git add .');
// const commit = exec('git commit -m "perf(cli): commit to pull master code."', {
//   encoding: 'utf-8'
// });
// console.log(commit);
// execSync('git pull origin master');
// execSync('npm i');
// execSync('npm run build');

console.log('Towify: prepare package json in dist');
const packageJson = JSON.parse(fileSystem.readFileSync('package.json'));
if (packageJson['lint-staged']) {
  delete packageJson['lint-staged'];
}
if (packageJson.husky) {
  delete packageJson.husky;
}
if (packageJson.jest) {
  delete packageJson.jest;
}
delete packageJson.scripts;
delete packageJson.devDependencies;

latestVersion(packageJson.name).then(
  version => {
    console.log(version, 'latest version');
    const splitVersion = version.split('.');
    if (typeof parseInt(splitVersion[splitVersion.length - 1], 10) === 'number') {
      splitVersion[splitVersion.length - 1] =
        parseInt(splitVersion[splitVersion.length - 1], 10) + 1;
    }
    packageJson.version = splitVersion.join('.');
    console.log(packageJson.version, 'new version');
    fileSystem.writeFileSync(
      `${__dirname}/dist/package.json`,
      JSON.stringify(packageJson, null, 2)
    );
    process.chdir(`${__dirname}/dist`);
    console.log(`Directory: ${process.cwd()}`);
    exec('npm publish');
  },
  onerror => {
    if (onerror.name === 'PackageNotFoundError') {
      packageJson.version = '0.0.1';
      fileSystem.writeFileSync(
        `${__dirname}/dist/package.json`,
        JSON.stringify(packageJson, null, 2)
      );
      process.chdir(`${__dirname}/dist`);
      console.log(`Directory: ${process.cwd()}`);
      try {
        exec('npm publish');
        console.log('publish success');
      } catch (error) {
        console.log(error, 'when npm publish');
      }
    }
  }
);
