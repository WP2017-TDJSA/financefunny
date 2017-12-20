module.exports = function(game) {
    return {
        preload : function() {
            console.log('[state] auction')
        },
        create : function() {
            
            game.add.sprite(0,0,'b');
        }
    };
}