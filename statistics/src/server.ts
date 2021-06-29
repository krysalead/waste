const express = require('express');
import { ZoneHandler } from './handlers/ZoneHandler';

export const server = () => {
  const app = express();
  const handler = new ZoneHandler();
  app.get('/', (req, res) => {
    const zones = handler.getZonesStats();
    res.send({ zones });
  });

  app.get('/{id}', (req, res) => {
    const zone = handler.getZoneStats('');
    res.send({ zone });
  });

  return {
    start: () => {
      const port = 3000;
      const service = app.listen(port, () => {
        console.info(`App listening at http://localhost:${port}`);
      });
      return {
        stop: () => {
          console.info(`Server is closing`);
          service.close();
        },
      };
    },
    app,
  };
};
