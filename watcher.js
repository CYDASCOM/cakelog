const chokidar = require('chokidar');
const fs = require('fs');
const loader = require('./loader');

module.exports = (options) => {
    const logDir = process.cwd() + '/app/tmp/logs';

    if (!fs.existsSync(logDir)) {
        console.log('Error: app/tmp/logs directory is not exist');
        process.exit(1);
    }

    const watcher = chokidar.watch(logDir, { persistent: true, ignored: /_batch_|empty|.DS_Store/ });
    watcher.on('change', (file) => {
        loader(file, options);
    });
    console.log('cakelog is working, latest logs will be continuously output.');
};