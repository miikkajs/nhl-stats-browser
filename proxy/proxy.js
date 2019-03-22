var http = require('http'),
  httpProxy = require('http-proxy');
const request = require('request')
//
// Create your proxy server
//

http.createServer(function (req, resp) {
  console.log('req.query', req.url);
    const x = request(`http://statsapi.web.nhl.com/api/v1${req.url}`);
      // 'game/2018021127/boxscore')
    req.pipe(x)
    x.pipe(resp)
}).listen(8000)


// const request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.