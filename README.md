# 安装过程

## 1、必须全局安装pnpm
```
npm i pnpm -g
```

## 2、初始化项目
```
# 修改package.json中的name字段，改为你的项目名
# 例如：npm run rename middleground user
npm run rename [domain_name] [project_name]
npm run init
```

## 4、升级@ky-的包  
如果需要更新其他ky域的包，可以执行:
```
pnpm run update
```

## 5、为所有子包安装依赖
```
pnpm install [pkg_name]
```

## 6、为某个特定的子包安装依赖
```
pnpm install [pkg_name] --filter [sub_package_name]
```
需要注意！sub_package_name 是指子包的package.json中的name字段名！  
这是几个示例:
1. `pnpm add axios --filter user`, 为 user 子包安装 axios
2. `pnpm add @ky-middleground/order-type --filter @ky-middleground/user-api` 为 user-api 子包安装 order-type 子包

## 7、强制约束

1. 不可以在任何package.json里面使用peerDependencies，因为这样会导致打包失败。
2. handler 的 package.json 的 name，不是以 @ky-开头，而是直接以领域名命名，如：user, wallet...
3. 自己领域内（也就是当前的这个git项目内的，api，type，domain，service的引用，全部在package.json里面使用dependencies，内容为：`"@ky-xxx/xxx-xxx": "workspace:^0.0.1"` 
