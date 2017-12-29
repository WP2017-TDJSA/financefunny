//Note: (x,y) is at the sprite's center (because the anchor is set to 0.5)
function add_one_man(game,sprite,x,y,height,rect_width,mirror,money,stock){
	var man = {
		_sprite: game.add.sprite(x, y, sprite),
		_money_rect: game.add.graphics(0, 0),
		_stock_rect: game.add.graphics(0, 0),
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
							this._stock_rect.drawRoundedRect(0,0,this._rect_width,this._height*stock*0.002,10);
							this._stock_rect.endFill();
							this._stock_rect.alignTo(this._floor, Phaser.TOP_RIGHT);
							return;
						},
	}
	man._sprite.anchor.setTo(0.5,0.5);

	w = man._sprite.width;
	h = man._sprite.height;
	man._sprite.height = height*window.devicePixelRatio;
	man._sprite.width = mirror*man._sprite.height*w/h;
	
	man._money_rect.lineStyle(1,0x000000,1);
	man._money_rect.beginFill(0xf4e643,1);
	man._money_rect.drawRoundedRect(0,0,rect_width,height*money*0.002,10);
	man._money_rect.endFill();
	man._stock_rect.lineStyle(1,0x000000,1);
	man._stock_rect.beginFill(0xf4b443,1);
	man._stock_rect.drawRoundedRect(0,0,rect_width,height*stock*0.002,10);
	man._stock_rect.endFill();
	man._floor.lineStyle(1,0x000000,0);
	man._floor.beginFill(0x000000,0);
	man._floor.drawRoundedRect(0,0,rect_width,20,1);
	man._floor.endFill();
	
	man._stock_rect.alignTo(man._floor, Phaser.TOP_RIGHT);
	man._money_rect.alignTo(man._floor, Phaser.TOP_RIGHT,-rect_width,0);
	
	return man;
}

function two_people_walk_in(man1,man2){
		
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
}

function walk_around(man,position1,position2){
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
}

function say(man, content,time){
	console.log('say');
	var ellipse = game.add.graphics(man._sprite.x+man._mirror*game.width*0.14, man._sprite.y+game.height*0.125);
	ellipse.beginFill(0x5aedb9,1);
	ellipse.drawEllipse(0,0,game.width*0.06,game.height*0.05);
	ellipse.endFill();
	
    var triangle = game.add.graphics(0, 0);
    triangle.beginFill(0x5aedb9);
    triangle.drawTriangle([ new Phaser.Point(ellipse.x, ellipse.y), new Phaser.Point(ellipse.x, ellipse.y+game.height*0.05), new Phaser.Point(man._sprite.x+man._mirror*game.width*0.07, man._sprite.y+game.height*0.06) ]);
    triangle.endFill();
	
	var style = { font: "24px Arial", fill: "#ffffff", wordWrap: true, wordWrapWidth: ellipse.width, align: "center"};
    var text = game.add.text(ellipse.x, ellipse.y , content, style);
    text.anchor.set(0.5);
	setTimeout(function () {
		ellipse.destroy();
		triangle.destroy();
		text.destroy();
	}, time)
}

module.exports = function(game) {

	return {
        
		preload : function() {
            console.log('[state] walk')
        },
		
        create : function() {
            
			game.stage.backgroundColor = "ffffff";
			var rectangles = game.add.group();
			
			var floor = game.add.graphics(0, 0);
			floor.lineStyle(10,0x000000,1);
			floor.beginFill(0xffffff,0.3);
			floor.drawRoundedRect(-10,game.height*0.75,game.width+20,game.height*0.3,1);
			floor.endFill();
			
			var player = add_one_man(game,'playerwalk',0,game.height*0.45,game.height*0.6,100,1,100,200);
			rectangles.add(player._stock_rect);
			rectangles.add(player._money_rect);
			player._sprite.animations.add('player_walk',[ 0,1,2,3,4,5,6,7,8], 8, true,true);
			player._sprite.animations.play('player_walk');
			
			var stupid = add_one_man(game,'stupidwalk',game.width,game.height*0.45,game.height*0.6,100,-1,100,200);
			rectangles.add(stupid._stock_rect);
			rectangles.add(stupid._money_rect);
			stupid._sprite.animations.add('stupid_walk',[ 0,1,2,3,4,5,6,7,8], 8, true,true);
			stupid._sprite.animations.play('stupid_walk');
			
			two_people_walk_in(player,stupid);
			
			var button1 = game.add.graphics(game.width*0.5,game.height*0.1);
			button1.beginFill(0xfffafa,0.5);
			button1.lineStyle(2, 0x483D8B, 1);
			button1.drawRoundedRect(0, 0, game.width*0.1, game.height*0.1,7);
			button1.endFill();
			button1.inputEnabled = true;
			button1.input.useHandCursor = true;
				
			var button2 = game.add.graphics(game.width*0.61,game.height*0.1);
			button2.beginFill(0xfffafa,0.5);
			button2.lineStyle(2, 0x483D8B, 1);
			button2.drawRoundedRect(0, 0, game.width*0.1, game.height*0.1,7);
			button2.endFill();
			button2.inputEnabled = true;
			button2.input.useHandCursor = true;
				
			var button3 = game.add.graphics(game.width*0.72,game.height*0.1);
			button3.beginFill(0xfffafa,0.5);
			button3.lineStyle(2, 0x483D8B, 1);
			button3.drawRoundedRect(0, 0, game.width*0.1, game.height*0.1,7);
			button3.endFill();
			button3.inputEnabled = true;
			button3.input.useHandCursor = true;
			
			var button4 = game.add.graphics(game.width*0.83,game.height*0.1);
			button4.beginFill(0xfffafa,0.5);
			button4.lineStyle(2, 0x483D8B, 1);
			button4.drawRoundedRect(0, 0, game.width*0.1, game.height*0.1,7);
			button4.endFill();
			button4.inputEnabled = true;
			button4.input.useHandCursor = true;
				
			var style = { font: "18px 微軟正黑體", fill: "#000000",  align: "center"};
			var button1text = game.add.text(button1.x + button1.width/2,button1.y + button1.height/2,"來回走",style);
			button1text.anchor.set(0.5);
			var button2text = game.add.text(button2.x + button2.width/2,button2.y + button2.height/2,"說話",style);
			button2text.anchor.set(0.5);
			var button3text = game.add.text(button3.x + button3.width/2,button3.y + button3.height/2,"金錢變化",style);
			button3text.anchor.set(0.5);
			var button4text = game.add.text(button4.x + button4.width/2,button4.y + button4.height/2,"股票變化",style);
			button4text.anchor.set(0.5);
				
			button1.events.onInputDown.add(function(){
				walk_around(stupid,window.innerWidth*0.95,window.innerWidth*0.85);
			}, this);
			button2.events.onInputDown.add(function(){
				say(stupid,'我賣20!',3000);
			}, this);
			button3.events.onInputDown.add(function(){
				stupid.change_money(Math.random() * (500 - 50) + 50);
			}, this);
			button4.events.onInputDown.add(function(){
				stupid.change_stock(Math.random() * (500 - 50) + 50);
			}, this);

        }
		
    };
}