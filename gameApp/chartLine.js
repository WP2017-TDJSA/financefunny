var stupid_number = 0;
var rich_number = 0;
var sanhu_number = 0;
var stupid_number ;
var rich_number ;
var sanhu_number ;
const walk = require('./walk')(game)
var gameData;
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
var sandboxRunningCount;
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
 function callback1(s){
   console.log(s);
 
    stupid_number=s;
    console.log(stupid_number)

}

function callback2(s){
   console.log(s);

    rich_number=s;
    console.log(rich_number)
}

function callback3(s){
   console.log(s);

   sanhu_number=s;
    console.log(sanhu_number)
}


function createtext(x,y,z){
  var style = { font: "20px Arial", fill: "black"};
  var text = game.add.text(x,y,z,style);
    return text;
}
function draw_button1(){
    if(game.device.desktop)
	{
		var style = { font:"24px 微軟正黑體 " , fill: "#ffffff",  align: "center"};
		x = game.width*0.68;
		width = 150;
		height = 60;
	}
	else
	{
		var style = { font:"20px 微軟正黑體 " , fill: "#ffffff",  align: "center"};
		x = game.world.centerX/2 + 420+game.width*0.05;
		width = 110;
		height = 50;
	}
	
    var butt =  {
        _rect : game.add.graphics(x,game.world.height*0.8),
        _text : game.add.text(x+width/2,game.world.height*0.8+height/2 , '開始交易', style)
    };
    
    butt._rect.anchor.set(0.5);
    butt._text.anchor.set(0.5);
    butt._text.alpha = 0.1;
    butt._rect.lineStyle(2,0x000000,1);
    butt._rect.beginFill(0x5aedb9,1);
    butt._rect.drawRoundedRect(0, 0, width, height,20);
    butt._rect.endFill();
    butt._rect.alpha = 0.1;
    game.add.tween(butt._text).to( { alpha: 1 }, 500, "Linear", true);
    game.add.tween(butt._rect).to( { alpha: 1 }, 500, "Linear", true);
    butt._rect.inputEnabled = true;
    butt._rect.events.onInputOut.add(function(){
		butt._rect.scale.setTo(1, 1);
		butt._text.scale.x = 1;
		butt._text.scale.y = 1;
	}, this);
    butt._rect.events.onInputOver.add(function(){
		butt._rect.scale.setTo(1.05, 1.05);
		butt._text.scale.x = 1.05;
		butt._text.scale.y = 1.05;
	}, this);
    //butt._rect.events.onInputDown.add(Down1, this);
    butt._rect.events.onInputDown.add(()=>{
        startSandboxOnce();    
    })
}
function draw_button2(){
    if(game.device.desktop)
	{
		var style = { font:"24px 微軟正黑體 " , fill: "#ffffff",  align: "center"};
		x = game.width*0.68+200;
		width = 150;
		height = 60;
	}
	else
	{
		var style = { font:"20px 微軟正黑體 " , fill: "#ffffff",  align: "center"};
		x = game.world.centerX/2 + 540+game.width*0.05;
		width = 110;
		height = 50;
	}
	
    var butt =  {
        _rect : game.add.graphics(x,game.world.height*0.8),
        _text : game.add.text(x+width/2,game.world.height*0.8+height/2 , '自動交易', style)
    };
    
    butt._rect.anchor.set(0.5);
    butt._text.anchor.set(0.5);
    butt._text.alpha = 0.1;
    butt._rect.lineStyle(2,0x000000,1);
    butt._rect.beginFill(0x5aedb9,1);
    butt._rect.drawRoundedRect(0, 0, width, height,20);
    butt._rect.endFill();
    butt._rect.alpha = 0.1;
    game.add.tween(butt._text).to( { alpha: 1 }, 500, "Linear", true);
    game.add.tween(butt._rect).to( { alpha: 1 }, 500, "Linear", true);
    butt._rect.inputEnabled = true;
    butt._rect.events.onInputOut.add(function(){
		butt._rect.scale.setTo(1, 1);
		butt._text.scale.x = 1;
		butt._text.scale.y = 1;
	}, this);
		
    butt._rect.events.onInputOver.add(function(){
		butt._rect.scale.setTo(1.05, 1.05);
		butt._text.scale.x = 1.05;
		butt._text.scale.y = 1.05;
	}, this);
    //butt._rect.events.onInputDown.add(Down2, this);
    butt._rect.events.onInputDown.add(()=>{
        sandboxRunning = true;
        sandboxRunningCount = 15;
        game.time.events.add(Phaser.Timer.SECOND * 1,startSandboxOnce);

    })
}

