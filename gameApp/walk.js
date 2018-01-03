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
	
	walk.two_people_walk_in = function(man1,man2) {
		var information;
		man1._sprite.animations.add('man1_walk_in',[ 0,1,2,3,4,5,6,7,8], 8, true,true);
		man1._sprite.animations.play('man1_walk_in');
		man2._sprite.animations.add('man2_walk_in',[ 0,1,2,3,4,5,6,7,8], 8, true,true);
		man2._sprite.animations.play('man2_walk_in');
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
				man1._sprite.animations.stop(null, true);
				man1._sprite.frame = 9;
				man2._sprite.animations.stop(null, true);
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
		rect.lineStyle(1,0xffffff,1);
		rect.beginFill(0xffffff,1);
		rect.drawRoundedRect(0,0,man._rect_width*2,100,10);
		rect.endFill();
		var style = { font: "24px Microsoft JhengHei", fill: "#000000", wordWrap: true, wordWrapWidth: rect.width, align: "left"};
		var information = game.add.text(x, man._sprite.y-man._height*0.5 , '所剩金額 '+man._money+ '\n'+'擁有股票 '+man._stock, style);
		information.anchor.set(0.5);
		return information;
	};
	
	return walk;    
		
}