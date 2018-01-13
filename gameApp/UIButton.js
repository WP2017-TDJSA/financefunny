module.exports =  function (game, x, y, content){
		
    var style = { font:"24px 微軟正黑體" , fill: "#ffffff",  align: "center"};
    var button = game.add.graphics(x,y);
    var text = game.add.text(x, y , content, style)

    var width = text.width+10;
    var height = text.height+10;
    var offsetY = -10

    text.anchor.set(0.5,0);
    button.lineStyle(1,0x000000,1);
    button.beginFill(0x5aedb9,1);
    button.drawRoundedRect(-width/2, offsetY, width, height,10);
    button.endFill();
    //button.addChild(text);
    button.text = text;

    button.inputEnabled = true;
    
    button.events.onInputOut.add(function(button){
		button.alpha = 1;
	});
	button.events.onInputOver.add(function(button){
		button.alpha = 0.8;
	});
	button.events.onInputDown.add((button) => {
        game.add.audio('button_click').play();
        button.clear();
		button.lineStyle(1,0x000000,1);
		button.beginFill(0x17ab76,1);
		button.drawRoundedRect(-width/2, offsetY, width-2, height-2,10);
        button.endFill();
        text.x -= 2;
        text.y -= 2; 
    });
	button.events.onInputUp.add((button) => {
        button.clear();
        button.lineStyle(1,0x000000,1);
        button.beginFill(0x5aedb9,1);
        button.drawRoundedRect(-width/2, offsetY, width, height,10);
        button.endFill();
        text.x += 2;
        text.y += 2;
    });

    return button;
};