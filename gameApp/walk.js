module.exports = function(game) {
	var walk;
	return {
        
		preload : function() {
            console.log('[state] walk')
        },
        create : function() {
            var img = game.add.sprite(0,0,'a');
			img.width = game.width*window.devicePixelRatio;
			img.height = game.height*window.devicePixelRatio;
			walk = game.add.sprite(game.width, game.height/3, 'walk');
			
			var width = walk.width;
			var height = walk.height;
			//walk.scale.setTo(0.5,0.5);
			//walk.scale.x = -0.5;
			walk.width = -game.width*0.3*window.devicePixelRatio;
			walk.height = -walk.width*height/width;
			
			walk.animations.add('walk', Phaser.Animation.generateFrameNames('walk', [1,2,3,4,5,6,7,8]), 4, true);
			walk.animations.play('walk');
        },
		
		update : function(){
			
			if(walk.x > (window.innerWidth*6/7))
			{
				walk.x -= 1;
			}
			if(walk.x <= (window.innerWidth*6/7))
			{
				walk.animations.stop(null, true);
			}
			
			
		},
		
    };
}