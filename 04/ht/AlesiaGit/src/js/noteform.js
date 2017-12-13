class noteForm {
	constructor() {
		this.noteForm = document.createElement("DIV");
		this.noteForm.className = "note-form";
		this.noteForm.innerHTML =
			'<textarea rows="6" id="note-form-text" class="note-form__input-field" type="text" autofocus></textarea>\
		<div class="note-form__buttons-wrapper">\
			<a id="note-form-submit" class="note-form__btn note-form__btn-save">Save</a>\
			<a id="note-form-cancel" class="note-form__btn note-form__btn-cancel">Cancel</a>\
		</div>';
		document.getElementById("root").appendChild(this.noteForm);

		this.focusOnForm();
	}

	focusOnForm() {
		document.getElementById("note-form-text").focus();
	}
}
