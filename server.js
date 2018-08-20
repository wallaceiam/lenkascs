var express = require('express')
var http = require('http')
var path = require('path')
var reload = require('reload')
var bodyParser = require('body-parser')
var logger = require('morgan')
var watch = require('watch')

var app = express()

var publicDir = path.join(__dirname, 'public')

console.log(publicDir);

app.set('port', process.env.PORT || 3000)
app.use(logger('dev'))
app.use(bodyParser.json()) // Parses json, multi-part (file), url-encoded

app.get('/', function (req, res) {
    res.sendFile(path.join(publicDir, 'index.html'))
})

var server = http.createServer(app)

// Reload code here
var reloadServer = reload(app, {verbose: true});
watch.watchTree(__dirname + "/public", function (f, curr, prev) {
    // Fire server-side reload event
    reloadServer.reload();
});

server.listen(app.get('port'), function () {
    console.log('Web server listening on port ' + app.get('port'))
})