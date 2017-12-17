require('./gameApp.html')
import $ from './jquery-3.2.1.js'
import 'pixi'
import 'p2'
import Phaser from 'phaser'

import player from './player'
import defaultState from './defaultState'

var targetWidth;  
var targetHeight;
var game


$(document).ready(()=>{
    targetHeight =  800;
    targetWidth = 600;
    
    game = new Phaser.Game(targetWidth, targetHeight, Phaser.CANVAS, 'gameDiv',null);
    game.resolution=window.devicePixelRatio;
    game.state.add('default', defaultState(game));
    game.state.start('default');
})