function EventBus() {
    this.event = {};    
}
EventBus.prototype.on = function(str, cb) {
    if(str in this.event) {
        this.event[str].push(cb);
    }  else {
        this.event[str] = [cb];
    }
}
EventBus.prototype.trigger = function(str) {
    if(this.event[str]) {
        var arg = arguments;
        arg.slice = [].slice;
        arg = arg.slice(1);
        this.event[str].forEach(function(cb){
            cb.apply(this,arg);
        }); 
    }
}
EventBus.prototype.off = function(str, cb) {
    if(this.event[str]) {
        if(cb) {
            var num = [];
            this.event[str].forEach(function(cbFunc,i) {
                if(cbFunc === cb) {
                    num.push(i);
                } 
            });
            for(var i = 0;i<num.length;i++) {
                this.event[str].splice(num[i],1); 
            }    
            return;
        }
        delete this.event[str];  
    }
}
EventBus.prototype.once = function(str, cb) {
    var self = this;
    function tmp() {
        cb.apply(self,arguments);
        self.off(str,tmp);
    }
    this.on(str,tmp);
} 
export var eb = new EventBus();
