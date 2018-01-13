// 玩家資訊的建構式 money 儲存身上有的金錢，count 儲存身上有的股票數量
function playerInfo(name="", sprite = undefined, money=0, stock=0) {
    this.name = name;
    this.sprite = sprite;
    this.money = money;
    this.stock = stock;
    this.dirty = true;
    return this;
}

// 遊戲資訊的建構式
function gameInfo() {

    return this;
}

var players = {};

module.exports = {
    playerInfo : playerInfo,
    gameInfo : gameInfo,
    players : players,
    state : 0,
    hasHappen : 0,
    States : {
        begin : 0,
        auction : 1,
        auctooning : 2,
        result : 3,
    }
}