const { server } = require('./dist/statistics/src/server');

process.on('uncaughtException', function (err) {
  console.error('Caught exception: ', err);
});

const runninServer = server().start();

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  runninServer.stop();
});
process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  runninServer.stop();
});
