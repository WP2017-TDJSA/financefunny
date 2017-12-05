var butt1;

var start={
	
	preload :function() {

		game.load.image('background', 'img/game/background.jpg');
		game.load.image('logo', 'img/logo.png');
	},
	
	
	create :function() {

		var background= game.add.image(0, 0, "background");
		background.width = game.width*window.devicePixelRatio;
		background.height = game.height*window.devicePixelRatio;
		background.alpha = 0.5;
		
		var logo= game.add.image(game.width*0.25,game.height*0.2 , "logo");
		logo.width = game.width*0.5*window.devicePixelRatio;
		logo.height = game.height*0.4*window.devicePixelRatio;
		
		butt1 = game.add.graphics(game.width*0.35, game.height*0.7);
		butt1.beginFill(0xFFFFE0,0.8);
		butt1.lineStyle(2, 0xA52A2A, 1);
		butt1.drawRoundedRect(0, 0, game.width*0.3, game.height*0.08,7);
		butt1.endFill();
		
		var style = { font: "18px Arial", fill: "	#8B0000",  align: "center"};

		option1 = game.add.text(butt1.x+ butt1.width / 2, butt1.y+ butt1.height / 2 , "開始遊戲", style);
		option1.anchor.set(0.5);
		
		butt1.inputEnabled=true;
		butt1.events.onInputOut.add(this.out, this);
		butt1.events.onInputOver.add(this.over, this);
		butt1.events.onInputDown.add(this.listen_next,this);
		game.time.events.add(10000, this.listen_next, this, 'play');
		
	},
	over :function() {
		butt1.alpha = 1;
	},

	out :function() {
		butt1.alpha = 0.9;
	},
	
	listen_next :function (){
		game.state.start('hall');
	}
	
	
};
