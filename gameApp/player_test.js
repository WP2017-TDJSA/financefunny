


var playerName = 'player';
var currentCA;

/*var flowControler = {
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
}*/



     
function callback(price,count){
    currentCA.addBuy('test',price,count); 

}
function sellcallback(price,count){
    currentCA.addSell('test',price,count); 
}




var slickUI;

module.exports = function(game) {
	return {
        
		preload : function() {
            console.log('[state] player_test')
			slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
            slickUI.load('img/game/theme/kenney.json');

            
        },
        create : function() {
            
			
			game.stage.backgroundColor = "ffffff";
			
			// draw floor
            var floor = game.add.graphics(0, 0);
			floor.lineStyle(10,0x000000,1);
			floor.beginFill(0xffffff,1);
			floor.drawRoundedRect(-10,game.height*0.65,game.width+20,game.height*0.35+10,1);
            floor.endFill();
            
			this.rects = game.add.group();
			//加入玩家與典型人物
			this.walk = require('./walk')(game);
			var player = this.walk.add_one_man(game,'playerwalk',game.width*0.15,game.height*0.4,game.height*0.5,100,1,100,10);
			var stupid = this.walk.add_one_man(game,'stupidwalk',game.width*0.85,game.height*0.4,game.height*0.5,100,-1,100,10);

            // 加入玩家資料
            this.gameData = require('./gameData');
            this.gameData.players[playerName] = new this.gameData.playerInfo(player, 300, 0)
            this.gameData.players['stupid'] = new this.gameData.playerInfo(stupid, 1000,10)
            this.gameData.state = this.gameData.States.begin;

            
            debugGUI = new dat.GUI();
            debugGUI.needUpdate = []

            var p1 = debugGUI.addFolder(playerName);
            debugGUI.needUpdate.push(p1.add(this.gameData.players[playerName], "money").min(0));
            debugGUI.needUpdate.push(p1.add(this.gameData.players[playerName], "stock").min(0));
            var p2 = debugGUI.addFolder('stupid');
            debugGUI.needUpdate.push(p2.add(this.gameData.players['stupid'], "money").min(0));
            debugGUI.needUpdate.push(p2.add(this.gameData.players['stupid'], "stock").min(0));
            
            debugGUI.needUpdate.push(debugGUI.add(this.gameData, "state"))


			this.machine = require('./AuctionMachine')(game, 0.4*game.width,0.05*game.height,0.25*game.width,0.6*game.height)
            this.machine.setTitle(['買入','價格','賣出'])
            //this.machine.setData([[10,10,10]];
			
			var player_information = this.walk.display_information(player,window.innerWidth*0.15);
			var buy = this.walk.draw_button(game.width*0.28,game.height*0.24,60,50,'買入');
			var sell = this.walk.draw_button(game.width*0.28,game.height*0.39,60,50,'賣出');
			var finish = this.walk.draw_button(game.width*0.28,game.height*0.54,60,50,'完成');

			finish.inputEnabled = true;			
			
			var content = ['按 下 買 入 或 賣 出 按 鈕 並 輸 入 單 張 股 票 金 額 與 數 量'];
			var style = { font:"24px 微軟正黑體" , fill: "#000000",  align: "center"};
			var instruction = game.add.text(game.width*0.5,game.height*0.8 , content, style);
			instruction.anchor.set(0.5);
			instruction.alpha = 0;
			game.add.tween(instruction).to( { alpha: 1 }, 2000, "Linear", true);
			//this.display = require('./TextType')(game,game.width*0.25,game.height*0.8,game.width*0.7,content);
			/*
			buy.alpha = 1;
			sell.alpha = 1;
			var buy_tween = game.add.tween(buy).to( { alpha: 0 }, 500, "Linear", true, 500, 1);
			var sell_tween = game.add.tween(sell).to( { alpha: 0 }, 500, "Linear", true, 500, 1);
			buy_tween.yoyo(true, 100);
			sell_tween.yoyo(true, 100);
			*/
			buy.inputEnabled = true;
			sell.inputEnabled = true;

			
			//elements for buy and sell
            this.set = require('./create')(game,slickUI);
			var butt1 = this.set.createbutt(game.width*0.28, game.height*0.3);
            var buytext1 =this.set.createtext(game.width*0.28,game.height*0.31,"買入價格");
            var buytext2 = this.set.createtext(game.width*0.28,game.height*0.36,"買入數量");
            var text = this.set.createtext(game.width*0.55,game.height*0.59,"確定");
            var text2 = this.set.createtext(game.width*0.35,game.height*0.59,"取消");
            var selltext1 = this.set.createtext(game.width*0.28,game.height*0.31,"賣出價格");
            var selltext2 = this.set.createtext(game.width*0.28,game.height*0.36,"賣出數量");
			buy.events.onInputOut.add(this.walk.Out, this);
			buy.events.onInputOver.add(this.walk.Over, this);
			//買東西
			buy.events.onInputDown.add(function(){
				this.walk.Down(buy);
				setTimeout(function (){
					console.log('[state] buy!')
                    this.set = require('./create')(game,slickUI);
				buy.visible = false;
				sell.visible = false;
				var buytextfield1 =  this.set.slicktext(game.width*0.38,game.height*0.31,game.width*0.12,game.height*0.05);
                var buytextfield2 = this.set.slicktext(game.width*0.38,game.height*0.36,game.width*0.12,game.height*0.05);
                var buybutton = this.set.slickbutton(game.width*0.6,game.height*0.59,game.width*0.07,game.height*0.07);
            	var cancel  = this.set.slickbutton(game.width*0.4,game.height*0.59,game.width*0.07,game.height*0.07);
                //var callback = this.set.call(price,count);
                
                this.set.getpricecount(butt1,buytextfield1,buytextfield2,buybutton,buytext1,buytext2,text,text2,cancel,buy,sell,callback);
                
                
				},300)
			}, this);
			buy.events.onInputUp.add(this.walk.Up, this);
			sell.events.onInputOut.add(this.walk.Out, this);
			sell.events.onInputOver.add(this.walk.Over, this);
			
			//賣東西
			sell.events.onInputDown.add(function(){
				this.walk.Down(sell);
				setTimeout(function (){
					console.log('[state] sell!')
                    this.set = require('./create')(game,slickUI);
					buy.visible = false;
					sell.visible = false;
				var selltextfield1=  this.set.slicktext(game.width*0.4,game.height*0.31,game.width*0.12,game.height*0.05);
                var selltextfield2=  this.set.slicktext(game.width*0.4,game.height*0.36,game.width*0.12,game.height*0.05);
                var sellbutton = this.set.slickbutton(game.width*0.6,game.height*0.59,game.width*0.07,game.height*0.07);
            	var cancel = this.set.slickbutton(game.width*0.4,game.height*0.59,game.width*0.07,game.height*0.07);
                
                this.set.getpricecount(butt1,selltextfield1,selltextfield2,sellbutton,selltext1,selltext2,text,text2,cancel,buy,sell,sellcallback);
				},300)
			}, this);
			sell.events.onInputUp.add(this.walk.Up, this);
			finish.events.onInputOut.add(this.walk.Out, this);
			finish.events.onInputOver.add(this.walk.Over, this);
			finish.events.onInputDown.add(this.walk.Down, this);
			finish.events.onInputUp.add(this.walk.Up, this);
            
            this.message = require('./UIMessage')(game);
            this.message.onClose.add(function (){
                this.gameData.state = this.gameData.States.auction
            }, this);
			// 加入競價邏輯
			this.CA = require('./CollectionAuction')(20);
            currentCA = this.CA;
            var debugCA = {
                name : "",
                price : 0,
                count : 0,
                buy : () => {
                    this.CA.addBuy(debugCA.name, debugCA.price, debugCA.count);
                },
                sell : () => {
                    this.CA.addSell(debugCA.name, debugCA.price, debugCA.count);
                }
            }
            var p3 = debugGUI.addFolder('Collection Auction')
            p3.add(debugCA, "name")
            p3.add(debugCA, "price").min(0)
            p3.add(debugCA, "count").min(0)
            p3.add(debugCA, "buy")
            p3.add(debugCA, "sell")
            //p3.add(this.CA, "currentPrice")
            //p3.add(this.CA, "currentVolume")
            this.CA.onAuction.add(function(){
                this.gameData.state = this.gameData.States.auctioning;
            },this)

			this.CA.onResult.add(function(price, volume) {
                var playerInfo = this.CA.playerInfo(playerName);
                if (price === -1) 
                    this.message.showMessage(
                        "競價失敗", 
                        `找不到成交價\n你獲得 ${playerInfo.money} 元與 ${playerInfo.stock} 張股票`
                    )
                else
                    this.message.showMessage(
                        "競價完成", 
                        `本次成交價為 ${price}\n交易量為 ${volume}\n你獲得 ${playerInfo.money} 元與 ${playerInfo.stock} 張股票`
                    )
                this.CA.newAuction();
            },this)
            this.CA.onResult.add(function(){
                this.gameData.state = this.gameData.States.result;
            },this)
			this.CA.onChange.add(function(list) {
                
                var usearr = [];
                list.reverse().forEach(data=>{
                    usearr.push([data.buyTotal, data.price,data.sellTotal])
                })
                this.machine.setData(usearr);
            },this);
            this.errorMessage = require('./UIMessage')(game);
            this.CA.onError.add(function(msg) {
                this.errorMessage.showMessage(
                    "丟單錯誤",
                    msg
                )
            }, this)
			/*buy.events.onInputDown.add(function (){
				var price = prompt('價格')
				var count = prompt('數量')
				this.CA.addBuy(playerName, price, count);
			}, this);
			sell.events.onInputDown.add(function (){
				var price = prompt('價格')
				var count = prompt('數量')
				this.CA.addSell(playerName, price, count);
			}, this);*/
			finish.events.onInputDown.add(function() {
				this.CA.Auction();
			}, this);

            // 遊戲流程控制
            this.flowControler = require('./flowControl')(game);
			
			//按鈕閃爍
			this.flowControler.add(()=>{
				buy.alpha = 1;
				sell.alpha = 1;
				var buy_tween = game.add.tween(buy).to( { alpha: 0 }, 500, "Linear", true, 500, 1);
				var sell_tween = game.add.tween(sell).to( { alpha: 0 }, 500, "Linear", true, 500, 1);
				buy_tween.yoyo(true, 100);
				sell_tween.yoyo(true, 100);
				buy_tween.onComplete.add(()=>{
					this.flowControler.finish();
				},this);
			},this);
		
            // 一開始笨蛋賣股票'
            this.flowControler.add(()=>{
                this.gameData.state = this.gameData.States.auction;
                game.time.events.add(1000,()=>{this.flowControler.finish()},this)
            })
            
			this.flowControler.add(()=>{
				this.CA.addSell('stupid', 20, 10);
				stupid.say("我用 20 元 賣 10 張股票!",5000);
                //this.walk.say(stupid,game.width*0.07,game.height*0.1, "我用 20 元 賣 10 張股票!",5000);
                
                // set finish condition
                this.message.onClose.addOnce(()=>{
                    this.flowControler.finish();
                })
			},this);
			
			this.flowControler.add(()=>{
				this.CA.addBuy('stupid', 25, 10);
                this.walk.say(stupid, "我用 25 元 買 10 張股票!",5000);
                this.message.onClose.addOnce(()=>{
                    this.flowControler.finish();

                    //can add new flow
                    this.flowControler.add(()=>{
                        this.walk.say(stupid, "你好猛", 5000);
                    })
                })
			},this);
            
            
            
        },
        update : function() {
            // data binding
            if (Object.keys(this.gameData.players).length > 0) {
                for (var key in this.gameData.players) {
                    var playerInfo = this.gameData.players[key]
                    // dirty mean need update
                    if (playerInfo.dirty) {
                        playerInfo.name.change_money(playerInfo.money);
				        this.rects.add(playerInfo.name._money_rect);
				        playerInfo.name.change_stock(playerInfo.stock);
				        this.rects.add(playerInfo.name._stock_rect);
                    }
                }
            }

            // 笨蛋人物邏輯的判斷

            // 觀察競價進行的狀態，決定行為
            switch(this.gameData.state) {
                case this.gameData.States.begin:
                    break;
                case this.gameData.States.auction:
                    
                    break;
                case this.gameData.States.auctioning:
                    break;
                case this.gameData.States.result:
                    break;
                default:
                    break;
            }

            // for dat.GUI update value
            if (debugGUI.needUpdate.length != 0) {
                debugGUI.needUpdate.forEach(c => {
                    c.updateDisplay()
                })
            }
        },
        shutdown : function() {
            debugGUI.destroy();
        }
    };
}