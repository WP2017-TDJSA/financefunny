module.exports = function(game) {
    return {
        preload : function() {
            console.log('[state] default')
            game.load.image('a', 'img/game/background.jpg');
            game.load.image('b', 'img/game/black.png');
        },
        create : function() {
            
            game.add.sprite(0,0,'b');
        }
    };
}