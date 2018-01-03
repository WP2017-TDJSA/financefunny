

module.exports = function(game) {
    return {
        preload : function() {
           console.log('[state] chartLine')
        },

        create : function() {


            
           // 图表的宽度和高度
var width = 600;
var height = 600;
// 预留给轴线的距离
var padding = { top: 50, right: 50, bottom: 50, left: 50 };

var dataset = [[1, 224], [2, 528], [3, 756], [4, 632], [5, 582], [6, 704], [7, 766], [8, 804], [9, 884], [10, 960], [11, 1095], [12, 1250]];

var min = d3.min(dataset, function(d) {
  return d[1];
})
var max = d3.max(dataset, function(d) {
  return d[1];
})

var xScale = d3.scaleLinear()
                .domain([1, 12])
                .range([0, width - padding.left - padding.right]);

var yScale = d3.scaleLinear()
                .domain([0, max])
                .range([height - padding.top - padding.bottom, 0]);

var svg = d3.select('#svg')
            .append('svg')
            .attr('width', width + 'px')
            .attr('height', height + 'px');


            

var xAxis = d3.axisBottom()
              .scale(xScale);

var yAxis = d3.axisLeft()
                            .scale(yScale);

svg.append('g')
  .attr('class', 'axis')
  .attr('transform', 'translate(' + padding.left + ',' + (height - padding.bottom) + ')')
  .call(xAxis);

svg.append('g')
  .attr('class', 'axis')
    .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
    .call(yAxis);

var linePath = d3.line()
                    .x(function(d){ return xScale(d[0]) })
                    .y(function(d){ return yScale(d[1]) });

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

  var bmd = game.add.bitmapData(600,600);
    // use the bitmap data as the texture for the sprite
    // var sprite = game.add.sprite(200, 200, bmd);
    
    //d3.select("#save").on("click", function(){
   d3.select("#save").on("click", function(){
 var html = d3.select("svg")
 .attr("version", 1.1)
 .attr("xmlns", "http://www.w3.org/2000/svg")
 .node().parentNode.innerHTML;

 var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
 var img = '<img src="'+imgsrc+'">'; 
 d3.select("#svgdataurl").html(img);

 // 上面和前面的实现是一样的
 //var canvas = document.querySelector("canvas"),
 //context = canvas.getContext("2d");

    var image = new Image;
    image.src = imgsrc;
    image.onload = function() {
    bmd.context.drawImage(image, 0, 0);

    //var canvasdata = canvas.toDataURL("image/png");
   game.add.sprite(0, 0, bmd);
   console.log("asd");
    
 };

});


 
           
        }
    };
}

