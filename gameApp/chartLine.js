var stupid_number = 0;
var rich_number = 0;
var sanhu_number = 0;
var stupid_max_number = 5;
var rich_max_number = 5;
var sanhu_max_number = 5;
const walk = require('./walk')(game)
const gameData = require('./gameData')
const Players = require('./Players')
const needUpdateLogic = [];

function updateAllLogic() {
    // update logic
    if (needUpdateLogic.length > 0) {
        for (var index in needUpdateLogic) {
            needUpdateLogic[index]();
        }
    }
}

var sandboxRunning = false;
function startSandbox() {
    sandboxRunning = true;
    // 將按鈕變成停止
}

var startSandboxOnce;

function stopSandbox() {
    sandboxRunning = false;
    // 將按鈕變成開始
}

var resetSandbox;

// 事件發生的機率
// 初始成交價
// 人物的數量
// 人物的初始錢 跟 股票

var chartLine;  
var butt;
var slickUI;
function slider(slide,a,b,c,d,callback){
    var s;
    slide = new SlickUI.Element.Slider(a,b,c,0);
      slickUI.add(slide);
      var line = new Phaser.Line(a,b,a+c,b);
      var graphicsLine = game.add.graphics(0, 0);
        graphicsLine.clear();
        graphicsLine.lineStyle(1, 0x000000, 1);
        graphicsLine.moveTo(line.start.x, line.start.y);
        graphicsLine.lineTo(line.end.x, line.end.y);
        graphicsLine.endFill();
        var valueText = new SlickUI.Element.Text(a+c+0.05,b-0.05, "0");
        slickUI.add(valueText);
        slide.onDrag.add(function (value) {
              valueText.value = Math.round(value * d);
            
          });
        slide.onDragStart.add(function (value) {
            console.log('Start dragging at ' + Math.round(value * d) );
        });
        slide.onDragStop.add(function (value) {
            console.log('Stop dragging at ' + Math.round(value * d) );
            s = valueText.value;
            
            callback(s);
            
        });


}
function callback(s){
   console.log(s);
}

function createtext(x,y,z){
  var style = { font: "20px Arial", fill: "black"};
  var text = game.add.text(x,y,z,style);
    return text;
}
function draw_button1(){
    var style = { font:"24px 微軟正黑體 " , fill: "#ffffff",  align: "center"};
    butt =  {
        _rect : game.add.graphics(game.world.centerX-150,game.world.centerY+200),
        _text : game.add.text(game.world.centerX-75, game.world.centerY+230 , '開始交易', style)
    };
    
    butt._rect.anchor.set(0.5);
    butt._text.anchor.set(0.5);
    butt._text.alpha = 0.1;
    butt._rect.lineStyle(2,0x000000,1);
    butt._rect.beginFill(0x5aedb9,1);
    butt._rect.drawRoundedRect(0, 0, 150, 60,20);
    butt._rect.endFill();
    butt._rect.alpha = 0.1;
    game.add.tween(butt._text).to( { alpha: 1 }, 500, "Linear", true);
    game.add.tween(butt._rect).to( { alpha: 1 }, 500, "Linear", true);
    butt._rect.inputEnabled = true;
    butt._rect.events.onInputOut.add(Out, this);
    butt._rect.events.onInputOver.add(Over, this);
    //butt._rect.events.onInputDown.add(Down1, this);
    butt._rect.events.onInputDown.add(()=>{
        startSandboxOnce();    
    })
}
function draw_button2(){
    var style = { font:"24px 微軟正黑體 " , fill: "#ffffff",  align: "center"};
    butt =  {
        _rect : game.add.graphics(game.world.centerX+150,game.world.centerY+200),
        _text : game.add.text(game.world.centerX+225, game.world.centerY+230 , '自動交易', style)
    };
    
    butt._rect.anchor.set(0.5);
    butt._text.anchor.set(0.5);
    butt._text.alpha = 0.1;
    butt._rect.lineStyle(2,0x000000,1);
    butt._rect.beginFill(0x5aedb9,1);
    butt._rect.drawRoundedRect(0, 0, 150, 60,20);
    butt._rect.endFill();
    butt._rect.alpha = 0.1;
    game.add.tween(butt._text).to( { alpha: 1 }, 500, "Linear", true);
    game.add.tween(butt._rect).to( { alpha: 1 }, 500, "Linear", true);
    butt._rect.inputEnabled = true;
    butt._rect.events.onInputOut.add(Out, this);
    butt._rect.events.onInputOver.add(Over, this);
    butt._rect.events.onInputDown.add(Down2, this);
}
function Out(but){
  
    but.scale.setTo(1, 1);
    butt._text.scale.x = 1;
    butt._text.scale.y = 1;
}
function Over(but){
 
    but.scale.setTo(1.05, 1.05);
    butt._text.scale.x = 1.05;
    butt._text.scale.y = 1.05;
}
function Down1(but){
    but.clear();
    but.scale.setTo(0.95, 0.95);
    butt._text.scale.x = 0.95;
    butt._text.scale.y = 0.95;
    but.lineStyle(3,0x000000,1);
    but.beginFill(0x17ab76,1);
    but.drawRoundedRect(0, 0, 150, 60,20);
    but.endFill();
    plotchartline();
    draw_button1();
}
function Down2(but){
    but.clear();
    but.scale.setTo(0.95, 0.95);
    butt._text.scale.x = 0.95;
    butt._text.scale.y = 0.95;
    but.lineStyle(3,0x000000,1);
    but.beginFill(0x17ab76,1);
    but.drawRoundedRect(0, 0, 150, 60,20);
    but.endFill();
    game.time.events.repeat(Phaser.Timer.SECOND * 0.048, 200, plotchartline, this);
    draw_button2();
}

            var dataset = new Array();
            var i=1; 
            var secondprice ;

