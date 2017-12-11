document.querySelector("#form").addEventListener("change", onFormChange);

function onFormChange() {
    document.querySelector("#javaScriptCode").innerText =
`<script src="https://rawgit.com/kyleshovbb/kyleshovbb.github.io/
master/_CDN/Calendar/create.js"></script>
<script>
(function () {
    let id = 'calendar' + Math.random();
    document.write('<div id="' + id + '"></div>');
    calendar({
        el: '#' + id,
        allowChangeMonth: ${allowChangeMonth.checked},
        addTasks: ${addTasks.checked},
        removeTasks: ${removeTasks.checked},
        showMonthAndYear: ${showMonthAndYear.checked},
        date: [${selectYear.value}, ${selectMonth.value}],
        tableClass: "${addClass.value || "calendarClass"}" 
    })
})();
</script>`
}