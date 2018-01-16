const FlowController = require('./flowControl')
const UIMessage = require('./UIMessage')
const UIButton = require('./UIButton')

module.exports = {
    preload : function(game) {
        console.log('[state] introAuctionState0')
    },
    create : function(game) {
        this.FlowController = FlowController(game);
        this.textList = [];
        var style = { font:"30px 微軟正黑體" , fill: "#000000",  align: "center"};

        this.FlowController.add(function() {
            var text1 = game.add.text(0.5*game.width,0.2*game.height,'首先，介紹股票的價格是怎麼被決定的。',style);
			text1.anchor.set(0.5);
            text1.alpha = 0;
            var tween1 = game.add.tween(text1).to( { alpha: 1 }, 1000, "Linear", true);

            game.add.tween(text1).to( { alpha: 1 }, 1000, "Linear", true).onComplete.add(()=>{
				game.add.tween(text1).to( { alpha: 0 }, 1000, "Linear", true,2000).onComplete.add(()=>{
                    game.time.events.add(300, ()=>{
                        this.FlowController.finish(text1);
                    })
                    
                })	
			},this);

        },this)

        this.FlowController.add(function(text1) {
            text1.setText('通常，[ 買 ] 股票的人，希望價格 [ 便宜 ]')
            var text2 = game.add.text(0.5*game.width, text1.y, '通常，[ 賣 ] 股票的人，希望價格 [ 昂貴 ]', style)
            text2.anchor.set(0.5);
            text2.alpha = 0;
            
            var text3 = game.add.text(0.5*game.width, 0.5*game.height, '買入價格', style)
            text3.alpha = 0;
            text3.anchor.set(0.5)
            text3.x -= (text3.width + 50);
            //text3.y += text3.height*2;
            var text4 = game.add.text(0.5*game.width, 0.5*game.height, '賣出價格', style)
            text4.alpha = 0;
            text4.anchor.set(0.5)
            text4.x += (text4.width + 50);
            //text4.y -= text4.height*2;

            var tween1 = game.add.tween(text1).to( { alpha: 1 }, 1000, "Linear", true);
            game.add.tween(text3).to({alpha : 1}, 1000, "Linear", true);
            tween1.onComplete.add(()=>{
                game.add.tween(text3).to({ y : text3.y + text3.height*2 }, 1000, "Linear", true, 500).onComplete.add(()=>{
                    game.add.tween(text1).to({alpha : 0}, 800, "Linear", true, 700)
                    game.add.tween(text4).to({alpha : 1}, 1000, "Linear", true,1100);
                    game.add.tween(text2).to({ alpha : 1}, 1000, "Linear", true, 1100).onComplete.add(()=>{
                        game.add.tween(text4).to({ y : text4.y - text4.height*2 }, 1000, "Linear", true, 500).onComplete.add(()=>{
                            game.time.events.add(1100, ()=>{
                                this.FlowController.finish(text1, text2, text3, text4);
                            })
                        })
                    })
                })
                
            })
        },this)

        this.FlowController.add(function(text1, text2, text3, text4) {
            text1.setText('也因此，買方與賣方需要去競爭價格\n而去決定出一個成交價')
            game.add.tween(text2).to({alpha : 0}, 1000, "Linear", true)
            game.add.tween(text1).to({alpha : 1}, 1000, "Linear", true, 600).onComplete.add(()=>{
                game.time.events.add(2200, ()=>{
                    this.FlowController.finish(text1, text2, text3, text4);
                })
            })

            //this.FlowController.finish();
        },this)

        this.FlowController.add(function(text1, text2, text3, text4) {
            text2.setText('該如何競爭出一個價格呢?');
            text2.y = game.height*0.5 + text3.height + 5;
            game.add.tween(text3).to({x : game.width*0.5}, 500, "Linear", true, 0,1,true)
            game.add.tween(text3).to({y : game.height*0.5 - text3.height*2}, 1000, "Linear", true, 0,1,true)
            game.add.tween(text4).to({x : game.width*0.5}, 500, "Linear", true, 0,1,true)
            game.add.tween(text4).to({y : game.height*0.5 + text4.height*2}, 1000, "Linear", true, 0,1,true).onComplete.add(()=>{
                game.add.tween(text3).to({y : game.height * 0.5}, 1500, "Linear", true)
                game.add.tween(text4).to({y : game.height * 0.5}, 1500, "Linear", true).onComplete.add(()=>{
                    game.add.tween(text2).to({alpha : 1}, 1000, "Linear", true, 1000).onComplete.add(()=>{
                        game.add.tween(text1).to({alpha : 0},800, "Linear", true, 1000)
                        game.add.tween(text2).to({alpha : 0},800, "Linear", true, 1000)
                        game.add.tween(text3).to({alpha : 0},800, "Linear", true, 1000)
                        game.add.tween(text4).to({alpha : 0},800, "Linear", true, 1000).onComplete.add(()=>{
                            text1.destroy();
                            text2.destroy();
                            text3.destroy();
                            text4.destroy();
                            this.FlowController.finish();
                        })
                            

                    })
                    
                })
            })
        },this)

        this.FlowController.add(function() {
			var text2 = game.add.text(0.5*game.width,0.4*game.height,'目前在 台灣證交所 股票的價格',style);
			text2.anchor.set(0.5);
			text2.alpha = 0;
			var text3 = game.add.text(0.5*game.width,0.5*game.height,'由「集合競價」的方式決定',style);
			text3.anchor.set(0.5);
			text3.alpha = 0;
			var text4 = game.add.text(0.5*game.width,0.6*game.height,'什麼是「集合競價」呢?',style);
			text4.anchor.set(0.5);
			text4.alpha = 0;

			var tween2 = game.add.tween(text2).to( { alpha: 1 }, 1000, "Linear", true);
			tween2.onComplete.add(()=>{
				game.add.tween(text3).to( { alpha: 1 }, 1000, "Linear", true,1100).onComplete.add(()=>{
                    game.add.tween(text4).to( { alpha: 1 }, 1000, "Linear", true,1100).onComplete.add(()=>{
                        game.time.events.add(1100,()=>{
                            this.FlowController.finish(text2, text3, text4);
                        })
                        
                    })
                })	
			},this);
			

        },this)

        this.FlowController.add(function(text2, text3, text4) {
            var button = UIButton(game, 0.5*game.width, 0.72*game.height, '前往下一頁了解->')
            button.events.onInputDown.add(()=>{
                button.destroy();
                button.text.destroy();
				game.add.tween(text2).to({alpha : 0}, 500, "Linear", true);
				game.add.tween(text3).to({alpha : 0}, 500, "Linear", true);
				game.add.tween(text4).to({alpha : 0}, 500, "Linear", true).onComplete.add(()=>{
                    game.time.events.add(300,()=>{
					    this.FlowController.finish();
				    })
                });
                
                
            })
        },this)

        this.FlowController.add(function(){
            // go next state
            var currState = game.state.current;
            var index = Object.keys(game.state.states).indexOf(game.state.current) + 1;
            if (index != Object.keys(game.state.states).length)
                var nextState = Object.keys(game.state.states)[index];

            if (nextState)
                game.state.start(nextState);
        })
    },
    update : function(game) {

    },
    shutdown : function() {

    }
}