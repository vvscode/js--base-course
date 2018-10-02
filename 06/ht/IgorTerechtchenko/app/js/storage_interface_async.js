export default function StorageInterfaceAsync(bus) {
  this.storage = window.localStorage;
  this.historyLimit = 5;
  this.status = {
    historyEntryCounter: 0,
    favouritesEntryCounter: 0,
    minimalHistoryCounter: 0,
  }
  this.init();
}

StorageInterfaceAsync.prototype = {
  init: function() {
    if(this.storage.getItem('storageStatus')) {
      this.status = JSON.parse(this.storage.getItem('storageStatus'));
    } else {
      this.storage.setItem('storageStatus', JSON.stringify(this.status));
    }
  },
  addToHistory: function(value) {
    return new Promise((resolve) => {
      if(this.status.historyEntryCounter >= this.historyLimit) {
        this.storage.removeItem(this.status.minimalHistoryCounter + ':history');
        this.status.minimalHistoryCounter += 1;
      }
      this.storage.setItem(this.status.historyEntryCounter + ':history', 
                           JSON.stringify({'type': 'history', 
                                           'value': value, 
                                          }));
      this.status.historyEntryCounter += 1;
      this.storage.setItem('storageStatus', JSON.stringify(this.status));
    });
  },
  getHistory: function() {
    return this._getItemsByType('history');
  },
  addToFavourites: function(name, value) {
    return new Promise((resolve) => {
      this.storage.setItem(name + ':favourites', 
                           JSON.stringify({'type': 'favourites', 
                                           'name': name,
                                           'value': value,
                                          }));
    });
  },
  removeFromFavourites: function(entryID) {
    return new Promise((resolve) => {
      this.storage.removeItem(entryID);   
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
        value = JSON.parse(this.storage.getItem(key));
        if(value.type === typeName) {
          output.push(value);
        }
      }
      resolve(output);
    }));
  },
}
