'use strict';
const Ora = require('ora');

const spinner = new Ora({
    text: 'Loading unicorns',
});

spinner.start();

setTimeout(() => {
    spinner.frames = ['-','+','-'];
    spinner.color = 'yellow';
    spinner.text = 'Loading rainbows';
}, 1000);

setTimeout(() => {
    spinner.succeed();
}, 2000);
