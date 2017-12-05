const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const CollectionAuction = require("../js/CollectionAuction.js");
const homeRoom = 'home'
var roomList = [homeRoom];

app.get('/', function(req, res){
	//res.sendfile('index.html');
  	res.write('hello express')
  	res.end()
});

function disconnectHandler(socket) {
	return (reason) => {
		if (socket.hasOwnProperty('room')) {
			socket.broadcast.to(socket.room).emit('deleate user');
			socket.leave(socket.room);
		}

		console.log('a user disconnected' + reason);
	}
}

function playerStatusHandler(socket) {
	return (userdata) => {
		if (roomList.indexOf(userdata.status)) {
			socket.room = userdata.status;
			socket.join(socket.room);
			socket.broadcast.to(socket.room).emit('new user',userdata);
		}
	};		
}

io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('player status', playerStatusHandler());
	socket.on('disconnect', disconnectHandler);
	//socket.join(homeRoom);
	//socket.broadcast.to(homeRoom).emit('new user',{ a : 'a'});
});

http.listen(8787,  function(){
  	console.log('HTTP Server: http://127.0.0.1:8787/');
});