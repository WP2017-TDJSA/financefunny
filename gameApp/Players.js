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
                break;
            case States.auction:
                var saystr = "";
                // 有股票就想賣股票
                if (playerInfo.stock > 0) {
                    saystr += `我用 ${CA.currentPrice+5} 元 賣 ${playerInfo.stock} 張股票!\n`
                    CA.addSell(playerInfo.name, CA.currentPrice+5,playerInfo.stock)
                }
                // 有錢就想買股票
                if (playerInfo.money > 0) {
                    var count = playerInfo.money / CA.currentPrice;
                    count = Math.floor(count);
                    if (count!=0) {
                        saystr += `我用 ${CA.currentPrice} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice,count)
                    }
                }
                if (saystr!="")
                    playerSprite.say(saystr, 5000);
                break;
            case States.auctioning:
                break;
            case States.result:
                break;
            default:
                break;
        }
    },
    richLogic : function(state, playerSprite, playerInfo, CA, eventHappen) {
        // 觀察競價進行的狀態，決定行為
        switch(state) {
            case States.begin:
                break;
            case States.auction:
                var saystr = "";
                // 有股票就想賣股票
                if (playerInfo.stock > 0) {
                    saystr += `我用 ${CA.currentPrice+5} 元 賣 ${playerInfo.stock} 張股票!\n`
                    CA.addSell(playerInfo.name, CA.currentPrice+5,playerInfo.stock)
                }
                // 有錢就想買股票
                if (playerInfo.money > 0) {
                    var count = playerInfo.money / CA.currentPrice;
                    count = Math.floor(count);
                    if (count!=0) {
                        saystr += `我用 ${CA.currentPrice} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerInfo.name, CA.currentPrice,count)
                    }
                }
                if (saystr!="")
                    playerSprite.say(saystr, 5000);
                break;
            case States.auctioning:
                break;
            case States.result:
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