var total={
	
	preload :function() {
		game.load.image('background', 'img/game/background.jpg');
	},

	create :function() {
		
		var background= game.add.image(0, 0, "background");
		background.width = game.width;
		background.height = game.height;
		background.alpha = 0.5;
		var rect = game.add.graphics(game.width*0.1, game.height*0.1);
		rect.beginFill(0x228B22,0.95);
		rect.lineStyle(2, 0xA52A2A, 1);
		rect.drawRoundedRect(0, 0, game.width*0.8, game.height*0.8,7);
		rect.endFill();
		
		var information = "成功買入: "+player_black+"\n"+"成功賣出: "+player_black+"\n"+"買入失敗: "+player_black+"\n"+"賣出失敗: "+player_black+"\n"+"總計: "+player_black
		var style1 = { font: "18px Arial", fill: "	#000000"};
		info = game.add.text(rect.width / 2, rect.y+ rect.height / 2 , information, style1);
		info.anchor.set(0.5);
		
		var butt1 = game.add.graphics(game.width*0.35, game.height*0.7);
		butt1.beginFill(0xFFFFE0,0.8);
		butt1.lineStyle(2, 0xA52A2A, 1);
		butt1.drawRoundedRect(0, 0, game.width*0.3, game.height*0.08,7);
		butt1.endFill();
		var style = { font: "18px Arial", fill: "	#8B0000",  align: "center"};

		option1 = game.add.text(butt1.x+ butt1.width / 2, butt1.y+ butt1.height / 2 , "下一局", style);
		option1.anchor.set(0.5);
		
		butt1.inputEnabled=true;
		butt1.events.onInputOut.add(this.out, this);
		butt1.events.onInputOver.add(this.over, this);
		butt1.events.onInputDown.add(this.listen_next,this);
		
		game.time.events.add(15000, this.listen_next, this, 'start');
	},
	over :function() {
		butt1.alpha = 1;
	},

	out :function() {
		butt1.alpha = 0.9;
	},
	
	listen_next :function (){
		game.state.start('play');
	}
	
};