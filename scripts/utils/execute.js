const { spawn } = require('child_process');

module.exports = (command, pack) => new Promise(
  (resolve, reject) => {
    const npm = (process.platform === 'win32') ? 'npm.cmd' : 'npm';
    const c = `${npm} run ${pack ? `${pack}:` : ''}${command}`;
    const fc = c.split(' ');

    const cp = spawn(fc[0], fc.splice(1), { stdio: 'inherit' })
      .on('exit', (e) => {
        if (e === 0) {
          resolve(`finished "${c}"`);
          cp.kill();
        } else {
          reject();
        }
      });
  },
);
