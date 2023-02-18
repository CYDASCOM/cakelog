const fs = require('fs');
const path = require('path');
const sqlFormat = require("sql-formatter");
const { highlight } = require('sql-highlight')

let lastContent = {};

module.exports = (file, options, testMode) => {
    const name = path.parse(file).name;
    if (lastContent[name] === undefined) {
        lastContent[name] = ''
    }

    const content = fs.readFileSync(file, { encoding: 'utf-8', flag: 'r' });
    const diffContent = getFileDiffContent(lastContent[name], content)
    lastContent[name] = content;
    const lines = diffContent.split('\n').filter(line => {
        const newLine = line.trim();
        if (newLine) {
            return true;
        } else {
            return false;
        }
    });
    let output = '';
    let arr = []
    const { debug, info, nosql, sql } = options;
    if (debug) {
        lines.forEach(line => {
            if (line.includes(' Debug: ')) {
                if (checkDate(line)) {
                    arr.push(line);
                }
            }
        });
        output = arr.join('\n');
    } else if (info) {
        lines.forEach(line => {
            if (line.includes(' Info: ')) {
                if (checkDate(line)) {
                    arr.push(line);
                }
            }
        });
        output = arr.join('\n');
    } else if (nosql) {
        lines.forEach(line => {
            if (!line.includes(' Sql: ')) {
                if (checkDate(line)) {
                    arr.push(line);
                }
            }
        });
        output = arr.join('\n');
    } else if (sql) {
        const includeAfterQuery = lines.find(line => line.includes('After Query'));
        if (includeAfterQuery) {
            if (checkDate(includeAfterQuery)) {
                try {
                    const contentArr = content.split('\n');
                    const index = contentArr.findIndex(line => line === includeAfterQuery);
                    if (contentArr[index - 2]) {
                        const line = contentArr[index - 2];
                        const test = '|SELECT';
                        const i = line.indexOf(test);
                        const sql = line.substring(i + 1);
                        const formatSql = sqlFormat.format(sql);
                        const highlightSql = highlight(formatSql);
                        if (testMode) {
                            return sql;
                        } else {
                            console.log();
                            console.log(highlightSql);
                            console.log();
                            console.log(includeAfterQuery);
                        }
                    }
                } catch (error) {
                    if (testMode || process.env.NODE_ENV === 'debug') {
                        console.error(error)
                    } else {
                        console.log('Sorry, error happened.');
                    }
                }
            }
        }
    } else {
        output = diffContent;
    }
    if (output) {
        if (testMode) {
            return output;
        } else {
            console.log(output);
        }
    }

    function getFileDiffContent(file1, file2) {
        const index = file2.indexOf(file1);
        if (index === 0) {
            const nextIndex = file1.length
            const diffContent = file2.substring(nextIndex);
            return diffContent;
        } else {
            return '';
        }
    }

    function checkDate(line) {
        if (testMode) {
            return true;
        }
        const dateStr = line.substring(0, 19);
        const date = new Date(`${dateStr} GMT+9`).getTime();
        const nowDate = new Date().getTime();
        // 10s
        if ((date + 1000 * 10) < nowDate) {
            return false;
        } else {
            return true;
        }
    }
};