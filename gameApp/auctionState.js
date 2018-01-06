function cell(game, x, y, width, height) {
    var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(3,0x5aedb9,1);
    graphics.beginFill(0xffffff,1);
    //graphics.drawRoundedRect(0,0,width,height,5);
    graphics.drawEllipse(0,0,width/2,height/2)
    graphics.endFill();
    var sprite = game.add.sprite(x, y, graphics.generateTexture())
    //sprite.anchor.set(0.5, 0.5)
    //graphics.visible = false;
    graphics.destroy();
    var style = { font: "18px 微軟正黑體", fill: "#000000",  align: "center", boundsAlignH:"center", boundsAlignV:"middle"}
    var text = game.add.text(0, 0, "", style);
    text.setTextBounds(0,0,width,height)
    //text.anchor.set(0.5, 0.5);
    
    //console.log(text.textBounds)
    sprite.addChild(text);
    sprite.text = text;
    return sprite;
}

function threecell(game, x, y, innerwidth, width, height) {
    var sprite = game.add.sprite(x,y)
    var cellwidth = (width - 2*innerwidth)/3;
    for (var i=0;i<3;i++) {
        sprite.addChild(cell(game, i*(cellwidth + innerwidth), 0, cellwidth, height))
    }
    sprite.setText = (arr) => {
        for (var i=0;i<3;i++) {
            var str;
            if (i >= arr.length)
                str = ""
            else
                str = arr[i]

            sprite.children[i].text.setText(str)
        }
    }
    sprite.setText([]);
    return sprite;
}

function table(game, x, y, innerHeight,cellwidth, cellheight, maxCount) {
    var allHeight = maxCount*(cellheight + innerHeight);
    var sprite = game.add.sprite(x-cellwidth/2, y - allHeight/2)
    //sprite.anchor.set(0.5,0.5);
    //sprite.cellList = [];
    for (var i=0;i<maxCount;i++) {
        sprite.addChild(threecell(game, 0, (i)*(cellheight+innerHeight), 10,cellwidth, cellheight))
    }

    sprite.setData = (arr) => {
        var maxi = arr.length > maxCount ? maxCount : arr.length;

        for (var i=0;i<maxi;i++) {
            sprite.children[i].setText(arr[i]);
            sprite.children[i].visible = true;
        }
        
        for (var i=arr.length;i<sprite.children.length;i++)
            sprite.children[i].visible = false;
        
        sprite.y = y - (arr.length*(cellheight + innerHeight))/2;
    }
    sprite.inputEnabled = true;
    sprite.setData([]);
    return sprite;
}

function buygetPriceCount(textfield1,textfield2,buybutton) {
    var price = 0 ,count = 0 ;
    textfield1.visible = true;
    textfield2.visible = true;
    buybutton.visible = true;
    if(price == 0 && count == 0){
    textfield1.events.onOK.add(function(){
        price = parseFloat(textfield1.value);
        console.log(price);
    })
    
    textfield2.events.onOK.add(function(){
        count = parseFloat(textfield2.value);
        console.log(count);
    })
    buybutton.events.onInputDown.add(function(){
        textfield1.visible = false;
        textfield2.visible = false;
        buybutton.visible = false;
        testCA.addBuy('test',price,count);
        })
}
}
     
function sellgetPriceCount(textfield1,textfield2,sellbutton) {
    var price = 0 ,count = 0 ;
    textfield1.visible = true;
    textfield2.visible = true;
    sellbutton.visible = true;
    if(price == 0 && count == 0){
    textfield1.events.onOK.add(function(){
        price = parseFloat(textfield1.value);
        console.log(price);
    })
    
    textfield2.events.onOK.add(function(){
        count = parseFloat(textfield2.value);
        console.log(count);
    })
    sellbutton.events.onInputDown.add(function(){
        textfield1.visible = false;
        textfield2.visible = false;
        sellbutton.visible = false;
        testCA.addSell('test',price,count);
        })
}
    
}