function draw_button3(){
    if(game.device.desktop)
    {
        var style = { font:"24px 微軟正黑體 " , fill: "#ffffff",  align: "center"};
        x = game.width*0.05;
        width = 150;
        height = 60;
    }
    else
    {
        var style = { font:"20px 微軟正黑體 " , fill: "#ffffff",  align: "center"};
        x = game.width*0.05;
        width = 110;
        height = 50;
    }
    
    var butt =  {
        _rect : game.add.graphics(x,game.world.height*0.6),
        _text : game.add.text(x+width/2,game.world.height*0.6+height/2 , '設定完成', style)
    };
    
    butt._rect.anchor.set(0.5);
    butt._text.anchor.set(0.5);
    butt._text.alpha = 0.1;
    butt._rect.lineStyle(2,0x000000,1);
    butt._rect.beginFill(0x5aedb9,1);
    butt._rect.drawRoundedRect(0, 0, width, height,20);
    butt._rect.endFill();
    butt._rect.alpha = 0.1;
    game.add.tween(butt._text).to( { alpha: 1 }, 500, "Linear", true);
    game.add.tween(butt._rect).to( { alpha: 1 }, 500, "Linear", true);
    butt._rect.inputEnabled = true;
    butt._rect.events.onInputOut.add(function(){
		butt._rect.scale.setTo(1, 1);
		butt._text.scale.x = 1;
		butt._text.scale.y = 1;
	}, this);
    butt._rect.events.onInputOver.add(function(){
		butt._rect.scale.setTo(1.05, 1.05);
		butt._text.scale.x = 1.05;
		butt._text.scale.y = 1.05;
	}, this);
    //butt._rect.events.onInputDown.add(Down2, this);
    butt._rect.events.onInputDown.add(()=>{
       setallpeople();    
    })

  
}

function draw_button4(){
    if(game.device.desktop)
    {
        var style = { font:"24px 微軟正黑體 " , fill: "#ffffff",  align: "center"};
        x = game.width*0.05;
        width = 150;
        height = 60;
    }
    else
    {
        var style = { font:"20px 微軟正黑體 " , fill: "#ffffff",  align: "center"};
        x = game.width*0.05;
        width = 110;
        height = 50;
    }
    
    var butt =  {
        _rect : game.add.graphics(x,game.world.height*0.75),
        _text : game.add.text(x+width/2,game.world.height*0.75+height/2 , '重置', style)
    };
    
    butt._rect.anchor.set(0.5);
    butt._text.anchor.set(0.5);
    butt._text.alpha = 0.1;
    butt._rect.lineStyle(2,0x000000,1);
    butt._rect.beginFill(0x5aedb9,1);
    butt._rect.drawRoundedRect(0, 0, width, height,20);
    butt._rect.endFill();
    butt._rect.alpha = 0.1;
    game.add.tween(butt._text).to( { alpha: 1 }, 500, "Linear", true);
    game.add.tween(butt._rect).to( { alpha: 1 }, 500, "Linear", true);
    butt._rect.inputEnabled = true;
    butt._rect.events.onInputOut.add(function(){
		butt._rect.scale.setTo(1, 1);
		butt._text.scale.x = 1;
		butt._text.scale.y = 1;
	}, this);
    butt._rect.events.onInputOver.add(function(){
		butt._rect.scale.setTo(1.05, 1.05);
		butt._text.scale.x = 1.05;
		butt._text.scale.y = 1.05;
	}, this);
    //butt._rect.events.onInputDown.add(Down2, this);
    butt._rect.events.onInputDown.add(()=>{
      resetall()   
    })

  
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



            var dataset = new Array();
            var i=1; 
            var secondprice ;



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
        chartLine.setTexture(bmd.texture, false);
    };

    d3.select("#the_SVG_ID").remove();
}

function resetall(){
    game.state.restart();
    needUpdateLogic.length=0;
    gameData.resetPlayers()
   dataset.length=0; 
   

}

