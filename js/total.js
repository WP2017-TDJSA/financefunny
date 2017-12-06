var total={
	
	preload :function() {
		game.load.image('background', 'img/game/background.jpg');
	},

	create :function() {
		
		var background= game.add.image(0, 0, "background");
		background.width = game.width*window.devicePixelRatio;
		background.height = game.height*window.devicePixelRatio;
		background.alpha = 0.5;
		var rect = game.add.graphics(game.width*0.1, game.height*0.1);
		rect.beginFill(0x228B22,0.95);
		rect.lineStyle(2, 0xA52A2A, 1);
		rect.drawRoundedRect(0, 0, game.width*0.8, game.height*0.8,7);
		rect.endFill();
		
		//update system number
		var system_b = black_Auction.playerInfo('system');
		system_black -= black_Auction.getTotalCount(system_b.sellSuccessList);
		var system_w = white_Auction.playerInfo('system');
		system_white -= white_Auction.getTotalCount(system_w.sellSuccessList);
		var system_h = heart_Auction.playerInfo('system');
		system_heart -= heart_Auction.getTotalCount(system_h.sellSuccessList);
		black_price = black_Auction.currentPrice;
		white_price = white_Auction.currentPrice;
		heart_price = heart_Auction.currentPrice;

		var player_black_buySuccess = black_Auction.getTotalCount(black_Auction.playerInfo(player_name).buySuccessList);
		var player_white_buySuccess = white_Auction.getTotalCount(white_Auction.playerInfo(player_name).buySuccessList);
		var player_heart_buySuccess = heart_Auction.getTotalCount(heart_Auction.playerInfo(player_name).buySuccessList);
		var player_black_sellFail = black_Auction.getTotalCount(black_Auction.playerInfo(player_name).sellFailList);
		var player_white_sellFail = white_Auction.getTotalCount(white_Auction.playerInfo(player_name).sellFailList);
		var player_heart_sellFail = heart_Auction.getTotalCount(heart_Auction.playerInfo(player_name).sellFailList);

		player_black += player_black_buySuccess;
		player_white += player_white_buySuccess;
		player_heart += player_heart_buySuccess;
		player_black += player_black_sellFail;
		player_white += player_white_sellFail;
		player_heart += player_heart_sellFail;
		var init_money = player_money;
		player_money += black_Auction.playerInfo(player_name).buySuccessBackMoney;
		player_money += black_Auction.playerInfo(player_name).buyFailBackMoney;
		player_money += black_Auction.playerInfo(player_name).sellSuccessBackMoney;
		player_money += white_Auction.playerInfo(player_name).buySuccessBackMoney;
		player_money += white_Auction.playerInfo(player_name).buyFailBackMoney;
		player_money += white_Auction.playerInfo(player_name).sellSuccessBackMoney;
		player_money += heart_Auction.playerInfo(player_name).buySuccessBackMoney;
		player_money += heart_Auction.playerInfo(player_name).buyFailBackMoney;
		player_money += heart_Auction.playerInfo(player_name).sellSuccessBackMoney;

		var information = "成功買入: "+player_black+"\n"+"成功賣出: "+player_black+"\n"+"買入失敗: "+player_black+"\n"+"賣出失敗: "+player_black+"\n"+"總計獲得金錢: "+(player_money - init_money)
		var style1 = { font: "18px 微軟正黑體", fill: "	#000000"};
		info = game.add.text(rect.width / 2, rect.y+ rect.height / 2 , information, style1);
		info.anchor.set(0.5);
		
		var butt1 = game.add.graphics(game.width*0.35, game.height*0.7);
		butt1.beginFill(0xFFFFE0,0.8);
		butt1.lineStyle(2, 0xA52A2A, 1);
		butt1.drawRoundedRect(0, 0, game.width*0.3, game.height*0.08,7);
		butt1.endFill();
		var style = { font: "18px 微軟正黑體", fill: "	#8B0000",  align: "center"};

		option1 = game.add.text(butt1.x+ butt1.width / 2, butt1.y+ butt1.height / 2 , "下一局", style);
		option1.anchor.set(0.5);
		
		butt1.inputEnabled=true;
		butt1.events.onInputOut.add(this.out, this);
		butt1.events.onInputOver.add(this.over, this);
		butt1.events.onInputDown.add(this.listen_next,this);
		
		game.time.events.add(15000, this.listen_next, this, 'start');
	},
	over :function() {
		butt1.alpha = 1;
	},

	out :function() {
		butt1.alpha = 0.9;
	},
	
	listen_next :function (){
		black_Auction.newAuction();
		white_Auction.newAuction();
		heart_Auction.newAuction();
		game.state.start('play');
	}
	
};