function showMessage(game, title, msg) {
    var background = game.add.graphics(0,0);
    background.beginFill(0x000000,0.4);
    background.drawRect(0,0,game.width,game.height);
    background.endFill();

    //var backgroundSprite = game.add.sprite(0,0,background.generateTexture())
    
    //backgroundSprite.inputEnabled = true;
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
    //background.clear();

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

    //var barSprite = game.add.sprite(0,game.world.currentY,background.generateTexture());
    //barSprite.anchor.set(0,0.5);

    //background.destroy();

    background.events.onInputUp.add(function(self, pointer, isOver) {
        background.destroy();
        titleText.destroy();
        msgText.destroy();
    });
}

var slickUI;
window.testCA = require('./CollectionAuction')();

module.exports = function(game) {
    return {
        preload : function() {
            console.log('[state] auction')
            slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
            slickUI.load('img/game/theme/kenney.json');

        },
        create : function() {
            var cellh = (game.height*game.resolution*0.8)/10;
            this.machine = require('./AuctionMachine')(game, 0.3*game.width,0.1*game.height,0.4*game.width,0.6*game.height)
            this.machine.setTitle(['買入','價格','賣出'])
            
            testCA.onChange.add(function(list) {
                
                var usearr = [];
                list.reverse().forEach(data=>{
                    usearr.push([data.buyTotal, data.price,data.sellTotal])
                })
                this.machine.setData(usearr);
            },this);
            testCA.onResult.add(function(price, volume) {
                //alert(`本次成交價為 ${price}`);
                require('./UIMessage')(game, "競價完成", `本次成交價為 ${price}\n交易量為 ${volume}`)
                testCA.newAuction();
            },this)

            this.buyButton = cell(game, 10, game.world.centerY,100,30);
            this.buyButton.text.setText("新增買入")
            this.buyButton.inputEnabled = true;
            var buytextfield1;
            var buytextfield2;
            var buybutton;
            slickUI.add(buytextfield1= new SlickUI.Element.TextField(game.width*0.01,game.height*0.6,game.width*0.15,game.height*0.05));
            slickUI.add(buytextfield2= new SlickUI.Element.TextField(game.width*0.01,game.height*0.65,game.width*0.15,game.height*0.05));
            slickUI.add(buybutton= new SlickUI.Element.Button(game.width*0.01,game.height*0.7,game.width*0.05,game.height*0.05))
            buytextfield1.visible = false;
            buytextfield2.visible = false;
            buybutton.visible = false;
            this.buyButton.events.onInputDown.add(function() {
                console.log('buy click');
                buygetPriceCount(buytextfield1,buytextfield2,buybutton);
                }, this)
            
            this.sellButton = cell(game, game.width - 100 - 10, game.world.centerY,100,30);
            this.sellButton.text.setText("新增賣出")
            this.sellButton.inputEnabled = true;
            var selltextfield1;
            var selltextfield2;
            var sellbutton;
            slickUI.add(selltextfield1= new SlickUI.Element.TextField(game.width*0.9,game.height*0.6,game.width*0.1,game.height*0.05));
            slickUI.add(selltextfield2= new SlickUI.Element.TextField(game.width*0.9,game.height*0.65,game.width*0.1,game.height*0.05));
            slickUI.add(sellbutton= new SlickUI.Element.Button(game.width*0.9,game.height*0.7,game.width*0.05,game.height*0.05));
            selltextfield1.visible = false;
            selltextfield2.visible = false;
            sellbutton.visible = false;
            this.sellButton.events.onInputDown.add(function() {
                console.log('sell click');
                
                sellgetPriceCount(selltextfield1,selltextfield2,sellbutton);
                
                            }, this)
            this.resultButton = cell(game, game.world.centerX - 50, game.height - 30 - 10,100,30);
            this.resultButton.text.setText("集合競價")
            this.resultButton.inputEnabled = true;
            this.resultButton.events.onInputDown.add(function() {
                console.log('result click')
                testCA.Auction();
            }, this)
        },
        update : function() {

        },
        render : function() {
            //game.debug.inputInfo(32,32);
            //game.debug.spriteBounds(this.machine.cells[0])
            //game.debug.spriteBounds(this.machine.cells[0].text, 'rgba(255,255,255,0.6)')
            //game.debug.spriteInfo(this.title.children[0].children[0].text,32,128)
        }
    };
}