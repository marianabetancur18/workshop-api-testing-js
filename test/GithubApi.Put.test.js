const agent = require('superagent');
const statusCode = require('http-status-codes');
const { expect } = require('chai');
const { assert } = require('chai');

const urlBase = 'https://api.github.com';
const githubUserName = 'aperdomob';

describe('GitHub Api PUT Test', () => {
  function Idempotencia() {
    describe('Follow user', () => {
      it('user is followed', () => agent.put(`${urlBase}/user/following/${githubUserName}`)
        .set('User-Agent', 'agent')
        .auth('token', process.env.ACCESS_TOKEN)
        .then((response) => {
          expect(response.status).to.equal(statusCode.NO_CONTENT);
          expect(response.body).to.eql({});
        }));
    });
    describe('Check that user is followed', () => {
      it('Verification user is follow', () => agent.get(`${urlBase}/user/following`)
        .set('User-Agent', 'agent')
        .auth('token', process.env.ACCESS_TOKEN)
        .then((response) => {
          assert.exists(response.body.find((list) => list.login === `${githubUserName}`));
        }));
    });
  }

  Idempotencia();
  describe('Call endpoint to verify indepotency', () => {
    Idempotencia();
  });
});
