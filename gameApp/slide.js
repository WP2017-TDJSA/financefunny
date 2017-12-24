
module.exports = function(game,slickUI){
    return{
        preload : function(){
            console.log('[state] default')
            slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
            game.load.image('backdrop','gameApp/slick-ui/preview/assets/backdrop.png');
            slickUI.load('gameApp/slick-ui/preview/assets/ui/kenney/kenney.json');
        
        },
        create : function(){
            game.add.sprite(0,0,'backdrop');
            var panel;
            slickUI.add(panel = new SlickUI.Element.Panel(8,8,game.width - 16,game.height - 16));


        }

        

    };
}
    