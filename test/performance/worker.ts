'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const autocannon = require('autocannon');

const instance = autocannon(
  {
    url: 'http://localhost:3000/worker',
  },
  console.log,
);

// this is used to kill the instance on CTRL-C
process.once('SIGINT', () => {
  instance.stop();
});

// just render results
autocannon.track(instance, { renderProgressBar: false });
