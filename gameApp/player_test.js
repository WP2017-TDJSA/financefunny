


var playerName = 'test';
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

function buygetPriceCount(rec,textfield1,textfield2,buybutton,w,x,y,z,cancel,a,b) {

    var price = 0 ,count = 0 ;
    rec.visible = true;
    textfield1.visible = true;
    textfield2.visible = true;
    cancel.visible = true;
    //buybutton.visible = true;
    w.visible = true;
    x.visible = true;
    //y.visible = true;
    z.visible = true;
    if(price == 0 && count == 0){
    textfield1.events.onToggle.add(function (open) {
            console.log('virtual keyboard');
            z.visible = false;
            cancel.visible = false;
            buybutton.visible = false;
            y.visible = false;
        })
    textfield1.events.onOK.add(function(){
        price = parseFloat(textfield1.value);
        console.log(price);
        if(price != 0 &&count != 0 )
    {
    	y.visible = true;
    	buybutton.visible = true;
    }
    z.visible = true;
    cancel.visible = true;
    })
    textfield2.events.onToggle.add(function (open) {
            console.log('virtual keyboard');
            z.visible = false;
            cancel.visible = false;
            buybutton.visible = false;
            y.visible = false;
        })
    
    textfield2.events.onOK.add(function(){
        count = parseFloat(textfield2.value);
        console.log(count);
        if(price != 0 &&count != 0 )
    {
    	y.visible = true;
    	buybutton.visible = true;
    }
    z.visible = true;
    cancel.visible = true;
    })
    
    buybutton.events.onInputDown.addOnce(function(){
        textfield1.visible = false;
        textfield2.visible = false;
        buybutton.visible = false;
        cancel.visible = false;
        rec.visible = false;
        w.visible = false;
        x.visible = false;
        y.visible = false;
        z.visible = false;

        a.visible = true;
        b.visible = true;
      
        currentCA.addBuy('test',price,count);

        })
    cancel.events.onInputDown.addOnce(function(){
    	textfield1.visible = false;
        textfield2.visible = false;
        buybutton.visible = false;
        cancel.visible = false;
        rec.visible = false;
        w.visible = false;
        x.visible = false;
        y.visible = false;
        z.visible = false;
        a.visible = true;
        b.visible = true;
    })

}
}
     
