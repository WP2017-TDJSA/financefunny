const gameData = require('./gameData');
const States = gameData.States;

module.exports = {
    createPlayerLogic : function(playerSprite, playerData, CA, updateLogic) {
        
        return () => {
            updateLogic(gameData.state, playerSprite, playerData, CA);
        };
    },
    stupidLogic : function(state, playerSprite, playerData, CA) {
        // 觀察競價進行的狀態，決定行為
        switch(state) {
            case States.begin:
                break;
            case States.auction:
                var saystr = "";
                // 有股票就想賣股票
                if (playerData.stock > 0) {
                    saystr += `我用 ${CA.currentPrice+5} 元 賣 ${playerData.stock} 張股票!\n`
                    CA.addSell(playerData.name, CA.currentPrice+5,playerData.stock)
                }
                // 有錢就想買股票
                if (playerData.money > 0) {
                    var count = playerData.money / CA.currentPrice;
                    count = Math.floor(count);
                    if (count!=0) {
                        saystr += `我用 ${CA.currentPrice} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerData.name, CA.currentPrice,count)
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
    richLogic : function(state, playerSprite, playerData, CA) {
        // 觀察競價進行的狀態，決定行為
        switch(state) {
            case States.begin:
                break;
            case States.auction:
                var saystr = "";
                // 有股票就想賣股票
                if (playerData.stock > 0) {
                    saystr += `我用 ${CA.currentPrice+5} 元 賣 ${playerData.stock} 張股票!\n`
                    CA.addSell(playerData.name, CA.currentPrice+5,playerData.stock)
                }
                // 有錢就想買股票
                if (playerData.money > 0) {
                    var count = playerData.money / CA.currentPrice;
                    count = Math.floor(count);
                    if (count!=0) {
                        saystr += `我用 ${CA.currentPrice} 元 買 ${count} 張股票!\n`
                        CA.addBuy(playerData.name, CA.currentPrice,count)
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
    }
}