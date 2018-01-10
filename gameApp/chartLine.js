
var chartLine;
module.exports = function(game) {
    return {
        preload : function() {
           console.log('[state] chartLine')
        },
        create : function() {
            this.chartLine = game.add.sprite(50, 50);
            chartLine = this.chartLine;

            d3.select("#save").on("click", () => {          
                       // 图表的宽度和高度
            var width = 600;
            var height = 600;
            // 预留给轴线的距离
            var padding = { top: 10, right: 10, bottom: 10, left: 10 };
            //dataset
           var maxNum = 500;  
            var minNum = 250;
            dataset = new Array();
            for (var i = 0; i < 12; i++) { 
               dataset[i] = [i+1, Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum] ;
            }
            console.log(dataset);

            //
            var min = d3.min(dataset, function(d) {
              return d[1];
            })
            var max = d3.max(dataset, function(d) {
              return d[1];
            })

            var svg = d3.select('#svg')
                        .append('svg')
                        .attr("id","the_SVG_ID")
                        .attr('width', width + 'px')
                        .attr('height', height + 'px');
            ////Scale&Axix
            var xScale = d3.scaleLinear()
                            .domain([1, 12]) //之後改成要顯示幾筆成交價
                            .range([0, width - padding.left - padding.right]);

            var yScale = d3.scaleLinear()
                            .domain([0, max])
                            .range([height - padding.top - padding.bottom, 0]);

            var xAxis = d3.axisBottom()
                          .scale(xScale);

            var yAxis = d3.axisLeft()
                          .scale(yScale);

            svg.append('g')
              .attr('class', 'axis')
                .attr('transform', 'translate(' + padding.left + ',' + (height-padding.bottom) + ')')
                .call(xAxis);

            svg.append('g')
              .attr('class', 'axis')
                .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
                .call(yAxis);


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



            /////drawpath
            var linePath = d3.line()
                                .x(function(d){ return xScale(d[0]) })
                                .y(function(d){ return yScale(d[1]) })
                                

            svg.append('g')
                .append('path')
                .attr('class', 'line-path')
                .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
                .attr('d', linePath(dataset))
                .attr('fill', 'none')
                .attr('stroke-width', 3)
                .attr('stroke', 'green');

            svg.append('g')
              .selectAll('circle')
              .data(dataset)
              .enter()
              .append('circle')
              .attr('r', 5)
              .attr('transform', function(d){
                return 'translate(' + (xScale(d[0]) + padding.left) + ',' + (yScale(d[1]) + padding.top) + ')'
              })
              .attr('fill', 'green');

                // use the bitmap data as the texture for the sprite
                // var sprite = game.add.sprite(200, 200, bmd);


              var html = d3.select("svg")
             .attr("version", 1.1)
             .attr("xmlns", "http://www.w3.org/2000/svg")
             .node().parentNode.innerHTML;

             var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
             var img = '<img src="'+imgsrc+'">'; 
             d3.select("#svgdataurl").html(img);
             var bmd = game.add.bitmapData(600,600);

            //bmd.dirty = true;
              var image = new Image;
                image.src = imgsrc;
                console.log(image);
               image.onload = function() {
                bmd.context.drawImage(image, 0, 0);
                console.log("5165");

                chartLine.setTexture(bmd.texture, true);
            
                };

                d3.select("#the_SVG_ID").remove();

            });
             
        },
        update : function(){
     
        },
    };
}

