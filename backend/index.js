const server = require('./dist/backend/src/hapi-server');

let runningServer;

process.on('uncaughtException', function (err) {
  console.error('Caught exception: ', err);
});

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  runningServer.stop();
});
process.on('SIGINT', () => {
  console.info('SIGINT signal received.');
  runningServer.stop();
});

const main = async () => {
  try {
    const serverConfig = await server();

    runningServer = serverConfig.start();
  } catch (error) {
    console.error(error);
  }
};

main();
