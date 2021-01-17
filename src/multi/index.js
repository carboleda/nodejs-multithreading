const { Worker } = require('worker_threads');
const logUpdate = require('log-update');

let frameIndex = 0;
const frames = ['-', '\\', '|', '/'];
const limit = 1000000;
const threads = 10;
const namesPerThread = limit/threads;

const outputFile = `${process.cwd()}/data/output.txt`;
const names = [...Array(threads)].fill(0);

console.time('Names multi');
for (let i=0; i<threads; i++) {
    const port = new Worker(require.resolve('./worker'), {
        workerData: { namesPerThread, outputFile }
    });

    port.on('message', data => handleMessage(data, i));
    port.on('error', e => console.error(e));
    port.on('exit', code => console.log(code));
}

function handleMessage(_, index) {
    names[index]++;
    const total = names.reduce((acc, current) => acc + current, 0);
    if (total === limit) {
        logUpdate.clear();
        console.timeEnd('Names multi');
    }
}

const intervalId = setInterval(() => {
    const total = names.reduce((acc, current) => acc + current, 0);
    if (total < limit) {
        const frame = frames[frameIndex = ++frameIndex % frames.length];
        const log = names.map((status, i) => `Thread ${i}: ${status}`).join('\n');
        logUpdate(`=== ${frame} Status ${frame} ===\n${log}`);
    } else {
        clearInterval(intervalId);
    }
}, 80);