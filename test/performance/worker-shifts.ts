'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const metrics = require('autocannon');

const autoInstance = metrics(
  {
    url: 'http://localhost:3000/worker/5/shifts?shiftStart=2023-02-08T14:04:56.598Z&shiftEnd=2023-05-08T14:04:56.598Z&facilityId=4',
  },
  console.log,
);

// this is used to kill the instance on CTRL-C
process.once('SIGINT', () => {
  autoInstance.stop();
});

// just render results
metrics.track(autoInstance, { renderProgressBar: false });
