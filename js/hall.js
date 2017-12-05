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
        
        var style = { font: "18px Arial", fill: "	#8B0000",  align: "center"};

        game.add.text(this.sandboxButton.x+ this.sandboxButton.width / 2, this.sandboxButton.y+ this.sandboxButton.height / 2 , "沙盒模式", style).anchor.set(0.5);
        game.add.text(this.createRoomButton.x+ this.createRoomButton.width / 2, this.createRoomButton.y+ this.createRoomButton.height / 2 , "創建房間", style).anchor.set(0.5);

        this.sandboxButton.inputEnabled = true;
        this.createRoomButton.inputEnabled = true;
        this.sandboxButton.events.onInputDown.add(this.goToSandbox,this);
        this.createRoomButton.events.onInputDown.add(this.createRoom,this);
        //game.state.start('play');
    },
    update : function() {},
    goToSandbox : function() {
        game.state.start('play');
    },
    createRoom : function() {
        alert('抱歉，多人連線正在趕工中');
    }
};