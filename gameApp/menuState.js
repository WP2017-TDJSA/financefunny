module.exports = function(game){
return{
	preload : function(){
			console.log('[state] menu')
			var line;
			
	},

	create:function() {

    
		
    line = new Phaser.Line(0.3*game.width*window.divicePixelRatio, 0.5*game.height*window.divicePixelRatio, 0.5*game.width*window.divicePixelRatio, 0.5*game.height*window.divicePixelRatio);

},

update:function() {

    line.centerOn(0.4*game.width*window.divicePixelRatio, 0.5*game.height*window.divicePixelRatio);
    
 
},
render:function() {

    game.debug.geom(line);
    

}




 
}


}