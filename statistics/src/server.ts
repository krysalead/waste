const express = require('express');
import { ZoneHandler } from './handlers/ZoneHandler';

const init = () => {
  const app = express();
  const port = 3000;
  const handler = new ZoneHandler();
  app.get('/', (req, res) => {
    const zones = handler.getZonesStats();
    res.send({ zones });
  });

  app.get('/{id}', (req, res) => {
    const zone = handler.getZoneStats('');
    res.send({ zone });
  });

  app.listen(port, () => {
    console.info(`App listening at http://localhost:${port}`);
  });
};
const stop = () => {
  console.info(`Server is stopped`);
};

module.exports = {
  init: init,
  stop: stop,
};
