export const Memory = (Memory) => class extends Memory {

    removeItemFromStorage(where,link) {
        return  Promise.resolve()
            .then(function() {
            var storageText =JSON.parse(localStorage.getItem(where));
            delete storageText[link];
            var arr = [],storageObj = {};
            for(var i in storageText) {
                arr.push(storageText[i]);
            }
            for(var i= 0;i<arr.length;i++) {
                storageObj[i] = arr[i];
            }
            var sObj = JSON.stringify(storageObj);
            localStorage.setItem(where,sObj);

        });
    } 

    save(where,text,size) {
        var sObj;
        var storageText =JSON.parse(localStorage.getItem(where));
        var saveObj = {};
        if(!storageText)
        {
            saveObj = text;
        }else {
            for(var key in storageText) {
                var num = parseInt(key)+1;
                saveObj[num] = storageText[key];
                if((size-1) === num) {
                    break;
                }
            }
            Object.assign(saveObj,text);
        }
        var sObj = JSON.stringify(saveObj);
        localStorage.setItem(where,sObj);
    }
};
