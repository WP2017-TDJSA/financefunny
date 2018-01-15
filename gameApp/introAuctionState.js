const AuctionMachine = require('./AuctionMachine')
const CollectionAuction = require('./CollectionAuction')
const FlowController = require('./flowControl')
const GameData = require('./gameData')
const name = 'test'
const UIMessage = require('./UIMessage')
const UIButton = require('./UIButton')

module.exports = {
    preload : function(game) {
        console.log('[state] introAuctionState')
    },
    create : function(game) {
        this.machine = AuctionMachine(game, 0.32*game.width, 0.05*game.height, 0.35*game.width, 0.8*game.height)
        this.machine.setTitle(['買入','價格','賣出'])
        
        this.CA = CollectionAuction(15)
        this.machine.setDataSource(this.CA)
		this.machine.visible = false;

        GameData.players[name] = new GameData.playerInfo(name, undefined, 0, 0);

        this.errorMessage = UIMessage(game);
        this.CA.onError.add(function(msg) {
            this.errorMessage.showMessage(
                "丟單錯誤",
                msg
            )
        }, this)

        this.resultMessage = UIMessage(game);
        this.CA.onResult.add(function(price, volume) {
            if (price === -1) 
                this.resultMessage.showMessage(
                    "競價失敗", 
                    `找不到成交價`
                )
            else
                this.resultMessage.showMessage(
                    "競價完成", 
                    `本次成交價為 ${price}\n交易量為 ${volume}`
                )
            this.CA.newAuction();
        },this)

        this.CA.newAuction();

        this.FlowController = FlowController(game);
        this.textList = [];
        var style = { font:"30px 微軟正黑體" , fill: "#000000",  align: "center"};
        this.FlowController.add(function() {
			
			var text1 = game.add.text(0.5*game.width,0.2*game.height,'首先，我們會介紹股票的價格是怎麼決定的。',style);
			text1.anchor.set(0.5);
			text1.alpha = 0;
			var text2 = game.add.text(0.5*game.width,0.4*game.height,'在台灣證交所  股票的價格',style);
			text2.anchor.set(0.5);
			text2.alpha = 0;
			var text3 = game.add.text(0.5*game.width,0.5*game.height,'目前是由「集合競價」的方式決定',style);
			text3.anchor.set(0.5);
			text3.alpha = 0;
			var text4 = game.add.text(0.5*game.width,0.6*game.height,'什麼是「集合競價」呢?',style);
			text4.anchor.set(0.5);
			text4.alpha = 0;
			
			var tween1 = game.add.tween(text1).to( { alpha: 1 }, 1000, "Linear", true);
			tween1.onComplete.add(()=>{
				game.add.tween(text1).to( { alpha: 0 }, 1000, "Linear", true,1800);	
			},this);

			var tween2 = game.add.tween(text2).to( { alpha: 1 }, 1000, "Linear", true,4000);
			tween2.onComplete.add(()=>{
				game.add.tween(text3).to( { alpha: 1 }, 1000, "Linear", true,1100);	
			},this);
			var tween3 = game.add.tween(text4).to( { alpha: 1 }, 1000, "Linear", true,8500);
			
			/*
			var text = game.add.text(0.5*game.width,0.5*game.height,'在 台灣證交所 股票的價格\n目前是由集合競價的方式決定\n接下來介紹集合競價是什麼?',style);
            text.x -= text.width/2;
            text.y -= text.height/2;
            text.alpha = 0;
            var tween = game.add.tween(text).to({alpha : 1}, 1000, "Linear", true);
            */
            //this.textList.push(text);
            game.time.events.add(10000, ()=>{
                var button = UIButton(game, 0.5*game.width, 0.72*game.height, '前往下一頁了解->')
                button.events.onInputDown.add(()=>{
                    button.destroy();
                    button.text.destroy();
					game.add.tween(text2).to({alpha : 0}, 500, "Linear", true);
					game.add.tween(text3).to({alpha : 0}, 500, "Linear", true);
					game.add.tween(text4).to({alpha : 0}, 500, "Linear", true);
                    
                    game.time.events.add(800,()=>{
						this.machine.visible = true;
						this.FlowController.finish();
					})
                })
                
            })
        },this)

        this.FlowController.add(function() {
            
            var text = game.add.text(0.32*game.width,0.5*game.height,'大於該價格\n所累計的買入股數',style);
            text.x -= text.width + 15;
            text.alpha = 0;
            var tween = game.add.tween(text).to({alpha : 1}, 1000, "Linear", true);
            
            this.textList.push(text);
            game.time.events.add(2000, ()=>{
                this.FlowController.finish();
            })
        },this)

        this.FlowController.add(function() {
            var text = game.add.text(0.67*game.width,0.5*game.height,'小於該價格\n所累計的賣出股數',style);
            //text.x -= text.width + 15;
            text.alpha = 0;
            var tween = game.add.tween(text).to({alpha : 1}, 1000, "Linear", true);

            this.textList.push(text);
            game.time.events.add(2000, ()=>{
                this.FlowController.finish();
            })
        },this)

        this.FlowController.add(function() {
            var text = game.add.text(0.5*game.width,0.5*game.height,'價格由大到小排序\n紅圈表示上一次成交價',style);
            text.x -= text.width/2;
            text.y += text.height + 15;
            text.alpha = 0;
            var tween = game.add.tween(text).to({alpha : 1}, 1000, "Linear", true);

            this.textList.push(text);
            game.time.events.add(2000, ()=>{
                this.FlowController.finish();
            })
        },this)

        this.FlowController.add(function() {
            var button = UIButton(game, 0.5*game.width, 0.85*game.height, '了解')
            button.events.onInputDown.add(()=>{
                this.textList.forEach(element => {
                    var tween = game.add.tween(element).to({alpha : 0}, 500, "Linear", true);
                    tween.onComplete.add(()=>{
                        element.destroy();
                    })
                    
                });
                button.destroy();
                button.text.destroy();

                this.FlowController.finish();
            })
        },this)
        
        this.FlowController.add(function() {
            game.add.tween(this.machine).to({ x : 0.6*game.width},1500,"Linear", true)
            var str = "集 合 競 價 三 原 則 \n"
            str += "1.滿 足 最 大 成 交 量 成 交 ， 高 於 決 定 價 格 之 買 進 申 報 與 低 於 決 定 價 格 之 賣 出 申 報 須 全 部 滿 足 \n"
            str += "2.決 定 價 格 之 買 進 申 報 與 賣 出 申 報 至 少 一 方 須 全 部 滿 足 \n"
            str += "3.合 乎 前 二 款 原 則 之 價 位 有 二 個 以 上 時 ， 採 接 近 當 市 最 近 一 次 成 交 價 格 之 價 位 \n"
            str += "(取自台灣證交所)"

            var newstyle = Object.assign(style,{font:"22px 微軟正黑體", align : "left",wordWrapWidth : 0.3*game.width,wordWrap : true})
            var text = game.add.text(20,0.5*game.height,str,newstyle);
            text.y -= text.height/2
            text.alpha = 0;
            var tween = game.add.tween(text).to({alpha : 1}, 1500, "Linear", true);
            tween.onComplete.add(()=>{
                this.FlowController.finish();
            })
        },this)

        this.FlowController.add(function() {
            var text = game.add.text(0.5*game.width,0.5*game.height,'歡迎操作與練習',style);
            text.x -= text.width/2;
            text.y -= text.height/2;
            text.alpha = 0;
            var tween = game.add.tween(text).to({alpha : 1}, 1000, "Linear", true);
			game.add.tween(text).to({y : 0.1*game.height}, 1000, "Linear", true);
            tween.onComplete.add(()=>{
                game.time.events.add(300,()=>{
                    this.FlowController.finish();
                })
            })
        },this)

        //elements for buy and sell
        this.slickUI;
        this.set = require('./create')(game,this.slickUI);

        this.FlowController.add(function() {
            var buy = UIButton(game, 0.5*game.width, 0.35*game.height, '新增買入委託')
            buy.events.onInputDown.add(()=>{
				var buytextfield1 =  this.set.slicktext(game.width*0.39,game.height*0.31,game.width*0.12,game.height*0.06);
                var buytextfield2 = this.set.slicktext(game.width*0.39,game.height*0.37,game.width*0.12,game.height*0.06);
                var buybutton = this.set.slickbutton(game.width*0.6,game.height*0.59,game.width*0.07,game.height*0.07);
            	var cancel  = this.set.slickbutton(game.width*0.4,game.height*0.59,game.width*0.07,game.height*0.07);
                
                this.set.getpricecount(butt1,buytextfield1,buytextfield2,buybutton,buytext1,buytext2,text,text2,cancel,buy,sell,(price,count)=>{
                    GameData.players[name].money += price*count;
                    this.CA.addBuy(name, price, count);
                });
            })
            var sell = UIButton(game, 0.5*game.width, 0.5*game.height, '新增賣出委託')
            sell.events.onInputDown.add(()=>{
				var selltextfield1=  this.set.slicktext(game.width*0.39,game.height*0.31,game.width*0.12,game.height*0.06);
                var selltextfield2=  this.set.slicktext(game.width*0.39,game.height*0.37,game.width*0.12,game.height*0.06);
                var sellbutton = this.set.slickbutton(game.width*0.6,game.height*0.59,game.width*0.07,game.height*0.07);
            	var cancel = this.set.slickbutton(game.width*0.4,game.height*0.59,game.width*0.07,game.height*0.07);
                
                this.set.getpricecount(butt1,selltextfield1,selltextfield2,sellbutton,selltext1,selltext2,text,text2,cancel,buy,sell,(price,count)=>{
                    GameData.players[name].stock += count;
                    this.CA.addSell(name, price, count);
                });
            })
            var finish = UIButton(game, 0.5*game.width, 0.65*game.height, '計算成交價')
            finish.events.onInputDown.add(()=>{
                this.CA.Auction();
            })
            var next = UIButton(game, 0.5*game.width, 0.9*game.height, '已了解集合競價')
            next.events.onInputDown.add(()=>{
                var currState = game.state.current;
                var index = Object.keys(game.state.states).indexOf(game.state.current) + 1;
                if (index != Object.keys(game.state.states).length)
                    var nextState = Object.keys(game.state.states)[index];
        
                if (nextState)
                    game.state.start(nextState);
            })
            var butt1 = this.set.createbutt(game.width*0.28, game.height*0.3);
            var buytext1 =this.set.createtext(game.width*0.29,game.height*0.31,"買入價格");
            var buytext2 = this.set.createtext(game.width*0.29,game.height*0.37,"買入數量");
            var text = this.set.createtext(game.width*0.55,game.height*0.59,"確定");
            var text2 = this.set.createtext(game.width*0.35,game.height*0.59,"取消");
            var selltext1 = this.set.createtext(game.width*0.29,game.height*0.31,"賣出價格");
            var selltext2 = this.set.createtext(game.width*0.29,game.height*0.37,"賣出數量");
        },this)
    },
    update : function(game) {

    },
    shutdown : function() {

    }
}