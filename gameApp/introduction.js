var butt;
var button_music;
function draw_button(){
	var style = { font:"24px 微軟正黑體" , fill: "#ffffff",  align: "center"};
	butt =  {
		_rect : game.add.graphics(game.width*0.5-125,game.height*0.8),
		_text : game.add.text(game.width*0.5, game.height*0.8+30 , '來玩遊戲吧 ->', style)
	};
	butt._rect.anchor.set(0.5);
	butt._text.anchor.set(0.5);
	butt._text.alpha = 0.1;
	butt._rect.lineStyle(2,0x000000,1);
	butt._rect.beginFill(0x5aedb9,1);
	butt._rect.drawRoundedRect(0, 0, 250, 60,20);
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
	but.x = game.width*0.5-125;
	but.y = game.height*0.8;
	but.scale.setTo(1, 1);
	butt._text.scale.x = 1;
	butt._text.scale.y = 1;
}
function Over(but){
	but.x = game.width*0.5-125-2;
	but.y = game.height*0.8-2;
	but.scale.setTo(1.05, 1.05);
	butt._text.scale.x = 1.05;
	butt._text.scale.y = 1.05;
}
function Down(but){
	button_music.play();
	but.clear();
	but.x = game.width*0.5-125+2;
	but.y = game.height*0.8+2;
	but.scale.setTo(0.95, 0.95);
	butt._text.scale.x = 0.95;
	butt._text.scale.y = 0.95;
	but.lineStyle(3,0x000000,1);
	but.beginFill(0x17ab76,1);
	but.drawRoundedRect(0, 0, 250, 60,20);
	but.endFill();
	setTimeout(function () {
		game.state.start('instruction');
	}, 300)
}
module.exports = function(game) {
	return {
        
		preload : function() {
            console.log('[state] introduction')
			
        },
        create : function() {
			game.stage.backgroundColor = "ffffff";
			button_music = game.add.audio('button_click');
            var style = { font:"22px 微軟正黑體" , fill: "#000000",  align: "center"};
			var content = "到底「股票」是什麼呢?\n為什麼「股票」會漲漲跌跌呢?\n投資人都想在爾虞我詐的股市投資中出奇致勝!\n每天聽股市新聞，但到底什麼是「股票」，你知道嗎?\n\n接下來我們將讓玩家從遊戲中了解股票價格變化的機制，\n與幾位典型人物進行交易，解析其股票買賣策略。\n最後還有沙盒模式，讓這些典型人物來互動，\n讓玩家思考往後該使用哪種策略。\n\n準備好了嗎?那......";
			var introduction = game.add.text(game.world.centerX, game.world.centerY-50 , content, style);
			introduction.anchor.set(0.5);
			setTimeout(function () {
				draw_button();
			}, 1500)
			
        },
        update : function() {
			
        }
    };
}