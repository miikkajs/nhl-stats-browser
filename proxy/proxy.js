const http = require('http');
const request = require('request');

const PORT =process.env.PORT || 8080;
http.createServer(function (req, resp) {
  const r = request(`http://statsapi.web.nhl.com/api/v1${req.url}`);
  req.pipe(r);
  r.pipe(resp)
}).listen(PORT);

console.log('Listening PORT: ', PORT);