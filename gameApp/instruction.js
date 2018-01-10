module.exports = function(game) {
	return {
        
		preload : function() {
            console.log('[state] instruction')
			
        },
        create : function() {
            
			
			game.stage.backgroundColor = "ffffff";
			
			// draw floor
            var floor = game.add.graphics(0, 0);
			floor.lineStyle(10,0x000000,1);
			floor.beginFill(0xffffff,1);
			floor.drawRoundedRect(-10,game.height*0.65,game.width+20,game.height*0.35+10,1);
            floor.endFill();
            
			//加入玩家與典型人物
			this.walk = require('./walk')(game);
			var player = this.walk.add_one_man(game,'playerwalk',0,game.height*0.4,game.height*0.5,100,1,100,10);
			var player_ani = player._sprite.animations.add('man1_walk_in',[ 0,1,2,3,4,5,6,7,8], 8, true,true);
			player_ani.play('man1_walk_in');
			var stupid = this.walk.add_one_man(game,'stupidwalk',game.width,game.height*0.4,game.height*0.5,100,-1,100,10);
			var stupid_ani = stupid._sprite.animations.add('man2_walk_in',[ 0,1,2,3,4,5,6,7,8], 8, true,true);
			stupid_ani.play('man2_walk_in');
			this.interval = this.walk.two_people_walk_in(player,stupid,player_ani,stupid_ani);
			this.stupid_ani = stupid_ani;
			
			player_ani.onComplete.add(function () {	
				var butt_player_test = this.walk.simple_instruction();
			}, this);
			
        },
        update : function() {
			if (this.stupid_ani.isPlaying)
			this.interval();
        }
    };
}