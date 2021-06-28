const server = require('./dist/server');

process.on('uncaughtException', function (err) {
  console.error('Caught exception: ', err);
});

server.init();

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  server.stop();
});
process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  server.stop();
});
