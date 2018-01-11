var butt;
var button_music;
function draw_button(){
	var style = { font:"24px 微軟正黑體 " , fill: "#ffffff",  align: "center"};
	butt =  {
		_rect : game.add.graphics(game.world.centerX-75,game.world.centerY+70),
		_text : game.add.text(game.world.centerX, game.world.centerY+100 , '開始', style)
	};
	
	butt._rect.anchor.set(0.5);
	butt._text.anchor.set(0.5);
	butt._text.alpha = 0.1;
	butt._rect.lineStyle(2,0x000000,1);
	butt._rect.beginFill(0x5aedb9,1);
	butt._rect.drawRoundedRect(0, 0, 150, 60,20);
	butt._rect.endFill();
	butt._rect.alpha = 0.1;
	game.add.tween(butt._text).to( { alpha: 1 }, 500, "Linear", true);
	game.add.tween(butt._rect).to( { alpha: 1 }, 500, "Linear", true);
	butt._rect.inputEnabled = true;
	butt._rect.events.onInputOut.add(Out, this);
	butt._rect.events.onInputOver.add(Over, this);
	butt._rect.events.onInputDown.add(Down, this);
}
function Out(but){
	but.x = game.world.centerX-75;
	but.y = game.world.centerY+70;
	but.scale.setTo(1, 1);
	butt._text.scale.x = 1;
	butt._text.scale.y = 1;
}
function Over(but){
	but.x = game.world.centerX-77;
	but.y = game.world.centerY+68;
	but.scale.setTo(1.05, 1.05);
	butt._text.scale.x = 1.05;
	butt._text.scale.y = 1.05;
}
function Down(but){
	button_music.play();
	but.clear();
	but.x = game.world.centerX-73;
	but.y = game.world.centerY+72;
	but.scale.setTo(0.95, 0.95);
	butt._text.scale.x = 0.95;
	butt._text.scale.y = 0.95;
	but.lineStyle(3,0x000000,1);
	but.beginFill(0x17ab76,1);
	but.drawRoundedRect(0, 0, 150, 60,20);
	but.endFill();
	game.time.events.add(300,function(){game.state.start('introduction');},this)
	
}
function play_music(m){
	m.fadeIn(1000,true);
}

module.exports = function(game) {
	return {
        
		preload : function() {
            console.log('[state] start')
			
        },
        create : function() {
			
			button_music = game.add.audio('button_click');
			
			//遊戲背景動畫
			
			var bc = game.add.sprite(game.width/2, game.height/2, 'startanimate');
			bc.anchor.set(0.5,0.5)
			w = bc.width;
			h = bc.height;
			bc.height = game.height*window.devicePixelRatio;
			bc.width = bc.height*w/h;
			//bc.resizeFrame(bc,game.width *2,game.height *2)
			var bc1 = bc.animations.add('circle',[ 0,1,2,3,4,5,6,7,8,9,10,11], 8, true,true);
			bc1.play('circle');
			
			game.stage.backgroundColor = "ffffff";
			
			if (!game.device.desktop) {  
				game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
				game.input.onDown.addOnce(function(){
					game.scale.startFullScreen(false);
				}, this);
				game.input.onUp.addOnce(function(){
					bc.x = game.width/2;
					bc.y = game.height/2;
					bc.height = game.height*window.devicePixelRatio;
					bc.width = bc.height*w/h;
				}, this);	
			}
			
			var item;
			var tween;
			for (var i = 0; i < 5; i++)
			{
				item = game.add.sprite(game.world.centerX-120*2 + 120 * i, -100, 'financefunny', i);
				item.anchor.setTo(0.5,0.5);

				// Add a simple bounce tween to each character's position.
				game.add.tween(item).to({y: game.world.centerY-50}, 2400, Phaser.Easing.Bounce.Out, true, 1000 + 400 * i, 0);

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