var playerName = 'test';

var flowControler = {
	flowList : [],
	flowComplete : false,
	add : function(thing) {
		this.flowList.push(thing);
	},
	next : function() {
		if (this.flowList.length == 0)
			return;
		var thing = this.flowList[0];
		this.flowList.shift();
		if (thing && typeof thing == "function")
            thing();
	},
	update : function() {
		if (this.flowComplete) {
			this.flowComplete = false;
			this.next();
		}
	} 
}

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
            //this.machine.setData([[10,10,10]])
			
			var player_information = this.walk.display_information(player,window.innerWidth*0.15);
			var buy = this.walk.draw_button(game.width*0.28,game.height*0.35,60,50,'買入');
			var sell = this.walk.draw_button(game.width*0.28,game.height*0.5,60,50,'賣出');
			var finish = this.walk.draw_button(game.width*0.28,game.height*0.65,60,50,'完成');
			buy.inputEnabled = true;
			sell.inputEnabled = true;
			finish.inputEnabled = true;
			
			buy.events.onInputOut.add(this.walk.Out, this);
			buy.events.onInputOver.add(this.walk.Over, this);
			buy.events.onInputDown.add(this.walk.Down, this);
			buy.events.onInputUp.add(this.walk.Up, this);
			sell.events.onInputOut.add(this.walk.Out, this);
			sell.events.onInputOver.add(this.walk.Over, this);
			sell.events.onInputDown.add(this.walk.Down, this);
			sell.events.onInputUp.add(this.walk.Up, this);
			finish.events.onInputOut.add(this.walk.Out, this);
			finish.events.onInputOver.add(this.walk.Over, this);
			finish.events.onInputDown.add(this.walk.Down, this);
			finish.events.onInputUp.add(this.walk.Up, this);
			
			// 加入競價邏輯
			this.CA = require('./CollectionAuction')();
			this.CA.onResult.add(function(price, volume) {
                var playerInfo = this.CA.playerInfo(playerName);
                require('./UIMessage')(game, "競價完成", `本次成交價為 ${price}\n交易量為 ${volume}\n你獲得 ${playerInfo.money} 元與 ${playerInfo.stock} 張股票`,() => {
					flowControler.flowComplete = true;	
				})
                this.CA.newAuction();
			},this)
			this.CA.onChange.add(function(list) {
                
                var usearr = [];
                list.reverse().forEach(data=>{
                    usearr.push([data.buyTotal, data.price,data.sellTotal])
                })
                this.machine.setData(usearr);
			},this);
			buy.events.onInputDown.add(function (){
				var price = prompt('價格')
				var count = prompt('數量')
				this.CA.addBuy(playerName, price, count);
			}, this);
			sell.events.onInputDown.add(function (){
				var price = prompt('價格')
				var count = prompt('數量')
				this.CA.addSell(playerName, price, count);
			}, this);
			finish.events.onInputDown.add(function() {
				this.CA.Auction();
			}, this);

			// 遊戲流程控制
			
			// 一開始笨蛋賣股票
			flowControler.add(()=>{
				this.CA.addSell('stupid', 20, 10);
				this.walk.say(stupid, "我用 20 元 賣 10 張股票!",5000);
			})
			flowControler.add(()=>{
				this.CA.addBuy('stupid', 25, 10);
			})
			flowControler.flowComplete = true;
        },
        update : function() {
			flowControler.update();
        }
    };
}