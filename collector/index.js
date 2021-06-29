const { server } = require('./dist/collector/src/server');

process.on('uncaughtException', function (err) {
  console.error('Caught exception: ', err);
});

var runninServer;

const main = async () => {
  runninServer = await server().start();
};

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  runninServer.stop();
});
process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  runninServer.stop();
});

main();
