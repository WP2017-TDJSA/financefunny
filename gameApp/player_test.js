


var playerName = 'player';
var currentCA;
var player;
var stupid;
var happenP = 0.5;
var round_number = 1;
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



     
function callback(price,count) {
    currentCA.addBuy(playerName, price, count); 
}

function sellcallback(price,count){
    currentCA.addSell(playerName, price, count); 
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
			floor.lineStyle(4,0x000000,1);
			floor.beginFill(0xffffff,1);
			floor.drawRoundedRect(-10,game.height*0.65,game.width+20,game.height*0.35+10,1);
            floor.endFill();
            
			this.rects = game.add.group();
			//加入玩家與典型人物
			this.walk = require('./walk')(game);
			player = this.walk.add_one_man(game,'playerwalk',game.width*0.15,game.height*0.4,game.height*0.5,100,1,100,10);
			stupid = this.walk.add_one_man(game,'stupidwalk',game.width*0.85,game.height*0.4,game.height*0.5,100,-1,100,10);

            // 加入玩家資料
			var initial_money = 300
            this.gameData = require('./gameData');
            this.gameData.players = {};
            this.gameData.players[playerName] = new this.gameData.playerInfo(playerName,player, initial_money, 0)
            this.gameData.players['stupid'] = new this.gameData.playerInfo('stupid',stupid, 100,10)
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
			
			this.player_information = this.walk.display_information(player,window.innerWidth*0.15);
			
			var buy = this.walk.draw_button(game.width*0.28,game.height*0.24,60,50,'買入');
			var sell = this.walk.draw_button(game.width*0.28,game.height*0.39,60,50,'賣出');
			var finish = this.walk.draw_button(game.width*0.28,game.height*0.54,60,50,'完成');

			finish.inputEnabled = true;			
			
			var content = ['你 將 與 對 方 進 行 五 個 回 合 的 買 賣 \n 按 下 買 入 或 賣 出 按 鈕 並 輸 入 單 張 股 票 金 額 與 數 量 \n若 要 結 束 該 回 合 請 按 完 成'];
			var style = { font:"24px 微軟正黑體" , fill: "#000000",  align: "center"};
			var instruction = game.add.text(game.width*0.5,game.height*0.82 , content, style);
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
				setTimeout(function (){
					console.log('[state] buy!')
                    this.set = require('./create')(game,slickUI);
				buy.visible = false;
				sell.visible = false;
				var buytextfield1 =  this.set.slicktext(game.width*0.39,game.height*0.31,game.width*0.12,game.height*0.06);
                var buytextfield2 = this.set.slicktext(game.width*0.39,game.height*0.37,game.width*0.12,game.height*0.06);
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
				var selltextfield1=  this.set.slicktext(game.width*0.39,game.height*0.31,game.width*0.12,game.height*0.06);
                var selltextfield2=  this.set.slicktext(game.width*0.39,game.height*0.37,game.width*0.12,game.height*0.06);
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
                if(round_number <=5){
					this.gameData.state = this.gameData.States.auction;
					instruction.setText('回 合 : '+ round_number +' / 5\n'+' 按 下 買 入 或 賣 出 按 鈕 並 輸 入 單 張 股 票 金 額 與 數 量 \n若 要 結 束 該 回 合 請 按 完 成');
				}
				else{
					instruction.setText('');
					buy.inputEnabled = false;
					sell.inputEnabled = false;
					finish.inputEnabled = false;
					buy.alpha = 0;
					sell.alpha = 0;
					finish.alpha = 0;
					this.machine.visible = false;
					if(player._money>initial_money){
						stupid.say('你太猛啦!\n我輸了QQ',2500);
						game.time.events.add(2500,function(){
							player.say('嘿嘿~\n我賺到錢了~',2500);
						},this)
						
					}
					else if(player._money < initial_money){
						stupid.say('嘿嘿~\n我賺到錢了~',2500);
						game.time.events.add(2500,function(){
							player.say('嗚嗚嗚...\n我的錢QQ',2500);
						},this)
					}
					else{
						stupid.say('我們平手~',2500);
						game.time.events.add(2500,function(){
							player.say('哈哈~',2500);
						},this)
					}
					game.time.events.add(5500,function(){
						instruction.setText('結 束 了 五 回 合 的 買 賣 \n 來 看 看 這 位 典 型 人 物 的 買 賣 策 略 吧 ~\n( 點 一 下 螢 幕 前 往 下 一 頁 )');	
						game.input.onUp.addOnce(function(){
							instruction.setText('');
							this.player_information.alpha = 0;
							this.rects.visible = false;
							this.walk.walk_left(player,-game.width*0.1,25);
							this.walk.walk_left(stupid,game.width*0.5,15);
							content = ['$ 典 型 人 物 - 最 大 的 笨 蛋 $','完 全 不 管 是 否 會 賠 錢 ， 只 要 還 有 錢 都 會 全 部 拿 去 買 股 票 ， 以 最 近 一 次 的 成 交 價 買 入 。 只 要 手 中 有 股 票 ， 便 會 以 更 高 的 價 錢 全 數 賣 出 ， 他 預 期 將 會 有 一 個 更 大 的 笨 蛋 從 他 手 中 買 走 。'];
							this.display = require('./TextType')(game,game.width*0.08,game.height*0.7,game.width*0.7,content);
							game.time.events.add(12000,function(){
								var butt = this.walk.draw_button(game.width*0.8,game.height*0.85,game.width*0.16,game.height*0.08,'下一位典型人物');
								butt.inputEnabled = true;
								
								butt.events.onInputOut.add(this.walk.Out, this);
								butt.events.onInputOver.add(this.walk.Over, this);
								butt.events.onInputDown.add(function(){
									this.walk.Down(butt,function (){
										game.state.start('player_rich');
									});
								}, this);
								
							},this)
						}, this);
					},this)
				}
				
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
                        this.gameData.players[debugCA.name] = new this.gameData.playerInfo(debugCA.name, undefined,0,0)
                    
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
            //p3.add(this.CA, "currentPrice")
            //p3.add(this.CA, "currentVolume")
            this.CA.onAuction.add(function(){
                this.gameData.state = this.gameData.States.auctioning;
				round_number ++;
            },this)

			this.CA.onResult.add(function(price, volume) {
                var playerInfo = this.gameData.players[playerName];
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
					
				if (round_number <= 5){
					this.CA.newAuction();
				}
				
            },this)
            this.CA.onResult.add(function(){
                this.gameData.state = this.gameData.States.result;
                // set hasHappen
                if (happenP >= Math.random()) {
                    this.gameData.hasHappen = 1;
                } else {
                    this.gameData.hasHappen = 0;
                }
            },this)
			this.CA.onChange.add(function(list) {
                
                var usearr = [];
                list.reverse().forEach(data=>{
                    usearr.push([data.buyTotal, data.price,data.sellTotal])
                })
                this.machine.setData(usearr,this.CA.currentPrice);
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
                game.time.events.add(1000,()=>{
                    this.gameData.state = this.gameData.States.auction;
                    this.flowControler.finish()
                },this)
            })

			/*this.flowControler.add(()=>{
				this.CA.addSell('stupid', 20, 10);
				stupid.say("我用 20 元 賣 10 張股票!",5000);
                
                // set finish condition
                this.message.onClose.addOnce(()=>{
                    this.flowControler.finish();
                })
			},this);
			
			this.flowControler.add(()=>{
				this.CA.addBuy('stupid', 25, 10);
				stupid.say("我用 25 元 買 10 張股票!",5000);
                this.message.onClose.addOnce(()=>{
                    this.flowControler.finish();

                    //can add new flow
                    this.flowControler.add(()=>{
                       stupid.say("你好猛", 5000);
                    })
                })
			},this);*/
            
            
            this.CA.newAuction();
            this.stupidUpdate = require('./Players').createPlayerLogic(stupid, this.gameData.players['stupid'], this.CA, require('./Players').stupidLogic,0);
        },
        update : function() {
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

            // 笨蛋人物邏輯的判斷
            /*var stupidData = this.gameData.players['stupid']
            // 觀察競價進行的狀態，決定行為
            switch(this.gameData.state) {
                case this.gameData.States.begin:
                    break;
                case this.gameData.States.auction:
                    var saystr = "";
                    // 有股票就想賣股票
                    if (stupidData.stock > 0) {
                        saystr += `我用 ${this.CA.currentPrice+5} 元 賣 ${stupidData.stock} 張股票!\n`
                        this.CA.addSell('stupid', this.CA.currentPrice+5,stupidData.stock)
                    }
                    // 有錢就想買股票
                    if (stupidData.money > 0) {
                        var count = stupidData.money / this.CA.currentPrice;
                        count = Math.floor(count);
                        if (count!=0) {
                            saystr += `我用 ${this.CA.currentPrice} 元 買 ${count} 張股票!\n`
                            this.CA.addBuy('stupid', this.CA.currentPrice,count)
                        }
                    }
                    if (saystr!="")
                        this.stupid.say(saystr, 5000);
                    break;
                case this.gameData.States.auctioning:
                    break;
                case this.gameData.States.result:
                    break;
                default:
                    break;
            }*/
            this.stupidUpdate();

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