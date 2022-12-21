const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/view', (req, res) => {
	res.sendFile(__dirname + '/display.html');
});

io.on('connection', (socket) => {
	socket.on('join-message', (roomId) => {
		socket.join(roomId);
		console.log('User joined in a Room', roomId);
	});

	socket.on('screen-data', (data) => {
		data = JSON.parse(data);
		const { room, image } = data;
		socket.broadcast.to(room).emit('screen-data', image);
	});
});

//Listening port for server
const server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
http.listen(server_port, () => {
	console.log('Started On : ', server_port);
});
