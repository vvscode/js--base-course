export default function StorageInterfaceAsync(bus, options={local: true}) {
  this.options = options;
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
    if(this.options.local === true) {
      this.storage = window.localStorage;
    } 
    if(this.storage.getItem('userID')) {
      this.userID = this.storage.getItem('userID');
    } else {
      this.userID = +(new Date());
      this.storage.setItem('userID', this.userID);
    }
    if(this.storage.getItem('storageStatus')) {
      this.status = JSON.parse(this.storage.getItem('storageStatus'));
      //this.status.historyEntryCounter = status.historyEntry;
      //this.status.favouritesEntryCounter = status.favouritesEntry;
      //this.status.minimalHistoryCounter = status.minimalHistory;
    } else {
      this.storage.setItem('storageStatus', JSON.stringify(this.status));
    }
  },
  addToHistory: function(value) {
    return new Promise((resolve) => {
      if(this.status.historyEntryCounter >= this.historyLimit) {
        this.storage.removeItem(this.userID + ':' + this.status.minimalHistoryCounter + ':history');
        this.status.minimalHistoryCounter += 1;
      }
      this.storage.setItem(this.userID + ':' + this.status.historyEntryCounter + ':history', 
                           JSON.stringify({'type':'history', 
                                           'value': value, 
                                           'entry': this.status.historyEntryCounter}));
      this.status.historyEntryCounter += 1;
      this.storage.setItem('storageStatus', JSON.stringify(this.status));
    });
  },
  getHistory: function() {
    return this._getItemsByType('history');
  },
  addToFavourites: function(value) {
    return new Promise((resolve) => {
      this.storage.setItem(this.userID + ':' + this.status.favouritesEntryCounter + ':favourites', 
                           JSON.stringify({'type':'favourites', 
                                           'value': value, 
                                           'entry': this.status.favouritesEntryCounter}));
      this.status.favouritesEntryCounter += 1;
      this.storage.setItem('storageStatus', JSON.stringify(this.status));
    });
  },
  removeFromFavourites: function(entryID) {
    return new Promise((resolve) => {
      this.storage.removeItem(this.userID + ':' + entryID);   
      this.status.favouritesEntryCounter -= 1;
      this.storage.setItem('storageStatus', JSON.stringify(this.status));
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
