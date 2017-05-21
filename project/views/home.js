document.onreadystatechange = function () {
    if (document.readyState == "interactive") {

    } else if (document.readyState == "complete") {
        var todayDate = new Date();
        todayDate.setDate(todayDate.getDate() - 1);
        var dateElem = document.getElementById("time");
        if (dateElem) {
            dateElem.value = todayDate.getFullYear() + "-" + makeTwoDigits(todayDate.getMonth() + 1) + "-" + makeTwoDigits(todayDate.getDate());
            fillKeysFromServer(dateElem.value);
            $(dateElem).on("change paste keyup", function () {
                fillKeysFromServer($(this).val());
            });
        }
        //initHandsOnTable();
    }
};
function makeTwoDigits(x) {
    if (x < 10) {
        return "0" + x;
    }
    else {
        return x;
    }
}

function sendConstData() {
    var elems = document.getElementsByClassName("const-data-input");
    var payLoad = {keys: [], vals: []};
    var pendingFields = [];
    for (var i = 0; i < elems.length; i++) {
        var str = "" + elems[i].value;
        if (str.trim() == "") {
            pendingFields.push(elems[i].id);
            continue;
        }
        payLoad.keys.push(elems[i].id);
        payLoad.vals.push(elems[i].value);
    }
    if (pendingFields.length > 0) {
        toastr["error"]("Please enter " + pendingFields.join(", "));
    }
    $.ajax({
        url: "/api/const_data/create",
        type: 'POST',
        data: payLoad,
        success: function (result) {
            toastr["success"]("Data successfully saved!");
            console.log(result);
        },
        error: function (textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function fillFormField(id, val) {
    if (val != null && !isNaN(val)) {
        val = Math.round(val * 1000) / 1000;
    }
    var elem = document.getElementById(id);
    if (elem != null && elem.classList.contains("const-data-input")) {
        if (elem.tagName.toLowerCase() == 'input') {
            elem.value = val;
        } else {
            elem.innerHTML = "" + val;
        }

    }
}

function fillKeysFromServer(dateStr) {
    var elems = document.getElementsByClassName("const-data-input");
    var payLoad = {keys: [], dateStr: dateStr, toDateStr: ""};
    for (var i = 0; i < elems.length; i++) {
        if (elems[i].id != "time") {
            if (elems[i].tagName.toLowerCase() == 'input') {
                elems[i].value = "";
            } else {
                elems[i].innerHTML = "";
            }
            payLoad.keys.push(elems[i].id);
        }
    }
    $.ajax({
        url: "/api/const_data/getByKeys",
        type: 'GET',
        data: payLoad,
        success: function (result) {
            toastr["info"]("Data received from server");
            console.log(result);
            document.getElementById("headingDatePlaceHolder").innerHTML = dateStr;
            var dataArray = result.data;
            if (typeof dataArray != 'undefined' && dataArray != null && dataArray.constructor === Array) {
                for (var i = 0; i < dataArray.length; i++) {
                    fillFormField(dataArray[i]["key_string"], dataArray[i]["value_string"]);
                }
            }
        },
        error: function (textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function exportTableAsCsv() {
    var elem = document.getElementById("toExportTable");
    var data = [];
    for (var i = 0; i < elem.rows.length; i++) {
        var rowElem = elem.rows[i];
        var row = [];
        for (var k = 0; k < rowElem.cells.length; k++) {
            row.push(rowElem.cells[k].textContent.trim());
        }
        data.push(row);
    }
    var csvContent = "data:text/csv;charset=utf-8,";
    data.forEach(function (infoArray, index) {

        var dataString = infoArray.join(",");
        csvContent += index < data.length ? dataString + "\n" : dataString;
    });
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".
}

function printTable() {
    var divsToPrint = document.getElementsByClassName("printableElement");
    var newWin = window.open("");
    var htmlToPrint = '' +
        '<style type="text/css">' +
        'table {' +
        'border-collapse: collapse;' +
        '}' +
        'table th, table td {' +
        'border:1px solid #000;' +
        'padding:0.5em;' +
        '}' +
        'table td {' +
        'max-width:450px;' +
        '}' +
        '</style>';
    for (var i = 0; i < divsToPrint.length; i++) {
        htmlToPrint += divsToPrint[i].outerHTML;
    }
    newWin.document.write(htmlToPrint);
    newWin.print();
}

function initHandsOnTable() {
    var data = [
        ["", "Ford", "Volvo", "Toyota", "Honda"],
        ["2016", 10, 11, 12, 13],
        ["2017", 20, 11, 14, 13],
        ["2018", 30, 15, 12, 13]
    ];

    var container = document.getElementById('handsOnTableDiv');
    var hot = new Handsontable(container, {
        data: data,
        rowHeaders: true,
        colHeaders: true
    });
}