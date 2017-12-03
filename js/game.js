var targetWidth;  
var targetHeight;
var game;
var player_name = "player1";
var player_black = 0;
var player_white = 0;
var player_heart = 0;
var player_money = 500;
var black_price = 10;
var white_price = 50;
var heart_price = 100;


$(document).ready(()=>{
	if((document.getElementById('wrapper_clearfix').offsetHeight)>290||window.innerHeight<600)
	{
		targetHeight =  window.innerHeight;
		targetWidth = window.innerWidth;
		$('body').animate({'margin-top': '-='+(document.getElementById('wrapper_clearfix').offsetHeight)}, 500,"swing", function() {});
	}
	else {
		targetHeight =  window.innerHeight-(document.getElementById('wrapper_clearfix').offsetHeight)-(document.getElementById('footer').offsetHeight);  
		targetWidth = (16/9) * targetHeight;
	}

	game = new Phaser.Game(targetWidth, targetHeight, Phaser.CANVAS, 'gameDiv');
	game.state.add('start', start);
	game.state.add('play', play);
	game.state.add('total', total);

	game.state.start('start');
});


$(window).on('resize', function () {
	window.location.reload();
});
