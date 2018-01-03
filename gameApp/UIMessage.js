module.exports = function(game, title, msg) {
    var background = game.add.graphics(0,0);
    background.beginFill(0x000000,0.4);
    background.drawRect(0,0,game.width,game.height);
    background.endFill();

    background.inputEnabled = true;

    var titleText = game.add.text(0,0,title,{
        font: "50px 微軟正黑體",
        align : 'center',
        fill : '#ffffff'
    })
    var msgText = game.add.text(0,titleText.height,msg,{
        font: "38px 微軟正黑體",
        align : 'center',
        wordWrapWidth : game.width*0.4,
        wordWrap : true,
        fill : '#ffffff'
    })

    var tmpY = game.world.centerY - (titleText.height + msgText.height)*0.5;

    background.beginFill(0xed5458,1);
    background.drawRect(0,tmpY,game.width, titleText.height + msgText.height);
    background.endFill();

    titleText.anchor.set(0.5,0);
    titleText.x = game.world.centerX;
    titleText.y = tmpY;
    msgText.anchor.set(0.5,0);
    msgText.x = game.world.centerX;
    msgText.y = tmpY + titleText.height;

    background.events.onInputUp.add(function(self, pointer, isOver) {
        console.log('destory UIMessage')
        background.destroy();
        titleText.destroy();
        msgText.destroy();
    });
}
