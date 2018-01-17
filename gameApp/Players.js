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
            playerInfo.laststockprice = CA.currentPrice;
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
                if(CA.currentPrice < playerInfo.laststockprice - 4 && eventHappen == 0 && playerInfo.money > 0 && playerInfo.stock > 0){

                    var x = Math.floor((Math.random()*3+1))
                    if(x == 1){
                        var price = CA.currentPrice + 3;
                        var count = playerInfo.money / price;
                        count = Math.floor(count/2);
                        if(count >= 0){
                        saystr += `我用 ${CA.currentPrice+3} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice+3,count)
                    }
                    }      
                    if(x == 2){
                        var price = CA.currentPrice + 5;
                        var count = playerInfo.money / price;
                        count = Math.floor(count/3);
                        if(count >= 0){
                        saystr += `我用 ${CA.currentPrice+5} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice+5,count)
                    }
                    }   
                    if(x == 3){
                        var price = CA.currentPrice + 8;
                        var count = playerInfo.money / price;
                        count = Math.floor(count/4);
                        if(count >= 0){
                        saystr += `我用 ${CA.currentPrice+8} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice+8,count)
                    }
                    }
                }
                if(CA.currentPrice > playerInfo.laststockprice + 4 && eventHappen == 0 && playerInfo.money > 0 && playerInfo.stock > 0){

                    var x = Math.floor((Math.random()*3+1))
                    if(x == 1){
                        var count = Math.floor(playerInfo.stock/4);
                        if(count >= 0){
                            saystr += `我用 ${CA.currentPrice-7} 元 賣 ${count} 張股票!\n`
                            CA.addSell(playerInfo.name, CA.currentPrice-7,count) 
                        }
                    } 
                    if(x == 2){
                        var count = Math.floor(playerInfo.stock/3);
                        if(count >= 0){
                            saystr += `我用 ${CA.currentPrice-4} 元 賣 ${count} 張股票!\n`
                            CA.addSell(playerInfo.name, CA.currentPrice-4,count) 
                        }
                    } 
                    if(x == 3){
                        var count = Math.floor(playerInfo.stock/2);
                        if(count >= 0){
                            saystr += `我用 ${CA.currentPrice-1} 元 賣 ${count} 張股票!\n`
                            CA.addSell(playerInfo.name, CA.currentPrice-1,count) 
                        }
                    } 
                }

                // 有股票就想賣股票，但他想賺錢
                if (eventHappen == 0 && playerInfo.stock >0 ) {
                    
                    var x = Math.floor((Math.random()*3+1))
                    if(x == 1){
                        var count = Math.floor(playerInfo.stock/4);
                        if(count >= 0){
                        saystr += `我用 ${CA.currentPrice+5} 元 賣 ${count} 張股票!\n`
                        CA.addSell(playerInfo.name, CA.currentPrice+5,count) 
                    } 
                    }
                    if(x == 2){
                        var count = Math.floor(playerInfo.stock/2);
                        if(count >= 0){
                        saystr += `我用 ${CA.currentPrice+8} 元 賣 ${count} 張股票!\n`
                        CA.addSell(playerInfo.name, CA.currentPrice+8,count) 
                    }
                    }
                    if(x == 3){
                        var count = Math.floor(playerInfo.stock);
                        if(count >= 0){
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
                        count = Math.floor(count/3);
                        if(count >= 0){
                        saystr += `我用 ${CA.currentPrice-5} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice-5,count)  
                    }
                    }
                       if(x == 2){
                        var price = CA.currentPrice - 8;
                        var count = playerInfo.money / price;
                        count = Math.floor(count/2);
                        if(count >= 0){
                        saystr += `我用 ${CA.currentPrice-8} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice-8,count)  
                    }
                    }
                       if(x == 3){
                        var price = CA.currentPrice - 10;
                        var count = playerInfo.money / price;
                        count = Math.floor(count);
                        if(count >= 0){
                        saystr += `我用 ${CA.currentPrice-10} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice-10,count)  
                    }
                    }
                    
                }
                if (saystr!="")
                    playerSprite.say(saystr, 5000);
            }
            playerInfo.done = true;
            playerInfo.laststockprice = CA.currentPrice;

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
            playerInfo.done = false;
            playerInfo.last = 0;
            playerInfo.laststockprice = CA.currentPrice;
                break;
            case States.auction:
                var saystr = "";

                if(playerInfo.done == false){
                    if(playerInfo.moneySellSuccess == 0 ){
                        playerInfo.last += 1;}
                    if(playerInfo.moneySellSuccess != 0){
                        playerInfo.last = 0;
                    }
                    console.log(playerInfo.moneySellSuccess);
                    console.log(playerInfo.stockBuySuccess);
                    console.log(playerInfo.laststockprice);
                    console.log(CA.currentPrice);
                    if(CA.currentPrice > playerInfo.laststockprice && eventHappen == 0 && playerInfo.money > 0 && playerInfo.stock > 0){
                    var x = Math.floor((Math.random()*6+1))
                    if(x == 1){
                        var count = Math.floor(playerInfo.stock/4);
                        if(count >= 0){
                            saystr += `我用 ${CA.currentPrice-8} 元 賣 ${count} 張股票!\n`
                            CA.addSell(playerInfo.name, CA.currentPrice-8,count) 
                        }
                    } 
                    if(x == 2){
                        var count = Math.floor(playerInfo.stock/3);
                        if(count >= 0){
                            saystr += `我用 ${CA.currentPrice-5} 元 賣 ${count} 張股票!\n`
                            CA.addSell(playerInfo.name, CA.currentPrice-5,count) 
                        }
                    } 
                    if(x == 3){
                        var count = Math.floor(playerInfo.stock/2);
                        if(count >= 0){
                            saystr += `我用 ${CA.currentPrice-3} 元 賣 ${count} 張股票!\n`
                            CA.addSell(playerInfo.name, CA.currentPrice-3,count) 
                        }
                    } 
                    if(x == 4){
                        var price = CA.currentPrice + 3;
                        var count = playerInfo.money / price;
                        count = Math.floor(count/2);
                        if(count >= 0){
                        saystr += `我用 ${CA.currentPrice+3} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice+3,count)
                    }
                    }      
                    if(x == 5){
                        var price = CA.currentPrice + 5;
                        var count = playerInfo.money / price;
                        count = Math.floor(count/3);
                        if(count >= 0){
                        saystr += `我用 ${CA.currentPrice+5} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice+5,count)
                    }
                    }   
                    if(x == 6){
                        var price = CA.currentPrice + 8;
                        var count = playerInfo.money / price;
                        count = Math.floor(count/4);
                        if(count >= 0){
                        saystr += `我用 ${CA.currentPrice+8} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice+8,count)
                    }
                    }
                }
                if(CA.currentPrice < playerInfo.laststockprice && eventHappen == 0 && playerInfo.money > 0 && playerInfo.stock > 0){
                    var x = Math.floor((Math.random()*4+1))
                    if(x == 1){
                        var count = Math.floor(playerInfo.stock/5);
                        if(count >= 0){
                            saystr += `我用 ${CA.currentPrice-8} 元 賣 ${count} 張股票!\n`
                            CA.addSell(playerInfo.name, CA.currentPrice-8,count) 
                        }
                    } 
                    if(x == 2){
                        var count = Math.floor(playerInfo.stock/4);
                        if(count >= 0){
                            saystr += `我用 ${CA.currentPrice-5} 元 賣 ${count} 張股票!\n`
                            CA.addSell(playerInfo.name, CA.currentPrice-5,count) 
                        }
                    } 
                    if(x == 3){
                        var count = Math.floor(playerInfo.stock/3);
                        if(count >= 0){
                            saystr += `我用 ${CA.currentPrice-3} 元 賣 ${count} 張股票!\n`
                            CA.addSell(playerInfo.name, CA.currentPrice-3,count) 
                        }
                    } 
                    if(x == 4){
                        var price = CA.currentPrice + 4;
                        var count = playerInfo.money / price;
                        count = Math.floor(count/3);
                        if(count >= 0){
                        saystr += `我用 ${CA.currentPrice+4} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice+4,count)
                    }
                    } 
                    
                }
                    if (eventHappen == 0 && playerInfo.stock >0 && playerInfo.last <= 2 && CA.currentPrice == playerInfo.laststockprice) {
                    
                    var x = Math.floor((Math.random()*3+1))
                    if(x == 1){
                        var count = Math.floor(playerInfo.stock/3);
                        if(count != 0){
                        saystr += `我用 ${CA.currentPrice+3} 元 賣 ${count} 張股票!\n`
                        CA.addSell(playerInfo.name, CA.currentPrice+3,count) 
                    } 
                    }
                    if(x == 2){
                        var count = Math.floor(playerInfo.stock/2);
                        if(count != 0){
                        saystr += `我用 ${CA.currentPrice+5} 元 賣 ${count} 張股票!\n`
                        CA.addSell(playerInfo.name, CA.currentPrice+5,count) 
                    }
                    }
                    if(x == 3){
                        var count = Math.floor(playerInfo.stock);
                        if(count != 0){
                        saystr += `我用 ${CA.currentPrice+8} 元 賣 ${count} 張股票!\n`
                        CA.addSell(playerInfo.name, CA.currentPrice+8,count) 
                    }
                    }
                }
                    if(eventHappen == 0 && playerInfo.stock > 0 && playerInfo.last > 2 && CA.currentPrice == playerInfo.laststockprice){
                        var count = Math.floor(playerInfo.stock/1.5);
                        if(count != 0){
                            saystr += `我用 ${CA.currentPrice-5} 元 賣 ${count} 張股票!\n`
                        CA.addSell(playerInfo.name, CA.currentPrice-5,count) 
                        }
                    }
                    if (eventHappen == 0 && playerInfo.money > 0 && playerInfo.last <= 2&& CA.currentPrice == playerInfo.laststockprice) {
                    var x = Math.floor((Math.random()*3+1))
                    if(x == 1){
                        var price = CA.currentPrice - 3;
                        var count = playerInfo.money / price;
                        count = Math.floor(count/3);
                        if(count != 0){
                        saystr += `我用 ${CA.currentPrice-3} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice-3,count)  
                    }
                    }
                       if(x == 2){
                        var price = CA.currentPrice - 5;
                        var count = playerInfo.money / price;
                        count = Math.floor(count/2);
                        if(count != 0){
                        saystr += `我用 ${CA.currentPrice-5} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice-5,count)  
                    }
                    }
                       if(x == 3){
                        var price = CA.currentPrice - 8;
                        var count = playerInfo.money / price;
                        count = Math.floor(count);
                        if(count != 0){
                        saystr += `我用 ${CA.currentPrice-8} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice-8,count)  
                    }
                    }
                    
                }
                    if(eventHappen == 0 && playerInfo.stock > 0 && playerInfo.last > 2 && CA.currentPrice == playerInfo.laststockprice){
                        var price = CA.currentPrice + 5;
                        var count = playerInfo.money / price;
                        count = Math.floor(count/1.5);
                        if(count != 0){
                            saystr += `我用 ${CA.currentPrice+5} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice+5,count) 
                        }
                        }
                    }
                playerInfo.done = true;
                playerInfo.laststockprice = CA.currentPrice;
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
}