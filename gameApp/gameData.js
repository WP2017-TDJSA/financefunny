// 玩家資訊的建構式 money 儲存身上有的金錢，count 儲存身上有的股票數量
function playerInfo(money=0, count=0) {
    this.money = money;
    this.count = count;
}

// 遊戲資訊的建構式
function gameInfo() {

}

module.exports = {
    playerInfo : playerInfo,
    gameInfo : gameInfo,
}