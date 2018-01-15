var butt;
var button_music;
function draw_button(){
	var style = { font:"20px 微軟正黑體" , fill: "#ffffff",  align: "center"};
	butt =  {
		_rect : game.add.graphics(game.width*0.5-125,game.height*0.8-30),
		_text : game.add.text(game.width*0.5, game.height*0.8-5 , '前往下一頁吧 ->', style)
	};
	butt._rect.anchor.set(0.5);
	butt._text.anchor.set(0.5);
	butt._text.alpha = 0.1;
	butt._rect.lineStyle(2,0x000000,1);
	butt._rect.beginFill(0x5aedb9,1);
	butt._rect.drawRoundedRect(0, 0, 250, 50,20);
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
	but.y = game.height*0.8-30;
	but.scale.setTo(1, 1);
	butt._text.scale.x = 1;
	butt._text.scale.y = 1;
}
function Over(but){
	but.x = game.width*0.5-125-2;
	but.y = game.height*0.8-32;
	but.scale.setTo(1.05, 1.05);
	butt._text.scale.x = 1.05;
	butt._text.scale.y = 1.05;
}
function Down(but){
	button_music.play();
	but.clear();
	but.x = game.width*0.5-125+2;
	but.y = game.height*0.8-28;
	but.scale.setTo(0.95, 0.95);
	butt._text.scale.x = 0.95;
	butt._text.scale.y = 0.95;
	but.lineStyle(3,0x000000,1);
	but.beginFill(0x17ab76,1);
	but.drawRoundedRect(0, 0, 250, 50,20);
	but.endFill();
	game.time.events.add(300,function () {
		var currState = game.state.current;
        var index = Object.keys(game.state.states).indexOf(game.state.current) + 1;
        if (index != Object.keys(game.state.states).length)
         	var nextState = Object.keys(game.state.states)[index];
    
        if (nextState)
        	game.state.start(nextState);
	},this)
	
}
module.exports = function(game) {
	return {
        
		preload : function() {
            console.log('[state] introduction')
			
        },
        create : function() {
			game.stage.backgroundColor = "ffffff";
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
			
			if(window.innerHeight<600)
				var style = { font:"18px 微軟正黑體" , fill: "#000000",  align: "center"};
			else
				var style = { font:"22px 微軟正黑體" , fill: "#000000",  align: "center"};
			var content = ["到 底 「 股 票 」 是 什 麼 呢 ?",
				"為 什 麼 「 股 票 」 會 漲 漲 跌 跌 呢 ?",
				"投 資 人 都 想 在 爾 虞 我 詐 的 股 市 投 資 中 出 奇 致 勝!",
				"每 天  聽 股 市 新 聞 ， 但 到 底 什 麼 是 「 股 票 」 ， 你 知 道 嗎 ?",
				"",
				"接 下 來 我 們 將 讓 玩 家 從 遊 戲 中 了 解 股 票 價 格 變 化 的 機 制，",
				"與 幾 位 典 型 人 物 進 行 交 易 ， 解 析 其 股 票 買 賣 策 略 。",
				"最 後 還 有 沙 盒 模 式 ， 讓 這 些 典 型 人 物 來 互 動，",
				"讓 玩 家 思 考 往 後 該 使 用 哪 種 策 略 。",
				"準 備 好 了 嗎 ? 那 . . . . . ."
			];
			//var introduction = game.add.text(game.world.centerX, game.world.centerY-30 , content, style);
			var introduction = require('./TextType')(game, game.world.centerX, game.world.centerY-30, game.width*0.8, content, "center")
			introduction.anchor.set(0.5);
			/*setTimeout(function () {
				draw_button();
			}, 1500)*/
			introduction.events.onShowAllContent.addOnce(()=>{
				game.time.events.add(200,draw_button,this)
			})
			
        },
        update : function() {
			
        }
    };
}