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
			floor.drawRoundedRect(-10,game.height*0.65,game.width+20,game.height*0.35+10,1);
            floor.endFill();
            
            this.machine = require('./AuctionMachine')(game, 0.3*game.width,0.1*game.height,0.4*game.width,0.6*game.height)
            this.machine.setTitle(['買入','價格','賣出'])
            this.machine.setData([[10,10,10]])
			
			this.walk = require('./walk')(game);
			var player = this.walk.add_one_man(game,'playerwalk',0,game.height*0.4,game.height*0.5,100,1,100,10);
			player._sprite.animations.add('player_walk',[ 0,1,2,3,4,5,6,7,8], 8, true,true);
			player._sprite.animations.play('player_walk');
			var stupid = this.walk.add_one_man(game,'stupidwalk',game.width,game.height*0.4,game.height*0.5,100,-1,100,10);
			stupid._sprite.animations.add('stupid_walk',[ 0,1,2,3,4,5,6,7,8], 8, true,true);
			stupid._sprite.animations.play('stupid_walk');
			this.walk.two_people_walk_in(player,stupid);
			var player_information = this.walk.display_information(player,window.innerWidth*0.15);
			
			var content = ["最 大 的 笨 蛋","完 全 不 管 某 個 東 西 的 真 實 價 值 ， 只 要 還 有 錢 都 願 意 花 高 價 買 下 ， 因 為 他 預 期 將 會 有 一 個 更 大 的 笨 蛋 出 更 高 的 價 錢 從 他 手 中 買 走 。"];
			this.display = require('./TextDisplay')(game,game.width*0.17,game.height*0.7,game.width*0.8,game.height*0.25,content);
			
        },
        update : function() {
			
        }
    };
}