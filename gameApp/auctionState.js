function cell(game, x, y, width, height) {
    var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(1,0xffffff,1);
    graphics.beginFill(0xffffff,0.3);
    graphics.drawRoundedRect(0,0,width,height,5);
    graphics.endFill();
    var sprite = game.add.sprite(x, y, graphics.generateTexture())
    //sprite.anchor.set(0.5, 0.5)
    //graphics.visible = false;
    graphics.destroy();
    var style = { font: "18px 微軟正黑體", fill: "#ffffff",  align: "center"}
    var text = game.add.text(width/2, height*0.6, "", style);
    text.anchor.set(0.5, 0.5);
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

window.testCA = require('./CollectionAuction')();

module.exports = function(game) {
    return {
        preload : function() {
            console.log('[state] auction')
        },
        create : function() {
            //this.test = cell(game, 100, 30, 300, 300);
            //this.test.text.setText('wow')
            var cellh = (game.height*game.resolution*0.8)/10;
            this.title = table(game,game.width/2, game.height*game.resolution*0.1-cellh*0.5, 0,300,cellh,1);
            this.table = table(game, game.width/2, game.height/2, 10, 300, cellh, 10);
            this.title.setData([['買','價錢','賣']])

            testCA.onChange.add(function() {
                console.log(arguments);
                var buy = arguments[0];
                var sell = arguments[1];
                var total = 0;
                var data = {};
                buy.forEach(element => {
                    var price = element.price;
                    var count = element.total;
                    total += count;
                    data[price] = {
                        buy : total,
                        sell : 0
                    }   
                });
                total = 0;
                sell.forEach(element => {
                    var price = element.price;
                    var count = element.total;
                    total += count;
                    if (data[price])
                        data[price].sell = total;
                    else
                        data[price] = {
                            buy : 0,
                            sell : total
                        }
                })
                var usearr = [];
                var arr = Object.keys(data);
                arr.sort(function(a, b) {
                    b = parseFloat(b);
                    a = parseFloat(a);
                    return b - a;
                });
                arr.forEach(price=>{
                    usearr.push([data[price].buy, price,data[price].sell])
                })
                this.table.setData(usearr);
            },this);
            //this.table.setData([[0,10,0]])
            //this.tt.setData([['0','10','0'],['t2']])

            //this.tt2 = table(game, 200, 50, 10, 100, 30, 5);
            //this.tt2.setData(['不', '好', '唷', 't4', 't5', 't6'])
            //this.tt.setData(['t1'])
        },
        update : function() {
            /*this.c.x += 10;
            if (this.c.x > game.width)
                this.c.x = 0 - this.c.width;*/
        },
        render : function() {
            game.debug.inputInfo(32,32);
            //game.debug.spriteInputInfo(this.tt, 130,130)
            //game.debug.pointer(game.input.activePointer);
        }
    };
}