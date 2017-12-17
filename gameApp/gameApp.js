require('./gameApp.html')
import $ from './jquery-3.2.1.js'
import 'pixi'
import 'p2'
import Phaser from 'phaser'

import player from './player'

var targetWidth;  
var targetHeight;
var game
var start = {
    preload : function() {
        game.load.image('a', 'img/game/background.jpg');
        game.load.image('b', 'img/game/black.png');
    },
    create : function() {
        console.log('hi i am create')
        game.add.sprite(0,0,'a');
    }
}

$(document).ready(()=>{
    targetHeight =  800;
    targetWidth = 600;
    
    game = new Phaser.Game(targetWidth, targetHeight, Phaser.CANVAS, 'gameDiv',null);
    game.resolution=window.devicePixelRatio;
    game.state.add('start', start);
    game.state.start('start');
})