module.exports = function(game) {
	return {
        
		preload : function() {
            console.log('[state] templete')
        },
        create : function() {
            // draw background
            var graphics = game.add.graphics(0, 0);
            graphics.lineStyle(0,0xffffff,0);
            graphics.beginFill(0xffffff,1);
            graphics.drawRect(0,0,game.width*game.resolution,game.height*game.resolution);
            graphics.endFill();
            graphics.beginFill(0x000000,1);
            graphics.drawRect(0,game.height*game.resolution*0.8,game.width*game.resolution,5);
            graphics.endFill();
        },
        update : function() {
			
        }
    };
}