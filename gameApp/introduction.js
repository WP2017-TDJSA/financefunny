var butt;
function draw_button(){
	var style = { font:"24px 微軟正黑體" , fill: "#000000",  align: "center"};
	butt =  {
		_rect : game.add.graphics(game.width*0.5-125,game.height*0.7),
		_text : game.add.text(game.width*0.5, game.height*0.7+30 , '來玩個遊戲吧 ->', style)
	};
	butt._rect.anchor.set(0.5);
	butt._text.anchor.set(0.5);
	butt._rect.lineStyle(3,0x000000,1);
	butt._rect.beginFill(0xffffff,1);
	butt._rect.drawRoundedRect(0, 0, 250, 60,20);
	butt._rect.endFill();
	butt._rect.inputEnabled = true;
	butt._rect.events.onInputOut.add(Out, this);
	butt._rect.events.onInputOver.add(Over, this);
	butt._rect.events.onInputDown.add(Down, this);
}
function Out(but){
	but.x = game.width*0.5-125;
	but.y = game.height*0.7;
	but.scale.setTo(1, 1);
	butt._text.scale.x = 1;
	butt._text.scale.y = 1;
}
function Over(but){
	but.x = game.width*0.5-125-2;
	but.y = game.height*0.7-2;
	but.scale.setTo(1.05, 1.05);
	butt._text.scale.x = 1.05;
	butt._text.scale.y = 1.05;
}
function Down(but){
	setTimeout(function () {
		game.state.start('templete');	
	}, 600)
}
module.exports = function(game) {
	return {
        
		preload : function() {
            console.log('[state] introduction')
			
        },
        create : function() {
			game.stage.backgroundColor = "ffffff";
            var style = { font:"24px 微軟正黑體" , fill: "#000000",  align: "center"};
			var content = "here is the introduction";
			var introduction = game.add.text(game.world.centerX, game.world.centerY , content, style);
			introduction.anchor.set(0.5);
			setTimeout(function () {
				draw_button();
			}, 1000)
			
        },
        update : function() {
			
        }
    };
}