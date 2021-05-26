const { exec } = require('child_process');

const COMMAND = `g++ ../Misc/src.cpp -o abc.exe`;
// const COMMAND = 'abc.exe'

exec(COMMAND, (error, stdout, stderr) => {
    // console.log(stdout);
    console.log(stderr);
});