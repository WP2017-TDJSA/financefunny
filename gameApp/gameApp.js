import 'pixi'
import 'p2'
import 'phaser'
require('./gameApp.html')
require('expose-loader?$!expose-loader?jquery!jquery')

var targetWidth;  
var targetHeight;
var game;


$(document).ready(()=>{
    targetHeight =  window.innerHeight;
    targetWidth = window.innerWidth;
    

 
    // 創造 phaser 遊戲
    game = new Phaser.Game(targetWidth, targetHeight, Phaser.CANVAS, 'gameDiv',null);

    game.resolution=window.devicePixelRatio;

    // 加入遊戲狀態
    game.state.add('default', require('./defaultState')(game));
    game.state.add('auction', require('./auctionState')(game));
    game.state.add('menu', require('./menuState')(game));

    // 開始進行遊戲狀態
    game.state.start('default');
})

// 抓取左右方向鍵，切換 state
// 37 左 39 右
$(document).keydown((event)=>{
    switch(event.which) {
        case 37 :
            if (game) {
                var currState = game.state.current;
                var index = Object.keys(game.state.states).indexOf(currState);
                if (index == 0)
                    index = Object.keys(game.state.states).length - 1;
                else
                    index--;
                
                game.state.start(Object.keys(game.state.states)[index]);
            }
            break;
        case 39 :
            if (game) {
                var currState = game.state.current;
                var index = Object.keys(game.state.states).indexOf(currState);
                if (index == Object.keys(game.state.states).length - 1)
                    index = 0;
                else
                    index++;
            
                game.state.start(Object.keys(game.state.states)[index]);
            }
            break;
    }
})
  