function plotchartline(){
           
          // console.log(game.width)
            var width  = game.world.width*0.4;
            var height = width/700*400;
           
            var padding = { top: width/700*30, right: width/700*300, bottom: width/700*30, left: width/700*40 };
            //dataset
            var maxNum = 100;  
            var minNum = 30;
            var totalPoints = 30;//顯示幾筆

                while (dataset.length > totalPoints-1) { 
                    dataset.shift(); };
                var y = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum ;
                var temp = [i, y]; 
                i=i+1;
            dataset.push(temp); 
            console.log(temp[0,1]);
            var miny = d3.min(dataset, function(d) {
            })
            var maxy = d3.max(dataset, function(d) {
              return d[1];
            })
            var minx = d3.min(dataset, function(d) {
              return d[0];
            })
            var maxx = d3.max(dataset, function(d) {
              return d[0];
            })
            var svg = d3.select('#svg')
                        .append('svg')
                        .attr("id","the_SVG_ID")
                        .attr('width', width + 'px')
                        .attr('height', height + 'px');
            svg.append("rect")
                        .attr("width", "100%")
                        .attr("height", "100%")
                        .attr("fill", "black");
                   
            ////Scale&Axix
            var xScale = d3.scaleLinear()
                            .domain([minx, maxx]) 
                            .range([0, width - padding.left - padding.right]);

            var yScale = d3.scaleLinear()
                            .domain([0, maxy])
                            .range([height - padding.top - padding.bottom, 0]);

            var xAxis = d3.axisBottom()
                          .scale(xScale);

            var yAxis = d3.axisLeft()
                          .scale(yScale);
          //  svg.append('g')
           //   .attr('class', 'axis')
          //      .attr('transform', 'translate(' + padding.left + ',' + (height-padding.bottom) + ')')
           //     .call(xAxis);

            svg.append('g')
              .attr('class', 'axis')
                .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
                .call(yAxis)
                .attr('stroke', 'white')
                .attr('stroke-width', 0.3);
            /////drawpath
            var linePath = d3.line()
                                .x(function(d){ return xScale(d[0]) })
                                .y(function(d){ return yScale(d[1]) })
                                .curve(d3.curveCatmullRom);
            svg.append('g')
                .append('path')
                .attr('class', 'line-path')
                .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
                .attr('d', linePath(dataset))
                .attr('fill', 'none')
                .attr('stroke-width', 1.5)
                .attr('stroke', 'yellow');
            svg.append('g')
              .selectAll('circle')
              .data(dataset)
              .enter()
              .append('circle')
              .attr('r', 2)
              .attr('transform', function(d){
                return 'translate(' + (xScale(d[0]) + padding.left) + ',' + (yScale(d[1]) + padding.top) + ')'
              })
              .attr('fill', 'yellow');
///加入當前交易量
            
            var str1 = "Last transaction price "
            var lastprice = temp[0,1].toString();
            var str2 = "Second-last price "

            var text1 = svg.append("text")
                    .attr("x",width/700*410)
                    .attr("y",width/700*40)
                    .attr("font-size",width/700*25)
                    .attr("font-family","simsun")
                    .attr('fill', 'yellow')
                    .text(str1);

            var price1 = svg.append("text")
                    .attr("x",width/700*500)
                    .attr("y",width/700*160)
                    .attr("font-size",width/700*100)
                    .attr("font-family","simsun")
                    .attr('fill', 'yellow')
                    .text(lastprice);

             var text2 = svg.append("text")
                    .attr("x",width/700*410)
                    .attr("y",width/700*220)
                    .attr("font-size",width/700*25)
                    .attr("font-family","simsun")
                    .attr('fill', 'yellow')
                    .text(str2);
            var price2 = svg.append("text")
                    .attr("x",width/700*500)
                    .attr("y",width/700*340)
                    .attr("font-size",width/700*100)
                    .attr("font-family","simsun")
                    .attr('fill', 'yellow')
                    .text(secondprice);

            secondprice = lastprice ;

              var html = d3.select("svg")
             .attr("version", 1.1)
             .attr("xmlns", "http://www.w3.org/2000/svg")
             .node().parentNode.innerHTML;

             var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
             var img = '<img src="'+imgsrc+'">'; 
             d3.select("#svgdataurl").html(img);
             var bmd = game.add.bitmapData(width/700*700,width/700*400);
           
              var image = new Image;
                image.src = imgsrc;
                console.log(image);
               image.onload = function() {
                bmd.context.drawImage(image, 0, 0,width/700*700,width/700*400);
                console.log(imgsrc)

                console.log("5165");

                chartLine.setTexture(bmd.texture, true);
            
                };

                d3.select("#the_SVG_ID").remove();
            }


