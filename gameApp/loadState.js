module.exports = function(game) {
    return {
        preload : function() {
            console.log('[state] loading')
            var preloadSprite = game.add.sprite(game.width/2,game.height/2,'loading');
            preloadSprite.anchor.set(0.5,0.5)
            game.load.setPreloadSprite(preloadSprite);
            game.load.image('a', 'img/game/background.jpg');
            game.load.image('b', 'img/game/black.png');
            game.load.atlasJSONHash('playerwalk', 'img/game/playerwalk.png', 'img/game/playerwalk.json');
			game.load.atlasJSONHash('stupidwalk', 'img/game/stupidwalk.png', 'img/game/stupidwalk.json');
			game.load.atlasJSONHash('richwalk', 'img/game/richwalk.png', 'img/game/richwalk.json');
			game.load.atlasJSONHash('sanhuwalk', 'img/game/sanhuwalk.png', 'img/game/sanhuwalk.json');
			game.load.audio('backgroundmusic', 'music/Ambler.mp3');
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