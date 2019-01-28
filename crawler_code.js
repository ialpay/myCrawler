'use strict';
var url = require('url');
var Crawler = require('crawler'),
  cheerio = require('cheerio');
const fs = require('fs');

//main crawling module
function web_crawler(url, done) {
  var wipro_urls = [];
  var wipro_images = [];
  var obj = {
    sitemap: []
  };
  //create Crawling object
  var c = new Crawler({
    maxConnections: 1,
    jQuery: false,
    // call for each crawled page
    callback: function(err, res, done) {
      var $;
      if (err) {
        console.log(err);
      } else {
        $ = cheerio.load(res.body);
        // get all images in the page
        $('img').each(function(i, img) {
          var image_link = img.attribs.src;
          if (image_link != undefined) {
            if (wipro_images.indexOf(image_link) == -1) {
              wipro_images.push(image_link);
              obj.sitemap.push({ id: 'image', url: image_link }); //add image
            }
          }
        });
        // get all links in the page
        $('a').each(function(i, a) {
          var href = a.attribs.href;
          if (href != undefined) {
            if (
              !href.includes('?') &&
              !href.includes('#') &&
              href.includes('http')
            ) {
              if (wipro_urls.indexOf(href) == -1) {
                wipro_urls.push(href);
                obj.sitemap.push({ id: 'url', url: href }); //add url
                if (href.includes(url)) {
                  c.queue(href);
                  process.stdout.write(
                    'crawling is running. active queue size : ' +
                      c.queueSize +
                      '\x1B[0G'
                  );
                }
              }
            }
          }
        });
      }
      done();
    }
  });
  c.queue(url);
  //when all crawling tasks completed
  c.on('drain', function() {
    console.log(
      'crawling is done                                                 '
    );
    var json = JSON.stringify(obj, null, 4);
    fs.writeFileSync('output.json', json);
  });
  return c;
}

module.exports = {
  web_crawler: web_crawler
};
