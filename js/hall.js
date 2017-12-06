var hall = {
    preload : function() {},
    create : function() {
        var background= game.add.image(0, 0, "background");
		background.width = game.width*window.devicePixelRatio;
		background.height = game.height*window.devicePixelRatio;
        background.alpha = 0.5;
        
        this.sandboxButton = game.add.graphics(game.width*0.6, game.height*0.8);
		this.sandboxButton.beginFill(0xFFFFE0,0.8);
		this.sandboxButton.lineStyle(2, 0xA52A2A, 1);
		this.sandboxButton.drawRoundedRect(0, 0, game.width*0.3, game.height*0.08,7);
        this.sandboxButton.endFill();
        
        this.createRoomButton = game.add.graphics(game.width*0.1, game.height*0.8);
		this.createRoomButton.beginFill(0xFFFFE0,0.8);
		this.createRoomButton.lineStyle(2, 0xA52A2A, 1);
		this.createRoomButton.drawRoundedRect(0, 0, game.width*0.3, game.height*0.08,7);
        this.createRoomButton.endFill();
        
        var style = { font: "18px 微軟正黑體", fill: "	#8B0000",  align: "center"};

        game.add.text(this.sandboxButton.x+ this.sandboxButton.width / 2, this.sandboxButton.y+ this.sandboxButton.height / 2 , "沙盒模式", style).anchor.set(0.5);
        this.createRoomButton.titleText = game.add.text(this.createRoomButton.x+ this.createRoomButton.width / 2, this.createRoomButton.y+ this.createRoomButton.height / 2 , "創建房間", style);
        this.createRoomButton.titleText.anchor.set(0.5);
        
        this.roomMode = 0;

        this.sandboxButton.inputEnabled = true;
        this.createRoomButton.inputEnabled = true;
        this.sandboxButton.events.onInputDown.add(this.goToSandbox,this);
        this.createRoomButton.events.onInputDown.add(this.createRoom,this);
        //game.state.start('play');

        style.fill = "#FFFFFF";
        this.roomListShow = game.add.text(game.width/2,game.height*0.25,'',style);
        this.roomListShow.anchor.set(0.5);
        gameConnect.enterHall((roomList)=>{
            console.log('get roomlist')
            console.log(roomList);
            //update room list
            var str = '';
            roomList.forEach(element=>{
                str += '[ ' + element.roomName + ' ]'+ '      ' + element.currentPlayers + '/' + element.maxPlayers + '\n';
            });

            this.roomListShow.setText(str);
        });
    },
    update : function() {},
    goToSandbox : function() {
        game.state.start('play');
    },
    createRoom : function() {
        //alert('抱歉，多人連線正在趕工中');
        if (this.roomMode == 0) {
            this.roomName = prompt('請輸入房間名稱','')
            gameConnect.createRoom(this.roomName,(d)=>{console.log(JSON.stringify(d)); this.roomMode = 1;this.createRoomButton.titleText.setText('離開房間')});
        } else if (this.roomMode == 1) {
            gameConnect.leaveRoom(this.roomName,(d)=>{console.log(JSON.stringify(d)); this.roomMode = 0; this.createRoomButton.titleText.setText('創建房間')});
        }
    },
    addRoom : function() {

    }
};