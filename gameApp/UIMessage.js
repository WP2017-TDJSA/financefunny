module.exports = function(game,title="",msg="") {
    var background = game.add.graphics(0,0);
    var message = game.add.sprite(0,0);
    //background.beginFill(0x000000,0.4);
    //background.drawRect(0,0,game.width,game.height);
    //background.endFill();

    message.inputEnabled = true;

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

    //background.beginFill(0xed5458,1);
    //background.drawRect(0,tmpY,game.width, titleText.height + msgText.height);
    //background.endFill();

    titleText.anchor.set(0.5,0);
    titleText.x = game.world.centerX;
    titleText.y = tmpY;
    msgText.anchor.set(0.5,0);
    msgText.x = game.world.centerX;
    msgText.y = tmpY + titleText.height;

    message.addChild(titleText);
    message.addChild(msgText);

    message.onClose = new Phaser.Signal();

    message.events.onInputUp.add((self, pointer, isOver) => {
        //background.destroy();
        //titleText.destroy();
        //msgText.destroy();
        message.visible = false;
        message.onClose.dispatch();
    });

    message.showMessage = (title=undefined, msg=undefined) => {
        message.visible = true;
        if (!title && !msg)
            return;

        if (title)
            titleText.setText(title,true)
        if (msg)
            msgText.setText(msg,true)
        
        var tmpY = game.world.centerY - (titleText.height + msgText.height)*0.5;
        titleText.y = tmpY;
        msgText.y = tmpY + titleText.height;

        background.clear();
        background.beginFill(0x000000,0.4);
        background.drawRect(0,0,game.width,game.height);
        background.endFill();
        background.beginFill(0xed5458,1);
        background.drawRect(0,tmpY,game.width, titleText.height + msgText.height);
        background.endFill();

        message.setTexture(background.generateTexture())
        background.clear();
        // 拉到最上面
        message.bringToTop()
        titleText.bringToTop()
        msgText.bringToTop()
    }
    
    message.hiddenMessage= () => {
        message.visible = false;
    }

    message.hiddenMessage();

    return message;
}
