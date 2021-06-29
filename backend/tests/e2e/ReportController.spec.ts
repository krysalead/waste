import { expect } from '@hapi/code';

const server = require('../../src/hapi-server');

var undertest;

describe('Report controller', () => {
  before(async () => {
    undertest = await (await server()).init();
  });

  after(async () => {
    await undertest.stop();
  });

  it('responds with a list of reports', async () => {
    const response = await undertest.server.inject({
      method: 'get',
      url: '/v1/report',
    });
    expect(response.statusCode).to.equal(200);
    expect(response.result.status).to.equal(0);
    expect(response.result.data).to.have.length(1);
  });
});
