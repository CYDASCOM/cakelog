#!/usr/bin/env node
const { program } = require('commander');
const { version, description, name } = require('./package.json');
const watcher = require('./watcher');

program
    .name(name)
    .description(description)
    .version(version);

program
    .option('-d, --debug', 'Just output Debug logs')
    .option('-i, --info', 'Just output Info logs')
    .option('-nos, --nosql', 'Ignore Sql output')
    .option('-s, --sql', 'Ignore Sql output except the Sql before "After Query"');

program.parse(process.argv);
watcher(program.opts());