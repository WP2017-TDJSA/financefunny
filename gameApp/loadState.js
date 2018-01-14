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
            
            // 加入跳過提示
            var jumpText = new Phaser.Text(game, game.width, 10, "跳過 >>",{ font:"24px 微軟正黑體 " , fill: "#000000",  align: "center"})
            game.stage.addChild(jumpText)
            jumpText.inputEnabled = true;
            jumpText.events.onInputDown.add(()=>{
                // 跳到下一個 state
                var currState = game.state.current;
                var index = Object.keys(game.state.states).indexOf(game.state.current) + 1;
                if (index != Object.keys(game.state.states).length)
                    var nextState = Object.keys(game.state.states)[index];

                if (nextState)
                    game.state.start(nextState);
            })

            jumpText.update = function() {
                // 點三下 顯示可跳過
                if (game.input.onTap.TapCount >= 3 && !jumpText.visible) {

                    jumpText.visible = true;
                    jumpText.input.enabled = true;

                    game.time.events.add(5000,()=>{

                        jumpText.visible = false;
                        jumpText.input.enabled = false;
                    })
                }
                
                jumpText.x = game.width - jumpText.width - 10;
            }

            // 偵測三連點
            var detectTapRate = 1000
            game.input.onTap.TapCount = 0;
            
            // 更換 state 就變0
            game.state.onStateChange.add(()=>{
                game.input.onTap.TapCount = 0;
                jumpText.alpha = 0;
                jumpText.showTween = game.add.tween(jumpText).to({alpha : 1}, 1000, "Linear", true, 0, -1, true);
                //jumpText.showTween.pause()
                jumpText.visible = false;
                jumpText.input.enabled = false;

                game.input.onTap.add((pointer, doubleTap)=>{
                    game.input.onTap.TapCount++;
                    game.time.events.add(detectTapRate, ()=>{
                        game.input.onTap.TapCount--;
                    })
                })
            })            

            game.scale.onSizeChange.add(function() {
        
                // 調整尺寸就重新進入當下的 state
                if (game.state.current == 'boot' || game.state.current == 'load' || game.state.current == 'check_landscape')
                    return;
                    
                game.state.start(game.state.current);
            })
            
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