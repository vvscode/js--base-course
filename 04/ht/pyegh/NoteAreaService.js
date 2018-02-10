function NoteAreaService(){

    this.addNote = function(target){
        // Get text from user
        var userNoteText = this.getUserNote();

        // Create html element for new user note
        var userNoteWrapper = this.constuctNoteArea(userNoteText);

        // Add new html element to DOM
        var td = target;
        var cellDiv = td.childNodes[0];
        cellDiv.appendChild(userNoteWrapper);
        var cellId = cellDiv.id;

        // Save note to storage
        var dao = new DAO(localStorage);
        var positionInListOfNotes = dao.saveNote(cellId, userNoteText)
        userNoteWrapper.setAttribute('positionInListOfNotes', positionInListOfNotes);
    }

    this.deleteNote = function(target){
        if(confirm("Do you want to delete note?")){
            var userNoteWrapper = target.parentNode;
            var positionInListOfNotes = userNoteWrapper.getAttribute('positionInListOfNotes');
            var cell = userNoteWrapper.parentNode;
            var cellId = cell.id;

            // deletion from DOM
            cell.removeChild(userNoteWrapper);

            // deletion from storage
            var dao = new DAO(localStorage);
            dao.deleteNote(cellId, positionInListOfNotes);
        }
    }

    /*
 * Creates area with note and close sigh
 */
    this.constuctNoteArea = function(userNoteText){
        var userNoteWrapper = document.createElement('div');
        var closeAreaDiv = this.constructCloseArea();
        var userNoteDiv = this.constuctNote(userNoteText);

        userNoteWrapper.className = 'userWrapper';
        userNoteWrapper.appendChild(userNoteDiv);
        userNoteWrapper.appendChild(closeAreaDiv);

        return userNoteWrapper;
    }


    this.constuctNote = function(userText){
        var userNoteDiv = document.createElement('div');
        userNoteDiv.textContent = userText;
        userNoteDiv.className = 'userNote';
        return userNoteDiv;
    }

    this.constructCloseArea = function(){
        var closeArea = document.createElement('div');
        closeArea.className = 'closeArea';
        return closeArea;
    }

    this.getUserNote = function() {
        return prompt('Please add note for this date', '');
    }
}