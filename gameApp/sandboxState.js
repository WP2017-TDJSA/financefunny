var stupid_number = 0;
var rich_number = 0;
var sanhu_number = 0;
var stupid_max_number = 5;
var rich_max_number = 5;
var sanhu_max_number = 5;
const walk = require('./walk')(game)
const gameData = require('./gameData')
const Players = require('./Players')
const needUpdateLogic = [];

// 事件發生的機率
// 初始成交價
// 人物的數量
// 人物的初始錢 跟 股票

module.exports = {
    preload : function (game) {
        // reset players data
        gameData.players = {};

    },
    create : function (game) {
        // 競價邏輯
        this.CA = require('./CollectionAuction')(20);

        // 加入典型人物
        this.rects = game.add.group();
        this.stupids = [];
        this.richs = [];
        this.sanhus = [];
        for (let i=0;i<stupid_max_number;i++) {
            let stupid = walk.add_one_man(game,'stupidwalk',game.world.centerX,game.world.centerY,game.height*0.2,40,-1,0,0);
            let data = new gameData.playerInfo('stupid'+i, stupid, 500, 50)
            stupid._sprite.x += i*50;
            data.logic = Players.createPlayerLogic(stupid, data, this.CA, Players.stupidLogic);
            this.stupids.push(data);
            needUpdateLogic.push(data.logic)
        }
        for (let i=0;i<rich_max_number;i++) {
            let rich = walk.add_one_man(game,'richwalk',game.world.centerX,game.world.centerY + 100,game.height*0.2,40,-1,0,0);
            let data = new gameData.playerInfo('rich'+i, rich, 500, 50)
            rich._sprite.x += i*50;
            data.logic = Players.createPlayerLogic(rich, data, this.CA, Players.richLogic);
            this.richs.push(data);
            needUpdateLogic.push(data.logic)
        }
        for (let i=0;i<sanhu_max_number;i++) {
            let sanhu = walk.add_one_man(game,'sanhuwalk',game.world.centerX,game.world.centerY - 100,game.height*0.2,40,-1,0,0);
            let data = new gameData.playerInfo('sanhu'+i, sanhu, 500, 50)
            sanhu._sprite.x += i*50;
            data.logic = Players.createPlayerLogic(sanhu, data, this.CA, Players.sanhuLogic);
            this.sanhus.push(data);
            needUpdateLogic.push(data.logic)
        }


        // 遊戲狀態的控制
        gameData.state = gameData.States.begin;

        this.CA.onAuction.add(function(){
            gameData.state = gameData.States.auctioning;

        },this)

        this.CA.onResult.add(function(price, volume){
            gameData.state = gameData.States.result;
            // wait a moment
            alert(price)
            game.time.events.add( 200, ()=>{
                gameData.state = gameData.States.auction;
            })
        },this)
        game.time.events.add( 500, ()=>{
            //gameData.state = gameData.States.auction;
        })
    },
    update : function (game) {
        if (Object.keys(gameData.players).length > 0) {
            for (var key in gameData.players) {
                var playerInfo = gameData.players[key]

                if (!playerInfo.sprite)
                    return;

				playerInfo.sprite.change_money(playerInfo.money);
				this.rects.add(playerInfo.sprite._money_rect);
				playerInfo.sprite.change_stock(playerInfo.stock);
				this.rects.add(playerInfo.sprite._stock_rect);				
            }
        }
        // update logic
        if (needUpdateLogic.length > 0) {
            for (var index in needUpdateLogic) {
                needUpdateLogic[index]();
            }
        }

    },
    shutdown : function (game) {

    }
}