function setallpeople (){
                // 競價邏輯
            this.CA = require('./CollectionAuction')(20);
            window.testCA = this.CA;

            // 加入典型人物
            // reset players data

            this.stupids = [];
            this.richs = [];
            this.sanhus = [];
          
            for (let i=0;i<stupid_number;i++) {
                let stupid = walk.add_one_man(game,'stupidwalk',game.world.centerX/2 + i*100,game.world.centerY -150,game.height*0.2,40,-1,0,0,false);
                let data = new gameData.playerInfo('stupid'+i, stupid, 500, 50)
                data.logic = Players.createPlayerLogic(stupid, data, this.CA, Players.stupidLogic);
                this.stupids.push(data);
                needUpdateLogic.push(data.logic)
            }

           
            for (let i=0;i<rich_number;i++) {
                let rich = walk.add_one_man(game,'richwalk',game.world.centerX/2 + i*100,game.world.centerY ,game.height*0.2,40,-1,0,0,false);
                let data = new gameData.playerInfo('rich'+i, rich, 500, 50)
                data.logic = Players.createPlayerLogic(rich, data, this.CA, Players.richLogic);
                this.richs.push(data);
                needUpdateLogic.push(data.logic)
            }
            for (let i=0;i<sanhu_number;i++) {
                let sanhu = walk.add_one_man(game,'sanhuwalk',game.world.centerX/2 + i*100,game.world.centerY + 150,game.height*0.2,40,-1,0,0,false);
                let data = new gameData.playerInfo('sanhu'+i, sanhu, 500, 50)
                data.logic = Players.createPlayerLogic(sanhu, data, this.CA, Players.sanhuLogic);
                this.sanhus.push(data);
                needUpdateLogic.push(data.logic)
            }


            // 遊戲狀態的控制
            sandboxRunning  = false;
            sandboxRunningCount = 0;

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
                    sandboxRunningCount--;
                    if (sandboxRunningCount===0)
                        stopSandbox();
                    else
                        game.time.events.add(200,()=>{
                            startSandboxOnce();
                        })
                }
            },this)
            this.CA.newAuction()
        }//set

        
module.exports = function(game) {
    return {
        preload : function() {

            console.log('[state] chartLine')
            slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
            slickUI.load('img/game/theme/kenney.json');

            
            

        },
        create : function() {
            
			var style = { font:"20px 微軟正黑體" , fill: "#000000",  align: "center"};
			var text = game.add.text(game.width*0.5,game.height*0.05 , '沙盒模式是完全自願參與~要跳過還是玩耍都隨你！', style);
			text.anchor.set(0.5);
			var next = walk.draw_button(game.width*0.5+text.width/2+10,game.height*0.05-text.height/2-5,game.width*0.15,45,'進入總結->');
			next.inputEnabled = true;
			next.events.onInputDown.add(()=>{
				//game.time.events.add(300,()=>{
					game.state.start('conclusion');
				//})
			});
			
			var width  = game.world.width*0.4;
            var height = width/700*400;
            // 位子  
            var position=pool();
            console.log(position)
			
			if(game.device.desktop)
				chart_x = game.width*0.66;
			else
				chart_x = game.world.centerX/2 + 420+game.width*0.05;
			
            this.chartLine = game.add.sprite(chart_x, game.world.centerY- height/2 );
            chartLine = this.chartLine;
            draw_button1();
            draw_button2();
            draw_button3();
			draw_button4();
			
            var slider1;
            var slider2;
            var slider3;
            slider(slider1,game.width*0.04,game.height*0.18,game.width*0.14,5,callback1);
            slider(slider2,game.width*0.04,game.height*0.33,game.width*0.14,5,callback2);
            slider(slider3,game.width*0.04,game.height*0.48,game.width*0.14,5,callback3);
            var text1 = createtext(game.width*0.01,game.height*0.08,"最大的笨蛋數量");
            var text2 = createtext(game.width*0.01,game.height*0.23,"穩健投資人數量");
            var text3 = createtext(game.width*0.01,game.height*0.38,"保守投資人數量");


             gameData = require('./gameData')
            gameData.resetPlayers();
            this.rects = game.add.group();


            
           
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


    