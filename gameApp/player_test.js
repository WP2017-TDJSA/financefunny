module.exports = function(game) {
	return {
        
		preload : function() {
            console.log('[state] player_test')
			
        },
        create : function() {
            
			
			game.stage.backgroundColor = "ffffff";
			
			// draw floor
            var floor = game.add.graphics(0, 0);
			floor.lineStyle(10,0x000000,1);
			floor.beginFill(0xffffff,1);
			floor.drawRoundedRect(-10,game.height*0.65,game.width+20,game.height*0.35+10,1);
            floor.endFill();
            
			//加入玩家與典型人物
			this.walk = require('./walk')(game);
			var player = this.walk.add_one_man(game,'playerwalk',game.width*0.15,game.height*0.4,game.height*0.5,100,1,100,10);
			var stupid = this.walk.add_one_man(game,'stupidwalk',game.width*0.85,game.height*0.4,game.height*0.5,100,-1,100,10);
			
			this.machine = require('./AuctionMachine')(game, 0.4*game.width,0.05*game.height,0.25*game.width,0.6*game.height)
            this.machine.setTitle(['買入','價格','賣出'])
            this.machine.setData([[10,10,10]])
			
			var player_information = this.walk.display_information(player,window.innerWidth*0.15);
			var buy = this.walk.draw_button(game.width*0.28,game.height*0.35,60,50,'買入');
			var sell = this.walk.draw_button(game.width*0.28,game.height*0.5,60,50,'賣出');
			
			
			var content = ['按 下 買 入 或 賣 出 按 鈕 並 輸 入 單 張 股 票 金 額 與 數 量'];
			var style = { font:"24px 微軟正黑體" , fill: "#000000",  align: "center"};
			var instruction = game.add.text(game.width*0.5,game.height*0.8 , content, style);
			instruction.anchor.set(0.5);
			instruction.alpha = 0;
			game.add.tween(instruction).to( { alpha: 1 }, 2000, "Linear", true);
			//this.display = require('./TextType')(game,game.width*0.25,game.height*0.8,game.width*0.7,content);
			buy.alpha = 1;
			sell.alpha = 1;
			var buy_tween = game.add.tween(buy).to( { alpha: 0 }, 500, "Linear", true, 500, 1);
			var sell_tween = game.add.tween(sell).to( { alpha: 0 }, 500, "Linear", true, 500, 1);
			buy_tween.yoyo(true, 100);
			sell_tween.yoyo(true, 100);
			
			buy.inputEnabled = true;
			sell.inputEnabled = true;
			buy.events.onInputOut.add(this.walk.Out, this);
			buy.events.onInputOver.add(this.walk.Over, this);
			buy.events.onInputDown.add(function(){
				this.walk.Down(buy);
				setTimeout(function (){
					console.log('[state] buy!')
				},300)
			}, this);
			buy.events.onInputUp.add(this.walk.Up, this);
			sell.events.onInputOut.add(this.walk.Out, this);
			sell.events.onInputOver.add(this.walk.Over, this);
			sell.events.onInputDown.add(function(){
				this.walk.Down(sell);
				setTimeout(function (){
					console.log('[state] sell!')
				},300)
			}, this);
			sell.events.onInputUp.add(this.walk.Up, this);
			
        },
        update : function() {
			
        }
    };
}