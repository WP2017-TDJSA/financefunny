function add_one_man(game,sprite,x,y,height,mirror,money,stock){
	var man = {
		_sprite: game.add.sprite(x, y, sprite),
		_money_rect: game.add.graphics(0, 0),
		_stock_rect: game.add.graphics(0, 0),
		_money : money,
		_stock : stock
	}
	man._sprite.anchor.setTo(0.5,0.5);
	
	w = man._sprite.width;
	h = man._sprite.height;
	man._sprite.height = height;
	man._sprite.width = mirror*man._sprite.height*w/h;
	
	man._money_rect.lineStyle(1,0x000000,1);
	man._money_rect.beginFill(0xf4e643,1);
	man._money_rect.drawRoundedRect(0,game.height*0.75,100,game.height*money*0.001,10);
	man._money_rect.endFill();
	man._stock_rect.lineStyle(1,0x000000,1);
	man._stock_rect.beginFill(0xf4b443,1);
	man._stock_rect.drawRoundedRect(0,game.height*0.75,100,game.height*stock*0.001,10);
	man._stock_rect.endFill();
	
	return man;
}
function two_people_walk_in(man1,man2){
		
		man1._sprite.animations.add('sanhuwalk',[ 0,1,2,3,4,5,6,7,8], 8, true,true);
		man1._sprite.animations.play('sanhuwalk');
		man2._sprite.animations.add('richwalk',[ 0,1,2,3,4,5,6,7,8], 8, true,true);
		man2._sprite.animations.play('richwalk');
		var interval = setInterval(function(){ 
			man1._sprite.x += 1;
			man1._money_rect.x +=1;
			man1._stock_rect.x +=1;
			man2._sprite.x -= 1;
			man2._money_rect.x -=1;
			man2._stock_rect.x -=1;
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
	man._sprite.animations.add('sanhuwalk',[ 0,1,2,3,4,5,6,7,8], 7, true,true);
	man._sprite.animations.play('sanhuwalk');
	var interval1 = setInterval(function(){ 
		man._sprite.x += 1;
		man._money_rect.x +=1;
		man._stock_rect.x +=1;
		if(man._sprite.x >= (position1)){
			man._sprite.animations.stop(null, true);
			man._sprite.frame = 9;
			clearInterval(interval1);
			man._sprite.width *= -1;
			man._sprite.animations.play('sanhuwalk');
			var interval2= setInterval(function(){ 
				man._sprite.x -= 1;
				man._money_rect.x -=1;
				man._stock_rect.x -=1;
				if(man._sprite.x <= (position2)){
					man._sprite.animations.stop(null, true);
					man._sprite.frame = 9;
					clearInterval(interval2);
				}
			}, 20);	
		}	
	}, 20);	
}
function say(man, content){
	console.log('say');
	
}
function change_money(man,money){
	console.log('change_money');
	
}
function change_stock(man,stock){
	console.log('change_stock');
	
}

module.exports = function(game) {
	
	var rich;
	var sanhu;
	var rect1;
	var rect2;
	var rect3;
	var rect4;
	
	var button1;
	var button2;
	var button3;
	var button4;
	
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
			var rich = add_one_man(game,'richwalk',game.width,game.height/2,game.height*0.5*window.devicePixelRatio,-1,100,200);
			rich._money_rect.alignTo(floor, Phaser.TOP_RIGHT,0,0);
			rich._stock_rect.alignTo(rich._money_rect, Phaser.RIGHT_BOTTOM);
			rectangles.add(rich._stock_rect);
			rectangles.add(rich._money_rect);
			rich._sprite.animations.add('richwalk',[ 0,1,2,3,4,5,6,7,8], 8, true,true);
			rich._sprite.animations.play('richwalk');
			
			var sanhu = add_one_man(game,'sanhuwalk',0,game.height/2,game.height*0.5*window.devicePixelRatio,1,100,200);
			sanhu._stock_rect.alignTo(floor, Phaser.TOP_LEFT);
			sanhu._money_rect.alignTo(sanhu._stock_rect, Phaser.LEFT_BOTTOM);
			rectangles.add(sanhu._stock_rect);
			rectangles.add(sanhu._money_rect);
			sanhu._sprite.animations.add('sanhuwalk',[ 0,1,2,3,4,5,6,7,8], 8, true,true);
			sanhu._sprite.animations.play('sanhuwalk');
			
			two_people_walk_in(sanhu,rich);
			
			
			button1 = game.add.graphics(game.width*0.5,game.height*0.1);
			button1.beginFill(0xfffafa,0.5);
			button1.lineStyle(2, 0x483D8B, 1);
			button1.drawRoundedRect(0, 0, game.width*0.1, game.height*0.1,7);
			button1.endFill();
			button1.inputEnabled = true;
			button1.input.useHandCursor = true;
				
			button2 = game.add.graphics(game.width*0.61,game.height*0.1);
			button2.beginFill(0xfffafa,0.5);
			button2.lineStyle(2, 0x483D8B, 1);
			button2.drawRoundedRect(0, 0, game.width*0.1, game.height*0.1,7);
			button2.endFill();
			button2.inputEnabled = true;
			button2.input.useHandCursor = true;
				
			button3 = game.add.graphics(game.width*0.72,game.height*0.1);
			button3.beginFill(0xfffafa,0.5);
			button3.lineStyle(2, 0x483D8B, 1);
			button3.drawRoundedRect(0, 0, game.width*0.1, game.height*0.1,7);
			button3.endFill();
			button3.inputEnabled = true;
			button3.input.useHandCursor = true;
			
			button4 = game.add.graphics(game.width*0.83,game.height*0.1);
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
				walk_around(rich,window.innerWidth*0.95,window.innerWidth*0.85);
			}, this);
			button2.events.onInputDown.add(function(){
				say(rich,'123');
			}, this);
			button3.events.onInputDown.add(function(){
				change_money(rich,123);
			}, this);
			button4.events.onInputDown.add(function(){
				change_stock(rich,123);
			}, this);
			
        },
		update : function(){
			
		}
		
    };
}