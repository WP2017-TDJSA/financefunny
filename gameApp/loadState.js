module.exports = function(game) {
    return {
        preload : function() {
            console.log('[state] loading')
            var preloadSprite = game.add.sprite(game.width/2,game.height/2,'loading');
            game.load.setPreloadSprite(preloadSprite);
            game.load.image('a', 'img/game/background.jpg');
            game.load.image('b', 'img/game/black.png');
            game.load.atlasJSONHash('walk', 'img/game/richwalk.png', 'img/game/richwalk.json');
        },
        create : function() {
            var currState = game.state.current;
            var index = Object.keys(game.state.states).indexOf(game.state.current) + 1;
            if (index != Object.keys(game.state.states).length)
                var nextState = Object.keys(game.state.states)[index];
            
            game.state.remove(currState);
            if (nextState)
                game.state.start(nextState);
        },
        update : function() {

        }
    };
}