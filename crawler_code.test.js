const { web_crawler } = require('./crawler_code.js');
var assert = require('assert');
var fs = require('fs');

//delay  timer
let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('should create crawler file', function() {
  beforeEach(() => {
    fs.unlinkSync('output.json');
  });
  it(
    'success',
    async function() {
      var url = 'https://manustech.co.uk';
      web_crawler(url);
      await sleep(7000);
      fileExists = fs.existsSync('output.json');
      assert.ok(fileExists);
    },
    this.timeout(20000)
  );
});

describe('should create crawler object', function() {
  beforeEach(() => {
    fs.unlinkSync('output.json');
  });
  it('success', async function() {
    var url = 'https://manustech.co.uk';
    c_ = web_crawler(url);
    assert.ok(c_.queueSize);
  });
});
