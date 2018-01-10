// share one game state
var flowControl = undefined;

module.exports = function (game) {
    if (!game || !Phaser)
        return;

    if (flowControl && game.plugins.plugins.indexOf(flowControl) != -1) {
        flowControl.active = true;
        return flowControl;
    }

    // create a plugin
    var _flowControl = new Phaser.Plugin(game,game.Plugin)
        
    // create a timer
    //flowControl.timer = game.time.create(false);

    // create a finish current flow flag
    _flowControl.isFinish = true;

    // create a flow list
    _flowControl.flows = [];
    _flowControl.currentFlow = undefined;

    // add a flow (like phaser.timer.add)
    _flowControl.add = function(callback, callbackContext, arguments) {
        var flow = {
            callback : callback,
            callbackContext : callbackContext,
            arguments : arguments
        }
        // push flow in list
        this.flows.push(flow)
        return flow;
    }

    // current flow finish
    _flowControl.finish = function() {
        this.isFinish = true;
    }

    // set every update
    _flowControl.update = function() {
        // go to next flow
        if (this.isFinish && this.flows.length!=0) {
            this.isFinish = false;
            this.currentFlow = this.flows.shift();
            // run flow
            game.time.events.add(10, this.currentFlow.callback, this.currentFlow.callbackContext, this.currentFlow.arguments);
        }
        if (!this.isFinish && this.currentFlow && this.currentFlow.update) {
            // check update is function
            if (typeof this.currentFlow.update === "function")
                this.currentFlow.update();
        }
    }
    
    // add gmae to active life cycle
    game.plugins.add(_flowControl);
    _flowControl.active = true;
    _flowControl.visible = false;

    game.state.onStateChange.add(()=>{
        // reset flow
        _flowControl.active = false;
        _flowControl.currentFlow = undefined;
        _flowControl.flows.length = 0;
        _flowControl.finish();
    })
    
    if (game.plugins.plugins.indexOf(flowControl) == -1) {
        flowControl = _flowControl;
    }
    
    return _flowControl;
}