function pool(){
        var position = new Array();
         var stepX=( game.world.width*0.64 - game.world.width*0.35 )/4 ;
         var stepY=( game.world.height*0.8 - game.world.height*0.2 )/5 ;
       
          
          for (var i = 0; i < 4; i++) {
          
             for (var k = 0; k <5 ; k++) {

                 var x= game.world.width*0.35+stepX*i;
                 var y= game.world.height*0.2+stepY*k;
                 var temp = [x, y];
                position.push(temp); 
                                            };
                                        };
            return position;

                }


function plotchartlinePushValue(game, value) {
    var width  = game.world.width*0.4;
    var height = width/700*400;
           
    var padding = { top: width/700*30, right: width/700*300, bottom: width/700*30, left: width/700*40 };
    //dataset
    var maxNum = 100;  
    var minNum = 30;
    var totalPoints = 40;//顯示幾筆

    while (dataset.length > totalPoints-1)
        dataset.shift()
    
    var temp = [i, value];
    dataset.push(temp)
    i++;

    var miny = d3.min(dataset, function(d) {
        return d[1];
    })
    var maxy = d3.max(dataset, function(d) {
        return d[1];
    })
    var minx = d3.min(dataset, function(d) {
        return d[0];
    })
    var maxx = d3.max(dataset, function(d) {
        return d[0];
    })
    var svg = d3.select('#svg')
        .append('svg')
        .attr("id","the_SVG_ID")
        .attr('width', width + 'px')
        .attr('height', height + 'px');
    svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "black");
                   
    ////Scale&Axix
    var xScale = d3.scaleLinear()
        .domain([minx, maxx]) 
        .range([0, width - padding.left - padding.right]);

    var yScale = d3.scaleLinear()
        .domain([0, maxy])
        .range([height - padding.top - padding.bottom, 0]);

    var xAxis = d3.axisBottom()
        .scale(xScale);

    var yAxis = d3.axisLeft()
        .scale(yScale);

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
        .call(yAxis)
        .attr('stroke', 'white')
        .attr('stroke-width', 0.3);
    //drawpath
    var linePath = d3.line()
        .x(function(d){ return xScale(d[0]) })
        .y(function(d){ return yScale(d[1]) })
        .curve(d3.curveCatmullRom);
    svg.append('g')
        .append('path')
        .attr('class', 'line-path')
        .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
        .attr('d', linePath(dataset))
        .attr('fill', 'none')
        .attr('stroke-width', 1.5)
        .attr('stroke', 'yellow');
    svg.append('g')
        .selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('r', 2)
        .attr('transform', function(d){
            return 'translate(' + (xScale(d[0]) + padding.left) + ',' + (yScale(d[1]) + padding.top) + ')'
        })
        .attr('fill', 'yellow');

    ///加入當前交易量
    var str1 = "Last transaction price "
    var lastprice = temp[0,1].toString();
    var str2 = "Second-last price "

    var text1 = svg.append("text")
        .attr("x",width/700*410)
        .attr("y",width/700*40)
        .attr("font-size",width/700*25)
        .attr("font-family","simsun")
        .attr('fill', 'yellow')
        .text(str1);

    var price1 = svg.append("text")
        .attr("x",width/700*500)
        .attr("y",width/700*160)
        .attr("font-size",width/700*100)
        .attr("font-family","simsun")
        .attr('fill', 'yellow')
        .text(lastprice);

     var text2 = svg.append("text")
        .attr("x",width/700*410)
        .attr("y",width/700*220)
        .attr("font-size",width/700*25)
        .attr("font-family","simsun")
        .attr('fill', 'yellow')
        .text(str2);
    var price2 = svg.append("text")
        .attr("x",width/700*500)
        .attr("y",width/700*340)
        .attr("font-size",width/700*100)
        .attr("font-family","simsun")
        .attr('fill', 'yellow')
        .text(secondprice);

    secondprice = lastprice ;

    var html = d3.select("svg")
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .node().parentNode.innerHTML;

    var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
    var img = '<img src="'+imgsrc+'">'; 
    d3.select("#svgdataurl").html(img);
    var bmd = game.add.bitmapData(width/700*700,width/700*400);
    
    var image = new Image;
    image.src = imgsrc;

    image.onload = function() {
        bmd.context.drawImage(image, 0, 0,width/700*700,width/700*400);
        chartLine.setTexture(bmd.texture, true);
    };

    d3.select("#the_SVG_ID").remove();
}

        
module.exports = function(game) {
    return {
        preload : function() {

          console.log('[state] chartLine')
          slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
          slickUI.load('img/game/theme/kenney.json');

            // reset players data
            gameData.players = {};

        },
        create : function() {
            var width  = game.world.width*0.4;
            var height = width/700*400;  


            this.chartLine = game.add.sprite(game.world.width*0.66, game.world.centerY- height/2 );
            chartLine = this.chartLine;
            draw_button1();
            draw_button2();
            var slider1;
            var slider2;
            var slider3;
            slider(slider1,game.width*0.05,game.height*0.15,game.width*0.2,20,callback);
            slider(slider2,game.width*0.05,game.height*0.3,game.width*0.2,20,callback);
            slider(slider3,game.width*0.05,game.height*0.45,game.width*0.2,20,callback);
            var text1 = createtext(game.width*0.01,game.height*0.1,"笨蛋數量");
            var text2 = createtext(game.width*0.01,game.height*0.25,"富豪數量");
            var text3 = createtext(game.width*0.01,game.height*0.4,"散戶數量");


            // 競價邏輯
            this.CA = require('./CollectionAuction')(20);
            window.testCA = this.CA;

            // 加入典型人物
            this.rects = game.add.group();
            this.stupids = [];
            this.richs = [];
            this.sanhus = [];
            for (let i=0;i<stupid_max_number;i++) {
                let stupid = walk.add_one_man(game,'stupidwalk',game.world.centerX/2 + i*100,game.world.centerY,game.height*0.2,40,-1,0,0);
                let data = new gameData.playerInfo('stupid'+i, stupid, 500, 50)
                data.logic = Players.createPlayerLogic(stupid, data, this.CA, Players.stupidLogic);
                this.stupids.push(data);
                needUpdateLogic.push(data.logic)
            }
            for (let i=0;i<rich_max_number;i++) {
                let rich = walk.add_one_man(game,'richwalk',game.world.centerX/2 + i*100,game.world.centerY + 150,game.height*0.2,40,-1,0,0);
                let data = new gameData.playerInfo('rich'+i, rich, 500, 50)
                data.logic = Players.createPlayerLogic(rich, data, this.CA, Players.richLogic);
                this.richs.push(data);
                needUpdateLogic.push(data.logic)
            }
            for (let i=0;i<sanhu_max_number;i++) {
                let sanhu = walk.add_one_man(game,'sanhuwalk',game.world.centerX/2 + i*100,game.world.centerY - 150,game.height*0.2,40,-1,0,0);
                let data = new gameData.playerInfo('sanhu'+i, sanhu, 500, 50)
                data.logic = Players.createPlayerLogic(sanhu, data, this.CA, Players.sanhuLogic);
                this.sanhus.push(data);
                needUpdateLogic.push(data.logic)
            }


            // 遊戲狀態的控制
            startSandboxOnce = ()=> {
                gameData.state = gameData.States.auction;
                
                game.time.events.add( 200, ()=>{    
                    updateAllLogic();
                    game.time.events.add( 200, ()=>{
                        this.CA.Auction();
                    })
                })
            }


            resetSandbox = () => {
                gameData.state = gameData.States.begin;
                updateAllLogic();
            }
            
            resetSandbox();

            /*this.CA.onAuction.add(function(){
                gameData.state = gameData.States.auctioning;
                updateAllLogic();
            },this)*/

            this.CA.onResult.add(function(price, volume){
                // update chartline
                var tmp = price
                if (tmp === -1)
                    tmp = this.CA.currentPrice;
                plotchartlinePushValue(game, tmp)

                gameData.state = gameData.States.result;
                this.CA.newAuction()
                updateAllLogic();
                //alert(`price : ${price},volume : ${volume}`)

                // 是否繼續
                if (sandboxRunning) {
                    startSandboxOnce();
                }
            },this)
            this.CA.newAuction()
        }, //end create
        update : function(){
            if (Object.keys(gameData.players).length > 0) {
                for (var key in gameData.players) {
                    var playerInfo = gameData.players[key]
    
                    if (!playerInfo.sprite)
                        return;
    
                    playerInfo.sprite.change_money(playerInfo.money);
                    this.rects.add(playerInfo.sprite._money_rect);
                    playerInfo.sprite.change_stock(playerInfo.stock);
                    this.rects.add(playerInfo.sprite._stock_rect);				
                }
            }
            
        },
        render : function(){
           
           
        } ,
    };
}


            /////格線



            /* var axisXGrid = d3.axisBottom()
                  .scale(xScale)
                  .ticks(10)
                  .tickFormat("")
                  .tickSize(+height,0);

                var axisYGrid = d3.axisLeft()
                  .scale(yScale)
                  .ticks(10)
                  .tickFormat("")
                  .tickSize(-width,0);

            svg.append('g')
                 .call(axisXGrid)
                 .attr({
                  'fill':'none',
                  'stroke':'rgba(0,0,0,.1)',
                  'transform':'translate(100,100)' 
                 });

            svg.append('g')
                 .call(axisYGrid)
                 .attr({
                  'fill':'none',
                  'stroke':'rgba(0,0,0,.1)',
                  'transform':'translate(35,20)'
                 });*/


            //格線隨數值變換大小  好看一點 更新問題