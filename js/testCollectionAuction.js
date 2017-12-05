const CollectionAuction = require('./CollectionAuction.js');


var black = CollectionAuction();
var white = CollectionAuction();

black.debug = true;

black.addBuy('tony3', 15, 10);
//black.addBuy('tony3', '106', 23);
//black.addBuy('tony3', '105.5', 10);
//black.addBuy('tony3', '104.5', 57);
//black.addBuy('tony3', '103.5', 30);
//black.addBuy('tony3', '102.5', 99);
//black.addBuy('tony3', '101.5', 22);
//black.addBuy('tony3', '101', 5);
//black.addBuy('tony3', '93.0', 33);
//black.addBuy('tony3', '102.5', 10);

black.addSell('tony3', 10.0, 10);
//black.addSell('tony3', '106.5', 25);
//black.addSell('tony3', '106.00', 20);
//black.addSell('tony3', '105.5', 15);
//black.addSell('tony3', '105.00', 46);
//black.addSell('tony3', '104.5', 55);
//black.addSell('tony3', '104.00', 20);
//black.addSell('tony3', '103.5', 13);
//black.addSell('tony3', '103.0', 3);
//black.addSell('tony3', '93.0', 20);
//black.addSell('tony3', '103.0', 10);

black.Auction();
//console.log(black.BuyList);
//console.log(black.SellList);
console.log(black.currentPrice);
console.log(black.currentVolume);
/*console.log(black.playerInfo('tony3').buySuccessList);
console.log(black.playerInfo('tony3').buyFailList);
console.log(black.playerInfo('tony3').sellSuccessList);
console.log(black.playerInfo('tony3').sellFailList);*/
//console.log(black.PlayerList);