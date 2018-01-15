import 'pixi'
import 'p2'
import 'phaser'
import * as d3 from 'd3'
require('./gameApp.html')
require('expose-loader?$!expose-loader?jquery!jquery')
window.SlickUI = require('exports-loader?SlickUI!./SlickUI/slick-ui.min.js')
window.dat = require('./dat.GUI/dat.gui')

window.d3 = d3;

window.debugGUI = null;
var gameRatio = window.innerWidth/window.innerHeight;
var firstRunPortrait;
var check_landscape = function(game){}  
	
check_landscape.prototype = {
	preload:function(){
		firstRunPortrait = game.scale.isGamePortrait;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.forceOrientation(true, false);
		game.scale.enterIncorrectOrientation.add(handleIncorrect);
		game.scale.leaveIncorrectOrientation.add(handleCorrect);
	},
	create:function(){
		game.scale.setScreenSize = true;
        game.stage.scale.pageAlignHorizontally = true;
        game.stage.scale.pageAlignVeritcally = true;
        var currState = game.state.current;
        var index = Object.keys(game.state.states).indexOf(game.state.current) + 1;
        if (index != Object.keys(game.state.states).length)
            var nextState = Object.keys(game.state.states)[index];

        if (nextState)
            game.state.start(nextState);
        game.state.remove(currState);
	}
}

function handleIncorrect(){
	console.log('[state] incorrect')
	if(!game.device.desktop){
		document.getElementById("turn").style.display="block";
	}
}

function handleCorrect(){
	console.log('[state] correct')
	if(!game.device.desktop){
		if(firstRunPortrait){
			game.scale.setGameSize(window.innerWidth, window.innerHeight)
			firstRunPortrait = false;
			game.state.start('start');		
		}
		document.getElementById('turn').style.display='none';
		if(game.paused){
			console.log('[state] pause');
			game.paused = false;
		}
		
	}
	
}


var gameRatio = window.innerWidth/window.innerHeight;
var firstRunPortrait;
var check_landscape = function(game){}  
	
check_landscape.prototype = {
	preload:function(){
		firstRunPortrait = game.scale.isGamePortrait;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.forceOrientation(true, false);
		game.scale.enterIncorrectOrientation.add(handleIncorrect);
		game.scale.leaveIncorrectOrientation.add(handleCorrect);
	},
	create:function(){
		game.scale.setScreenSize = true;
        game.stage.scale.pageAlignHorizontally = true;
        game.stage.scale.pageAlignVeritcally = true;
        game.state.start('boot');	
	}
}

function handleIncorrect(){
	console.log('[state] incorrect')
	if(!game.device.desktop){
		document.getElementById("turn").style.display="block";
	}
}

function handleCorrect(){
	console.log('[state] correct')
	if(!game.device.desktop){
		if(firstRunPortrait){
			firstRunPortrait = false;
			game.state.start('start');		
		}
		document.getElementById('turn').style.display='none';
		if(game.paused){
			console.log('[state] pause');
			game.paused = false;
		}
		
	}
	
}

var boot = {
    preload : function() {
        console.log('[state] boot')
        game.load.image('loading', 'img/game/loading.gif');
    },
    create : function() {
		var currState = game.state.current;
        var index = Object.keys(game.state.states).indexOf(game.state.current) + 1;
        if (index != Object.keys(game.state.states).length)
            var nextState = Object.keys(game.state.states)[index];

        if (nextState)
            game.state.start(nextState);
        game.state.remove(currState);
		
    },   
}

$(document).ready(()=>{
    // 創造 phaser 遊戲
    
	window.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'gameDiv',null);
	game.resolution=window.devicePixelRatio;
	
    // 加入遊戲狀態
	game.state.add('check_landscape',check_landscape)
    game.state.add('boot',boot)
    game.state.add('load', require('./loadState')(game))
	game.state.add('start', require('./start')(game))
    game.state.add('introduction', require('./introduction')(game))
    game.state.add('introAuction', require('./introAuctionState'))
	game.state.add('instruction', require('./instruction')(game))
    game.state.add('player_test', require('./player_test')(game))
    game.state.add('player_rich', require('./player_rich'));
	game.state.add('player_sanhu', require('./player_sanhu'));
    game.state.add('templete', require('./templeteState')(game));
    //game.state.add('default', require('./defaultState')(game));
    //game.state.add('auction', require('./auctionState'));
    game.state.add('pricechart', require('./chartLine')(game));
    //game.state.add('walk', require('./walk')(game))

    // 開始進行遊戲狀態
    game.state.start('check_landscape');

})

$(window).on('resize', function () {
	
	game.scale.setGameSize(window.innerWidth, window.innerHeight);	
	
});

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