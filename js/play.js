var player_information;
var option1;
var information;
var bmoney;
var wmoney;
var pmoney;
var butt1;
var bbutton1;
var wbutton1;
var pbutton1;
var bbutton2;
var wbutton2;
var pbutton2;
var input_number;
var input_money;

var play={
	
	preload :function() {
		game.load.image('heart', 'img/game/heart.png');
		game.load.image('white', 'img/game/white.png');
		game.load.image('black', 'img/game/black.png');
		game.load.image('up', 'img/game/up.png');
		game.load.image('down', 'img/game/down.png');
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
		var style1 = { font: "18px 微軟正黑體", fill: "	#000000"};
		option1 = game.add.text(player_information.width / 2, player_information.y+ player_information.height / 2 , information, style1);
		option1.anchor.set(0.5);
		
		butt1 = game.add.graphics(game.width*0.84, game.height*0.06);
		butt1.beginFill(0xFFFFE0,0.8);
		butt1.lineStyle(2, 0xA52A2A, 1);
		butt1.drawRoundedRect(0, 0, game.width*0.1, game.height*0.08,7);
		butt1.endFill();
		
		var style2 = { font: "18px 微軟正黑體", fill: "	#000000",  align: "center"};
		done = game.add.text(butt1.x+ butt1.width / 2, butt1.y+ butt1.height / 2 , "Done", style2);
		done.anchor.set(0.5);
		
		butt1.inputEnabled=true;
		butt1.input.useHandCursor = true;
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

		
		bbutton1 = game.add.graphics(game.width*0.1,game.height*0.7);
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
		wbutton1 = game.add.graphics(game.width*0.4,game.height*0.7);
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
		pbutton1 = game.add.graphics(game.width*0.7,game.height*0.7);
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
		bbutton2 = game.add.graphics(game.width*0.1,game.height*0.85);
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
		wbutton2 = game.add.graphics(game.width*0.4,game.height*0.85);
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
		pbutton2 = game.add.graphics(game.width*0.7,game.height*0.85);
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

		var style = { font: "18px 微軟正黑體", fill: "#000000",  align: "center"};
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

		function number_buy()
		{
			disable_button();
			var rect = game.add.graphics(game.width*0.05,game.height*0.05);
			rect.beginFill(0xfffafa,0.95);
			rect.lineStyle(2, 0x483D8B, 1);
			rect.drawRoundedRect(0, 0, game.width*0.9, game.height*0.9,5);
			rect.endFill();
			var how_many = game.add.text(game.width*0.5,game.height*0.12,"請輸入你要購買的數量",{ font: "20px Microsoft JhengHei", fill: "#000000",  align: "center"});
			how_many.anchor.set(0.5);
			
			var number_of_one=0;
			var number_of_ten=0;
			var number_of_hundred=0;
			
			var hundred = game.add.graphics(game.width*0.225,game.height*0.4);
			hundred.beginFill(0xfffafa,0.95);
			hundred.lineStyle(2, 0x483D8B, 1);
			hundred.drawRoundedRect(0, 0, game.width*0.15, game.height*0.15,5);
			hundred.endFill();
			var hundred_text = game.add.text(hundred.x + hundred.width/2,hundred.y + hundred.height/2,number_of_hundred,{ font: "20px Microsoft JhengHei", fill: "#000000",  align: "center"});
			hundred_text.anchor.set(0.5);
			
			var ten = game.add.graphics(game.width*0.425,game.height*0.4);
			ten.beginFill(0xfffafa,0.95);
			ten.lineStyle(2, 0x483D8B, 1);
			ten.drawRoundedRect(0, 0, game.width*0.15, game.height*0.15,5);
			ten.endFill();
			var ten_text = game.add.text(ten.x + ten.width/2,ten.y + ten.height/2,number_of_ten,{ font: "20px Microsoft JhengHei", fill: "#000000",  align: "center"});
			ten_text.anchor.set(0.5);
		
			var one = game.add.graphics(game.width*0.625,game.height*0.4);
			one.beginFill(0xfffafa,0.95);
			one.lineStyle(2, 0x483D8B, 1);
			one.drawRoundedRect(0, 0, game.width*0.15, game.height*0.15,5);
			one.endFill();
			var one_text = game.add.text(one.x + one.width/2,one.y + one.height/2,number_of_one,{ font: "20px Microsoft JhengHei", fill: "#000000",  align: "center"});
			one_text.anchor.set(0.5);
			
			
			var hundred_up = game.add.image(game.width*0.225, game.height*0.2, "up");
			hundred_up.width = game.width*0.15*window.devicePixelRatio;
			hundred_up.height = game.height*0.15*window.devicePixelRatio;
			
			var ten_up = game.add.image(game.width*0.425, game.height*0.2, "up");
			ten_up.width = game.width*0.15*window.devicePixelRatio;
			ten_up.height = game.height*0.15*window.devicePixelRatio;
			
			var one_up = game.add.image(game.width*0.625, game.height*0.2, "up");
			one_up.width = game.width*0.15*window.devicePixelRatio;
			one_up.height = game.height*0.15*window.devicePixelRatio;
			
			var hundred_down = game.add.image(game.width*0.225, game.height*0.6, "down");
			hundred_down.width = game.width*0.15*window.devicePixelRatio;
			hundred_down.height = game.height*0.15*window.devicePixelRatio;
			
			var ten_down = game.add.image(game.width*0.425, game.height*0.6, "down");
			ten_down.width = game.width*0.15*window.devicePixelRatio;
			ten_down.height = game.height*0.15*window.devicePixelRatio;
			
			var one_down = game.add.image(game.width*0.625, game.height*0.6, "down");
			one_down.width = game.width*0.15*window.devicePixelRatio;
			one_down.height = game.height*0.15*window.devicePixelRatio;
			
			var ok = game.add.graphics(game.width*0.4,game.height*0.8);
			ok.beginFill(0xfffafa,0.95);
			ok.lineStyle(2, 0x483D8B, 1);
			ok.drawRoundedRect(0, 0, game.width*0.2, game.height*0.1,5);
			ok.endFill();
			var ok_text = game.add.text(ok.x + ok.width/2,ok.y + ok.height/2,"確認",{ font: "20px Microsoft JhengHei", fill: "#000000",  align: "center"});
			ok_text.anchor.set(0.5);
			
			function plus_hundred(){
				if(number_of_hundred<9){
					hundred_text.setText(++number_of_hundred);
				}	
			}
			function plus_ten(){
				if(number_of_ten<9){
					ten_text.setText(++number_of_ten);
				}	
			}
			function plus_one(){
				if(number_of_one<9){
					one_text.setText(++number_of_one);
				}	
			}
			function minus_hundred(){
				if(number_of_hundred>0){
					hundred_text.setText(--number_of_hundred);
				}	
			}
			function minus_ten(){
				if(number_of_ten>0){
					ten_text.setText(--number_of_ten);
				}	
			}
			function minus_one(){
				if(number_of_one>0){
					one_text.setText(--number_of_one);
				}	
			}
			function disable_button()
			{
				butt1.input.useHandCursor = false;
				bbutton1.input.useHandCursor = false;
				wbutton1.input.useHandCursor = false;
				pbutton1.input.useHandCursor = false;
				bbutton2.input.useHandCursor = false;
				wbutton2.input.useHandCursor = false;
				pbutton2.input.useHandCursor = false;
				butt1.inputEnabled=false;
				bbutton1.inputEnabled=false;
				wbutton1.inputEnabled=false;
				pbutton1.inputEnabled=false;
				bbutton2.inputEnabled=false;
				wbutton2.inputEnabled=false;
				pbutton2.inputEnabled=false;
			}
			function enable_button()
			{
				butt1.input.useHandCursor = true;
				bbutton1.input.useHandCursor = true;
				wbutton1.input.useHandCursor = true;
				pbutton1.input.useHandCursor = true;
				bbutton2.input.useHandCursor = true;
				wbutton2.input.useHandCursor = true;
				pbutton2.input.useHandCursor = true;
				butt1.inputEnabled=true;
				bbutton1.inputEnabled=true;
				wbutton1.inputEnabled=true;
				pbutton1.inputEnabled=true;
				bbutton2.inputEnabled=true;
				wbutton2.inputEnabled=true;
				pbutton2.inputEnabled=true;
			}
			function back(){
				input_number = number_of_one+number_of_ten*10+number_of_hundred*100;
				enable_button();
				rect.destroy();
				how_many.destroy();
				hundred.destroy();
				ten.destroy();
				one.destroy();
				hundred_text.destroy();
				ten_text.destroy();
				one_text.destroy();
				hundred_up.destroy();
				ten_up.destroy();
				one_up.destroy();
				hundred_down.destroy();
				ten_down.destroy();
				one_down.destroy();
				ok.destroy();
				ok_text.destroy();
				
			}
			
			hundred_up.inputEnabled=true;
			hundred_up.events.onInputDown.add(plus_hundred,this);
			ten_up.inputEnabled=true;
			ten_up.events.onInputDown.add(plus_ten,this);
			one_up.inputEnabled=true;
			one_up.events.onInputDown.add(plus_one,this);
			
			hundred_down.inputEnabled=true;
			hundred_down.events.onInputDown.add(minus_hundred,this);
			ten_down.inputEnabled=true;
			ten_down.events.onInputDown.add(minus_ten,this);
			one_down.inputEnabled=true;
			one_down.events.onInputDown.add(minus_one,this);
			
			ok.inputEnabled=true;
			let callback;
			callback = back || function() {return ;};
			ok.events.onInputDown.add(callback,this);  
		}
		
		function price_buy(flag)
		{
			
			disable_button();
			var rect = game.add.graphics(game.width*0.05,game.height*0.05);
			rect.beginFill(0xfffafa,0.95);
			rect.lineStyle(2, 0x483D8B, 1);
			rect.drawRoundedRect(0, 0, game.width*0.9, game.height*0.9,5);
			rect.endFill();
			var how_many = game.add.text(game.width*0.5,game.height*0.12,"請輸入你要購買的單價",{ font: "20px Microsoft JhengHei", fill: "#000000",  align: "center"});
			how_many.anchor.set(0.5);
			
			var number_of_one=0;
			var number_of_ten=0;
			var number_of_hundred=0;
			
			var hundred = game.add.graphics(game.width*0.225,game.height*0.4);
			hundred.beginFill(0xfffafa,0.95);
			hundred.lineStyle(2, 0x483D8B, 1);
			hundred.drawRoundedRect(0, 0, game.width*0.15, game.height*0.15,5);
			hundred.endFill();
			var hundred_text = game.add.text(hundred.x + hundred.width/2,hundred.y + hundred.height/2,number_of_hundred,{ font: "20px Microsoft JhengHei", fill: "#000000",  align: "center"});
			hundred_text.anchor.set(0.5);
			
			var ten = game.add.graphics(game.width*0.425,game.height*0.4);
			ten.beginFill(0xfffafa,0.95);
			ten.lineStyle(2, 0x483D8B, 1);
			ten.drawRoundedRect(0, 0, game.width*0.15, game.height*0.15,5);
			ten.endFill();
			var ten_text = game.add.text(ten.x + ten.width/2,ten.y + ten.height/2,number_of_ten,{ font: "20px Microsoft JhengHei", fill: "#000000",  align: "center"});
			ten_text.anchor.set(0.5);
		
			var one = game.add.graphics(game.width*0.625,game.height*0.4);
			one.beginFill(0xfffafa,0.95);
			one.lineStyle(2, 0x483D8B, 1);
			one.drawRoundedRect(0, 0, game.width*0.15, game.height*0.15,5);
			one.endFill();
			var one_text = game.add.text(one.x + one.width/2,one.y + one.height/2,number_of_one,{ font: "20px Microsoft JhengHei", fill: "#000000",  align: "center"});
			one_text.anchor.set(0.5);
			
			
			var hundred_up = game.add.image(game.width*0.225, game.height*0.2, "up");
			hundred_up.width = game.width*0.15*window.devicePixelRatio;
			hundred_up.height = game.height*0.15*window.devicePixelRatio;
			
			var ten_up = game.add.image(game.width*0.425, game.height*0.2, "up");
			ten_up.width = game.width*0.15*window.devicePixelRatio;
			ten_up.height = game.height*0.15*window.devicePixelRatio;
			
			var one_up = game.add.image(game.width*0.625, game.height*0.2, "up");
			one_up.width = game.width*0.15*window.devicePixelRatio;
			one_up.height = game.height*0.15*window.devicePixelRatio;
			
			var hundred_down = game.add.image(game.width*0.225, game.height*0.6, "down");
			hundred_down.width = game.width*0.15*window.devicePixelRatio;
			hundred_down.height = game.height*0.15*window.devicePixelRatio;
			
			var ten_down = game.add.image(game.width*0.425, game.height*0.6, "down");
			ten_down.width = game.width*0.15*window.devicePixelRatio;
			ten_down.height = game.height*0.15*window.devicePixelRatio;
			
			var one_down = game.add.image(game.width*0.625, game.height*0.6, "down");
			one_down.width = game.width*0.15*window.devicePixelRatio;
			one_down.height = game.height*0.15*window.devicePixelRatio;
			
			var ok = game.add.graphics(game.width*0.4,game.height*0.8);
			ok.beginFill(0xfffafa,0.95);
			ok.lineStyle(2, 0x483D8B, 1);
			ok.drawRoundedRect(0, 0, game.width*0.2, game.height*0.1,5);
			ok.endFill();
			var ok_text = game.add.text(ok.x + ok.width/2,ok.y + ok.height/2,"確認",{ font: "20px Microsoft JhengHei", fill: "#000000",  align: "center"});
			ok_text.anchor.set(0.5);
			
			function plus_hundred(){
				if(number_of_hundred<9){
					hundred_text.setText(++number_of_hundred);
				}	
			}
			function plus_ten(){
				if(number_of_ten<9){
					ten_text.setText(++number_of_ten);
				}	
			}
			function plus_one(){
				if(number_of_one<9){
					one_text.setText(++number_of_one);
				}	
			}
			function minus_hundred(){
				if(number_of_hundred>0){
					hundred_text.setText(--number_of_hundred);
				}	
			}
			function minus_ten(){
				if(number_of_ten>0){
					ten_text.setText(--number_of_ten);
				}	
			}
			function minus_one(){
				if(number_of_one>0){
					one_text.setText(--number_of_one);
				}	
			}
			function disable_button()
			{
				butt1.input.useHandCursor = false;
				bbutton1.input.useHandCursor = false;
				wbutton1.input.useHandCursor = false;
				pbutton1.input.useHandCursor = false;
				bbutton2.input.useHandCursor = false;
				wbutton2.input.useHandCursor = false;
				pbutton2.input.useHandCursor = false;
				butt1.inputEnabled=false;
				bbutton1.inputEnabled=false;
				wbutton1.inputEnabled=false;
				pbutton1.inputEnabled=false;
				bbutton2.inputEnabled=false;
				wbutton2.inputEnabled=false;
				pbutton2.inputEnabled=false;
			}
			function enable_button()
			{
				butt1.input.useHandCursor = true;
				bbutton1.input.useHandCursor = true;
				wbutton1.input.useHandCursor = true;
				pbutton1.input.useHandCursor = true;
				bbutton2.input.useHandCursor = true;
				wbutton2.input.useHandCursor = true;
				pbutton2.input.useHandCursor = true;
				butt1.inputEnabled=true;
				bbutton1.inputEnabled=true;
				wbutton1.inputEnabled=true;
				pbutton1.inputEnabled=true;
				bbutton2.inputEnabled=true;
				wbutton2.inputEnabled=true;
				pbutton2.inputEnabled=true;
			}
			
			function back(){
				
				input_money = number_of_one+number_of_ten*10+number_of_hundred*100;
				enable_button();
				rect.destroy();
				how_many.destroy();
				hundred.destroy();
				ten.destroy();
				one.destroy();
				hundred_text.destroy();
				ten_text.destroy();
				one_text.destroy();
				hundred_up.destroy();
				ten_up.destroy();
				one_up.destroy();
				hundred_down.destroy();
				ten_down.destroy();
				one_down.destroy();
				ok.destroy();
				ok_text.destroy();
				check_buy(flag);
				
			}
			
			
			hundred_up.inputEnabled=true;
			hundred_up.events.onInputDown.add(plus_hundred,this);
			ten_up.inputEnabled=true;
			ten_up.events.onInputDown.add(plus_ten,this);
			one_up.inputEnabled=true;
			one_up.events.onInputDown.add(plus_one,this);
			
			hundred_down.inputEnabled=true;
			hundred_down.events.onInputDown.add(minus_hundred,this);
			ten_down.inputEnabled=true;
			ten_down.events.onInputDown.add(minus_ten,this);
			one_down.inputEnabled=true;
			one_down.events.onInputDown.add(minus_one,this);
			
			ok.inputEnabled=true;
			let callback;
			callback = back || function() {return;};
			ok.events.onInputDown.add(callback,this);  
			
		}
		function number_sell()
		{
			disable_button();
			var rect = game.add.graphics(game.width*0.05,game.height*0.05);
			rect.beginFill(0xfffafa,0.95);
			rect.lineStyle(2, 0x483D8B, 1);
			rect.drawRoundedRect(0, 0, game.width*0.9, game.height*0.9,5);
			rect.endFill();
			var how_many = game.add.text(game.width*0.5,game.height*0.12,"請輸入你要賣出的數量",{ font: "20px Microsoft JhengHei", fill: "#000000",  align: "center"});
			how_many.anchor.set(0.5);
			
			var number_of_one=0;
			var number_of_ten=0;
			var number_of_hundred=0;
			
			var hundred = game.add.graphics(game.width*0.225,game.height*0.4);
			hundred.beginFill(0xfffafa,0.95);
			hundred.lineStyle(2, 0x483D8B, 1);
			hundred.drawRoundedRect(0, 0, game.width*0.15, game.height*0.15,5);
			hundred.endFill();
			var hundred_text = game.add.text(hundred.x + hundred.width/2,hundred.y + hundred.height/2,number_of_hundred,{ font: "20px Microsoft JhengHei", fill: "#000000",  align: "center"});
			hundred_text.anchor.set(0.5);
			
			var ten = game.add.graphics(game.width*0.425,game.height*0.4);
			ten.beginFill(0xfffafa,0.95);
			ten.lineStyle(2, 0x483D8B, 1);
			ten.drawRoundedRect(0, 0, game.width*0.15, game.height*0.15,5);
			ten.endFill();
			var ten_text = game.add.text(ten.x + ten.width/2,ten.y + ten.height/2,number_of_ten,{ font: "20px Microsoft JhengHei", fill: "#000000",  align: "center"});
			ten_text.anchor.set(0.5);
		
			var one = game.add.graphics(game.width*0.625,game.height*0.4);
			one.beginFill(0xfffafa,0.95);
			one.lineStyle(2, 0x483D8B, 1);
			one.drawRoundedRect(0, 0, game.width*0.15, game.height*0.15,5);
			one.endFill();
			var one_text = game.add.text(one.x + one.width/2,one.y + one.height/2,number_of_one,{ font: "20px Microsoft JhengHei", fill: "#000000",  align: "center"});
			one_text.anchor.set(0.5);
			
			
			var hundred_up = game.add.image(game.width*0.225, game.height*0.2, "up");
			hundred_up.width = game.width*0.15*window.devicePixelRatio;
			hundred_up.height = game.height*0.15*window.devicePixelRatio;
			
			var ten_up = game.add.image(game.width*0.425, game.height*0.2, "up");
			ten_up.width = game.width*0.15*window.devicePixelRatio;
			ten_up.height = game.height*0.15*window.devicePixelRatio;
			
			var one_up = game.add.image(game.width*0.625, game.height*0.2, "up");
			one_up.width = game.width*0.15*window.devicePixelRatio;
			one_up.height = game.height*0.15*window.devicePixelRatio;
			
			var hundred_down = game.add.image(game.width*0.225, game.height*0.6, "down");
			hundred_down.width = game.width*0.15*window.devicePixelRatio;
			hundred_down.height = game.height*0.15*window.devicePixelRatio;
			
			var ten_down = game.add.image(game.width*0.425, game.height*0.6, "down");
			ten_down.width = game.width*0.15*window.devicePixelRatio;
			ten_down.height = game.height*0.15*window.devicePixelRatio;
			
			var one_down = game.add.image(game.width*0.625, game.height*0.6, "down");
			one_down.width = game.width*0.15*window.devicePixelRatio;
			one_down.height = game.height*0.15*window.devicePixelRatio;
			
			var ok = game.add.graphics(game.width*0.4,game.height*0.8);
			ok.beginFill(0xfffafa,0.95);
			ok.lineStyle(2, 0x483D8B, 1);
			ok.drawRoundedRect(0, 0, game.width*0.2, game.height*0.1,5);
			ok.endFill();
			var ok_text = game.add.text(ok.x + ok.width/2,ok.y + ok.height/2,"確認",{ font: "20px Microsoft JhengHei", fill: "#000000",  align: "center"});
			ok_text.anchor.set(0.5);
			
			function plus_hundred(){
				if(number_of_hundred<9){
					hundred_text.setText(++number_of_hundred);
				}	
			}
			function plus_ten(){
				if(number_of_ten<9){
					ten_text.setText(++number_of_ten);
				}	
			}
			function plus_one(){
				if(number_of_one<9){
					one_text.setText(++number_of_one);
				}	
			}
			function minus_hundred(){
				if(number_of_hundred>0){
					hundred_text.setText(--number_of_hundred);
				}	
			}
			function minus_ten(){
				if(number_of_ten>0){
					ten_text.setText(--number_of_ten);
				}	
			}
			function minus_one(){
				if(number_of_one>0){
					one_text.setText(--number_of_one);
				}	
			}
			function disable_button()
			{
				butt1.input.useHandCursor = false;
				bbutton1.input.useHandCursor = false;
				wbutton1.input.useHandCursor = false;
				pbutton1.input.useHandCursor = false;
				bbutton2.input.useHandCursor = false;
				wbutton2.input.useHandCursor = false;
				pbutton2.input.useHandCursor = false;
				butt1.inputEnabled=false;
				bbutton1.inputEnabled=false;
				wbutton1.inputEnabled=false;
				pbutton1.inputEnabled=false;
				bbutton2.inputEnabled=false;
				wbutton2.inputEnabled=false;
				pbutton2.inputEnabled=false;
			}
			function enable_button()
			{
				butt1.input.useHandCursor = true;
				bbutton1.input.useHandCursor = true;
				wbutton1.input.useHandCursor = true;
				pbutton1.input.useHandCursor = true;
				bbutton2.input.useHandCursor = true;
				wbutton2.input.useHandCursor = true;
				pbutton2.input.useHandCursor = true;
				butt1.inputEnabled=true;
				bbutton1.inputEnabled=true;
				wbutton1.inputEnabled=true;
				pbutton1.inputEnabled=true;
				bbutton2.inputEnabled=true;
				wbutton2.inputEnabled=true;
				pbutton2.inputEnabled=true;
			}
			function back(){
				input_number = number_of_one+number_of_ten*10+number_of_hundred*100;
				enable_button();
				rect.destroy();
				how_many.destroy();
				hundred.destroy();
				ten.destroy();
				one.destroy();
				hundred_text.destroy();
				ten_text.destroy();
				one_text.destroy();
				hundred_up.destroy();
				ten_up.destroy();
				one_up.destroy();
				hundred_down.destroy();
				ten_down.destroy();
				one_down.destroy();
				ok.destroy();
				ok_text.destroy();
				
			}
			
			hundred_up.inputEnabled=true;
			hundred_up.events.onInputDown.add(plus_hundred,this);
			ten_up.inputEnabled=true;
			ten_up.events.onInputDown.add(plus_ten,this);
			one_up.inputEnabled=true;
			one_up.events.onInputDown.add(plus_one,this);
			
			hundred_down.inputEnabled=true;
			hundred_down.events.onInputDown.add(minus_hundred,this);
			ten_down.inputEnabled=true;
			ten_down.events.onInputDown.add(minus_ten,this);
			one_down.inputEnabled=true;
			one_down.events.onInputDown.add(minus_one,this);
			
			ok.inputEnabled=true;
			let callback;
			callback = back || function() {return ;};
			ok.events.onInputDown.add(callback,this);  
		}
		
		function price_sell(flag)
		{
			
			disable_button();
			var rect = game.add.graphics(game.width*0.05,game.height*0.05);
			rect.beginFill(0xfffafa,0.95);
			rect.lineStyle(2, 0x483D8B, 1);
			rect.drawRoundedRect(0, 0, game.width*0.9, game.height*0.9,5);
			rect.endFill();
			var how_many = game.add.text(game.width*0.5,game.height*0.12,"請輸入你要賣出的單價",{ font: "20px Microsoft JhengHei", fill: "#000000",  align: "center"});
			how_many.anchor.set(0.5);
			
			var number_of_one=0;
			var number_of_ten=0;
			var number_of_hundred=0;
			
			var hundred = game.add.graphics(game.width*0.225,game.height*0.4);
			hundred.beginFill(0xfffafa,0.95);
			hundred.lineStyle(2, 0x483D8B, 1);
			hundred.drawRoundedRect(0, 0, game.width*0.15, game.height*0.15,5);
			hundred.endFill();
			var hundred_text = game.add.text(hundred.x + hundred.width/2,hundred.y + hundred.height/2,number_of_hundred,{ font: "20px Microsoft JhengHei", fill: "#000000",  align: "center"});
			hundred_text.anchor.set(0.5);
			
			var ten = game.add.graphics(game.width*0.425,game.height*0.4);
			ten.beginFill(0xfffafa,0.95);
			ten.lineStyle(2, 0x483D8B, 1);
			ten.drawRoundedRect(0, 0, game.width*0.15, game.height*0.15,5);
			ten.endFill();
			var ten_text = game.add.text(ten.x + ten.width/2,ten.y + ten.height/2,number_of_ten,{ font: "20px Microsoft JhengHei", fill: "#000000",  align: "center"});
			ten_text.anchor.set(0.5);
		
			var one = game.add.graphics(game.width*0.625,game.height*0.4);
			one.beginFill(0xfffafa,0.95);
			one.lineStyle(2, 0x483D8B, 1);
			one.drawRoundedRect(0, 0, game.width*0.15, game.height*0.15,5);
			one.endFill();
			var one_text = game.add.text(one.x + one.width/2,one.y + one.height/2,number_of_one,{ font: "20px Microsoft JhengHei", fill: "#000000",  align: "center"});
			one_text.anchor.set(0.5);
			
			
			var hundred_up = game.add.image(game.width*0.225, game.height*0.2, "up");
			hundred_up.width = game.width*0.15*window.devicePixelRatio;
			hundred_up.height = game.height*0.15*window.devicePixelRatio;
			
			var ten_up = game.add.image(game.width*0.425, game.height*0.2, "up");
			ten_up.width = game.width*0.15*window.devicePixelRatio;
			ten_up.height = game.height*0.15*window.devicePixelRatio;
			
			var one_up = game.add.image(game.width*0.625, game.height*0.2, "up");
			one_up.width = game.width*0.15*window.devicePixelRatio;
			one_up.height = game.height*0.15*window.devicePixelRatio;
			
			var hundred_down = game.add.image(game.width*0.225, game.height*0.6, "down");
			hundred_down.width = game.width*0.15*window.devicePixelRatio;
			hundred_down.height = game.height*0.15*window.devicePixelRatio;
			
			var ten_down = game.add.image(game.width*0.425, game.height*0.6, "down");
			ten_down.width = game.width*0.15*window.devicePixelRatio;
			ten_down.height = game.height*0.15*window.devicePixelRatio;
			
			var one_down = game.add.image(game.width*0.625, game.height*0.6, "down");
			one_down.width = game.width*0.15*window.devicePixelRatio;
			one_down.height = game.height*0.15*window.devicePixelRatio;
			
			var ok = game.add.graphics(game.width*0.4,game.height*0.8);
			ok.beginFill(0xfffafa,0.95);
			ok.lineStyle(2, 0x483D8B, 1);
			ok.drawRoundedRect(0, 0, game.width*0.2, game.height*0.1,5);
			ok.endFill();
			var ok_text = game.add.text(ok.x + ok.width/2,ok.y + ok.height/2,"確認",{ font: "20px Microsoft JhengHei", fill: "#000000",  align: "center"});
			ok_text.anchor.set(0.5);
			
			function plus_hundred(){
				if(number_of_hundred<9){
					hundred_text.setText(++number_of_hundred);
				}	
			}
			function plus_ten(){
				if(number_of_ten<9){
					ten_text.setText(++number_of_ten);
				}	
			}
			function plus_one(){
				if(number_of_one<9){
					one_text.setText(++number_of_one);
				}	
			}
			function minus_hundred(){
				if(number_of_hundred>0){
					hundred_text.setText(--number_of_hundred);
				}	
			}
			function minus_ten(){
				if(number_of_ten>0){
					ten_text.setText(--number_of_ten);
				}	
			}
			function minus_one(){
				if(number_of_one>0){
					one_text.setText(--number_of_one);
				}	
			}
			function disable_button()
			{
				butt1.input.useHandCursor = false;
				bbutton1.input.useHandCursor = false;
				wbutton1.input.useHandCursor = false;
				pbutton1.input.useHandCursor = false;
				bbutton2.input.useHandCursor = false;
				wbutton2.input.useHandCursor = false;
				pbutton2.input.useHandCursor = false;
				butt1.inputEnabled=false;
				bbutton1.inputEnabled=false;
				wbutton1.inputEnabled=false;
				pbutton1.inputEnabled=false;
				bbutton2.inputEnabled=false;
				wbutton2.inputEnabled=false;
				pbutton2.inputEnabled=false;
			}
			function enable_button()
			{
				butt1.input.useHandCursor = true;
				bbutton1.input.useHandCursor = true;
				wbutton1.input.useHandCursor = true;
				pbutton1.input.useHandCursor = true;
				bbutton2.input.useHandCursor = true;
				wbutton2.input.useHandCursor = true;
				pbutton2.input.useHandCursor = true;
				butt1.inputEnabled=true;
				bbutton1.inputEnabled=true;
				wbutton1.inputEnabled=true;
				pbutton1.inputEnabled=true;
				bbutton2.inputEnabled=true;
				wbutton2.inputEnabled=true;
				pbutton2.inputEnabled=true;
			}
			
			function back(){
				
				input_money = number_of_one+number_of_ten*10+number_of_hundred*100;
				enable_button();
				rect.destroy();
				how_many.destroy();
				hundred.destroy();
				ten.destroy();
				one.destroy();
				hundred_text.destroy();
				ten_text.destroy();
				one_text.destroy();
				hundred_up.destroy();
				ten_up.destroy();
				one_up.destroy();
				hundred_down.destroy();
				ten_down.destroy();
				one_down.destroy();
				ok.destroy();
				ok_text.destroy();
				check_sell(flag);
				
			}
			
			hundred_up.inputEnabled=true;
			hundred_up.events.onInputDown.add(plus_hundred,this);
			ten_up.inputEnabled=true;
			ten_up.events.onInputDown.add(plus_ten,this);
			one_up.inputEnabled=true;
			one_up.events.onInputDown.add(plus_one,this);
			
			hundred_down.inputEnabled=true;
			hundred_down.events.onInputDown.add(minus_hundred,this);
			ten_down.inputEnabled=true;
			ten_down.events.onInputDown.add(minus_ten,this);
			one_down.inputEnabled=true;
			one_down.events.onInputDown.add(minus_one,this);
			
			ok.inputEnabled=true;
			let callback;
			callback = back || function() {return;};
			ok.events.onInputDown.add(callback,this);  
			
		}
		function check_buy(flag){
			if(isNaN(input_number)||isNaN(input_money))
			{
						
			}
			else
			{
				player_money -= input_number*input_money;
				if (player_money<0)
				{
					player_money += input_number*input_money;
					alert("資金不足!")
				}
				else
				{
					information = "玩家:"+player_name+" 黑巧:"+player_black+" 白巧:"+player_white+" 心巧:"+player_heart+" 資金"+player_money
					option1.setText(information);
					if(flag==1){
						black_Auction.addBuy(player_name, input_money, input_number);
					}
					else if(flag==2){
						white_Auction.addBuy(player_name, input_money, input_number);
					}
					else{
						heart_Auction.addBuy(player_name, input_money, input_number);
					}
					
				}
			}
		}
		function check_sell(flag){
			if(isNaN(input_number)||isNaN(input_money))
			{
				
			}
			else
			{	
				if(flag==1){
					player_black -= input_number;
					if (player_black<0)
					{
						player_black += input_number;
						alert("巧克力不足!")
					}
					else
					{
						information = "玩家:"+player_name+" 黑巧:"+player_black+" 白巧:"+player_white+" 心巧:"+player_heart+" 資金"+player_money
						option1.setText(information);
						black_Auction.addSell(player_name, input_money, input_number);
						
					}
				}
				else if(flag==2){
					player_white -= input_number;
					if (player_white<0)
					{
						player_white += input_number;
						alert("巧克力不足!")
					}
					else
					{
						information = "玩家:"+player_name+" 黑巧:"+player_black+" 白巧:"+player_white+" 心巧:"+player_heart+" 資金"+player_money
						option1.setText(information);
						white_Auction.addSell(player_name, input_money, input_number);
						
					}
				}
				else{
					player_heart -= input_number;
					if (player_heart<0)
					{
						player_heart += input_number;
						alert("巧克力不足!")
					}
					else
					{
						information = "玩家:"+player_name+" 黑巧:"+player_black+" 白巧:"+player_white+" 心巧:"+player_heart+" 資金"+player_money
						option1.setText(information);
						heart_Auction.addSell(player_name, input_money, input_number);
						
					}
				}
				
			}
			
		}
		
		function bbuy(){
			price_buy(1); 
			number_buy();
		}
		function bsell(){
			price_sell(1); 
			number_sell();
		}
		function wbuy(){
			price_buy(2); 
			number_buy();
		}
		function wsell(){
			price_sell(2); 
			number_sell();
		}
		function pbuy(){
			price_buy(3); 
			number_buy();
		}
		function psell(){
			price_sell(3); 
			number_sell();
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
