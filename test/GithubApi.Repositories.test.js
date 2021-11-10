const agent = require('superagent');
const chai = require('chai');
const md5 = require('md5');
const statusCode = require('http-status-codes');
const { assert } = require('chai');
chai.use(require('chai-subset'));

const { expect } = chai;

const urlBase = 'https://api.github.com';
const githubUserName = 'aperdomob';
const repository = 'jasmine-awesome-report';

describe('Github Api GET METHOD Test', () => {
  describe('name, comapany and location test', () => {
    it('the data is checked', () => agent.get(`${urlBase}/users/${githubUserName}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
        expect(response.body.name).to.equal('Alejandro Perdomo');
        expect(response.body.company).to.equal('Perficient Latam');
        expect(response.body.location).to.equal('Colombia');
      }));
  });
  describe('Respository test', () => {
    it('The repository data checked', () => agent.get(`${urlBase}/repos/${githubUserName}/${repository}`)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
        expect(response.body.name).to.equal(repository);
        expect(response.body.description).to.equal('An awesome html report for Jasmine');
        expect(response.body.private).to.equal(false);
      }));
  });

  describe('Download and compress repository', () => {
    const expectedMd5 = '3449c9e5e332f1dbb81505cd739fbf3f';
    let compressedRepo;

    before(async () => {
      const downloadQueryResponse = await agent.get(`https://github.com/${githubUserName}/${repository}/archive/master.zip`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent')
        .buffer(true);

      compressedRepo = downloadQueryResponse;
    });

    it('Download verfication', () => {
      expect(md5(compressedRepo)).to.equal(expectedMd5);
    });
  });
  describe('checking README file', () => {
    let readme;
    let files;
    const readmeInfo = {
      name: 'README.md',
      path: 'README.md',
      sha: '1eb7c4c6f8746fcb3d8767eca780d4f6c393c484'
    };

    before(async () => {
      const response = await agent.get(`${urlBase}/repos/${githubUserName}/${repository}/contents/`)
        .set('User-Agent', 'agent')
        .auth('token', process.env.ACCESS_TOKEN);

      files = response.body;
      readme = files.find((file) => file.name === 'README.md');
    });

    it('Check download README file', async () => {
      assert.exists(readme);
      expect(readme).containSubset(readmeInfo);
    });
    const expectedMd5 = '97ee7616a991aa6535f24053957596b1';
    let content;

    before(async () => {
      const responseDownload = await agent.get(readme.download_url);
      content = responseDownload.text;
    });
    it('Download verfication README', () => {
      expect(md5(content)).to.equal(expectedMd5);
    });
  });
});
