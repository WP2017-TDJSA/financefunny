// 玩家資訊的建構式 money 儲存身上有的金錢，count 儲存身上有的股票數量
function playerInfo(name="", money=0, stock=0) {
    this.name = name;
    this.money = money;
    this.stock = stock;
    this.dirty = true;
    return this;
}

// 遊戲資訊的建構式
function gameInfo() {

}

var players = {};

module.exports = {
    playerInfo : playerInfo,
    gameInfo : gameInfo,
    players : players,
}