var rowSelect = document.getElementById("rowNumber");
    for (var i = 1; i <= 100; i++) {
        var rowOpt = document.createElement("option");
        rowOpt.text = i;
        rowOpt.value = i;
        rowSelect.add(rowOpt);
    }

var colSelect = document.getElementById("colNumber");
    for (var i = 1; i <= 20; i++) {
        var colOpt = document.createElement("option");
        colOpt.text = i;
        colOpt.value = i;
        colSelect.add(colOpt);
    }