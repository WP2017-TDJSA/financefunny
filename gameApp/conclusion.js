module.exports = function(game) {
	return {
        
		preload : function() {
            console.log('[state] conclusion')
			
        },
        create : function() {
			var style = { font:"30px 微軟正黑體" , fill: "#000000",  align: "center"};
			var text = game.add.text(game.width*0.5,game.height*0.5 , 'conclusion', style);
			text.anchor.set(0.5);
        },
        update : function() {
			
        }
    };
}