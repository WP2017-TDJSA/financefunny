module.exports = function(game) {
	var richwalk;
	var sanhuwalk;
	var rect1;
	var rect2;
	var rect3;
	var rect4;
	return {
        
		preload : function() {
            console.log('[state] walk')
        },
        create : function() {
            
			game.stage.backgroundColor = "ffffff";
			var rectangles = game.add.group();
			/*
			var line = new Phaser.Line(0,game.height*0.75 ,game.width*0.5,game.height*0.75 );
			var graphics = game.add.graphics(0,0);
			graphics.lineStyle(10, 0x000000, 1);
			graphics.moveTo(line.start.x,line.start.y);//moving position of graphic if you draw mulitple lines
			graphics.lineTo(line.end.x,line.end.y);
			graphics.endFill();
			*/
			var floor = game.add.graphics(0, 0);
			floor.lineStyle(10,0x000000,1);
			floor.beginFill(0xffffff,1);
			floor.drawRoundedRect(-10,game.height*0.75,game.width+20,game.height*0.3,1);
			floor.endFill();
			
			richwalk = game.add.sprite(game.width, game.height/2, 'richwalk');
			sanhuwalk = game.add.sprite(0, game.height/2, 'sanhuwalk');
			richwalk.anchor.setTo(0.5,0.5);
			sanhuwalk.anchor.setTo(0.5,0.5);
			var width = richwalk.width;
			var height = richwalk.height;
			
			richwalk.height = game.height*0.6*window.devicePixelRatio;
			richwalk.width = -richwalk.height*width/height;
			sanhuwalk.height = game.height*0.6*window.devicePixelRatio;
			sanhuwalk.width = sanhuwalk.height*width/height;
			
			rect1 = game.add.graphics(0, 0);
			rect1.lineStyle(1,0x000000,1);
			rect1.beginFill(0xf4e643,1);
			rect1.drawRoundedRect(sanhuwalk.x,game.height*0.75,100,game.height*0.2,10);
			rect1.endFill();
			rect1.alignTo(floor, Phaser.TOP_LEFT);
			
			rect2 = game.add.graphics(0, 0);
			rect2.lineStyle(1,0x000000,1);
			rect2.beginFill(0xf4b443,1);
			rect2.drawRoundedRect(sanhuwalk.x,game.height*0.75,100,game.height*0.1,10);
			rect2.endFill();
			rect2.alignTo(rect1, Phaser.LEFT_BOTTOM);

			
			rect3 = game.add.graphics(0, 0);
			rect3.lineStyle(1,0x000000,1);
			rect3.beginFill(0xf4e643,1);
			rect3.drawRoundedRect(game.width,game.height*0.75,100,game.height*0.2,10);
			rect3.endFill();
			rect3.alignTo(floor, Phaser.TOP_LEFT);
			
			rect4 = game.add.graphics(0, 0);
			rect4.lineStyle(1,0x000000,1);
			rect4.beginFill(0xf4b443,1);
			rect4.drawRoundedRect(game.width,game.height*0.75,100,game.height*0.1,10);
			rect4.endFill();
			rect4.alignTo(rect3, Phaser.LEFT_BOTTOM);
			
			rectangles.add(rect1);
			rectangles.add(rect2);
			rectangles.add(rect3);
			rectangles.add(rect4);
			
			richwalk.animations.add('richwalk',[ 0,1,2,3,4,5,6,7,8], 8, true,true);
			richwalk.animations.play('richwalk');
			sanhuwalk.animations.add('sanhuwalk',[ 0,1,2,3,4,5,6,7,8], 8, true,true);
			sanhuwalk.animations.play('sanhuwalk');
			
			
        },
		
		update : function(){
			
			if(richwalk.x > (window.innerWidth*0.85))
			{
				richwalk.x -= 1;
				rect3.x -=1;
				rect4.x -=1;
				sanhuwalk.x += 1;
				rect1.x +=1;
				rect2.x +=1;
				
			}
			if(richwalk.x <= (window.innerWidth*0.85))
			{
				richwalk.animations.stop(null, true);
				richwalk.frame = 9;
				sanhuwalk.animations.stop(null, true);
				sanhuwalk.frame = 9;
			}
			
			
		},
		
    };
}