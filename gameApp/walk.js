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
			walk = game.add.sprite(window.innerWidth, 10, 'walk');
			walk.scale.setTo(0.5,0.5);
			walk.scale.x = -0.5;
			walk.animations.add('walk', Phaser.Animation.generateFrameNames('walk', [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]), 4, true);
			walk.animations.play('walk');
        },
		
		update : function(){
			walk.x -= 1;
			if(walk.x < 0)
			{
				walk.x = window.innerWidth ;
			}
		},
		
    };
}