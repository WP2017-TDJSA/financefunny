
module.exports = function(game) {
    return {
        preload : function() {
            game.load.image('a', 'img/game/background.jpg');
            game.load.image('b', 'img/game/black.png');
        },
        create : function() {
            console.log('hi i am create')
            game.add.sprite(0,0,'a');
        }
    };
}