// 玩家資訊的建構式 money 儲存身上有的金錢，count 儲存身上有的股票數量
function playerInfo(name="", sprite = undefined, money=0, stock=0) {
    // 人物名稱 (string)
    this.name = name;
    // 人物精靈
    this.sprite = sprite;
    // 人物身上的錢
    this.money = money;
    // 人物身上的股票
    this.stock = stock;
    // 人物目前丟出的委託
    /* 委託的結構
    {
        playerInfo : playerInfo,
        isBuy : isBuy,
        isSell : !isBuy,
        isSuccess : false,
        price : price,
        count : count
    }
     */
    this.delegateList = [];
    // 人物上一次的委託
    this.prevDelegateList = []
    // 人物上一次買多的錢
    this.moneyBuySuccess = 0
    // 人物上一次買失敗的錢
    this.moneyBuyFail = 0
    // 人物上一次賣成功的錢
    this.moneySellSuccess = 0
    // 人物上一次買成功的股票
    this.stockBuySuccess = 0
    // 人物上一次賣失敗的股票
    this.stockSellFail = 0
    // 人物上一次總共獲得的錢
    this.moneyTotal = 0
    // 人物上一次總共獲得的股票
    this.stockTotal = 0

    // 暫時沒用
    this.dirty = true;

    // 新增進 players
    players[this.name] = this;
    
    return this;
}

// 遊戲資訊的建構式
function gameInfo() {

    return this;
}

// 儲存所有玩家資訊
var players = {};

var gameData = {
    playerInfo : playerInfo,
    gameInfo : gameInfo,
    players : players,
    resetPlayers : () => {
        gameData.players = {};
        players = gameData.players;
    },
    state : 0,
    hasHappen : 0,
    States : {
        begin : 0,
        auction : 1,
        auctooning : 2,
        result : 3,
    }
}

module.exports = gameData;