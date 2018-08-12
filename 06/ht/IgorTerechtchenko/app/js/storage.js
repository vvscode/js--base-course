export default function StorageInterfaceAsync(bus, options={local: true}) {
  this.options = options;
  this.entryCounter = 0;
  if(this.options.local === true) {
    this.storage = window.localStorage;
  } 
  if(this.storage.getItem('userID')) {
    this.userID = this.storage.getItem('userID');
  } else {
    this.userID = +(new Date());
    this.storage.setItem('userID', this.userID);
  };
}

StorageInterfaceAsync.prototype = {
  addToHistory: function(value) {
    return new Promise((resolve) => {
      this.storage.setItem(this.userID + ':' + this.entryCounter, 
                           JSON.stringify({'type':'history', 'value': value}))
      this.entryCounter += 1;
    });
  },
  getHistory: function() {
    return this._getItemsByType('history');
  },
  addToFavourites: function(value) {
    return new Promise((resolve) => {
      this.storage.setItem(this.userID + ':' + this.entryCounter, 
                           JSON.stringify({'type':'favourites', 'value': value, entryID: this.entryCounter}))
      this.entryCounter += 1;
    });
  },
  removeFromFavourites: function(entryID) {
    return new Promise((resolve) => {
      this.storage.removeItem(this.userID + ':' + entryID);   
    });
  },
  getFavourites: function() {
    return this._getItemsByType('favourites');
  },
  _getItemsByType: function(typeName) {
    return new Promise(((resolve, reject) => {
      var output = [];
      var key;
      var value;
      for(var i = 0; i < this.storage.length; i++) {
        key = this.storage.key(i);
        if(key !== 'userID') {
          value = JSON.parse(this.storage.getItem(key));
          if(value.type === typeName) {
            output.push(value);
          }
        }
      }
      resolve(output);
    }));
  },
}
