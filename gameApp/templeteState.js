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
        },
        update : function() {
			
        }
    };
}