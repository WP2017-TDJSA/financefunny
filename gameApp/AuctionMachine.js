module.exports = function auctionMachine(game, x, y, width, height) {
    // create sprite
    var sprite = game.add.sprite(x,y)
    
    // create title
    sprite.title = [];
    var style = { font: "24px 微軟正黑體", fill: "#5aedb9",  align: "center", boundsAlignH:"center", boundsAlignV:"middle", fontWeight:"bold"}
    for (var i=0;i<3;i++) {
        var text = game.add.text(0,0,"",style);
        //text.anchor.set(0.5, 0.5);
        sprite.addChild(text);
        sprite.title.push(text);
    }
    sprite.setTitle = (arr) => {
        for (var i=0;i<3&&i<arr.length;i++)
            sprite.title[i].setText(arr[i])

        for (var i=arr.length;i<3;i++)
            sprite.title[i].setText("")
    }

    // body
    sprite.cells = [];
    sprite.container = game.add.sprite(0,0)
    sprite.addChild(sprite.container)
    style.fill = "#000000"
    for (var i=0;i<3*10;i++) {
        var cell = game.add.sprite(0,0)
        cell.anchor.set(0.5, 0.5);
        var celltext = game.add.text(0,0,"",style)
        celltext.anchor.set(0.5, 0.4);
        cell.addChild(celltext)
        cell.text = celltext;
        cell.visible = false;
        sprite.container.addChild(cell);
        sprite.cells.push(cell);
    }
    sprite.specialCell = game.add.sprite(0,0);
    sprite.specialCell.anchor.set(0.5, 0.5)
    sprite.specialCell.visible = false;
    sprite.container.addChild(sprite.specialCell);
    sprite.setData = (arr, special = undefined) => {
        sprite.specialCell.visible = false;
        var i = 0,j = 0;
        for (i=0;i<10&&i<arr.length;i++) {
            for (j=0;j<3&&j<arr[i].length;j++) {
                var cell = sprite.cells[i*3+j];

                cell.text.setText(arr[i][j])
                
                cell.visible = true;

                // layout
                cell.x = (j * 2 + 1) * sprite.frameW / 6;
                cell.y = (i + 0.5)*sprite.cellHeight
                
                if (j==1 && arr[i][j] == special) {
                    sprite.specialCell.x = cell.x;
                    sprite.specialCell.y = cell.y;
                    sprite.specialCell.visible = true;
                }
            }
        }
        for (i=arr.length;i<10;i++)
            for (j=0;j<3;j++)
                sprite.cells[i*3+j].visible = false;

        sprite.container.y = 0.6*sprite.frameH - (arr.length*sprite.cellHeight)/2;
    }

    // layout
    sprite.resizeFrame = (Width, Height) => {
        sprite.frameW = Width;
        sprite.frameH = Height;
        // layout title
        var titleHeight = Height * 0.2;
        var titleWidth = Width / 3;
        for (var i=0;i<3;i++) {
            var text = sprite.title[i];
            text.x = i * titleWidth;
            text.y = 0;
            text.setTextBounds(0,0,titleWidth,titleHeight)
        }
        // layout body
        sprite.container.y = Height * 0.2;
        var cellWidth = (Width/3)*0.6;
        var cellHeight = cellWidth;
        sprite.cellWidth = cellWidth;
        sprite.cellHeight = cellHeight;
        var graphics = game.add.graphics(0, 0);
        graphics.lineStyle(3,0x5aedb9,1);
        graphics.beginFill(0xffffff,1);
        graphics.drawEllipse(0,0,cellWidth/2,cellHeight/2)
        graphics.endFill();
        var cellTexture = graphics.generateTexture();
        
        for (var i=0;i<3*10;i++) {
            var cell = sprite.cells[i];
            cell.setTexture(cellTexture)
            //cell.text.setTextBounds(0,0,cellWidth,cellHeight);
        }

        graphics.clear();
        graphics.lineStyle(3,0xed5458,1);
        graphics.beginFill(0xffffff,0);
        graphics.drawEllipse(0,0,cellWidth/2,cellHeight/2)
        graphics.endFill();
        sprite.specialCell.setTexture(graphics.generateTexture())
        graphics.destroy();

    }
    sprite.setDataSource = (CA) => {
        CA.onChange.add(function(list) {
            var usearr = [];
            list.reverse().forEach(data=>{
                usearr.push([data.buyTotal, data.price,data.sellTotal])
            })
            sprite.setData(usearr,CA.currentPrice);
        },this);
    }

    sprite.resizeFrame(width,height)
    sprite.setTitle([]);
    sprite.setData([]);
    return sprite;
}