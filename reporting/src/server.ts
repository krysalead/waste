const express = require('express');
import { ReportHandler } from './handlers/ReportHandler';

export const server = () => {
  const app = express();
  const handler = new ReportHandler();
  app.get('/', async (req, res) => {
    const reports = await handler.getReports();
    // need to have a better wrapping with more information about the current request sent from the backend (status, message....)
    res.send({ reports });
  });

  app.get('/:id', async (req, res) => {
    const reports = await handler.getReport(req.params.id);
    // need to have a better wrapping with more information about the current request sent from the backend (status, message....)
    res.send({ reports });
  });

  app.post('/', async (req, res) => {
    const reports = await handler.addReport({});
    // need to have a better wrapping with more information about the current request sent from the backend (status, message....)
    res.send({ reports });
  });
  return {
    start: () => {
      const port = 3000;
      const server = app.listen(port, () => {
        console.info(`App listening at http://localhost:${port}`);
      });
      return {
        stop: () => {
          console.info(`Server is closing`);
          server.close();
        },
      };
    },
    app,
  };
};
