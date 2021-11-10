const agent = require('superagent');
const chai = require('chai');
const statusCode = require('http-status-codes');

const { expect } = chai;
const urlBase = 'https://github.com';
const githubUsername = 'aperdomob';
let redirectResponse;

describe('Github Api HEAD and Redirect Test', () => {
  describe('Consult the url', () => {
    before(async () => {
      try {
        await agent.head(`${urlBase}/${githubUsername}/redirect-test`)
          .set('User-Agent', 'agent')
          .auth('token', process.env.ACCESS_TOKEN);
      } catch (response) {
        redirectResponse = response;
      }
    });
    it('It is redirected', () => {
      expect(redirectResponse.status).to.equal(statusCode.MOVED_PERMANENTLY);
      expect(redirectResponse.response.res.headers.location).to.equal(`${urlBase}/${githubUsername}/new-redirect-test`);
    });
  });
  describe('Consulting redirect-test url with GET', () => {
    before(async () => {
      try {
        await agent.get(`${urlBase}/${githubUsername}/redirect-test`)
          .set('User-Agent', 'agent')
          .auth('token', process.env.ACCESS_TOKEN);
      } catch (response) {
        redirectResponse = response;
      }
    });
    it('Site redirected', () => {
      expect(redirectResponse.status).to.equal(statusCode.MOVED_PERMANENTLY);
      expect(redirectResponse.response.res.headers.location).to.equal(`${urlBase}/${githubUsername}/new-redirect-test`);
    });
  });
});
