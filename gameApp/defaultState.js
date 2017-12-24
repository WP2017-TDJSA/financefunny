var img;
var slickUI;

module.exports = function(game) {
	return {
        
		preload : function() {
            console.log('[state] default')

            slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
            slickUI.load('img/game/theme/kenney.json');

        },
        create : function() {

            img = game.add.sprite(0,0,'a');
            img.width = game.width*window.devicePixelRatio;
            img.height = game.height*window.devicePixelRatio;
            var panel = new SlickUI.Element.Panel(8, 8, 150, game.height - 16);
            slickUI.add(panel);
        },
        update : function() {
            img.width = game.width*window.devicePixelRatio;
			img.height = game.height*window.devicePixelRatio;
			

        }
    };
}