const chokidar = require('chokidar');
const fs = require('fs');
const loader = require('./loader');

const WATCH_DIR = process.env.WATCH_DIR || 'app/tmp/logs'

module.exports = (options) => {
    const logDir = process.cwd() + '/' + WATCH_DIR;

    if (!fs.existsSync(logDir)) {
        console.log(`Error: ${WATCH_DIR} directory is not exist`);
        process.exit(1);
    }

    const watcher = chokidar.watch(logDir, { persistent: true, ignored: /_batch_|empty|.DS_Store/ });
    watcher.on('change', (file) => {
        loader(file, options);
    });
    console.log('cakelog is working, latest logs will be continuously output.');
};