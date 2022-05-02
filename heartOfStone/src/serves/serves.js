const express = require('express')
var app = express()
var server = require('http').Server(app)
// var io = require('socket.io').listen(server)

app.use('/assets', express.static(__dirname + '/assets'))

server.lastPlayderID = 0

server.listen(process.env.PORT || 8081, function () {
  console.log('Listening on ' + server.address().port)
})
