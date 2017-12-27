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

function getPriceCount() {
    var price,count;
    while(1) {
        price = prompt("請輸入價錢")
        if (isNaN(price)) {
            alert("請輸入數字")
        } else
            break;
    }

    while(1) {
        count = prompt("請輸入數量")
        if (isNaN(count)) {
            alert("請輸入數字")
        } else
            break;
    }
    return {
        price : price,
        count : count
    }
}

window.testCA = require('./CollectionAuction')();

module.exports = function(game) {
    return {
        preload : function() {
            console.log('[state] auction')
        },
        create : function() {
            var cellh = (game.height*game.resolution*0.8)/10;
            this.machine = require('./AuctionMachine')(game, 0.3*game.width*game.resolution,0.1*game.height*game.resolution,0.4*game.width*game.resolution,0.6*game.height*game.resolution)
            this.machine.setTitle(['買入','價格','賣出'])
            
            testCA.onChange.add(function(list) {
                
                var usearr = [];
                list.reverse().forEach(data=>{
                    usearr.push([data.buyTotal, data.price,data.sellTotal])
                })
                this.machine.setData(usearr);
            },this);
            testCA.onResult.add(function(price) {
                alert(`本次成交價為 ${price}`);
                testCA.newAuction();
            },this)
            
            this.buyButton = cell(game, 10, game.world.centerY*game.resolution,100,30);
            this.buyButton.text.setText("新增買入")
            this.buyButton.inputEnabled = true;
            this.buyButton.events.onInputDown.add(function() {
                console.log('buy click');
                var result = getPriceCount();
                testCA.addBuy('test',result.price,result.count)
            }, this)
            this.sellButton = cell(game, game.width*game.resolution - 100 - 10, game.world.centerY*game.resolution,100,30);
            this.sellButton.text.setText("新增賣出")
            this.sellButton.inputEnabled = true;
            this.sellButton.events.onInputDown.add(function() {
                console.log('sell click');
                var result = getPriceCount();
                testCA.addSell('test',result.price,result.count)
            }, this)
            this.resultButton = cell(game, game.world.centerX*game.resolution - 50, game.height*game.resolution - 30 - 10,100,30);
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