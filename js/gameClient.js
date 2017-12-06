

const gameServerURL = 'http://127.0.0.1:8787';

var gameClient = (server = gameServerURL) => {
    var _this = {};
    _this.serverURL = server;
    _this.connectGameServer = connectGameServer;
    _this.connectOK = false;
    _this.enterHall = enterHall;

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
