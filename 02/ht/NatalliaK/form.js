function getResult() {
	var form = document.forms[0];
	var yourName = form.elements[0].value;
	var yourSity = form.elements[1].value;
	var sex = getRadioValue();

	function getRadioValue(id) {
		if (document.getElementById('male').checked) {
			return document.getElementById('male').value;
		} else if (document.getElementById('female').checked) {
			return document.getElementById('female').value;
		}
		return null;
	}

	var comment = document.querySelector('textarea').value;

	var result = "Ваше имя: " + yourName + "<br>" + "Ваш родной город: " + yourSity + "<br>" + "Ваш пол: " + sex + "<br>" + "Ваше сообщение: " + comment;

	return result;
}

document.getElementById('returnValue').addEventListener("click", function() {
	var res = getResult();
	document.getElementById('info').innerHTML = res;
});