function play_music(m){
	m.fadeIn(2000,true);
	//music.play();
}
module.exports = function(game) {
    return {
        preload : function() {
            console.log('[state] loading')
            var preloadSprite = game.add.sprite(game.width/2,game.height/2,'loading');
            preloadSprite.anchor.set(0.5,0.5)
            game.load.setPreloadSprite(preloadSprite);
            game.load.image('a', 'img/game/background.jpg');
            game.load.image('b', 'img/game/black.png');
            game.load.image('start', 'img/game/start.gif');
            game.load.atlasJSONHash('playerwalk', 'img/game/playerwalk.png', 'img/game/playerwalk.json');
			game.load.atlasJSONHash('stupidwalk', 'img/game/stupidwalk.png', 'img/game/stupidwalk.json');
			game.load.atlasJSONHash('richwalk', 'img/game/richwalk.png', 'img/game/richwalk.json');
			game.load.atlasJSONHash('sanhuwalk', 'img/game/sanhuwalk.png', 'img/game/sanhuwalk.json');
            game.load.atlasJSONHash('startanimate', 'img/game/bc.png', 'img/game/bc.json');
			game.load.audio('backgroundmusic', 'music/Ambler.mp3');
			game.load.audio('button_click', 'music/button_click.mp3');
			game.load.spritesheet('financefunny', 'img/game/financefunny.png', 140, 120);
            
        },
        create : function() {
            var music = game.add.audio('backgroundmusic');
			music.onDecoded.add(play_music, this);
            
            // 加入 game.time 顯示
            //var timeText = new Phaser.Text(game,20,20,"",{ font:"24px 微軟正黑體 " , fill: "#000000",  align: "center"})
			//game.stage.addChild(timeText)
			//game.time.advancedTiming = true;
			//timeText.update = function() {
			//	timeText.setText(`fps : ${game.time.fps}\n elapsed : ${game.time.elapsed}\nnow : ${game.time.now}\n physicsElapsedMS : ${game.time.physicsElapsedMS}`)
            //}
            
            // 完成後到下一個 state
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