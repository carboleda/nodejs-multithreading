const fs = require('fs').promises;
const { parentPort, workerData } = require('worker_threads');
const { getRandomIndex } = require('../utils');
const firstNames = require('../../data/first-names.json');
const middleNames = require('../../data/middle-names.json');
const lastNames = require('../../data/last-names.json');

const { namesPerThread, outputFile } = workerData;

(async () => {
    for (let i=0; i<namesPerThread; i++) {
        const data = [firstNames, middleNames, lastNames]
            .map(getRandomIndex)
            .concat('\n')
            .join(' ');

        await fs.appendFile(outputFile, data);

        parentPort.postMessage(data);
    }
})();