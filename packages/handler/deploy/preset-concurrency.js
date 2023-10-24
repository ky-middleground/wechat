const  fs  = require('fs');
const yaml = require('yaml');
const { spawnSync } = require('child_process');

const parseArguments = ()=>{
    const args = process.argv.slice(2);
    let platform = 'tencent'
    for(let index=0;index<args.length;){
       const arg = args[index];
       if(arg === '--index'){
         const value = args[index+1]
         if( !value.startsWith('--') && value !== ''){
            platform = value;
         }
       }

    }
    return {platform}
}

const deployTencentScf = (yml)=>{
  console.log('SCF 预置并发')
  const scfs = yml.inputs.functions;
  const domain = yml.name;
  const envFile = `${__dirname}/.env`;
  Object.keys(scfs).forEach(scf=>{
    const concurrency = spawnSync('towify-sls-deploy', [
      '--envFile',
      envFile,
      '--scfName',
      `${domain}-${scf}`,
      '--concurrencyNum',
      1,
      '--sleep',
      3
    ],{shell: true}).stdout.toString();
    console.log(concurrency);
  })
}

const deployScf = (platform='tencent',stage='dev',scf = '')=>{
  const yamlContent = fs.readFileSync(`${process.cwd()}/serverless.yml`, 'utf-8');
  const ymlObject = yaml.parse(yamlContent);
  if(platform === 'tencent'){
    deployTencentScf(ymlObject,stage,scf)
  }
}
const main = () => {
  const {platform} = parseArguments();
  console.log(platform)
  deployScf(platform);
  process.exit(0);
};
main();
