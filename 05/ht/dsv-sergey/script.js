function compileTemplate(tpl) {
    return function(el, data) {
        for (key in data) {
            var regexp = new RegExp("{{" + key + "}}",'g');

            tpl = tpl.replace(regexp, data[key]);
        }
        return (el.innerHTML = tpl);
    };
}

function EventBus() {
    this.listeners = {};
}

EventBus.prototype.on = function(event, hendler) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(hendler);
};
EventBus.prototype.off = function(event, hendler) {
    if (this.listeners[event].includes(hendler)) {
        var habArr = [];
        this.listeners[event].forEach(function(el, i, arr) {
            if (el != hendler) {
                habArr.push(el);
            }
        });
        this.listeners[event] = habArr;
    }
};
EventBus.prototype.trigger = function(event, data) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].forEach(function(hendler) {
        hendler(data);
    });
};
EventBus.prototype.once = function(event, hendler) {
    var wrapper = function(arg) {
        hendler(arg);
        this.off(event, wrapper);
    }.bind(this);
    this.on(event, wrapper);
};
/*----------------------------------------------*/
// var EventBusClass = {};
// EventBusClass = function() {
//     this.listeners = {};
// };
// EventBusClass.prototype = {
//     addEventListener: function(type, callback, scope) {
//         var args = [];
//         var numOfArgs = arguments.length;
//         for (var i = 0; i < numOfArgs; i++) {
//             args.push(arguments[i]);
//         }
//         args = args.length > 3 ? args.splice(3, args.length - 1) : [];
//         if (typeof this.listeners[type] != "undefined") {
//             this.listeners[type].push({
//                 scope: scope,
//                 callback: callback,
//                 args: args
//             });
//         } else {
//             this.listeners[type] = [
//                 { scope: scope, callback: callback, args: args }
//             ];
//         }
//     },
//     removeEventListener: function(type, callback, scope) {
//         if (typeof this.listeners[type] != "undefined") {
//             var numOfCallbacks = this.listeners[type].length;
//             var newArray = [];
//             for (var i = 0; i < numOfCallbacks; i++) {
//                 var listener = this.listeners[type][i];
//                 if (listener.scope == scope && listener.callback == callback) {
//                 } else {
//                     newArray.push(listener);
//                 }
//             }
//             this.listeners[type] = newArray;
//         }
//     },
//     hasEventListener: function(type, callback, scope) {
//         if (typeof this.listeners[type] != "undefined") {
//             var numOfCallbacks = this.listeners[type].length;
//             if (callback === undefined && scope === undefined) {
//                 return numOfCallbacks > 0;
//             }
//             for (var i = 0; i < numOfCallbacks; i++) {
//                 var listener = this.listeners[type][i];
//                 if (
//                     (scope ? listener.scope == scope : true) &&
//                     listener.callback == callback
//                 ) {
//                     return true;
//                 }
//             }
//         }
//         return false;
//     },
//     dispatch: function(type, target) {
//         var event = {
//             type: type,
//             target: target
//         };
//         var args = [];
//         var numOfArgs = arguments.length;
//         for (var i = 0; i < numOfArgs; i++) {
//             args.push(arguments[i]);
//         }
//         args = args.length > 2 ? args.splice(2, args.length - 1) : [];
//         args = [event].concat(args);

//         if (typeof this.listeners[type] != "undefined") {
//             var listeners = this.listeners[type].slice();
//             var numOfCallbacks = listeners.length;
//             for (var i = 0; i < numOfCallbacks; i++) {
//                 var listener = listeners[i];
//                 if (listener && listener.callback) {
//                     var concatArgs = args.concat(listener.args);
//                     listener.callback.apply(listener.scope, concatArgs);
//                 }
//             }
//         }
//     },
//     getEvents: function() {
//         var str = "";
//         for (var type in this.listeners) {
//             var numOfCallbacks = this.listeners[type].length;
//             for (var i = 0; i < numOfCallbacks; i++) {
//                 var listener = this.listeners[type][i];
//                 str +=
//                     listener.scope && listener.scope.className
//                         ? listener.scope.className
//                         : "anonymous";
//                 str += " listen for '" + type + "'\n";
//             }
//         }
//         return str;
//     }
// };
    
//     // Register the namespace
// var parseNamespace =
//     parseNamespace ||
//     function(root, ns) {
//         var nsParts = ns.split(".");

//         for (var i = 0; i < nsParts.length; i++) {
//             if (typeof root[nsParts[i]] == "undefined")
//                 root[nsParts[i]] = new Object();
//             root = root[nsParts[i]];
//         }
//     };
// parseNamespace(window, "JDM.EventBus");

// // Main namespace and class
// JDM.EventBus = {
//     // Listener object, contains actual listener references and methods for adding/removing listeners as well as binding the listeners to their appropriate
//     // triggers at run-time.
//     Listeners: {
//         // Instantiates the listener object - every event handler is registered and listed in this object.
//         List: {},

//         // Adds a function with an associated handler nickName and execution priority to the list of listeners.
//         Add: function(eventName, funcName, fn, priority) {
//             parseNamespace(
//                 this.List,
//                 eventName + "." + priority + "." + funcName
//             );
//             this.List[eventName][priority][funcName] = fn;
//         },

//         // Removes the function associated with a particular event listener nickName. The event listener will still be registered with the system,
//         // but the trigger function will be triggering a null function, so it won't do anything.
//         Remove: function(eventName, nickName) {
//             for (var priority in this.List[eventName]) {
//                 this.List[eventName][priority][id] = null;
//             }
//         }
//     },

//     // Checks for priority settings, if none given, add a listener to the list with a very low priority
//     Subscribe: function(eventName, functionName, fn, priority) {
//         if (!priority) priority = 10;
//         this.Listeners.Add(eventName, functionName, fn, priority);
//     },

//     // Trigger an event
//     Broadcast: function(eventName, args) {
//         if (!this.Listeners.List[eventName]) return;
//         for (var i = 0; i <= 10; i++) {
//             var funcHolder = this.Listeners.List[eventName][i];
//             if (funcHolder)
//                 for (var fn in funcHolder) {
//                     if (funcHolder[fn])
//                         if (args) {
//                             funcHolder[fn](args.eventArgs);
//                         } else {
//                             funcHolder[fn]();
//                         }
//                 }
//         }
//     },

//     // Remove an event listener
//     Unsubscribe: function(eventName, nn) {
//         this.Listeners.Remove(eventName, nn);
//     }
// };

