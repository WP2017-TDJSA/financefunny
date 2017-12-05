

const gameServerURL = 'http://127.0.0.1:8787';

var gameClient = (server = gameServerURL) => {
    var _this = {};
    _this.server = server;
    _this.connectGameServer = connectGameServer;

    return _this;
}

function connectGameServer() {
    if (this.hasOwnProperty('socket'))
        return this.socket;

    try {
        this.socket = io(this.server);    
    } catch (error) {
        console.log('no include socket.io client js');
        return null;
    }
    this;

    return this.socket;
}