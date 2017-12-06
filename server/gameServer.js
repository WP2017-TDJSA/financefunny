const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const CollectionAuction = require("../js/CollectionAuction.js");

app.get('/', function(req, res){
	//res.sendfile('index.html');
  	res.write('hello express')
  	res.end()
});


function playerStatusHandler(socket) {
	return (userdata) => {
		/*if (roomList.indexOf(userdata.status)) {
			socket.room = userdata.status;
			socket.join(socket.room);
			socket.broadcast.to(socket.room).emit('new user',userdata);
		}*/
	};		
}

function getID(id) {
	if (id.indexOf('#') == -1)
		return id;
	return id.substring(id.indexOf('#')+1, id.length)
}

io.playerList = {};

io.on('connection', function(socket){
	console.log('a user connected : '+socket.id);
	// get player status
	socket.emit('status', (data)=>{
		data.id = getID(socket.id);
		console.log('<'+data.id+'> '+JSON.stringify(data));
		io.playerList[getID(socket.id)] = data;
		console.log(io.playerList);
	});

	//socket.on('player status', playerStatusHandler());
	socket.on('disconnecting', (reason) => {
		/*if (socket.hasOwnProperty('room')) {
			socket.broadcast.to(socket.room).emit('deleate user');
			socket.leave(socket.room);
		}*/
		//console.log(io.playerList[getID(socket.id)]);
		delete io.playerList[getID(socket.id)];
		console.log('a user disconnected\n' + reason);
	});
	//socket.join(homeRoom);
	//socket.broadcast.to(homeRoom).emit('new user',{ a : 'a'});
});

var hall = io.of('/hall');
hall.roomList = [];
var roomInfo = (roomName='',maxPlayers=3) => {
	var _this = {
		maxPlayers : maxPlayers,
		currentPlayers : 0,
		roomName : roomName,
		playerList : [],
		join : (id)=>{
			console.log('join player at '+_this.roomName+':'+id)
			_this.currentPlayers++
			_this.playerList.push(io.playerList[id]);
			// update
			hall.to(_this.roomName).emit('roomInfo',_this);
			hall.emit('roomList',{ roomList : hall.roomList});
		},
		leave : (id)=>{
			_this.currentPlayers--
			_this.playerList.splice(hall.roomList.indexOf(io.playerList[id]),1); 
			// remove room
			if (_this.currentPlayers == 0) {
				if (hall.roomList.indexOf(_this) >= 0) {
					hall.roomList.splice(hall.roomList.indexOf(_this),1);
				}
			}
			// update
			hall.to(_this.roomName).emit('roomInfo',_this);
			hall.emit('roomList',{ roomList : hall.roomList});
		}
	}
	return _this;
}

hall.on('connection', function(socket) {
	console.log('a user enter hall : ' + socket.id);
	socket.atRoom = null;
	// send room info
	socket.emit('roomList',{ roomList : hall.roomList});
	// listen create room
	socket.on('createRoom',(data, ack) => {
		console.log(socket.atRoom);
		// check not in other room
		if (socket.atRoom != null) {
			ack('你已經在其他房間！')
			return;
		}
		if (typeof data != 'string') {
			ack('資料格式錯誤')
			return;
		}
		// should check the same roomname
		// create room
		var newRoom = roomInfo(data);
		hall.roomList.push(newRoom);
		// self join room
		socket.join(newRoom.roomName,() => {
			newRoom.join(getID(socket.id));
			socket.atRoom = newRoom.roomName;
			ack(newRoom);
		});
	})
	// enter room
	socket.on('enterRoom',(data, ack) => {
		// check not in other room
		if (socket.atRoom != null) {
			ack('你已經在其他房間！')
			return;
		}
		if (typeof data != 'string') {
			ack('資料格式錯誤')
			return;
		}
		// find room
		var chooseRoom = null;
		hall.roomList.forEach(element => {
			if (element.roomName == data)
				chooseRoom = element;	
		});
		if (chooseRoom == null) {
			ack('沒有發現房間')
			return;
		}
		// enter room
		socket.join(chooseRoom.roomName,() => {
			chooseRoom.join(getID(socket.id));
			socket.atRoom = chooseRoom.roomName;
			ack(chooseRoom);
		});
	})
	// leave room
	socket.on('leaveRoom',(data, ack) => {
		if (typeof data != 'string') {
			ack('資料格式錯誤')
			return;
		}
		// find room
		var chooseRoom = null;
		hall.roomList.forEach(element => {
			if (element.roomName == data)
				chooseRoom = element;	
		});
		if (chooseRoom == null) {
			ack('沒有發現房間')
			return;
		}
		// leave room
		socket.leave(chooseRoom.roomName,() => {
			chooseRoom.leave(getID(socket.id));
			socket.atRoom = null;
			ack(chooseRoom);
		});
	})
	socket.on('disconnecting', (reason) => {
		if (socket.atRoom != null) {
			var chooseRoom = null;
			hall.roomList.forEach(element => {
				if (element.roomName == socket.atRoom)
					chooseRoom = element;	
			});
			if (chooseRoom != null) {
				// leave room
				socket.leave(chooseRoom.roomName,() => {
					chooseRoom.leave(getID(socket.id));
				});
			}
		}
	})

	socket.on('disconnect',()=>{
		console.log('a user leave hall');
	});
});

http.listen(6970,  function(){
  	console.log('HTTP Server: http://127.0.0.1:6970/');
});