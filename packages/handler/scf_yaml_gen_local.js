// 在本地根据deploy.yaml文件生成对应的serverless.yaml文件
// usage: node scf_yaml_gen_local.js <stage>
// 例如: node scf_yaml_gen_local.js dev2
// 需要先安装 yaml 扩展： yarn add yaml

const YAML = require('yaml')
const fs = require('fs')

if (fs.existsSync('./deploy/serverless.yaml') || fs.existsSync('./deploy/serverless.yml')) {
  console.log('serverless.yaml exist, skip')
  return
}

const args = process.argv.splice(2)
const stage = args[0]
if (!stage) {
  console.log('stage is empty')
  return
}

let allFns = {}
if (fs.existsSync('./deploy/function')) {
  fs.readdirSync('./deploy/function').forEach(file => {
    if (file.endsWith('.yaml') || file.endsWith('.yml')) {
      allFns[file] = YAML.parse(fs.readFileSync(`./deploy/function/${file}`, 'utf8'))
    }
  });
}

const main_file = fs.readFileSync('./deploy/main.yaml', 'utf8')
const main = YAML.parse(main_file)

const need_deploy = fs.readFileSync('./deploy.yaml', 'utf8')
const need = YAML.parse(need_deploy)

if (!need[stage]) {
  console.log(`stage ${stage} not found`)
  return
}

let enable = need[stage].enable
let fns = []

if (!enable) {
  fns = Object.keys(allFns)
} else {
  fns = need[stage].functions
}

if (!fns) {
  console.log('deploy.yaml functions is empty')
  return
}

// 读取 fns 里面对应的文件名，如果没有.yaml结尾，就加上在读取
// 读取 timers 里面对应的文件名，如果没有.yaml结尾，就加上在读取
if (!main.inputs.functions) {
  main.inputs.functions = []
}
for (let fn of fns) {
  let file = fn
  if (file === 'demo' || file.startsWith('demo.')) {
    console.log('demo file, skip')
    continue
  }
  if (!file.endsWith('.yaml') && !file.endsWith('.yml')) {
    file = `${file}.yaml`
    if (!allFns[file]) {
      file = `${file}.yml`
    }
    if (!allFns[file]) {
      console.log(`function ${file} not found`)
      continue
    }
  }
  fnPart = allFns[file].function
  triggerPart = allFns[file].triggers
  main.inputs.functions.push(fnPart)
  if (triggerPart) {
    if (Array.isArray(triggerPart)) {
      main.inputs.triggers.push(...triggerPart)
    } else {
      main.inputs.triggers.push(triggerPart)
    }
  }
}

let done = YAML.stringify(main)
fs.writeFileSync('./deploy/serverless.yaml', done, 'utf8')