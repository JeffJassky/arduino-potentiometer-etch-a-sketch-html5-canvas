// LIBRARY DEPENDENCIES
var express = require('express');
var app = express();
var server 	= require('http').Server(app);
var SerialPort = require('serialport');
var io = require('socket.io').listen(server);

// CONFIGURE WEB SERVER
app.use(express.static('public'));
server.listen(80, function () {
	console.log('Webserver running');
});

// CONFIGURE SOCKET
var activeSocket = false;
io.on('connection', function(socket){
	console.log('SOCKET: Connection');
	activeSocket = socket;
});

// CONFIGURE SERIAL PORT
var port = new SerialPort(
	'/dev/cu.usbmodem1411',
	{
		parser: SerialPort.parsers.readline('\r\n')
	}
);
port.on('data', function(data){
	console.log('SERIALPORT: data', data);
	if(activeSocket){
		data = data.split(',');
		var positions = {
			x: data[0],
			y: data[1]
		};
		activeSocket.emit('stuff', positions);
	}
});