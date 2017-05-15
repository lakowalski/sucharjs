/**
 *
 *   Simple rest apl with sucharjs integration
 *    @install: npm install express
 *    @usage: node restapi.js 3000
 *
 */

var express = require('express'),
    app = express(),
    suchar = require('../suchar'),
    port = process.argv[2] || 3000;

app.get('/', function (req, res) {
  suchar().then(result => {
      res.json({ suchar: result });
  })
})

var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Rest api available on http://%s:%s", host, port)
})
