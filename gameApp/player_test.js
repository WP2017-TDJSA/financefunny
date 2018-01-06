function buygetPriceCount(rec,textfield1,textfield2,buybutton,x,y,z) {
    var price = 0 ,count = 0 ;
    rec.visible = true;
    textfield1.visible = true;
    textfield2.visible = true;
    buybutton.visible = true;
    x.visible = true;
    y.visible = true;
    z.visible = true;
    if(price == 0 && count == 0){
    textfield1.events.onOK.addOnce(function(){
        price = parseFloat(textfield1.value);
        console.log(price);
    })
    
    textfield2.events.onOK.addOnce(function(){
        count = parseFloat(textfield2.value);
        console.log(count);
    })
    buybutton.events.onInputDown.addOnce(function(){
        textfield1.visible = false;
        textfield2.visible = false;
        buybutton.visible = false;
        rec.visible = false;
        x.visible = false;
        y.visible = false;
        z.visible = false;
        testCA.addBuy('test',price,count);
        })
}
}
     
function sellgetPriceCount(rec,textfield1,textfield2,sellbutton,x,y,z) {
    var price = 0 ,count = 0 ;
    rec.visible = true;
    textfield1.visible = true;
    textfield2.visible = true;
    sellbutton.visible = true;
    x.visible = true;
    y.visible = true;
    z.visible = true;
    if(price == 0 && count == 0){
    textfield1.events.onOK.add(function(){
        price = parseFloat(textfield1.value);
        console.log(price);
    })
    
    textfield2.events.onOK.add(function(){
        count = parseFloat(textfield2.value);
        console.log(count);
    })
    sellbutton.events.onInputDown.add(function(){
        textfield1.visible = false;
        textfield2.visible = false;
        sellbutton.visible = false;
        x.visible = false;
        y.visible = false;
        z.visible = false;
        rec.visible = false;
        testCA.addSell('test',price,count);
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
			//elements for buy and sell
			var butt1 = game.add.graphics(game.width*0.3, game.height*0.3);
            butt1.beginFill(0x888888,1);
            butt1.lineStyle(2, 0x483D8B, 1);
            butt1.drawRoundedRect(0, 0, game.width*0.4, game.height*0.4,7);
            butt1.endFill();
            butt1.visible = false;
            var buytext1 = game.add.text(game.width*0.3,game.height*0.3,"買入價格",{ font: "23px Arial", fill: "white" });
            buytext1.visible = false;
            var buytext2 = game.add.text(game.width*0.3,game.height*0.35,"買入數量",{ font: "23px Arial", fill: "white" });
            buytext2.visible = false;
            var text = game.add.text(game.width*0.6,game.height*0.65,"確定",{ font: "23px Arial", fill: "white" });
            text.visible = false;
            var selltext1 = game.add.text(game.width*0.3,game.height*0.3,"賣出價格",{ font: "23px Arial", fill: "white" });
            selltext1.visible = false;
            var selltext2 = game.add.text(game.width*0.3,game.height*0.35,"賣出數量",{ font: "23px Arial", fill: "white" });
            selltext2.visible = false;


			buy.events.onInputOut.add(this.walk.Out, this);
			buy.events.onInputOver.add(this.walk.Over, this);
			buy.events.onInputDown.add(function(){
				this.walk.Down(buy);
				setTimeout(function (){
					console.log('[state] buy!')
					var buytextfield1;
                var buytextfield2;
                var buybutton;
            
                slickUI.add(buytextfield1= new SlickUI.Element.TextField(game.width*0.4,game.height*0.31,game.width*0.15,game.height*0.05));
                slickUI.add(buytextfield2= new SlickUI.Element.TextField(game.width*0.4,game.height*0.36,game.width*0.15,game.height*0.05));
                slickUI.add(buybutton= new SlickUI.Element.Button(game.width*0.65,game.height*0.65,game.width*0.09,game.height*0.09))
                buytextfield1.visible = false;
                buytextfield2.visible = false;
                buybutton.visible = false;
                buygetPriceCount(butt1,buytextfield1,buytextfield2,buybutton,buytext1,buytext2,text);
				},300)
			}, this);
			buy.events.onInputUp.add(this.walk.Up, this);
			sell.events.onInputOut.add(this.walk.Out, this);
			sell.events.onInputOver.add(this.walk.Over, this);
			sell.events.onInputDown.add(function(){
				this.walk.Down(sell);
				setTimeout(function (){
					console.log('[state] sell!')
					var selltextfield1;
                var selltextfield2;
                var sellbutton;
            
                slickUI.add(selltextfield1= new SlickUI.Element.TextField(game.width*0.4,game.height*0.31,game.width*0.15,game.height*0.05));
                slickUI.add(selltextfield2= new SlickUI.Element.TextField(game.width*0.4,game.height*0.36,game.width*0.15,game.height*0.05));
                slickUI.add(sellbutton= new SlickUI.Element.Button(game.width*0.65,game.height*0.65,game.width*0.09,game.height*0.09));
                selltextfield1.visible = false;
                selltextfield2.visible = false;
                sellbutton.visible = false;
                sellgetPriceCount(butt1,selltextfield1,selltextfield2,sellbutton,selltext1,selltext2,text);
				},300)
			}, this);
			sell.events.onInputUp.add(this.walk.Up, this);
			
        },
        update : function() {
			
        }
    };
}