function sellgetPriceCount(rec,textfield1,textfield2,sellbutton,w,x,y,z,cancel,a,b) {
    var price = 0 ,count = 0 ;
    rec.visible = true;
    textfield1.visible = true;
    textfield2.visible = true;
    //sellbutton.visible = true;
    cancel.visible = true;
    w.visible = true;
    x.visible = true;
    //y.visible = true;
    z.visible = true;
    if(price == 0 && count == 0){
    	textfield1.events.onToggle.add(function (open) {
            console.log('virtual keyboard');
            z.visible = false;
            cancel.visible = false;
            sellbutton.visible = false;
            y.visible = false;
        })
    textfield1.events.onOK.add(function(){
        price = parseFloat(textfield1.value);
        console.log(price);
        if(price != 0 &&count != 0 )
    {
    	y.visible = true;
    	sellbutton.visible = true;
    }
    z.visible = true;
    cancel.visible = true;
    })
    textfield2.events.onToggle.add(function (open) {
            console.log('virtual keyboard');
            z.visible = false;
            cancel.visible = false;
            sellbutton.visible = false;
            y.visible = false;
        })
    textfield2.events.onOK.add(function(){
        count = parseFloat(textfield2.value);
        console.log(count);
        if(price != 0 &&count != 0 )
    {
    	y.visible = true;
    	sellbutton.visible = true;
    }
    z.visible = true;
    cancel.visible = true;
    })
    sellbutton.events.onInputDown.addOnce(function(){
        textfield1.visible = false;
        textfield2.visible = false;
        sellbutton.visible = false;
        cancel.visible = false;
        w.visible = false;
        x.visible = false;
        y.visible = false;
        z.visible = false;
        a.visible = true;
        b.visible = true;
        rec.visible = false;
        currentCA.addSell('test',price,count);
        })
    cancel.events.onInputDown.addOnce(function(){
    	textfield1.visible = false;
        textfield2.visible = false;
        sellbutton.visible = false;
        cancel.visible = false;
        rec.visible = false;
        w.visible = false;
        x.visible = false;
        y.visible = false;
        z.visible = false;
        a.visible = true;
        b.visible = true;
    })
}
    
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
            
			var rects = game.add.group();
			//加入玩家與典型人物
			this.walk = require('./walk')(game);
			var player = this.walk.add_one_man(game,'playerwalk',game.width*0.15,game.height*0.4,game.height*0.5,100,1,100,10);
			var stupid = this.walk.add_one_man(game,'stupidwalk',game.width*0.85,game.height*0.4,game.height*0.5,100,-1,100,10);
			
			this.machine = require('./AuctionMachine')(game, 0.4*game.width,0.05*game.height,0.25*game.width,0.6*game.height)
            this.machine.setTitle(['買入','價格','賣出'])
            //this.machine.setData([[10,10,10]])
			
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
			buy.alpha = 1;
			sell.alpha = 1;
			var buy_tween = game.add.tween(buy).to( { alpha: 0 }, 500, "Linear", true, 500, 1);
			var sell_tween = game.add.tween(sell).to( { alpha: 0 }, 500, "Linear", true, 500, 1);
			buy_tween.yoyo(true, 100);
			sell_tween.yoyo(true, 100);
			
			buy.inputEnabled = true;
			sell.inputEnabled = true;

			
			//elements for buy and sell
			var butt1 = game.add.graphics(game.width*0.28, game.height*0.3);
            butt1.beginFill(0x888888,1);
            butt1.lineStyle(2, 0x483D8B, 1);
            butt1.drawRoundedRect(0, 0, game.width*0.4, game.height*0.4,7);
            butt1.endFill();
            butt1.visible = false;
            var buytext1 = game.add.text(game.width*0.28,game.height*0.31,"買入價格",{ font: "22px Arial", fill: "white" });
			
            buytext1.visible = false;
            var buytext2 = game.add.text(game.width*0.28,game.height*0.36,"買入數量",{ font: "22px Arial", fill: "white" });
            buytext2.visible = false;
            var text = game.add.text(game.width*0.55,game.height*0.59,"確定",{ font: "22px Arial", fill: "white" });
            text.visible = false;
            var text2 = game.add.text(game.width*0.35,game.height*0.59,"取消",{ font: "22px Arial", fill: "white" });
            text2.visible = false;
            var selltext1 = game.add.text(game.width*0.28,game.height*0.31,"賣出價格",{ font: "22px Arial", fill: "white" });
            selltext1.visible = false;
            var selltext2 = game.add.text(game.width*0.28,game.height*0.36,"賣出數量",{ font: "22px Arial", fill: "white" });
            selltext2.visible = false;
			buy.events.onInputOut.add(this.walk.Out, this);
			buy.events.onInputOver.add(this.walk.Over, this);
			
			//買東西
			buy.events.onInputDown.add(function(){
				this.walk.Down(buy);
				setTimeout(function (){
					console.log('[state] buy!')
					buy.visible = false;
					sell.visible = false;
					var buytextfield1;
                var buytextfield2;
                var buybutton;
            	var cancel;
                slickUI.add(buytextfield1= new SlickUI.Element.TextField(game.width*0.38,game.height*0.31,game.width*0.12,game.height*0.05));
                slickUI.add(buytextfield2= new SlickUI.Element.TextField(game.width*0.38,game.height*0.36,game.width*0.12,game.height*0.05));
                slickUI.add(buybutton= new SlickUI.Element.Button(game.width*0.6,game.height*0.59,game.width*0.07,game.height*0.07));
                slickUI.add(cancel = new SlickUI.Element.Button(game.width*0.4,game.height*0.59,game.width*0.07,game.height*0.07));
                buytextfield1.visible = false;
                buytextfield2.visible = false;
                buybutton.visible = false;
                cancel.visible = false;
                buygetPriceCount(butt1,buytextfield1,buytextfield2,buybutton,buytext1,buytext2,text,text2,cancel,buy,sell);
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
					buy.visible = false;
					sell.visible = false;
					var selltextfield1;
                var selltextfield2;
                var sellbutton;
            	var cancel;
                slickUI.add(selltextfield1= new SlickUI.Element.TextField(game.width*0.4,game.height*0.31,game.width*0.12,game.height*0.05));
                slickUI.add(selltextfield2= new SlickUI.Element.TextField(game.width*0.4,game.height*0.36,game.width*0.12,game.height*0.05));
                slickUI.add(sellbutton= new SlickUI.Element.Button(game.width*0.6,game.height*0.59,game.width*0.07,game.height*0.07));
                slickUI.add(cancel = new SlickUI.Element.Button(game.width*0.4,game.height*0.59,game.width*0.07,game.height*0.07));
                selltextfield1.visible = false;
                selltextfield2.visible = false;
                sellbutton.visible = false;
                cancel.visible = false;
                sellgetPriceCount(butt1,selltextfield1,selltextfield2,sellbutton,selltext1,selltext2,text,text2,cancel,buy,sell);
				},300)
			}, this);
			sell.events.onInputUp.add(this.walk.Up, this);
			finish.events.onInputOut.add(this.walk.Out, this);
			finish.events.onInputOver.add(this.walk.Over, this);
			finish.events.onInputDown.add(this.walk.Down, this);
			finish.events.onInputUp.add(this.walk.Up, this);
            
            this.message = require('./UIMessage')(game);
			// 加入競價邏輯
			this.CA = require('./CollectionAuction')();
			currentCA = this.CA;
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
			this.CA.onChange.add(function(list) {
                
                var usearr = [];
                list.reverse().forEach(data=>{
                    usearr.push([data.buyTotal, data.price,data.sellTotal])
                })
                this.machine.setData(usearr);
			},this);
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
			
			// 一開始笨蛋賣股票
			this.flowControler.add(()=>{
				stupid.change_money(1000);
				rects.add(stupid._money_rect);
				stupid.change_stock(10);
				rects.add(stupid._stock_rect);
				player.change_money(200,player_information);
				rects.add(player._money_rect);
				player.change_stock(0,player_information);
				rects.add(player._stock_rect);
				this.CA.addSell('stupid', 20, 10);
                this.walk.say(stupid,game.width*0.07,game.height*0.1, "我用 20 元 賣 10 張股票!",5000);
                
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
			//flowControler.flowComplete = true;
        },
        update : function() {
			//flowControler.update();
        }
    };
}