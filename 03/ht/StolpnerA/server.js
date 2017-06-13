var http = require('http');
var static = require('node-static');
var file = new static.Server('.');

http.createServer(function(req, res) {
    file.serve(req, res);
}).listen(8080);

console.log('Server running on port 8080');