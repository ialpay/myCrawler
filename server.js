const { web_crawler } = require('./crawler_code.js');

const args = process.argv;
if (args[2].slice(0, 8) != 'https://') var crawlerInput = 'https://' + args[2];
else var crawlerInput = args[2];
var crawlerInput = web_crawler(crawlerInput);
