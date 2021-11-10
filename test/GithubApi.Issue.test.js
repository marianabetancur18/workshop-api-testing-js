const agent = require('superagent');
// const statusCode = require('http-status-codes');
const { expect } = require('chai');

const urlBase = 'https://api.github.com';
let userInfo;
let repository;
let issue;

describe('GitHub Api POST and PATCH Test', () => {
  describe('Log in user and number of repos check', () => {
    it('User had at least one public repo', () => agent.get(`${urlBase}/user`)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN)
      .then((response) => {
        userInfo = response.body;
        expect(response.body.public_repos).to.be.above(0);
      }));
  });

  describe('Choose a repo and verify that exists', () => {
    it('Verification of existing repo', () => agent.get(userInfo.repos_url)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN)
      .then((response) => {
        [repository] = response.body;
        expect(repository).to.not.equal(null);
      }));
  });

  describe('URL to create an issue', () => {
    it('Issue created', () => agent.post(`${urlBase}/repos/${userInfo.login}/${repository.name}/issues`)
      .send({ title: 'New issue created through GitHub Api' })
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN)
      .then((response) => {
        expect(response.body.title).to.equal('New issue created through GitHub Api');
        expect(response.body.body).to.equal(null);
        issue = response.body;
      }));
  });
  describe('Change the issue', () => {
    it('Issue changes  ', () => agent.patch(`${urlBase}/repos/${userInfo.login}/${repository.name}/issues/${issue.number}`)
      .send({ title: 'New issue created through GitHub Api', body: 'new issues body' })
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN)
      .then((response) => {
        expect(response.body.title).to.equal('New issue created through GitHub Api');
        expect(response.body.body).to.equal('new issues body');
      }));
  });
});
