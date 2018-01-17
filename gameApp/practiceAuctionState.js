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
        this.machine = AuctionMachine(game, 0.32*game.width, 0.05*game.height, 0.3*game.width, 0.8*game.height)
        this.machine.setTitle(['買入\n累計股數','價格','賣出\n累計股數'])
        this.machine.alpha = 0

        this.machine2 = AuctionMachine(game, 0.1*game.width, 0.05*game.height, 0.3*game.width, 0.8*game.height);
        this.machine2.setTitle(['買入\n股數','價格','賣出\n股數'])
        this.machine2.alpha = 0;
        
        this.CA = CollectionAuction(15)
        this.machine.setDataSource(this.CA)
        this.CA.onChange.add(function(list) {
            var usearr = [];
            list.reverse().forEach(data=>{
                usearr.push([data.buyCount, data.price,data.sellCount])
            })
            this.machine2.setData(usearr,this.CA.currentPrice);
        },this);
		//this.machine.visible = false;

        GameData.resetPlayers();
        this.playerInfo = new GameData.playerInfo(name, undefined, 0, 0);
        this.addBuy = (price,count)=>{
            GameData.players[name].money += price*count;
            this.CA.addBuy(name, price, count);
        }
        this.addSell = (price,count)=>{
            GameData.players[name].stock += count;
            this.CA.addSell(name, price, count);
        }

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
            game.add.tween(this.machine).to({ x : 0.6*game.width, alpha : 1},1500,"Linear", true)

            var str = "集 合 競 價 三 原 則 \n"
            str += "1.滿 足 最 大 成 交 量 成 交 ， 高 於 決 定 價 格 之 買 進 申 報 與 低 於 決 定 價 格 之 賣 出 申 報 須 全 部 滿 足 \n"
            str += "2.決 定 價 格 之 買 進 申 報 與 賣 出 申 報 至 少 一 方 須 全 部 滿 足 \n"
            str += "3.合 乎 前 二 款 原 則 之 價 位 有 二 個 以 上 時 ， 採 接 近 當 市 最 近 一 次 成 交 價 格 之 價 位 \n"
            str += "(取自台灣證交所)"

            if (!game.device.desktop)
                var newstyle = Object.assign(style,{font:"20px 微軟正黑體", align : "left",wordWrapWidth : 0.3*game.width,wordWrap : true})
            else
                var newstyle = Object.assign(style,{font:"26px 微軟正黑體", align : "left",wordWrapWidth : 0.3*game.width,wordWrap : true})
            var text = game.add.text(game.width*0.5,0.5*game.height,str,newstyle);
            this.ruleText = text;
            text.y -= text.height/2
            text.alpha = 0;
            var tween = game.add.tween(text).to({alpha : 1,x : 0.1*game.width}, 1500, "Linear", true);
            tween.onComplete.add(()=>{
                this.FlowController.finish();
            })
        },this)

        this.FlowController.add(function() {
            var text = game.add.text(0.5*game.width,0.5*game.height,'歡迎操作與練習',style);
            text.x -= text.width/2;
            text.y -= text.height/2;
            text.alpha = 0;
            game.add.tween(text).to({alpha : 1}, 1000, "Linear", true).onComplete.add(()=>{
                game.add.tween(text).to({y : 0.1*game.height}, 1000, "Linear", true).onComplete.add(()=>{
                    game.time.events.add(300,()=>{
                        this.FlowController.finish();
                    })
                })
            })
			
        },this)

        //elements for buy and sell
        this.slickUI;
        this.set = require('./create')(game,this.slickUI);

        this.FlowController.add(function() {
            var showAnother = UIButton(game, 0.25*game.width, 0.85*game.height, '顯示未累計股數')
            
            showAnother.events.onInputOver.add(function() {
                game.add.tween(this.machine2).to({alpha : 1}, 500, "Linear",true)
                game.add.tween(this.ruleText).to({alpha : 0}, 500, "Linear",true)
            },this)
            showAnother.events.onInputOut.add(function() {
                game.add.tween(this.machine2).to({alpha : 0}, 500, "Linear",true)
                game.add.tween(this.ruleText).to({alpha : 1}, 500, "Linear",true)
            },this)

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