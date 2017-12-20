module.exports = function(game) {
    return {
        preload : function() {
            console.log('[state] default')
            game.load.image('a', 'img/game/background.jpg');
            game.load.image('b', 'img/game/black.png');
            
        },
        create : function() {
            var img = game.add.sprite(0,0,'a');
			img.width = game.width*window.devicePixelRatio;
            img.height = game.height*window.devicePixelRatio;;
			console.log(`${game.width}, ${game.height}`)

            
        }
    };
}