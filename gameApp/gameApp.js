require('./gameApp.html')
import $ from './jquery-3.2.1.js'
import 'pixi'
import 'p2'
import Phaser from 'phaser'

import player from './player'

console.log($);

console.log(Phaser.Game);

console.log(player);

console.log('hi');

var targetWidth;  
var targetHeight;
var game
var start = {
    preload : function() {

    },
    create : function() {

    }
}

$(document).ready(()=>{
    window.PIXI = PIXI
    window.p2 = p2
    window.Phaser = Phaser
    targetHeight =  window.innerHeight;
    targetWidth = window.innerWidth;
    console.log(Phaser.Game);
    game = new Phaser.Game(targetWidth, targetHeight, Phaser.CANVAS, 'gameDiv',null);
    game.resolution=window.devicePixelRatio;
    game.state.add('start', start);
    game.state.start('start');
})