/* */

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
        _this.PlayerList = {};

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

        if (isBuy) {
            target.buyCount += count;
            target.buyList.push({price : price,player : player, count : count})
        } else {
            target.sellCount += count;
            target.sellList.push({price : price,player : player, count : count})
        }

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

/*
        //檢查是否有交集
        if (_this.BuyList[0].price < _this.SellList[0].price) {
            return 0;
        }
        var MaxPrice = _this.BuyList[0].price;
        var MinPrice = _this.SellList[0].price;
        var PriceList = [];
        

        var newBuylist = _this.BuyList.filter((element) => {
            if (element.price >= MinPrice)
                PriceList.push(element.price);
            return element.price >= MinPrice;
        })

        var newSelllist = _this.SellList.filter((element) => {
            if (element.price <= MaxPrice)
                PriceList.push(element.price);
            return element.price <= MaxPrice;
        })

        PriceList.forEach(element => {
            var currentVolume = _this.calculateVolume(newBuylist,newSelllist,element);
            if (_this.debug)
                console.log('<calculateVolume>price : '+element + ', volume : '+currentVolume);
            if (currentVolume > MaxVolume) {
                OKPrice = [element];
                MaxVolume = currentVolume;
            }
            else if (currentVolume == MaxVolume) {
                OKPrice.push(element);
            }
        })*/

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
/*
    _this.calculateVolume = (buy,sell,price) => {
        var sellMustVolume = 0,sellVolume = 0;
        var buyMustVolume = 0,buyVolume = 0;
        sell.forEach((element)=> {
            if (element.price < price)
                sellMustVolume += element.total;
            if (element.price == price)
                sellVolume += element.total;
        });
        buy.forEach((element)=> {
            if (element.price > price)
                buyMustVolume += element.total;
            if (element.price == price)
                buyVolume += element.total;
        });
        if (_this.debug)
            console.log('<calculateVolume>' + JSON.stringify({
                buyMust : buyMustVolume,
                buy : buyVolume,
                sellMust : sellMustVolume,
                sell : sellVolume
            }));

        if (buyMustVolume - sellMustVolume == 0) {
            return buyVolume > sellVolume ? buyMustVolume + sellVolume: buyMustVolume + buyVolume;
        } 
        if (buyMustVolume > sellMustVolume) {
            if (buyMustVolume > sellMustVolume + sellVolume)
                return _noVolume;
        } else {
            if (sellMustVolume > buyMustVolume + buyVolume)
                return _noVolume;
        }
        return buyMustVolume + buyVolume > sellMustVolume + sellVolume ? sellMustVolume + sellVolume:buyMustVolume + buyVolume;
    }*/

    // 開始競價，算出成交價格與量，同時為每個玩家產生買賣成功失敗資訊

    _this.Auction = () => {
        // 得到成交價與量
        _this.AuctionPrice();

        if (_this.onResult) {
            _this.onResult.dispatch(_this.currentPrice);
        }

        /*
        var allVolume = 0;

        _this.BuyList.forEach(element => {
            element.list.forEach(query=>{
                if (element.price > _this.currentPrice) {
                    _this.playerInfo(query.player).buySuccessList.push(query);
                    _this.playerInfo(query.player).buySuccessBackMoney += (element.price - _this.currentPrice) * query.count;
                    allVolume += query.count;
                }
                else if (element.price == _this.currentPrice) {
                    if (allVolume + query.count <= _this.currentVolume) {
                        _this.playerInfo(query.player).buySuccessList.push(query);
                        allVolume += query.count;
                    } else {
                        if (allVolume < _this.currentVolume) {
                            var newquery = {
                                player : query.player,
                                count : _this.currentVolume - allVolume,
                                price : query.price
                            };
                            _this.playerInfo(query.player).buySuccessList.push(newquery);
                            allVolume += newquery.count;
                            query.count -= newquery.count;
                            _this.playerInfo(query.player).buyFailList.push(query);
                            _this.playerInfo(query.player).buyFailBackMoney += element.price * query.count;
                        } else {
                            _this.playerInfo(query.player).buyFailList.push(query);
                            _this.playerInfo(query.player).buyFailBackMoney += element.price * query.count;
                        }
                    }
                } else {
                    _this.playerInfo(query.player).buyFailList.push(query);
                    _this.playerInfo(query.player).buyFailBackMoney += element.price * query.count;
                }
            });
        })

        allVolume = 0;

        _this.SellList.forEach(element => {
            element.list.forEach(query=>{
                if (element.price < _this.currentPrice) {
                    _this.playerInfo(query.player).sellSuccessList.push(query);
                    _this.playerInfo(query.player).sellSuccessBackMoney += _this.currentPrice * query.count;
                    allVolume += query.count;
                }
                else if (element.price == _this.currentPrice) {
                    if (allVolume + query.count <= _this.currentVolume) {
                        _this.playerInfo(query.player).sellSuccessList.push(query);
                        _this.playerInfo(query.player).sellSuccessBackMoney += _this.currentPrice * query.count;
                        allVolume += query.count;
                    } else {
                        if (allVolume < _this.currentVolume) {
                            var newquery = {
                                price : query.price,
                                player : query.player,
                                count : _this.currentVolume - allVolume
                            };
                            _this.playerInfo(query.player).sellSuccessList.push(newquery);
                            _this.playerInfo(query.player).sellSuccessBackMoney += _this.currentPrice * newquery.count;
                            allVolume += newquery.count;
                            query.count -= newquery.count;
                            _this.playerInfo(query.player).sellFailList.push(query);
                        } else
                            _this.playerInfo(query.player).sellFailList.push(query);
                    }
                } else {
                    _this.playerInfo(query.player).sellFailList.push(query);
                }
            });
        })*/
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
                buySuccessList : [],
                buySuccessBackMoney : 0,
                buyFailList : [],
                buyFailBackMoney : 0,
                sellSuccessList : [],
                sellSuccessBackMoney : 0,
                sellFailList : []
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
            _this.onResult = new Phaser.Signal();
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