var slickUI;

module.exports = function(game){

	return{

		preload : function(){
			console.log('[state] slide')
			//game.load.image('backdrop', 'img/game/backdrop.png');
			slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
            slickUI.load('img/game/theme/kenney.json');
		},
		create : function(){
		
        
        var panel;
        console.log(game.width);
        console.log(game.height);
        slickUI.add(panel = new SlickUI.Element.Panel(game.width *0.2, game.height *0.2, game.width *0.15 +10, game.height *0.15 +10));
        console.log(panel.width);
        console.log(panel.height);

        var button;
        panel.add(button = new SlickUI.Element.Button(-4,-4,game.width,game.height));
        button.add(new SlickUI.Element.Text(0,0,"買入"));
        var textfield;
        slickUI.add(textfield = new SlickUI.Element.TextField(game.width *0.01, game.height *0.01, game.width*0.1, game.height*0.1));
        console.log(textfield.width);
        console.log(textfield.height);
        //panel2.add(new SlickUI.Element.Text(panel2.width*0.01,panel2.height*0.01, "Text input")).text.alpha = 0.5;
        //panel2.add(new SlickUI.Element.Text(panel2.width*0.01,panel2.height*0.1, "Your name"));
        //var textField = .add(new SlickUI.Element.TextField(panel2.width*0.01,panel2.height*0.18, panel2.width - 20, 40));
        textField.events.onOK.add(function () {
            alert('Your name is: ' + textField.value);
        });
        textField.events.onToggle.add(function (open) {
            console.log('You just ' + (open ? 'opened' : 'closed') + ' the virtual keyboard');
        });
        textField.events.onKeyPress.add(function(key) {
            console.log('You pressed: ' + key);
        });

		}

	};

}