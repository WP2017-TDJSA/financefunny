
module.exports = function(game) {
    return {
        preload : function() {
           
        },
        create : function() {
            
        var graphics = game.add.graphics(0, 500);

        graphics.lineStyle(1, 0xffd900, 1);
        
        for (var i = 1; i < 100; i++) {
           graphics.lineTo(i*10, 0); 
        }
           
        }
    };
}