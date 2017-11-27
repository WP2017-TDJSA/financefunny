var targetWidth;  
var targetHeight;
var game;

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

	game = new Phaser.Game(targetWidth, targetHeight, Phaser.CANVAS, 'gameDiv', { preload: preload, create: create, update:update});
});

var countdown = 2;
var content=[];

var content1 = [
    "The sky above the port was the color of television, tuned to a dead channel.",
    "`It's not like I'm using,' Case heard someone say, as he shouldered his way "
];
var content2=[
	"this is content2 ~~~~~ ~~~~ ~~ ~~~~ ~~~ ~~~~~ ~~~~~ ~~~~~",
	"this is content2 ~~~~ ~~~~~ ~~~~~~ ~~ ~~~~~~ ~~~~~ ~~~~~"
];

content=content1;

var line = [];

var wordIndex = 0;
var lineIndex = 0;

var wordDelay = 120;
var lineDelay = 400;

var butt1;
var butt2;
var option1;
var option2;
var next;

var sentence;

var group_text;
var group_talk;
var group_button;

$(window).on('resize', function () {
	window.location.reload();
});

function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('background', 'img/game/background.jpg');
	game.load.image('boy', 'img/game/boy.png');
	game.load.image('next', 'img/game/next.png');

}
function create() {

	group_text = game.add.group();
	group_talk = game.add.group();
	group_button = game.add.group();
	
	var background= game.add.image(0, 0, "background");
	background.width = game.width;
	background.height = game.height;
	var boy = game.add.sprite(game.width*0.35,game.height*0.15, 'boy');
	boy.width = game.width*0.3;
	boy.height = game.height*0.8;
	
	var talk = game.add.graphics();
	talk.beginFill(0xff8c00,0.5);
	talk.lineStyle(2, 0xA0522D, 1);
	talk.drawRoundedRect(game.width*0.05, game.height*0.65, game.width*0.9, game.height*0.3,5);
	talk.endFill();
	
	
	sentence = game.add.text(game.width*0.1,game.height*0.7,'',{ font: "16px Arial", fill: 'rgba(0,0,0,1)' });
    nextLine();
	group_text.add(sentence);
	group_talk.add(talk);
		
	game.world.bringToTop(group_talk);
	game.world.bringToTop(group_button);
	game.world.bringToTop(group_text);

}
function update() {
   
}

function listen_next(){
	
	next.destroy();
	sentence.setText("");
	content=content2;//use counter to set the next content
	sentence = game.add.text(game.width*0.1,game.height*0.7,'',{ font: "16px Arial", fill: 'rgba(0,0,0,1)' });
    nextLine();
	
}
function nextLine() {

    if (lineIndex === content.length)
    {
        countdown --;
		wordIndex = 0;
		lineIndex = 0;
		if(countdown){
			next_draw();
			next.inputEnabled=true;
			next.events.onInputDown.add(listen_next,this);
		}
		else{
			button_draw();
		}
		
        return;
    }

    //  Split the current line on spaces, so one word per array element
    line = content[lineIndex].split(' ');

    //  Reset the word index to zero (the first word in the line)
    wordIndex = 0;

    //  Call the 'nextWord' function once for each word in the line (line.length)
    game.time.events.repeat(wordDelay, line.length, nextWord, this);

    //  Advance to the next line
    lineIndex++;

}

function nextWord() {

    //  Add the next word onto the text string, followed by a space
    sentence.text = sentence.text.concat(line[wordIndex] + " ");

    //  Advance the word index to the next word in the line
    wordIndex++;

    //  Last word?
    if (wordIndex === line.length)
    {
        //  Add a carriage return
        sentence.text = sentence.text.concat("\n");

        //  Get the next line after the lineDelay amount of ms has elapsed
        game.time.events.add(lineDelay, nextLine, this);
    }

}

function button_draw(){
	
	butt1 = game.add.graphics(game.width*0.3, game.height*0.2);
	butt1.beginFill(0x00BFFF,0.5);
	butt1.lineStyle(2, 0x483D8B, 1);
	butt1.drawRoundedRect(0, 0, game.width*0.4, game.height*0.08,7);
	butt1.endFill();
	butt2 = game.add.graphics(game.width*0.3, game.height*0.35);
	butt2.beginFill(0x00BFFF,0.5);
	butt2.lineStyle(2, 0x483D8B, 1);
	butt2.drawRoundedRect(0, 0, game.width*0.4, game.height*0.08,7);
	butt2.endFill();
	group_button.add(butt1);
	group_button.add(butt2);
	
	var style = { font: "18px Arial", fill: "#ff0044",  align: "center"};

    option1 = game.add.text(butt1.x+ butt1.width / 2, butt1.y+ butt1.height / 2 , "- option1 -", style);
	option1.anchor.set(0.5);
	option2 = game.add.text(butt2.x+ butt2.width / 2, butt2.y+ butt2.height / 2 , "- option2 -", style);
	option2.anchor.set(0.5);
	group_text.add(option1);
	group_text.add(option2);
	
	
}
function next_draw(){
	
	next=game.add.sprite(game.width*0.88,game.height*0.85,'next')
	next.width = game.width*0.05;
	next.height = game.height*0.07;
	
}