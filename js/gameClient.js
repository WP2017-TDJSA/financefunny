
if (document.domain == 'luffy.ee.ncku.edu.tw')
    var gameServerURL = 'https://luffy.ee.ncku.edu.tw:6970';
else
    var gameServerURL = 'http://localhost:6970';

var gameClient = (server = gameServerURL) => {
    var _this = {};
    _this.serverURL = server;
    _this.connectGameServer = connectGameServer;
    _this.connectOK = false;
    _this.enterHall = enterHall;
    _this.createRoom = createRoom;
    _this.enterRoom = enterRoom;
    _this.leaveRoom = leaveRoom;

    return _this;
}

function connectGameServer(status) {
    if (this.hasOwnProperty('server'))
        return this.server;

    try {
        this.server = io(this.serverURL);    
    } catch (error) {
        console.log('no include socket.io client js');
        return null;
    }
    this.server.on('status', (ack) => {
        ack(status);
        this.connectOK = true;
    });

    return this.server;
}

function enterHall(callback) {
    if (this.connectOK == false)
        return;

    if (!this.hasOwnProperty('hall'))
        this.hall = io(this.serverURL + '/hall');
    
    this.hall.on('roomList',(data) => {
        callback(data.roomList)
    })
}

function createRoom(roomName, callback=null) {
    if (!this.hasOwnProperty('hall')) {
        console.log('you are not at hall');
        return;
    }

    if (callback == null)
        callback = (roomInfo) => console.log(roomInfo);
    this.hall.emit('createRoom',roomName,callback);
}

function enterRoom(roomName, callback=null) {
    if (!this.hasOwnProperty('hall')) {
        console.log('you are not at hall');
        return;
    }
    
    if (callback == null)
        callback = (roomInfo) => console.log(roomInfo);
    this.hall.emit('enterRoom',roomName,callback);
}

function leaveRoom(roomName, callback=null) {
    if (!this.hasOwnProperty('hall')) {
        console.log('you are not at hall');
        return;
    }

    if (callback == null)
        callback = (roomInfo) => console.log(roomInfo);
    this.hall.emit('leaveRoom',roomName,callback);    
}
