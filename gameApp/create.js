

module.exports = function (game,slickUI){
	var set = {};
	slickUI = game.plugins.add(Phaser.Plugin.SlickUI);
    slickUI.load('img/game/theme/kenney.json');

	set.createtext = function(x,y,z){
		if(window.innerHeight<600)
			var style = { font: "20px Arial", fill: "white"};
		else
			var style = { font: "22px Arial", fill: "white"};
		//var style = { font: "22px Arial", fill: "white" }
		var text = game.add.text(x,y,z,style);
		text.visible = false;
		return text;

	}
	set.createbutt = function(x,y){
		var butt1 = game.add.graphics(x,y);
		butt1.beginFill(0x888888,1);
        butt1.lineStyle(2, 0x483D8B, 1);
        butt1.drawRoundedRect(0, 0, game.width*0.4, game.height*0.4,7);
        butt1.endFill();
        butt1.visible = false;
        return butt1;
	}
	set.getpricecount = function(rec,textfield1,textfield2,buybutton,w,x,y,z,cancel,a,b,callback){
		var price = 0 ,count = 0 ;
    	rec.visible = true;
    	textfield1.visible = true;
    	textfield2.visible = true;
    	cancel.visible = true;
    	//buybutton.visible = true;
    	w.visible = true;
    	x.visible = true;
    	//y.visible = true;
    	z.visible = true;
    	if(price == 0 && count == 0){
    	textfield1.events.onToggle.add(function (open) {
            console.log('virtual keyboard');
            z.visible = false;
            cancel.visible = false;
            buybutton.visible = false;
            y.visible = false;
            textfield2.visible = false;
        })
    textfield1.events.onOK.add(function(){
        price = parseFloat(textfield1.value);
        console.log(price);
        if(price != 0 &&count != 0)
    {
    	y.visible = true;
    	buybutton.visible = true;
    }
    z.visible = true;
    cancel.visible = true;
    textfield2.visible = true;
    })
    textfield2.events.onToggle.add(function (open) {
            console.log('virtual keyboard');
            z.visible = false;
            cancel.visible = false;
            buybutton.visible = false;
            y.visible = false;
            textfield1.visible = false;
        })
    
    textfield2.events.onOK.add(function(){
        count = parseFloat(textfield2.value);
        console.log(count);
        if(price != 0 &&count != 0 )
    {
    	y.visible = true;
    	buybutton.visible = true;
    }
    z.visible = true;
    cancel.visible = true;
    textfield1.visible = true;
    })
    
    buybutton.events.onInputDown.addOnce(function(){
        textfield1.visible = false;
        textfield2.visible = false;
        buybutton.visible = false;
        cancel.visible = false;
        rec.visible = false;
        w.visible = false;
        x.visible = false;
        y.visible = false;
        z.visible = false;

        a.visible = true;
        b.visible = true;

        callback(price,count);

        })
    cancel.events.onInputDown.addOnce(function(){
    	textfield1.visible = false;
        textfield2.visible = false;
        buybutton.visible = false;
        cancel.visible = false;
        rec.visible = false;
        w.visible = false;
        x.visible = false;
        y.visible = false;
        z.visible = false;
        a.visible = true;
        b.visible = true;
    })

}
}

set.slicktext = function(a,b,c,d){
	
	var textfield = new SlickUI.Element.TextField(a,b,c,d);
	slickUI.add(textfield);
	textfield.visible = false;
	return textfield;


}
set.slickbutton = function(a,b,c,d){
	var button = new SlickUI.Element.Button(a,b,c,d);
	slickUI.add(button);
	button.visible = false;
	return button;

}




return set;

}