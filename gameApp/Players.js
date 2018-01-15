const gameData = require('./gameData');
const States = gameData.States;

module.exports = {
    createPlayerLogic : function(playerSprite, playerInfo, CA, updateLogic) {
        
        return () => {
            updateLogic(gameData.state, playerSprite, playerInfo, CA, gameData.hasHappen);
        };
    },
    stupidLogic : function(state, playerSprite, playerInfo, CA, eventHappen) {
        // 觀察競價進行的狀態，決定行為
        switch(state) {
            case States.begin:
            playerInfo.done = false;
                break;
            case States.auction:
            if(playerInfo.done == false){
                var saystr = "";
                eventHappen = 0;
                //有壞事發生以低於市價賣出
                /*if(eventHappen == 1 && playerInfo.stock > 0){
                    saystr += `我用 ${CA.currentPrice-5}元 賣 ${playerInfo.stock} 張股票!\n`
                    CA.addSell(playerInfo.name,CA.currentPrice-5,playerInfo.stock)
                }*/
                // 有股票就想賣股票
                if (eventHappen == 0 && playerInfo.stock > 0) {
                    saystr += `我用 ${CA.currentPrice+5} 元 賣 ${playerInfo.stock} 張股票!\n`
                    CA.addSell(playerInfo.name, CA.currentPrice+5,playerInfo.stock)
                }
                // 有錢就想買股票
                if (eventHappen == 0 && playerInfo.money > 0) {
                    var count = playerInfo.money / CA.currentPrice;
                    count = Math.floor(count);
                    if (count!=0) {
                        saystr += `我用 ${CA.currentPrice} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice,count)
                    }
                }
                if (saystr!="")
                    playerSprite.say(saystr, 5000);
            }
                playerInfo.done = true;
                break;
            case States.auctioning:
                break;
            case States.result:
                playerInfo.done = false;
                
                break;
            default:
                break;
        }
    },
    richLogic : function(state, playerSprite, playerInfo, CA, eventHappen) {
        // 觀察競價進行的狀態，決定行為
        switch(state) {
            case States.begin:
            playerInfo.done = false;
                break;
            case States.auction:
                if(playerInfo.done == false){
                var saystr = "";
                
                
                //事件發生時用低價買進股票（高風險高報酬）
                /*if(eventHappen == 1 && playerInfo.money > 0){
                    var price = CA.currentPrice - 5;
                    var count = playerInfo.money / price;
                    count = Math.floor(count/2);
                    if(count != 0){
                        saystr += `我用 ${CA.currentPrice-5} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice-5,count)  
                    }
                }*/
                // 有股票就想賣股票，但他想賺錢
                if (eventHappen == 0 && playerInfo.stock >0 ) {
                    
                    var x = Math.floor((Math.random()*3+1))
                    if(x == 1){
                        var count = Math.floor(playerInfo.stock/4);
                        if(count != 0){
                        saystr += `我用 ${CA.currentPrice+5} 元 賣 ${count} 張股票!\n`
                        CA.addSell(playerInfo.name, CA.currentPrice+5,count) 
                    } 
                    }
                    if(x == 2){
                        var count = Math.floor(playerInfo.stock/2);
                        if(count != 0){
                        saystr += `我用 ${CA.currentPrice+8} 元 賣 ${count} 張股票!\n`
                        CA.addSell(playerInfo.name, CA.currentPrice+8,count) 
                    }
                    }
                    if(x == 3){
                        var count = Math.floor(playerInfo.stock);
                        if(count != 0){
                        saystr += `我用 ${CA.currentPrice+10} 元 賣 ${count} 張股票!\n`
                        CA.addSell(playerInfo.name, CA.currentPrice+10,count) 
                    }
                    }
                }
                // 有錢就想買股票，但他想以低價收購
                if (eventHappen == 0 && playerInfo.money > 0 ) {
                    var x = Math.floor((Math.random()*3+1))
                    if(x == 1){
                        var price = CA.currentPrice - 5;
                        var count = playerInfo.money / price;
                        count = Math.floor(count/4);
                        if(count != 0){
                        saystr += `我用 ${CA.currentPrice-5} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice-5,count)  
                    }
                    }
                       if(x == 2){
                        var price = CA.currentPrice - 8;
                        var count = playerInfo.money / price;
                        count = Math.floor(count/2);
                        if(count != 0){
                        saystr += `我用 ${CA.currentPrice-8} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice-8,count)  
                    }
                    }
                       if(x == 3){
                        var price = CA.currentPrice - 10;
                        var count = playerInfo.money / price;
                        count = Math.floor(count);
                        if(count != 0){
                        saystr += `我用 ${CA.currentPrice-10} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice-10,count)  
                    }
                    }
                    
                }
                if (saystr!="")
                    playerSprite.say(saystr, 5000);
            }
            playerInfo.done = true;
                break;
            case States.auctioning:
                break;
            case States.result:
            playerInfo.done = false;
                break;
            default:
                break;
        }
    },
    sanhuLogic : function(state, playerSprite, playerInfo, CA, eventHappen) {
        // 觀察競價進行的狀態，決定行為
        switch(state) {
            case States.begin:
                break;
            case States.auction:
                var saystr = "";
                if(eventHappen == 0)
                break;
            case States.auctioning:
                break;
            case States.result:
                break;
            default:
                break;
        }
    },
}