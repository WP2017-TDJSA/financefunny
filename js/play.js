var player_information;
var option1;
var information;
var bmoney;
var wmoney;
var pmoney;
var play={
	
	preload :function() {
		game.load.image('heart', 'img/game/heart.png');
		game.load.image('white', 'img/game/white.png');
		game.load.image('black', 'img/game/black.png');
	},
	
	create :function() {
		var background = game.add.graphics(0, 0);
		background.beginFill(0xD2B48C,0.8);
		background.lineStyle(2, 0xD2B48C, 1);
		background.drawRoundedRect(0, 0, game.width, game.height,1);
		background.endFill();
		player_information = game.add.graphics(game.width*0.05, game.height*0.05);
		player_information.beginFill(0xFFFFE0,0.8);
		//player_information.lineStyle(2, 0xA52A2A, 1);
		player_information.drawRoundedRect(0, 0, game.width*0.9, game.height*0.1,2);
		player_information.endFill();
		
		information = "玩家:"+player_name+" 黑巧:"+player_black+" 白巧:"+player_white+" 心巧:"+player_heart+" 資金"+player_money
		var style1 = { font: "18px Microsoft JhengHei", fill: "	#000000"};
		option1 = game.add.text(player_information.width / 2, player_information.y+ player_information.height / 2 , information, style1);
		option1.anchor.set(0.5);
		
		butt1 = game.add.graphics(game.width*0.84, game.height*0.06);
		butt1.beginFill(0xFFFFE0,0.8);
		butt1.lineStyle(2, 0xA52A2A, 1);
		butt1.drawRoundedRect(0, 0, game.width*0.1, game.height*0.08,7);
		butt1.endFill();
		
		var style2 = { font: "18px Microsoft JhengHei", fill: "	#000000",  align: "center"};
		done = game.add.text(butt1.x+ butt1.width / 2, butt1.y+ butt1.height / 2 , "Done", style2);
		done.anchor.set(0.5);
		
		butt1.inputEnabled=true;
		butt1.events.onInputOut.add(this.out, this);
		butt1.events.onInputOver.add(this.over, this);
		butt1.events.onInputDown.add(this.listen_next,this);
		
		var black= game.add.image(game.width*0.1, game.height*0.2, "black");
		black.width = game.width*0.2*window.devicePixelRatio;
		black.height = game.height*0.2*window.devicePixelRatio;
		
		var white= game.add.image(game.width*0.4, game.height*0.2, "white");
		white.width = game.width*0.2*window.devicePixelRatio;
		white.height = game.height*0.2*window.devicePixelRatio;
		
		var heart= game.add.image(game.width*0.7, game.height*0.2, "heart");
		heart.width = game.width*0.2*window.devicePixelRatio;
		heart.height = game.height*0.2*window.devicePixelRatio;

		bmoney = game.add.text(game.width*0.1,game.height*0.45,"單價: $"+black_price,{ font: "24px Microsoft JhengHei", fill: "white" });
		wmoney = game.add.text(game.width*0.4,game.height*0.45,"單價: $"+white_price,{ font: "24px Microsoft JhengHei", fill: "white" });
		pmoney = game.add.text(game.width*0.7,game.height*0.45,"單價: $"+heart_price,{ font: "24px Microsoft JhengHei", fill: "white" });
		
		var bamount = game.add.text(game.width*0.1,game.height*0.57,"現有數量:"+system_black,{ font: "24px Microsoft JhengHei", fill: "white" });
		var wamount = game.add.text(game.width*0.4,game.height*0.57,"現有數量:"+system_white,{ font: "24px Microsoft JhengHei", fill: "white" });
		var pamount = game.add.text(game.width*0.7,game.height*0.57,"現有數量:"+system_heart,{ font: "24px Microsoft JhengHei", fill: "white" });

		
		var bbutton1 = game.add.graphics(game.width*0.1,game.height*0.7);
		bbutton1.beginFill(0xfffafa,0.5);
		bbutton1.lineStyle(2, 0x483D8B, 1);
		bbutton1.drawRoundedRect(0, 0, game.width*0.2, game.height*0.1,7);
		bbutton1.endFill();
		bbutton1.inputEnabled = true;
		bbutton1.input.useHandCursor = true;

		bbutton1.events.onInputDown.add(bbuy, this);
		bbutton1.events.onInputUp.add(onUp, this);
		bbutton1.events.onInputOver.add(onOver, this);
		bbutton1.events.onInputOut.add(onOut, this);
		var wbutton1 = game.add.graphics(game.width*0.4,game.height*0.7);
		wbutton1.beginFill(0xfffafa,0.5);
		wbutton1.lineStyle(2, 0x483D8B, 1);
		wbutton1.drawRoundedRect(0, 0, game.width*0.2, game.height*0.1,7);
		wbutton1.endFill();
		wbutton1.inputEnabled = true;
		wbutton1.input.useHandCursor = true;

		wbutton1.events.onInputDown.add(wbuy, this);
		wbutton1.events.onInputUp.add(onUp, this);
		wbutton1.events.onInputOver.add(onOver, this);
		wbutton1.events.onInputOut.add(onOut, this);
		var pbutton1 = game.add.graphics(game.width*0.7,game.height*0.7);
		pbutton1.beginFill(0xfffafa,0.5);
		pbutton1.lineStyle(2, 0x483D8B, 1);
		pbutton1.drawRoundedRect(0, 0, game.width*0.2, game.height*0.1,7);
		pbutton1.endFill();
		pbutton1.inputEnabled = true;
		pbutton1.input.useHandCursor = true;

		pbutton1.events.onInputDown.add(pbuy, this);
		pbutton1.events.onInputUp.add(onUp, this);
		pbutton1.events.onInputOver.add(onOver, this);
		pbutton1.events.onInputOut.add(onOut, this);
		var bbutton2 = game.add.graphics(game.width*0.1,game.height*0.85);
		bbutton2.beginFill(0xfffafa,0.5);
		bbutton2.lineStyle(2, 0x483D8B, 1);
		bbutton2.drawRoundedRect(0, 0, game.width*0.2, game.height*0.1,7);
		bbutton2.endFill();
		bbutton2.inputEnabled = true;
		bbutton2.input.useHandCursor = true;

		bbutton2.events.onInputDown.add(bsell, this);
		bbutton2.events.onInputUp.add(onUp, this);
		bbutton2.events.onInputOver.add(onOver, this);
		bbutton2.events.onInputOut.add(onOut, this);
		var wbutton2 = game.add.graphics(game.width*0.4,game.height*0.85);
		wbutton2.beginFill(0xfffafa,0.5);
		wbutton2.lineStyle(2, 0x483D8B, 1);
		wbutton2.drawRoundedRect(0, 0, game.width*0.2, game.height*0.1,7);
		wbutton2.endFill();
		wbutton2.inputEnabled = true;
		wbutton2.input.useHandCursor = true;

		wbutton2.events.onInputDown.add(wsell, this);
		wbutton2.events.onInputUp.add(onUp, this);
		wbutton2.events.onInputOver.add(onOver, this);
		wbutton2.events.onInputOut.add(onOut, this);
		var pbutton2 = game.add.graphics(game.width*0.7,game.height*0.85);
		pbutton2.beginFill(0xfffafa,0.5);
		pbutton2.lineStyle(2, 0x483D8B, 1);
		pbutton2.drawRoundedRect(0, 0, game.width*0.2, game.height*0.1,7);
		pbutton2.endFill();
		pbutton2.inputEnabled = true;
		pbutton2.input.useHandCursor = true;

		pbutton2.events.onInputDown.add(psell, this);
		pbutton2.events.onInputUp.add(onUp, this);
		pbutton2.events.onInputOver.add(onOver, this);
		pbutton2.events.onInputOut.add(onOut, this);

		var style = { font: "18px Microsoft JhengHei", fill: "#000000",  align: "center"};
		var bbutton1text = game.add.text(bbutton1.x + bbutton1.width/2,bbutton1.y + bbutton1.height/2,"買  入",style);
		bbutton1text.anchor.set(0.5);
		var bbutton2text = game.add.text(bbutton2.x + bbutton2.width/2,bbutton2.y + bbutton2.height/2,"賣  出",style);
		bbutton2text.anchor.set(0.5);
		var wbutton1text = game.add.text(wbutton1.x + wbutton1.width/2,wbutton1.y + wbutton1.height/2,"買  入",style);
		wbutton1text.anchor.set(0.5);
		var wbutton2text = game.add.text(wbutton2.x + wbutton2.width/2,wbutton2.y + wbutton2.height/2,"賣  出",style);
		wbutton2text.anchor.set(0.5);
		var pbutton1text = game.add.text(pbutton1.x + pbutton1.width/2,pbutton1.y + pbutton1.height/2,"買  入",style);
		pbutton1text.anchor.set(0.5);
		var pbutton2text = game.add.text(pbutton2.x + pbutton2.width/2,pbutton2.y + pbutton2.height/2,"賣  出",style);
		pbutton2text.anchor.set(0.5);

		function bbuy(){

			var number=prompt("請輸入你要購買的數量","1~10");
			var money=prompt("請輸入你要購買的價錢","1~1000");
			if(isNaN(number)||isNaN(money))
			{
				
			}
			else
			{
				player_money -= number*money;
				if (player_money<0)
				{
					player_money += number*money;
					alert("資金不足!")
				}
				else
				{
					information = "玩家:"+player_name+" 黑巧克力:"+player_black+" 白巧克力:"+player_white+" 心型巧克力:"+player_heart+" 資金"+player_money
					option1.setText(information);
					black_Auction.addBuy(player_name, money, number);
				}
			}
		}
		function bsell(){
			var money=prompt("請輸入你要賣出的價錢","1~1000");
			var number=prompt("請輸入你要賣的數量","1~10");
			if(isNaN(number)||isNaN(money))
			{
				
			}
			else
			{	
				player_black -= number;
				if (player_black<0)
				{
					player_black += number;
					alert("巧克力不足!")
				}
				else
				{
					information = "玩家:"+player_name+" 黑巧克力:"+player_black+" 白巧克力:"+player_white+" 心型巧克力:"+player_heart+" 資金"+player_money
					option1.setText(information);
					black_Auction.addSell(player_name, money, number);
				}
			}
		}
		function wbuy(){
			var money=prompt("請輸入你要購買的價錢","1~1000");
			var number=prompt("請輸入你要購買的數量","1~10");
			if(isNaN(number)||isNaN(money))
			{
				
			}
			else
			{
				player_money -= number*money;
				if (player_money<0)
				{
					player_money += number*money;
					alert("資金不足!")
				}
				else
				{
					information = "玩家:"+player_name+" 黑巧克力:"+player_black+" 白巧克力:"+player_white+" 心型巧克力:"+player_heart+" 資金"+player_money
					option1.setText(information);
					white_Auction.addBuy(player_name, money, number);
				}
			}
		}
		function wsell(){
			var money=prompt("請輸入你要賣出的價錢","1~1000");
			var number=prompt("請輸入你要賣的數量","1~10");
			if(isNaN(number)||isNaN(money))
			{
				
			}
			else
			{	
				player_white -= number;
				if (player_white<0)
				{
					player_white += number;
					alert("巧克力不足!")
				}
				else
				{
					information = "玩家:"+player_name+" 黑巧克力:"+player_black+" 白巧克力:"+player_white+" 心型巧克力:"+player_heart+" 資金"+player_money
					option1.setText(information);
					white_Auction.addSell(player_name, money, number);
				}
			}
		}
		function pbuy(){
			var money=prompt("請輸入你要購買的價錢","1~1000");
			var number=prompt("請輸入你要購買的數量","1~10");
			if(isNaN(number)||isNaN(money))
			{
				
			}
			else
			{
				player_money -= number*money;
				if (player_money<0)
				{
					player_money += number*money;
					alert("資金不足!")
				}
				else
				{
					information = "玩家:"+player_name+" 黑巧克力:"+player_black+" 白巧克力:"+player_white+" 心型巧克力:"+player_heart+" 資金"+player_money
					option1.setText(information);
					heart_Auction.addBuy(player_name, money, number);
				}
			}
		}
		function psell(){
			var money=prompt("請輸入你要賣出的價錢","1~1000");
			var number=prompt("請輸入你要賣的數量","1~10");
			if(isNaN(number)||isNaN(money))
			{
				
			}
			else
			{
				player_heart -= number;
				if (player_heart<0)
				{
					player_heart += number;
					alert("巧克力不足!")
				}
				else
				{
					information = "玩家:"+player_name+" 黑巧克力:"+player_black+" 白巧克力:"+player_white+" 心型巧克力:"+player_heart+" 資金"+player_money
					option1.setText(information);
					heart_Auction.addSell(player_name, money, number);
				}
			}
		}
		function onUp(){}
		function onOver(){}
		function onOut(){}
		
		game.time.events.add(100000, this.listen_next, this, 'total');
		
	},
	over :function() {
		butt1.alpha = 1;
	},

	out :function() {
		butt1.alpha = 0.9;
	},
	
	listen_next :function (){

		if (system_black > 0)
			black_Auction.addSell('system',black_Auction.currentPrice,system_black);
		if (system_white > 0)
			white_Auction.addSell('system',white_Auction.currentPrice,system_white);
		if (system_heart > 0)
			heart_Auction.addSell('system',heart_Auction.currentPrice,system_heart);

		black_Auction.Auction();
		white_Auction.Auction();
		heart_Auction.Auction();

		game.state.start('total');
	},
	update : function() {
		
	}
};
