var img;

module.exports = function(game) {
    return {
        preload : function() {
            console.log('[state] default')
        },
        create : function() {
            img = game.add.sprite(0,0,'a');
            img.width = game.width*window.devicePixelRatio;
			img.height = game.height*window.devicePixelRatio;
        },
        update : function() {
            img.width = game.width*window.devicePixelRatio;
			img.height = game.height*window.devicePixelRatio;
        }
    };
}