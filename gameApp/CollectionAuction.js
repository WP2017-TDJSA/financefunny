/* */

var gameData = require('./gameData')

function makeDelegate(playerInfo, isBuy, price, count) {
    return {
        playerInfo : playerInfo,
        isBuy : isBuy,
        isSell : !isBuy,
        isSuccess : false,
        price : price,
        count : count
    };
}

CollectionAuction = ((initPrice=0) => {
    var _noVolume = 0;
    var _this = {}
    _this.BuyList = [];
    _this.SellList = [];
    _this.AllList = [];
    _this.PlayerList = {};
    _this.currentPrice = initPrice;
    _this.currentVolume = 0;
    _this.debug = false;

    // 重置競價資訊

    _this.newAuction = () => {
        _this.BuyList.length = 0;
        _this.SellList.length = 0;
        _this.AllList.length = 0;
        //_this.PlayerList = {};

        if (_this.onChange) {
            _this.onChange.dispatch(_this.AllList.slice());
        }
    }

    // 將買賣委託加入陣列，並按照價格排序好

    _this.addtoList = (isBuy, player, price, count) => {
        if (!isNaN(price))
            price = parseFloat(price);
        else 
            throw new Error('price is not float');
        if (!isNaN(count))
            count = parseInt(count);
        else 
            throw new Error('count is not int');
        
        if (price === 0.0 || count === 0) {
            //throw new Error('price or count can not be zero!');
            if(_this.onError) {
                _this.onError.dispatch(`無法購買 ${count} 張 ${price} 元股票`)
                return;
            }
        }

        // 檢查該玩家是否真的有這個錢或股票
        var playerInfo = gameData.players[player];
        if (!playerInfo) {
            if(_this.onError) {
                _this.onError.dispatch(`沒有 ${player} 玩家，無法購買 ${count} 張 ${price} 元股票`)
                return;
            }
        }
        
        if (isBuy) {
            if (playerInfo.money < price*count) {
                if(_this.onError) {
                    _this.onError.dispatch(`錢太少，無法購買 ${count} 張 ${price} 元股票`)
                    return;
                }
            } else {
                playerInfo.money -= price*count;
            }
        } else {
            if (playerInfo.stock < count) {
                if(_this.onError) {
                    _this.onError.dispatch(`股票太少，無法販賣 ${count} 張 ${price} 元股票`)
                    return;
                }
            } else {
                playerInfo.stock -= count;
            } 
        }

        var target = null;
        for (var i = 0;i<_this.AllList.length;i++) {
            if (_this.AllList[i].price == price) {
                target = _this.AllList[i];
                break;
            }
        }
        if (target == null) {
            target = {
                price : price,
                buyList : [],
                buyCount : 0,
                buyTotal : 0,
                sellList : [],
                sellCount : 0,
                sellTotal : 0,
            }
            _this.AllList.push(target);
            // sort little -> big
            _this.sortList(_this.AllList);
        }

        var info = _this.playerInfo(player);
        var delegate = makeDelegate(info, isBuy, price, count);
        if (isBuy) {
            target.buyCount += count;
            target.buyList.push(delegate);
        } else {
            target.sellCount += count;
            target.sellList.push(delegate);
        }
        info.delegateList.push(delegate);

        // calculate total
        var total = 0;
        for (var i=0;i<_this.AllList.length;i++) {
            total += _this.AllList[i].sellCount;
            _this.AllList[i].sellTotal = total;
        }
        total = 0;
        for (var i=_this.AllList.length-1;i>=0;i--) {
            total += _this.AllList[i].buyCount;
            _this.AllList[i].buyTotal = total;
        }

        if (_this.onChange) {
            _this.onChange.dispatch(_this.AllList.slice());
        }
    }

    // 外部使用的 API

    _this.addBuy = (player, price, count) => {
        _this.addtoList(true,player,price,count);
    }

    _this.addSell = (player, price, count) => {
        _this.addtoList(false,player,price,count);
    }

    // 價格由低到高排序陣列

    _this.sortList = (list) => {
        list.sort((a,b)=>{
            return a.price - b.price;
        });
    }

    // 計算成交價

    _this.AuctionPrice = () => {
        // 先檢查是否有買賣委託
        if (_this.AllList.length == 0)
            return -1;

        // 將最高成交量的價格找出來
        var OKPrice = [],MaxVolume = 0;

        _this.AllList.forEach(element=>{
            var tmpVolume = element.buyTotal > element.sellTotal ? element.sellTotal:element.buyTotal;
            // 該價格成交量較大，重新更新
            if (tmpVolume > MaxVolume) {
                OKPrice.length = 0;
                OKPrice.push(element)
                MaxVolume = tmpVolume;
            } else if (tmpVolume!=0 && tmpVolume === MaxVolume) {
                // 該價格也是可能成交價
                OKPrice.push(element)              
            }
        })

        // 可能找不到成交價
        if (OKPrice.length === 0)
            return -1;
        
        // 同時滿足高於成交價的買進與低於成交價的賣出

        OKPrice =  OKPrice.filter(element=>{
            var tmpVolume = element.buyTotal > element.sellTotal ? element.sellTotal:element.buyTotal;
            // 高於該價格的買入無法全部滿足
            if (tmpVolume < element.buyTotal - element.buyCount) {
                return false;
            }
            // 低於該價格的賣出無法全部滿足
            if (tmpVolume < element.sellTotal - element.sellCount) {
                return false;
            }
            return true;
        })

        if (_this.debug)
            console.log('<okprice list> okprice : '+OKPrice);

        // 當可能成交價有多個時，找最靠近上次成交價的

        if (OKPrice.length == 1) {
            _this.currentVolume = MaxVolume;
            _this.currentPrice = OKPrice[0].price;
            return OKPrice[0].price;
        }
        else {
            var choosePrice = parseFloat(OKPrice[0].price);
            var distance = Math.abs(choosePrice - _this.currentPrice);

            OKPrice.forEach(element=>{
                var tmpPrice = parseFloat(element.price);
                var a = Math.abs(tmpPrice - _this.currentPrice);
                if (a < distance) {
                    choosePrice = tmpPrice;
                    distance = a;
                }
            })
            _this.currentVolume = MaxVolume;
            _this.currentPrice = choosePrice;
            return choosePrice;
        }
    }

    // 開始競價，算出成交價格與量，同時為每個玩家產生買賣成功失敗資訊

    _this.Auction = () => {
        if (_this.onAuction) {
            _this.onAuction.dispatch();
        }

        // 得到成交價與量
        var ret = _this.AuctionPrice()

        // 更新玩家委託 將這一次委託設為前一次委託
        for (key in  _this.PlayerList) {
            var playerInfo = _this.PlayerList[key];
            playerInfo.prevDelegateList = playerInfo.delegateList;
            playerInfo.delegateList = [];
            playerInfo.moneyBuySuccess = 0;
            playerInfo.moneyBuyFail = 0;
            playerInfo.moneySellSuccess = 0;
            playerInfo.stockBuySuccess = 0;
            playerInfo.stockSellFail = 0;
            playerInfo.money = 0;
            playerInfo.stock = 0;
        }

        // 處理所有委託

        _this.AllList.forEach(element => {
            // 本次找不到成交價 全部失敗
            if (ret === -1) {
                element.buyList.forEach(delegate => {
                    delegate.playerInfo.moneyBuyFail += delegate.price*delegate.count;
                    delegate.isSuccess = false;
                })
                element.sellList.forEach(delegate => {
                    delegate.playerInfo.stockSellFail += delegate.count;
                    delegate.isSuccess = false;
                })
                return;
            }
            // 價格高於成交價 買入成功 賣出失敗
            if (element.price > _this.currentPrice) {
                element.buyList.forEach(delegate => {
                    delegate.playerInfo.moneyBuySuccess += (delegate.price - _this.currentPrice)*delegate.count;
                    delegate.playerInfo.stockBuySuccess += delegate.count;
                    delegate.isSuccess = true;
                })
                element.sellList.forEach(delegate => {
                    delegate.playerInfo.stockSellFail += delegate.count;
                    delegate.isSuccess = false;
                })
            }
            // 價格等於成交價 買入可能部份成功 賣出可能部份成功
            if (element.price === _this.currentPrice) {
                var buyLimit = _this.currentVolume - element.buyTotal + element.buyCount;
                var sellLimit = _this.currentVolume - element.sellTotal + element.sellCount;
                element.buyList.forEach(delegate => {
                    if (buyLimit > 0) {
                        if (buyLimit >= delegate.count) {
                            buyLimit -= delegate.count;
                            delegate.playerInfo.stockBuySuccess += delegate.count;
                            delegate.isSuccess = true;
                        } else {
                            // 一筆委託部份成功
                            var newDelegate = makeDelegate(delegate.playerInfo, true, delegate.price, delegate.count - buyLimit);
                            newDelegate.isSuccess = false;
                            newDelegate.playerInfo.moneyBuyFail += newDelegate.price*newDelegate.count;
                            delegate.playerInfo.prevDelegateList.push(newDelegate);
                            delegate.count = buyLimit;
                            buyLimit = 0;
                            delegate.playerInfo.stockBuySuccess += delegate.count;
                            delegate.isSuccess = true;
                        }
                    } else {
                        delegate.playerInfo.moneyBuyFail += delegate.price*delegate.count;
                        delegate.isSuccess = false;
                    }
                })
                element.sellList.forEach(delegate => {
                    if (sellLimit > 0) {
                        if (sellLimit >= delegate.count) {
                            sellLimit -= delegate.count;
                            delegate.playerInfo.moneySellSuccess += delegate.price*delegate.count;
                            delegate.isSuccess = true;
                        } else {
                            // 一筆委託部份成功
                            var newDelegate = makeDelegate(delegate.playerInfo, true, delegate.price, delegate.count - sellLimit);
                            newDelegate.isSuccess = false;
                            newDelegate.playerInfo.stockSellFail += newDelegate.count;
                            delegate.playerInfo.prevDelegateList.push(newDelegate);
                            delegate.count = sellLimit;
                            sellLimit = 0;
                            delegate.playerInfo.moneySellSuccess += delegate.price*delegate.count;
                            delegate.isSuccess = true;
                        }
                    } else {
                        delegate.playerInfo.stockSellFail += delegate.count;
                        delegate.isSuccess = false;
                    }
                })
            }
            // 價格低於成交價 買入失敗 賣出成功
            if (element.price < _this.currentPrice) {
                element.buyList.forEach(delegate => {
                    delegate.playerInfo.moneyBuyFail += delegate.price*delegate.count;
                    delegate.isSuccess = false;
                })
                element.sellList.forEach(delegate => {
                    delegate.playerInfo.moneySellSuccess += _this.currentPrice*delegate.count;
                    delegate.isSuccess = false;
                })
            }
        });

        for (key in  _this.PlayerList) {
            var playerInfo = _this.PlayerList[key];
            if (playerInfo) {
                playerInfo.money = playerInfo.moneyBuySuccess + playerInfo.moneyBuyFail + playerInfo.moneySellSuccess;
                playerInfo.stock = playerInfo.stockBuySuccess + playerInfo.stockSellFail;
            }
            
            var gameplayer = gameData.players[key];
            if (gameplayer) {
                gameplayer.money += playerInfo.money
                gameplayer.stock += playerInfo.stock
            }
        }

        if (_this.onResult) {
            if (ret === -1)
                _this.onResult.dispatch(ret,0);
            else
                _this.onResult.dispatch(_this.currentPrice, _this.currentVolume);
        }
    }

    _this.playerInfo = player => {
        /*
        {
            buySuccessList
            buyFailList
            sellSuccessList
            sellFailList
        }
         */
        if (!_this.PlayerList.hasOwnProperty(player)) {
            var newinfo = {
                name : player,
                delegateList : [],
                prevDelegateList : [],
                moneyBuySuccess : 0,
                moneyBuyFail : 0,
                moneySellSuccess : 0,
                stockBuySuccess : 0,
                stockSellFail : 0,
                money : 0,
                stock : 0,
            };
            _this.PlayerList[player] = newinfo;
        }
        return _this.PlayerList[player];
    }

    _this.getTotalCount = list => {
        var a = list.reduce((a,b)=>{return a+b.count},0);
        return parseInt(a);
    }

    try {
        if (Phaser) {
            _this.onChange = new Phaser.Signal();
            _this.onAuction = new Phaser.Signal();
            _this.onResult = new Phaser.Signal();
            _this.onError = new Phaser.Signal();
        }
    } catch(error) {

    }

    return _this;
});


var CAList = {};

try {
    //module.exports = CollectionAuction;
    module.exports = CollectionAuction;
} catch (error) {
    
}