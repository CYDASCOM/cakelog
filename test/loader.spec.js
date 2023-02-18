const assert = require('assert');
const loader = require('../loader');

const testMode = true;

describe('test loader.js', () => {
    describe('--debug option', () => {
        const option = { debug: true };

        it('should no output', (done) => {
            const defaultFilePath = __dirname + '/fixtures/debug/debug-default.txt';
            const result = loader(defaultFilePath, option, testMode);
            assert.equal(result, undefined);
            done();
        });

        it('should have output', (done) => {
            const updateFilePath = __dirname + '/fixtures/debug/debug-update.txt';
            const result = loader(updateFilePath, option, testMode);
            assert(result.includes('Debug'));
            done();
        });
    });

    describe('--info option', () => {
        const option = { info: true };

        it('should no output', (done) => {
            const defaultFilePath = __dirname + '/fixtures/info/info-default.txt';
            const result = loader(defaultFilePath, option, testMode);
            assert.equal(result, undefined);
            done();
        });

        it('should have output', (done) => {
            const updateFilePath = __dirname + '/fixtures/info/info-update.txt';
            const result = loader(updateFilePath, option, testMode);
            assert(result.includes('Info'));
            done();
        });
    });

    describe('--nosql option', () => {
        const option = { nosql: true };

        it('should no output', (done) => {
            const defaultFilePath = __dirname + '/fixtures/nosql/nosql-default.txt';
            const result = loader(defaultFilePath, option, testMode);
            assert.equal(result, undefined);
            done();
        });

        it('should have output', (done) => {
            const updateFilePath = __dirname + '/fixtures/nosql/nosql-update.txt';
            const result = loader(updateFilePath, option, testMode);
            assert(result.includes('Debug') && result.includes('Info'));
            assert(result.split('\n').length === 2);
            done();
        });
    });

    describe('--sql option', () => {
        const option = { sql: true };

        it('should no output', (done) => {
            const defaultFilePath = __dirname + '/fixtures/sql/sql-default.txt';
            const result = loader(defaultFilePath, option, testMode);
            assert.equal(result, undefined);
            done();
        });

        it('should have output when (SQL index + 2 === After Query index)', (done) => {
            const updateFilePath = __dirname + '/fixtures/sql/sql-update-1.txt';
            const result = loader(updateFilePath, option, testMode);
            assert(result.startsWith('SELECT'));
            done();
        });
    });

    describe('no option', () => {
        const option = {};

        it('should no output', (done) => {
            const defaultFilePath = __dirname + '/fixtures/nooption/nooption-default.txt';
            const result = loader(defaultFilePath, option, testMode);
            assert(result !== undefined);
            done();
        });

        it('should have output', (done) => {
            const updateFilePath = __dirname + '/fixtures/nooption/nooption-update.txt';
            const result = loader(updateFilePath, option, testMode);
            assert(result.split('\n').length === 2);
            done();
        });
    });
});