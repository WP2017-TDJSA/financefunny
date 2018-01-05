var butt;
var music;
function draw_button(){
	var style = { font:"24px 微軟正黑體" , fill: "#000000",  align: "center"};
	butt =  {
		_rect : game.add.graphics(game.world.centerX-75,game.world.centerY+10),
		_text : game.add.text(game.world.centerX, game.world.centerY+40 , '開始 ->', style)
	};
	butt._rect.anchor.set(0.5);
	butt._text.anchor.set(0.5);
	butt._rect.lineStyle(3,0x000000,1);
	butt._rect.beginFill(0xffffff,1);
	butt._rect.drawRoundedRect(0, 0, 150, 60,20);
	butt._rect.endFill();
	butt._rect.inputEnabled = true;
	butt._rect.events.onInputOut.add(Out, this);
	butt._rect.events.onInputOver.add(Over, this);
	butt._rect.events.onInputDown.add(Down, this);
}
function Out(but){
	but.x = game.world.centerX-75;
	but.y = game.world.centerY+10;
	but.scale.setTo(1, 1);
	butt._text.scale.x = 1;
	butt._text.scale.y = 1;
}
function Over(but){
	but.x = game.world.centerX-77;
	but.y = game.world.centerY+8;
	but.scale.setTo(1.05, 1.05);
	butt._text.scale.x = 1.05;
	butt._text.scale.y = 1.05;
}
function Down(but){
	//music.fadeOut(500);
	setTimeout(function () {
		game.state.start('introduction');	
	}, 600)
}
function play_music(m){
	m.fadeIn(1000,true);
	//music.play();
}

module.exports = function(game) {
	return {
        
		preload : function() {
            console.log('[state] start')
			
        },
        create : function() {
			game.stage.backgroundColor = "ffffff";
            
			music = game.add.audio('backgroundmusic');
			music.onDecoded.add(play_music, this);
			
			var item;
			var tween;
			for (var i = 0; i < 5; i++)
			{
				item = game.add.sprite(game.world.centerX-120*2 + 120 * i, -100, 'financefunny', i);
				item.anchor.setTo(0.5,0.5);

				// Add a simple bounce tween to each character's position.
				game.add.tween(item).to({y: game.world.centerY-100}, 2400, Phaser.Easing.Bounce.Out, true, 1000 + 400 * i, 0);

				// Add another rotation tween to the same character.
				if(i!=4){
					game.add.tween(item).to({angle: 360}, 2400, Phaser.Easing.Cubic.In, true, 1000 + 400 * i, 0);
				}
				else{
					tween = game.add.tween(item).to({angle: 360}, 2400, Phaser.Easing.Cubic.In, true, 1000 + 400 * i, 0);
				}
				
			}
			tween.onComplete.add(draw_button, this);
			
        },
        update : function() {
			
        }
    };
}