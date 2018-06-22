/**
 * @function
 */
(function createSetting() {
    var monthList = [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
        ],
        periodYear = [1900, 2150],
        step = 1,
        setMonth = "monthSel",
        setYear = "yearSel";
    addSelectedElement(monthList, null, null, setMonth);
    addSelectedElement(null, periodYear, step, setYear);
})();
/**
 * @function
 * add elements in select teg
 * @param {Array} arrayOptions 
 * @param {Array} setRange 
 * @param {number} step 
 * @param {string} idEl 
 */
function addSelectedElement(arrayOptions, setRange, step, idEl) {
    var selectedElement = document.getElementById(idEl);
    var content = "";
    if (
        arrayOptions != undefined &&
        arrayOptions != null &&
        arrayOptions != NaN
    ) {
        for (var i = 0; i < arrayOptions.length; i++) {
            if (i != new Date().getMonth()) {
                content +=
                    "<option val=" + i + ">" + arrayOptions[i] + "</option>";
            } else {
                content +=
                    "<option val=" +
                    i +
                    " selected>" +
                    arrayOptions[i] +
                    "</option>";
            }
        }
    }
    if (setRange != undefined && setRange != null && setRange != NaN) {
        for (var i = setRange[0]; i <= setRange[1]; i = i + step) {
            if (i != new Date().getFullYear()) {
                content += "<option val=" + i + ">" + i + "</option>";
            } else {
                content += "<option val=" + i + " selected>" + i + "</option>";
            }
        }
    }
    selectedElement.innerHTML = content;
}
