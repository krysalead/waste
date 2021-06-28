const supertest = require('supertest');
const assert = require('assert');
import { server } from '../../src/server';

const app = server().app;

describe('Report handler ', function () {
  it('returns a list of reports', function (done) {
    supertest(app)
      .get('/')
      .expect(200)
      .end(function (err, res) {
        done(err);
      });
  });
  it('returns a single report', function (done) {
    supertest(app)
      .get('/test123')
      .expect(200)
      .end(function (err, res) {
        done(err);
      });
  });
  it('returns an error when report doesnot exist', function (done) {
    supertest(app)
      .get('/fakereport')
      .expect(200)
      .end(function (err, res) {
        done(err);
      });
  });
  it('adds a report', function (done) {
    supertest(app)
      .post('/')
      .send({})
      .expect(200)
      .end(function (err, res) {
        done(err);
      });
  });
  it('returns an error when data is not correct', function (done) {
    supertest(app)
      .post('/')
      .send({})
      .expect(200)
      .end(function (err, res) {
        done(err);
      });
  });
});
