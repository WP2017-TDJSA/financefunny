module.exports = function(game) {
	return {
        
		preload : function() {
            console.log('[state] templete')
        },
        create : function() {
            game.stage.backgroundColor = "ffffff";
            // draw floor
            var floor = game.add.graphics(0, 0);
			floor.lineStyle(10,0x000000,1);
			floor.beginFill(0xffffff,1);
			floor.drawRoundedRect(-10,game.height*0.75,game.width+20,game.height*0.3,1);
            floor.endFill();
            
            this.machine = require('./AuctionMachine')(game, 0.3*game.width,0.1*game.height,0.4*game.width,0.6*game.height)
            this.machine.setTitle(['買入','價格','賣出'])
            this.machine.setData([[10,10,10]])
			
			this.walk = require('./walk')(game);
			var player = this.walk.add_one_man(game,'playerwalk',0,game.height*0.45,game.height*0.6,100,1,100,10);
			player._sprite.animations.add('player_walk',[ 0,1,2,3,4,5,6,7,8], 8, true,true);
			player._sprite.animations.play('player_walk');
			var stupid = this.walk.add_one_man(game,'stupidwalk',game.width,game.height*0.45,game.height*0.6,100,-1,100,10);
			stupid._sprite.animations.add('stupid_walk',[ 0,1,2,3,4,5,6,7,8], 8, true,true);
			stupid._sprite.animations.play('stupid_walk');
			this.walk.two_people_walk_in(player,stupid);
			var player_information = this.walk.display_information(player,window.innerWidth*0.15);
			
        },
        update : function() {
			
        }
    };
}