const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

describe('First Api Tests', () => {
});
it('Consume GET Service', async () => {
  const response = await agent.get('https://httpbin.org/ip');

  expect(response.status).to.equal(statusCode.OK);
  expect(response.body).to.have.property('origin');
});
it('Consume GET Service with query parameters', async () => {
  const query = {
    name: 'John',
    age: '31',
    city: 'New York'
  };

  const response = await agent.get('https://httpbin.org/get').query(query);

  expect(response.status).to.equal(statusCode.OK);
  expect(response.body.args).to.eql(query);
});
it('Consume Head Service', async () => {
  const response = await agent.head('https://httpbin.org/headers');
  expect(response.status).to.equal(statusCode.OK);
  expect(response.headers).to.have.property('content-type');
});
it('Consume PATCH Service with query parameters', async () => {
  const query = {
    name: 'Luisa',
    age: '45',
    city: 'Londres'
  };

  const response = await agent.patch('https://httpbin.org/patch').query(query);
  expect(response.status).to.equal(statusCode.OK);
  expect(response.body.args).to.eql(query);
});
it('Consume PUT Service with query parameters', async () => {
  const query = {
    name: 'Patricia',
    age: '26',
    city: 'Medellin'
  };

  const response = await agent.put('https://httpbin.org/put').query(query);
  expect(response.status).to.equal(statusCode.OK);
  expect(response.body.args).to.eql(query);
});
it('Consume Delete Service with query parameters', async () => {
  const query = {
    Pais: 'Colombia'
  };
  const header = {
    Delete: 'ok'

  };
  const response = await agent.delete('https://httpbin.org/anything').query(query).set(header);
  expect(response.status).to.equal(statusCode.OK);
  expect(response.body.args).to.eql(query);
  expect(response.body.headers).to.have.property('Delete');
});
