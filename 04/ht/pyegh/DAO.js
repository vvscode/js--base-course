function DAO(storage){

    this.storage = storage;

    this.getCellNotes = function(cellId){
        return JSON.parse(this.storage.getItem(cellId))
    }

    this.saveNote = function(cellId, userNoteText){

        // get cell note list
        var cellNotesList = this.getCellNotes(cellId);

        // initialize if necessary
        if(cellNotesList === null) {
            cellNotesList = [];
        }

        // add new note
        var newIndex = cellNotesList.length;
        cellNotesList[newIndex] = userNoteText;

        // save updated list and return note index at list
        this.storage.setItem(cellId, JSON.stringify(cellNotesList));
        return newIndex
    }

    this.deleteNote = function(cellId, positionInList) {

        var cellNotesList = this.getCellNotes(cellId);
        cellNotesList.splice(+positionInList, +positionInList + 1);
        this.storage.setItem(cellId, JSON.stringify(cellNotesList));

    }
}