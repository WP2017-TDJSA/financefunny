var chartLine;  
var butt;
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
    butt._rect.events.onInputDown.add(Down1, this);
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
    game.time.events.repeat(Phaser.Timer.SECOND * 0.01, 200, plotchartline, this);
}


            var width  = 700;
            var height = 400;
            // 预留给轴线的距
            var padding = { top: 30, right: 300, bottom: 30, left: 30 };
            //dataset
            var maxNum = 100;  
            var minNum = 30;
            dataset = new Array();
            var totalPoints = 100;//顯示幾筆
            var i=1; 
function plotchartline(){
           
                while (dataset.length > totalPoints-1) { 
                    dataset.shift(); };
                var y = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum ;
                var temp = [i, y]; 
                i=i+1;
            dataset.push(temp); 
            //console.log(dataset);
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

              var html = d3.select("svg")
             .attr("version", 1.1)
             .attr("xmlns", "http://www.w3.org/2000/svg")
             .node().parentNode.innerHTML;

             var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
             var img = '<img src="'+imgsrc+'">'; 
             d3.select("#svgdataurl").html(img);
             var bmd = game.add.bitmapData(700,400);
           
              var image = new Image;
                image.src = imgsrc;
                console.log(image);
               image.onload = function() {
                bmd.context.drawImage(image, 0, 0);
                console.log("5165");

                chartLine.setTexture(bmd.texture, true);
            
                };

                d3.select("#the_SVG_ID").remove();
            }


        
module.exports = function(game) {
    return {
        preload : function() {
           console.log('[state] chartLine')
        },
        create : function() {
            this.chartLine = game.add.sprite(50, 50);
            chartLine = this.chartLine;
            draw_button1();
            draw_button2();

        }, //end create
        update : function(){
     
        },
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