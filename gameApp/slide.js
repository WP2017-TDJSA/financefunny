var slickUI;
module.exports = function(game){
    return{
        preload : function(){
            console.log('[state] default')

        slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
        game.load.image('backdrop', 'img/game/backdrop.png');
        slickUI.load('./kenney.json');
        },
        create : function(){

        game.add.sprite(0,0,'backdrop');
        var panel;
        slickUI.add(panel = new SlickUI.Element.Panel(8, 8, game.width - 16, game.height - 16));
        panel.add(new SlickUI.Element.Text(10,10, "Control the image's opacity by moving the slider")).centerHorizontally().text.alpha = 0.5;
        var previewSprite = game.make.sprite(0,0,'backdrop');
        previewSprite.width *= 0.2;
        previewSprite.height *= 0.2;
        previewSprite.anchor.setTo(0.5);
        panel.add(new SlickUI.Element.DisplayObject(panel.width / 2,panel.height / 2 + 50, previewSprite));
        var valueText = new SlickUI.Element.Text(0,panel.height - 40, '100%');
        var slider = new SlickUI.Element.Slider(16,100, game.width - 64);
        var sliderVertical = new SlickUI.Element.Slider(game.width - 64,130, game.height - 178, 0.5, true);
        panel.add(slider);
        panel.add(sliderVertical);
        panel.add(valueText).centerHorizontally();
        sliderVertical.onDrag.add(function (value) {
            previewSprite.angle = -20 + value * 40;
        });
        slider.onDrag.add(function (value) {
            previewSprite.alpha = value;
            valueText.value = Math.round(value * 100) + '%';
            valueText.centerHorizontally();
        });
        slider.onDragStart.add(function (value) {
            console.log('Start dragging at ' + Math.round(value * 100) + '%');
        });
        slider.onDragStop.add(function (value) {
            console.log('Stop dragging at ' + Math.round(value * 100) + '%');
        });
        }

    };
}
    