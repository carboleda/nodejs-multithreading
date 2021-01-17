# nodejs-multithreading
This an example of using multithread in nodejs

This project was based on Michele Riva's article medium post [Going Multithread with Node.js](https://itnext.io/going-multithread-with-node-js-492258ba32cf)

# Install dependencies
```bash
yarn install
```

## How to execute?
```bash
yarn start:single OR start:multi
```

Execution times to build 1.000.000 of user names:
|Mode           | Time in seconds   |
|:------------- | -----------------:|
|Single thread  | 756s              |
|Multi thread   | 155s              |