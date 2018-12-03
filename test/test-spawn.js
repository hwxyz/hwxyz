const process = require('process');
const spawn = require('react-dev-utils/crossSpawn');


console.log(`Starting directory: ${process.cwd()}`);
try {
    process.chdir('test/tmp');
    console.log(`New directory: ${process.cwd()}`);
    const proc = spawn.sync('npm', ['install'], { stdio: 'inherit' });
    if (proc.status === 0) {
        console.log('执行成功');
    }
} catch (err) {
    console.error(`chdir: ${err}`);
}
return ;