var targetWidth;  
var targetHeight;
var game;
var player_name = "player1";
var player_black = 0;
var player_white = 0;
var player_heart = 0;
var player_money = 1000;
var black_price = 10;
var white_price = 50;
var heart_price = 100;
var black_Auction = CollectionAuction(black_price);
var system_black = 10;
var white_Auction = CollectionAuction(white_price);
var system_white = 10;
var heart_Auction = CollectionAuction(heart_price);
var system_heart = 10;
var gameConnect = gameClient();

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
	game.resolution=window.devicePixelRatio;
	game.state.add('start', start);
	game.state.add('hall', hall);
	game.state.add('play', play);
	game.state.add('total', total);

	game.state.start('start');
	gameConnect.connectGameServer({name : player_name});
});


$(window).on('resize', function () {
	window.location.reload();
});
