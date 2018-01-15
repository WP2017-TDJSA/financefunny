module.exports = function (game) {

	var walk = {};
	//Note: (x,y) is at the sprite's center (because the anchor is set to 0.5)
	//加入角色
	walk.add_one_man = function(game,sprite,x,y,height,rect_width,mirror,money,stock) {
		var man = {
			_money_rect: game.add.graphics(0, 0),
			_stock_rect: game.add.graphics(0, 0),
			_sprite: game.add.sprite(x, y, sprite),
			_floor: game.add.graphics(x,y+height*0.5),
			_money : money,
			_stock : stock,
			_height : height,
			_rect_width : rect_width,
			_mirror : mirror,
			change_money : 	function(money,information) {
								if (typeof information !=='undefined')
									information.setText('所剩金額 '+money+' 元\n'+'擁有股票 '+this._stock+' 股');
								
								this._money = money;
								this._money_rect.kill();
								this._money_rect = game.add.graphics(0, 0);
								this._money_rect.lineStyle(3,0x000000,1);
								this._money_rect.beginFill(0xf4e643,1);
								if(money<30){
									if(money>0)
										this._money_rect.drawRoundedRect(0,0,this._rect_width,this._height*30*0.002,10);
								}
								else
									this._money_rect.drawRoundedRect(0,0,this._rect_width,this._height*money*0.002,10);
								this._money_rect.endFill();
								this._money_rect.alignTo(this._floor, Phaser.TOP_RIGHT,-this._rect_width,0);
								
							},
			change_stock : 	function(stock,information) {
								if (typeof information !=="undefined")
									information.setText('所剩金額 '+this._money+' 元\n'+'擁有股票 '+stock+' 股');
								
								this._stock = stock;
								this._stock_rect.kill();
								this._stock_rect = game.add.graphics(0, 0);
								this._stock_rect.lineStyle(3,0x000000,1);
								this._stock_rect.beginFill(0xf4b443,1);
								if(stock<3){
									if(stock>0)
										this._stock_rect.drawRoundedRect(0,0,this._rect_width,this._height*3*0.02,10);
								}
								else
									this._stock_rect.drawRoundedRect(0,0,this._rect_width,this._height*stock*0.02,10);
								this._stock_rect.endFill();
								this._stock_rect.alignTo(this._floor, Phaser.TOP_RIGHT);
								
							},
			
			say : 			function(content,time){
								
								var ellipse = game.add.graphics(this._sprite.x+this._mirror*game.width*0.07*2, this._sprite.y+game.height*0.11 );
								var triangle = game.add.graphics(0, 0);
								if(window.innerHeight<600)
									var style = { font: "20px Microsoft JhengHei", fill: "#ffffff", wordWrap: true, wordWrapWidth: game.width*0.13, align: "center"};
								else
									var style = { font: "22px Microsoft JhengHei", fill: "#ffffff", wordWrap: true, wordWrapWidth: game.width*0.13, align: "center"};
								var text = game.add.text(this._sprite.x+this._mirror*game.width*0.07*2, this._sprite.y+game.height*0.12 , content, style);
								text.anchor.set(0.5);
								text.lineSpacing = -10;
								
								ellipse.beginFill(0x5aedb9,1);
								ellipse.drawEllipse(0,0,game.width*0.08,text.height/2+game.height*0.02);
								ellipse.endFill();
								
								triangle.beginFill(0x5aedb9);
								triangle.drawTriangle([ new Phaser.Point(ellipse.x, ellipse.y), new Phaser.Point(ellipse.x, ellipse.y+text.height/2), new Phaser.Point(this._sprite.x+this._mirror*game.width*0.07/2, this._sprite.y+text.height/3) ]);
								triangle.endFill();
								
								game.time.events.add(time,function(){
									ellipse.destroy();
									triangle.destroy();
									text.destroy();
								},this)
							}
		}
		man._sprite.anchor.setTo(0.5,0.5);

		w = man._sprite.width;
		h = man._sprite.height;
		man._sprite.height = height*window.devicePixelRatio;
		man._sprite.width = mirror*man._sprite.height*w/h;
		man._sprite.frame = 9;
		
		man._money_rect.lineStyle(3,0x000000,1);
		man._money_rect.beginFill(0xf4e643,1);
		if(money<30){
			if(money>0)
				man._money_rect.drawRoundedRect(0,0,rect_width,height*30*0.002,10);
		}
		else
			man._money_rect.drawRoundedRect(0,0,rect_width,height*money*0.002,10);
		man._money_rect.endFill();
		
		man._stock_rect.lineStyle(3,0x000000,1);
		man._stock_rect.beginFill(0xf4b443,1);
		if(stock<3){
			if(stock>0)
				man._stock_rect.drawRoundedRect(0,0,rect_width,height*3*0.02,10);
		}
		else
			man._stock_rect.drawRoundedRect(0,0,rect_width,height*stock*0.02,10);
		man._stock_rect.endFill();
		
		man._floor.lineStyle(3,0x000000,0);
		man._floor.beginFill(0x000000,0);
		man._floor.drawRoundedRect(0,0,rect_width,20,1);
		man._floor.endFill();
		
		man._stock_rect.alignTo(man._floor, Phaser.TOP_RIGHT);
		man._money_rect.alignTo(man._floor, Phaser.TOP_RIGHT,-rect_width,0);
		
		return man;
	};
	
	//兩個人走進來
	walk.two_people_walk_in = function(man1,man2,man1_ani,man2_ani) {
	
		var information;
		var interval = function(){ 
			man1._sprite.x += 1;
			man1._money_rect.x +=1;
			man1._stock_rect.x +=1;
			man1._floor.x +=1;
			man2._sprite.x -= 1;
			man2._money_rect.x -=1;
			man2._stock_rect.x -=1;
			man2._floor.x -=1;
			
			if(man1._sprite.x >= (window.innerWidth*0.15)){
				
				man1_ani.stop(false, true);
				man1._sprite.frame = 9;
				man2_ani.stop(false, true);
				man2._sprite.frame = 9;
				//clearInterval(interval);
				
			}
		}
		return interval;
	};
	
	//典型人物走動
	walk.walk_left = function(man1,man2,man1_ani,man2_ani,position) {
		console.log('walk_left');
		if(man1._mirror==1)
			man1._sprite.width *= -1;
		var interval = function(){ 
			man1._sprite.x -= 1;
			man2._sprite.x -= 1.2;
			
			if(man2._sprite.x <= (position)){
				man1_ani.stop(false, true);
				man1._sprite.frame = 9;
				man2_ani.stop(false, true);
				man2._sprite.frame = 9;
			}
		}
		return interval;
	};
	
	
	//顯示玩家剩餘金額與股票
	walk.display_information = function(man,x){
		var rect = game.add.graphics(x-man._rect_width,man._sprite.y-man._height*0.5);
		rect.lineStyle(1,0xffffff,0);
		rect.beginFill(0xffffff,0);
		rect.drawRoundedRect(0,0,man._rect_width*2,100,10);
		rect.endFill();
		var style = { font: "24px Microsoft JhengHei", fill: "#000000", wordWrap: true, wordWrapWidth: rect.width, align: "left"};
		var information = game.add.text(x, man._sprite.y-man._height*0.5 , '所剩金額 '+man._money+' 元\n'+'擁有股票 '+man._stock+' 股', style);
		information.anchor.set(0.5);
		return information;
	};
	
	//畫綠色按鈕
	walk.draw_button = function(x,y,width,height,content){
		
		var style = { font:"20px 微軟正黑體" , fill: "#ffffff",  align: "center"};
		var butt =  {
			_rect : game.add.graphics(x,y),
			_text : game.add.text(x+ width / 2, y+ height / 2 , content, style)
		};
		butt._text.anchor.set(0.5);
		butt._rect.lineStyle(1,0x000000,1);
		butt._rect.beginFill(0x5aedb9,1);
		butt._rect.drawRoundedRect(0, 0, width, height,20);
		butt._rect.endFill();
		
		return butt._rect;
		
	};
	//游標在綠色按鈕外
	walk.Out = function(butt){
		butt.alpha = 1;
	};
	//游標在綠色按鈕內
	walk.Over = function(butt){
		butt.alpha = 0.8;
	};
	//按下綠色按鈕
	walk.Down = function(butt,func){
		var button_music = game.add.audio('button_click');
		button_music.play();
		width = butt.width-2;
		height = butt.height-2;
		butt.clear();
		butt.lineStyle(1,0x000000,1);
		butt.beginFill(0x17ab76,1);
		butt.drawRoundedRect(0, 0, width, height,20);
		butt.endFill(); 
		if (typeof func ==="function"){
			game.time.events.add(300,function(){
				func();
			},this)
		}
	};
	//從綠色按鈕起來
	walk.Up = function(butt){
		width = butt.width;
		height = butt.height;
		butt.clear();
		butt.lineStyle(1,0x000000,1);
		butt.beginFill(0x5aedb9,1);
		butt.drawRoundedRect(0, 0, width, height,20);
		butt.endFill();
	};
	//在instruction state給玩家的簡單指示
	walk.simple_instruction = function(){
		var butt;
		var style = { font:"24px 微軟正黑體" , fill: "#000000",  align: "center"};
		var you = game.add.text(game.width*0.3,game.height*0.4 , '<-這是你', style);
		var other = game.add.text(game.width*0.65, game.height*0.4 , '典型人物之一 ->', style);
		you.anchor.set(0.5);
		other.anchor.set(0.5);
		you.alpha = 0;
		other.alpha = 0;
		game.add.tween(you).to( { alpha: 1 }, 1000, "Linear", true);
		
		game.time.events.add(1000,function(){
			game.add.tween(other).to( { alpha: 1 }, 1000, "Linear", true);	
		},this)
		
		game.time.events.add(2300,function(){
			var instruction = game.add.text(game.width*0.5,game.height*0.77 , '接下來你將與幾位典型人物進行股票買賣\n最後讓自己錢變多的人即是贏家!', style);
			instruction.anchor.set(0.5);
			instruction.alpha = 0;
			game.add.tween(instruction).to( { alpha: 1 }, 1000, "Linear", true);
			
			game.time.events.add(1200,function(){
				butt = walk.draw_button(game.width*0.47,game.height*0.85,game.width*0.06,50,'ok');
				butt.inputEnabled = true;
				if (butt) {
					butt.events.onInputOut.add(walk.Out, this);
					butt.events.onInputOver.add(walk.Over, this);
					butt.events.onInputDown.add(function(){
						walk.Down(butt,function (){
							var currState = game.state.current;
                			var index = Object.keys(game.state.states).indexOf(game.state.current) + 1;
                			if (index != Object.keys(game.state.states).length)
                   			 	var nextState = Object.keys(game.state.states)[index];
        
                			if (nextState)
                    			game.state.start(nextState);
						});
					}, this);
				}
			},this)	
		},this)
		
		return butt;
	}
	
	
	return walk;    
		
}