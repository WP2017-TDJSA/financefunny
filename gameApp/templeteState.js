





var slickUI;
module.exports = function(game) {
	return {
        
		preload : function() {
            console.log('[state] templete')
            slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
            slickUI.load('img/game/theme/kenney.json');
			
        },
        create : function() {
            
			
			game.stage.backgroundColor = "ffffff";
			
			// draw floor
            var floor = game.add.graphics(0, 0);
			floor.lineStyle(4,0x000000,1);
			floor.beginFill(0xffffff,1);
			floor.drawRoundedRect(-10,game.height*0.65,game.width+20,game.height*0.35+10,1);
            floor.endFill();
            
			//加入玩家與典型人物
			this.walk = require('./walk')(game);
			var player = this.walk.add_one_man(game,'playerwalk',0,game.height*0.4,game.height*0.5,100,1,100,10);
			var player_ani = player._sprite.animations.add('man1_walk_in',[ 0,1,2,3,4,5,6,7,8], 8, true,true);
			player_ani.play('man1_walk_in');
			var stupid = this.walk.add_one_man(game,'stupidwalk',game.width,game.height*0.4,game.height*0.5,100,-1,100,10);
			var stupid_ani = stupid._sprite.animations.add('man2_walk_in',[ 0,1,2,3,4,5,6,7,8], 8, true,true);
			stupid_ani.play('man2_walk_in');
			this.walk.two_people_walk_in(player,stupid,player_ani,stupid_ani);
			
			
            this.machine = require('./AuctionMachine')(game, 0.4*game.width,0.05*game.height,0.25*game.width,0.6*game.height)
            this.machine.setTitle(['買入','價格','賣出'])
            this.machine.setData([[10,10,10]])
			
			
			//顯示玩家的錢和股票數量
			
			var player_information = this.walk.display_information(player,window.innerWidth*0.15);
			
			
			//顯示下面框框的內容
			
			var content = ['$ 典 型 人 物 - 最 大 的 笨 蛋 $','完 全 不 管 某 個 東 西 的 真 實 價 值 ， 只 要 還 有 錢 都 願 意 花 高 價 買 下 ， 因 為 他 預 期 將 會 有 一 個 更 大 的 笨 蛋 出 更 高 的 價 錢 從 他 手 中 買 走 。'];
			this.display = require('./TextType')(game,game.width*0.25,game.height*0.7,game.width*0.7,content);
			

			//畫出買入與賣出的按鈕
			
			var buy = this.walk.draw_button(game.width*0.28,game.height*0.35,60,50,'買入');
			var sell = this.walk.draw_button(game.width*0.28,game.height*0.5,60,50,'賣出');

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

			var slider = new SlickUI.Element.Slider(game.width*0.1,game.height*0.1,game.width*0.2);
			slickUI.add(slider);
			var line = new Phaser.Line(game.width*0.1,game.height*0.1,game.width*0.3,game.height*0.1);
			var graphicsLine = game.add.graphics(0, 0);
    		graphicsLine.clear();
    		graphicsLine.lineStyle(1, 0xddff00, 1);
    		graphicsLine.moveTo(line.start.x, line.start.y);
    		graphicsLine.lineTo(line.end.x, line.end.y);
    		graphicsLine.endFill();
    		var valueText = new SlickUI.Element.Text(game.width*0.31,game.height*0.1, '100%');
    		slickUI.add(valueText);
    		slider.onDrag.add(function (value) {
            	valueText.value = Math.round(value * 100) + '%';
            
        	});
        slider.onDragStart.add(function (value) {
            console.log('Start dragging at ' + Math.round(value * 100) + '%');
        });
        slider.onDragStop.add(function (value) {
            console.log('Stop dragging at ' + Math.round(value * 100) + '%');

        });

			
			
        },
        update : function() {
			
        }
    };
}