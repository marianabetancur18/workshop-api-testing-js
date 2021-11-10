const agent = require('superagent');
const { expect } = require('chai');

let userQuery;

const urlBase = 'https://api.github.com';

describe('Github Api Query Parameters Test', () => {
  describe('Users in Query by defect', () => {
    it('Users by defect', () => agent.get(`${urlBase}/users`)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN)
      .then((response) => {
        userQuery = response.body.length;
      }));
  });
  describe('Obtain 10 users', () => {
    it('10 users obtained', () => agent.get(`${urlBase}/users`)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN)
      .query({ per_page: 10 })
      .then((response) => {
        userQuery = response.body.length;
        expect(userQuery).to.equal(10);
      }));
  });
  describe('Obtain 50 users', () => {
    it('50 users obtained', () => agent.get(`${urlBase}/users`)
      .set('User-Agent', 'agent')
      .auth('token', process.env.ACCESS_TOKEN)
      .query({ per_page: 50 })
      .then((response) => {
        userQuery = response.body.length;
        expect(userQuery).to.equal(50);
      }));
  });
});
