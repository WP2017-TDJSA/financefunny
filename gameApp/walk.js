module.exports = function(game) {
	var richwalk;
	var sanhuwalk;
	return {
        
		preload : function() {
            console.log('[state] walk')
        },
        create : function() {
            var img = game.add.sprite(0,0,'a');
			img.width = game.width*window.devicePixelRatio;
			img.height = game.height*window.devicePixelRatio;
			richwalk = game.add.sprite(game.width, game.height/3, 'richwalk');
			sanhuwalk = game.add.sprite(0, game.height/3, 'sanhuwalk');
			
			var width = richwalk.width;
			var height = richwalk.height;
			
			richwalk.width = -game.width*0.3*window.devicePixelRatio;
			richwalk.height = -richwalk.width*height/width;
			sanhuwalk.width = game.width*0.3*window.devicePixelRatio;
			sanhuwalk.height = sanhuwalk.width*height/width;
			
			richwalk.animations.add('richwalk',[ 0,1,2,3,4,5,6,7,8], 8, true,true);
			richwalk.animations.play('richwalk');
			sanhuwalk.animations.add('sanhuwalk',[ 0,1,2,3,4,5,6,7,8], 8, true,true);
			sanhuwalk.animations.play('sanhuwalk');
			
        },
		
		update : function(){
			
			if(richwalk.x > (window.innerWidth*0.9))
			{
				richwalk.x -= 1;
				sanhuwalk.x += 1;
			}
			if(richwalk.x <= (window.innerWidth*0.9))
			{
				richwalk.animations.stop(null, true);
				richwalk.frame = 9;
				sanhuwalk.animations.stop(null, true);
				sanhuwalk.frame = 9;
			}
			
			
			
		},
		
    };
}