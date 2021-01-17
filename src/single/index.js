const fs = require('fs').promises;
const logUpdate = require('log-update');
const { getRandomIndex } = require('../utils');
const firstNames = require('../../data/first-names.json');
const middleNames = require('../../data/middle-names.json');
const lastNames = require('../../data/last-names.json');

let frameIndex = 0;
const frames = ['-', '\\', '|', '/'];
const outputFile = `${process.cwd()}/data/output.txt`;
const limit = 1000000

(async () => {
    let i=0;

    const intervalId = setInterval(() => {
        if (i < limit) {
            const frame = frames[frameIndex = ++frameIndex % frames.length];
            logUpdate(`=== ${frame} ${i+1} of ${limit} ${frame} ===`);
        } else {
            clearInterval(intervalId);
        }
    }, 80);

    console.time('Names single');
    for (i; i<limit; i++) {
        const data = [firstNames, middleNames, lastNames]
            .map(getRandomIndex)
            .concat('\n')
            .join(' ');

        await fs.appendFile(outputFile, data);
    }
    console.timeEnd('Names single');
})();