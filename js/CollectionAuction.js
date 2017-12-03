/* */

CollectionAuction = ((initPrice=0) => {
    var _noVolume = 0;
    var _this = {}
    _this.BuyList = [];
    _this.SellList = [];
    _this.PlayerList = {};
    _this.currentPrice = initPrice;
    _this.currentVolume = 0;
    _this.newAuction = () => {
        _this.BuyList.length = 0;
        _this.SellList.length = 0;
        _this.PlayerList = {};
    }
    _this.addtoList = (list, player, price, count) => {
        if (!isNaN(price))
            price = parseFloat(price);
        else 
            throw new Error('price is not float');
        if (!isNaN(count))
            count = parseInt(count);
        else 
            throw new Error('count is not int');

        var hasNew = true;
        list.forEach(element => {
            if (element.price == price) {
                element.list.push({
                    player : player,
                    count : count
                });
                element.total += count;
                hasNew = false;
            }
        });
        if (hasNew) {
            list.push({
                price : price,
                list : [
                    {price : price,player : player, count : count}
                ],
                total : count
            })
        }
    }

    _this.addBuy = (player, price, count) => {
        _this.addtoList(_this.BuyList,player,price,count);
    }

    _this.addSell = (player, price, count) => {
        _this.addtoList(_this.SellList,player,price,count);
    }

    _this.sortList = (list) => {
        list.sort((a,b)=>{
            return a.price - b.price;
        });
    }

    _this.AuctionPrice = () => {
        _this.sortList(_this.SellList);
        _this.sortList(_this.BuyList);
        _this.BuyList.reverse();

        if (_this.SellList.length == 0 || _this.BuyList.length == 0)
            return 0;

        //檢查是否有交集
        if (_this.BuyList[0].price < _this.SellList[0].price) {
            return 0;
        }
        var MaxPrice = _this.BuyList[0].price;
        var MinPrice = _this.SellList[0].price;
        var PriceList = [];
        var OKPrice = [],MaxVolume = 1;

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
            console.log('price : '+element + ', volume : '+currentVolume);
            if (currentVolume > MaxVolume) {
                OKPrice = [element];
                MaxVolume = currentVolume;
            }
            else if (currentVolume == MaxVolume) {
                OKPrice.push(element);
            }
        })

        console.log('okprice : '+OKPrice);

        if (OKPrice.length = 1) {
            _this.currentVolume = MaxVolume;
            _this.currentPrice = OKPrice[0];
            return OKPrice[0];
        }
        else {
            var choosePrice = OKPrice[0];
            var distance = Math.abs(choosePrice - _this.currentPrice);
            
            OKPrice.forEach(element=>{
                var a = Math.abs(element - _this.currentPrice);
                if (a < distance) {
                    choosePrice = element;
                    distance = a;
                }
            })
            _this.currentVolume = MaxVolume;
            _this.currentPrice = choosePrice;
            return choosePrice;
        }
    }

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
        console.log({
            buyMust : buyMustVolume,
            buy : buyVolume,
            sellMust : sellMustVolume,
            sell : sellVolume
        });

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
    }

    _this.Auction = () => {
        _this.AuctionPrice();

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
        })
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

    return _this;
});

/*
var black = CollectionAuction();
var white = CollectionAuction();

black.addBuy('tony3', '107.00', 162);
black.addBuy('tony3', '106', 23);
black.addBuy('tony3', '105.5', 10);
black.addBuy('tony3', '104.5', 57);
black.addBuy('tony3', '103.5', 30);
black.addBuy('tony3', '102.5', 99);
black.addBuy('tony3', '101.5', 22);
black.addBuy('tony3', '101', 5);
black.addBuy('tony3', '93.0', 33);
//black.addBuy('tony3', '102.5', 10);

black.addSell('tony3', '107.00', 94);
black.addSell('tony3', '106.5', 25);
black.addSell('tony3', '106.00', 20);
black.addSell('tony3', '105.5', 15);
black.addSell('tony3', '105.00', 46);
black.addSell('tony3', '104.5', 55);
black.addSell('tony3', '104.00', 20);
black.addSell('tony3', '103.5', 13);
black.addSell('tony3', '103.0', 3);
black.addSell('tony3', '93.0', 20);
//black.addSell('tony3', '103.0', 10);

black.Auction();
//console.log(black.BuyList);
//console.log(black.SellList);
console.log(black.currentPrice);
console.log(black.currentVolume);
console.log(black.playerInfo('tony3').buySuccessList);
console.log(black.playerInfo('tony3').buyFailList);
console.log(black.playerInfo('tony3').sellSuccessList);
console.log(black.playerInfo('tony3').sellFailList);
//console.log(black.PlayerList);*/