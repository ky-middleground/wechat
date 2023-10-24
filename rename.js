const fs = require('fs');

const args = process.argv.slice(2);

if (args.length !== 2) {
    console.log('请输入正确的参数: npm run rename [domain] [project_name]');
    console.log('例如: npm run rename middleground user');
    process.exit(1);
}

const domain = args[0];
const projectName = args[1];

function rename(module) {
  const packagePath = `packages/${module}/package.json`;
  const packageJson = JSON.parse(fs.readFileSync(packagePath));
  const dependencies = packageJson.dependencies;

  if (module === 'handler') {
    packageJson.name = projectName
  } else {
    packageJson.name = `@ky-${domain}/${projectName}-${module}`;
  }

  // 循环 dependencies 把所有 @ky- 开头的包的版本号开头都加上^（如果没有的话），如果版本号是 workspace 开头，则跳过
  // 将修改后的 package.json 写回
  for (let pkgName in dependencies) {
    let nowVersion = dependencies[pkgName];
    if (nowVersion.startsWith('workspace')) {
      const arr = pkgName.split('/');
      const importModule = arr[arr.length - 1].split('-')[1];
      delete dependencies[pkgName];
      dependencies[`@ky-${domain}/${projectName}-${importModule}`] = nowVersion;
    }
  }

  fs.writeFileSync(
    packagePath,
    JSON.stringify(packageJson, null, 2)
  );
}

rename('api')
rename('type')
rename('domain')
rename('handler')
rename('service')