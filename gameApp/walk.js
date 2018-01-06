module.exports = function (game) {

	var walk = {};
	//Note: (x,y) is at the sprite's center (because the anchor is set to 0.5)
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
			change_money : 	function(money) {
								this._money_rect.clear();
								this._money_rect.lineStyle(1,0x000000,1);
								this._money_rect.beginFill(0xf4e643,1);
								this._money_rect.drawRoundedRect(0,0,this._rect_width,this._height*money*0.002,10);
								this._money_rect.endFill();
								this._money_rect.alignTo(this._floor, Phaser.TOP_RIGHT,-this._rect_width,0);
								return;
							},
			change_stock : 	function(stock) {
								this._stock_rect.clear();
								this._stock_rect.lineStyle(1,0x000000,1);
								this._stock_rect.beginFill(0xf4b443,1);
								this._stock_rect.drawRoundedRect(0,0,this._rect_width,this._height*stock*0.02,10);
								this._stock_rect.endFill();
								this._stock_rect.alignTo(this._floor, Phaser.TOP_RIGHT);
								return;
							}
		}
		man._sprite.anchor.setTo(0.5,0.5);

		w = man._sprite.width;
		h = man._sprite.height;
		man._sprite.height = height*window.devicePixelRatio;
		man._sprite.width = mirror*man._sprite.height*w/h;
		man._sprite.frame = 9;
		
		man._money_rect.lineStyle(1,0x000000,1);
		man._money_rect.beginFill(0xf4e643,1);
		man._money_rect.drawRoundedRect(0,0,rect_width,height*money*0.002,10);
		man._money_rect.endFill();
		man._stock_rect.lineStyle(1,0x000000,1);
		man._stock_rect.beginFill(0xf4b443,1);
		man._stock_rect.drawRoundedRect(0,0,rect_width,height*stock*0.02,10);
		man._stock_rect.endFill();
		man._floor.lineStyle(1,0x000000,0);
		man._floor.beginFill(0x000000,0);
		man._floor.drawRoundedRect(0,0,rect_width,20,1);
		man._floor.endFill();
		
		man._stock_rect.alignTo(man._floor, Phaser.TOP_RIGHT);
		man._money_rect.alignTo(man._floor, Phaser.TOP_RIGHT,-rect_width,0);
		
		return man;
	};
	
	walk.two_people_walk_in = function(man1,man2,man1_ani,man2_ani) {
	
		var information;
		var interval = setInterval(function(){ 
			man1._sprite.x += 1;
			man1._money_rect.x +=1;
			man1._stock_rect.x +=1;
			man1._floor.x +=1;
			man2._sprite.x -= 1;
			man2._money_rect.x -=1;
			man2._stock_rect.x -=1;
			man2._floor.x -=1;
			
			if(man1._sprite.x >= (window.innerWidth*0.15)){
				
				man1_ani.stop(null, true);
				man1._sprite.frame = 9;
				man2_ani.stop(null, true);
				man2._sprite.frame = 9;
				clearInterval(interval);
				
			}
		}, 10);	
		
	};
	
	walk.walk_around = function(man,position1,position2) {
		console.log('walk_around');
		var go_back = false;
		man._sprite.width *= -1;
		man._sprite.animations.add('man_walk',[ 0,1,2,3,4,5,6,7,8], 7, true,true);
		man._sprite.animations.play('man_walk');
		var interval1 = setInterval(function(){ 
			man._sprite.x += 1;
			man._money_rect.x +=1;
			man._stock_rect.x +=1;
			man._floor.x +=1;
			if(man._sprite.x >= (position1)){
				man._sprite.animations.stop(null, true);
				man._sprite.frame = 9;
				clearInterval(interval1);
				man._sprite.width *= -1;
				man._sprite.animations.play('man_walk');
				var interval2= setInterval(function(){ 
					man._sprite.x -= 1;
					man._money_rect.x -=1;
					man._stock_rect.x -=1;
					man._floor.x -=1;
					if(man._sprite.x <= (position2)){
						man._sprite.animations.stop(null, true);
						man._sprite.frame = 9;
						clearInterval(interval2);
					}
				}, 20);	
			}	
		}, 20);	
	};
	
	walk.say = function(man, content,time) {
		console.log('say');
		var ellipse = game.add.graphics(man._sprite.x+man._mirror*game.width*0.14, man._sprite.y+game.height*0.125);
		ellipse.beginFill(0x5aedb9,1);
		ellipse.drawEllipse(0,0,game.width*0.06,game.height*0.05);
		ellipse.endFill();
		
		var triangle = game.add.graphics(0, 0);
		triangle.beginFill(0x5aedb9);
		triangle.drawTriangle([ new Phaser.Point(ellipse.x, ellipse.y), new Phaser.Point(ellipse.x, ellipse.y+game.height*0.05), new Phaser.Point(man._sprite.x+man._mirror*game.width*0.07, man._sprite.y+game.height*0.06) ]);
		triangle.endFill();
		
		var style = { font: "24px Microsoft JhengHei", fill: "#ffffff", wordWrap: true, wordWrapWidth: ellipse.width, align: "center"};
		var text = game.add.text(ellipse.x, ellipse.y , content, style);
		text.anchor.set(0.5);
		setTimeout(function () {
			ellipse.destroy();
			triangle.destroy();
			text.destroy();
		}, time)
	};
	
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
	
	walk.draw_button = function(x,y,width,height,content){
		
		var style = { font:"20px 微軟正黑體" , fill: "#ffffff",  align: "center"};
		var butt =  {
			_rect : game.add.graphics(x,y),
			_text : game.add.text(x+ width / 2, y+ height / 2 , content, style)
		};
		butt._text.anchor.set(0.5);
		butt._rect.beginFill(0x5aedb9,1);
		butt._rect.drawRoundedRect(0, 0, width, height,20);
		butt._rect.endFill();
		butt._rect.inputEnabled = true;
		
		return butt;
		
	};
	walk.Out = function(butt){
		butt.alpha = 1;
	};
	walk.Over = function(butt){
		butt.alpha = 0.8;
	};
	walk.Down = function(butt){
		width = butt.width;
		height = butt.height;
		butt.clear();
		butt.beginFill(0x17ab76,1);
		butt.drawRoundedRect(0, 0, width, height,20);
		butt.endFill(); 
	};
	walk.Up = function(butt){
		width = butt.width;
		height = butt.height;
		butt.clear();
		butt.beginFill(0x5aedb9,1);
		butt.drawRoundedRect(0, 0, width, height,20);
		butt.endFill();
	};
	walk.simple_introduction = function(){
		var style = { font:"24px 微軟正黑體" , fill: "#000000",  align: "center"};
		var you = game.add.text(game.width*0.3,game.height*0.4 , '<-這是你', style);
		var other = game.add.text(game.width*0.7, game.height*0.4 , '這是別人->', style);
		you.anchor.set(0.5);
		other.anchor.set(0.5);
		you.alpha = 0;
		other.alpha = 0;
		game.add.tween(you).to( { alpha: 1 }, 1000, "Linear", true);
		setTimeout(function () {
			game.add.tween(other).to( { alpha: 1 }, 1000, "Linear", true);	
		}, 1000)
		setTimeout(function () {
			var instruction = game.add.text(game.width*0.5,game.height*0.75 , '接下來你可以試著買入或賣出，相關買賣資訊將會呈現在上面', style);
			instruction.anchor.set(0.5);
			instruction.alpha = 0;
			game.add.tween(instruction).to( { alpha: 1 }, 1000, "Linear", true);
			setTimeout(function () {
				var butt = walk.draw_button(game.width*0.47,game.height*0.83,game.width*0.06,50,'ok');
				butt._rect.inputEnabled = true;
				butt._rect.events.onInputOut.add(walk.Out, this);
				butt._rect.events.onInputOver.add(walk.Over, this);
				butt._rect.events.onInputDown.add(walk.Down, this);
				butt._rect.events.onInputUp.add(walk.Up, this);
				return butt;
			}, 1500)
		}, 2000)
		
	}
	
	
	return walk;    
		
}