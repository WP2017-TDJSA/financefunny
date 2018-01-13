var playerName = 'player';
var currentCA;
var player;
var stupid;
     
function callback(price,count) {
    currentCA.addBuy(playerName, price, count); 
}

function sellcallback(price,count){
    currentCA.addSell(playerName, price, count); 
}

var slickUI;

module.exports = {
    preload : function(game) {
        console.log('[state] player_rich')
		slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        slickUI.load('img/game/theme/kenney.json');
    },
    create : function(game) {        	
		// draw floor
        var floor = game.add.graphics(0, 0);
		floor.lineStyle(4,0x000000,1);
		floor.beginFill(0xffffff,1);
		floor.drawRoundedRect(-10,game.height*0.65,game.width+20,game.height*0.35+10,1);
        floor.endFill();
            
		this.rects = game.add.group();
		//加入玩家與典型人物
		this.walk = require('./walk')(game);
		player = this.walk.add_one_man(game,'playerwalk',game.width*0.15,game.height*0.4,game.height*0.5,100,1,100,10);
		rich = this.walk.add_one_man(game,'richwalk',game.width*0.85,game.height*0.4,game.height*0.5,100,-1,100,10);

        // 加入玩家資料
        this.gameData = require('./gameData');
        this.gameData.players = {};
        this.gameData.players[playerName] = new this.gameData.playerInfo(playerName, player, 300, 0)
        this.gameData.players['rich'] = new this.gameData.playerInfo('rich',rich, 100,10)
        this.gameData.state = this.gameData.States.begin;

            
        debugGUI = new dat.GUI();
        debugGUI.needUpdate = []

        var p1 = debugGUI.addFolder(playerName);
        debugGUI.needUpdate.push(p1.add(this.gameData.players[playerName], "money").min(0));
        debugGUI.needUpdate.push(p1.add(this.gameData.players[playerName], "stock").min(0));
        var p2 = debugGUI.addFolder('rich');
        debugGUI.needUpdate.push(p2.add(this.gameData.players['rich'], "money").min(0));
        debugGUI.needUpdate.push(p2.add(this.gameData.players['rich'], "stock").min(0));


		this.machine = require('./AuctionMachine')(game, 0.4*game.width,0.05*game.height,0.25*game.width,0.6*game.height)
        this.machine.setTitle(['買入','價格','賣出'])
			
		this.player_information = this.walk.display_information(player,window.innerWidth*0.15);
			
		var buy = this.walk.draw_button(game.width*0.28,game.height*0.24,60,50,'買入');
		var sell = this.walk.draw_button(game.width*0.28,game.height*0.39,60,50,'賣出');
		var finish = this.walk.draw_button(game.width*0.28,game.height*0.54,60,50,'完成');
        
        buy.inputEnabled = true;
		sell.inputEnabled = true;
		finish.inputEnabled = true;			
        
        //elements for buy and sell
        this.set = require('./create')(game,slickUI);
		var butt1 = this.set.createbutt(game.width*0.28, game.height*0.3);
        var buytext1 =this.set.createtext(game.width*0.29,game.height*0.31,"買入價格");
        var buytext2 = this.set.createtext(game.width*0.29,game.height*0.37,"買入數量");
        var text = this.set.createtext(game.width*0.55,game.height*0.59,"確定");
        var text2 = this.set.createtext(game.width*0.35,game.height*0.59,"取消");
        var selltext1 = this.set.createtext(game.width*0.29,game.height*0.31,"賣出價格");
        var selltext2 = this.set.createtext(game.width*0.29,game.height*0.37,"賣出數量");
		buy.events.onInputOut.add(this.walk.Out, this);
		buy.events.onInputOver.add(this.walk.Over, this);
		//買東西
		buy.events.onInputDown.add(function(){
			this.walk.Down(buy);
			    game.time.events.add(300, function (){
				    console.log('[state] buy!')
                    this.set = require('./create')(game,slickUI);
				    buy.visible = false;
				    sell.visible = false;
                    var buytextfield1 =  this.set.slicktext(game.width*0.39,game.height*0.31,game.width*0.12,game.height*0.06);
                    var buytextfield2 = this.set.slicktext(game.width*0.39,game.height*0.37,game.width*0.12,game.height*0.06);
                    var buybutton = this.set.slickbutton(game.width*0.6,game.height*0.59,game.width*0.07,game.height*0.07);
                    var cancel  = this.set.slickbutton(game.width*0.4,game.height*0.59,game.width*0.07,game.height*0.07);
                    
                    this.set.getpricecount(butt1,buytextfield1,buytextfield2,buybutton,buytext1,buytext2,text,text2,cancel,buy,sell,callback);

				},this)
			}, this);
		buy.events.onInputUp.add(this.walk.Up, this);
		sell.events.onInputOut.add(this.walk.Out, this);
		sell.events.onInputOver.add(this.walk.Over, this);
			
		//賣東西
		sell.events.onInputDown.add(function(){
			this.walk.Down(sell);
			game.time.events.add(300,function (){
				console.log('[state] sell!')
                this.set = require('./create')(game,slickUI);
				buy.visible = false;
				sell.visible = false;
			    var selltextfield1=  this.set.slicktext(game.width*0.39,game.height*0.31,game.width*0.12,game.height*0.06);
                var selltextfield2=  this.set.slicktext(game.width*0.39,game.height*0.37,game.width*0.12,game.height*0.06);
                var sellbutton = this.set.slickbutton(game.width*0.6,game.height*0.59,game.width*0.07,game.height*0.07);
        	    var cancel = this.set.slickbutton(game.width*0.4,game.height*0.59,game.width*0.07,game.height*0.07);
            
                this.set.getpricecount(butt1,selltextfield1,selltextfield2,sellbutton,selltext1,selltext2,text,text2,cancel,buy,sell,sellcallback);
			},this)
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
                if (!this.gameData.players[debugCA.name])
                    this.gameData.players[debugCA.name] = new this.gameData.playerInfo(debugCA.name, undefined, 0,0)
                
                this.gameData.players[debugCA.name].money += debugCA.price*debugCA.count
                this.CA.addBuy(debugCA.name, debugCA.price, debugCA.count);
            },
            sell : () => {
                if (!this.gameData.players[debugCA.name])
                    this.gameData.players[debugCA.name] = new this.gameData.playerInfo(debugCA.name, undefined,0,0)
                
                this.gameData.players[debugCA.name].stock += debugCA.price*debugCA.count
                this.CA.addSell(debugCA.name, debugCA.price, debugCA.count);
            }
        }
        var p3 = debugGUI.addFolder('Collection Auction')
        p3.add(debugCA, "name")
        p3.add(debugCA, "price").min(0)
        p3.add(debugCA, "count").min(0)
        p3.add(debugCA, "buy")
        p3.add(debugCA, "sell")
        debugGUI.needUpdate.push(p3.add(this.CA, "currentPrice"))
        debugGUI.needUpdate.push(p3.add(this.CA, "currentVolume"))
        this.CA.onAuction.add(function(){
            this.gameData.state = this.gameData.States.auctioning;
        },this)

		this.CA.onResult.add(function(price, volume) {
            var playerInfo = this.gameData.players[playerName];;
            if (price === -1) 
                this.message.showMessage(
                    "競價失敗", 
                    `找不到成交價\n你獲得 ${playerInfo.moneyTotal} 元與 ${playerInfo.stockTotal} 張股票`
                )
            else
                this.message.showMessage(
                    "競價完成", 
                    `本次成交價為 ${price}\n交易量為 ${volume}\n你獲得 ${playerInfo.moneyTotal} 元與 ${playerInfo.stockTotal} 張股票`
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
            this.machine.setData(usearr, this.CA.currentPrice);
        },this);
        this.errorMessage = require('./UIMessage')(game);
        this.CA.onError.add(function(msg) {
            this.errorMessage.showMessage(
                "丟單錯誤",
                msg
            )
        }, this)
		
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

        // 等待1秒後開始
        this.flowControler.add(()=>{
            game.time.events.add(1000,()=>{
                this.gameData.state = this.gameData.States.auction;
                this.flowControler.finish()
            },this)
        })
        this.rich = rich;

        this.CA.newAuction();
        this.richUpdate = require('./Players').createPlayerLogic(rich, this.gameData.players['rich'], this.CA, require('./Players').richLogic);
    },	
    update : function(game) {
        // data binding
        if (Object.keys(this.gameData.players).length > 0) {
            for (var key in this.gameData.players) {
                var playerInfo = this.gameData.players[key]
                // dirty mean need update

                if(playerInfo.dirty){
                    if (!playerInfo.sprite)
                            return;

					if(playerInfo.sprite == player){
						playerInfo.sprite.change_money(playerInfo.money,this.player_information);
						this.rects.add(playerInfo.sprite._money_rect);
						playerInfo.sprite.change_stock(playerInfo.stock,this.player_information);
						this.rects.add(playerInfo.sprite._stock_rect);
					}
					else{
						playerInfo.sprite.change_money(playerInfo.money);
						this.rects.add(playerInfo.sprite._money_rect);
						playerInfo.sprite.change_stock(playerInfo.stock);
						this.rects.add(playerInfo.sprite._stock_rect);
					}
					
				}
				
            }
        }

        this.richUpdate();

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
