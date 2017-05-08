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
        elem.value = val;
    }
}

function fillKeysFromServer(dateStr) {
    var elems = document.getElementsByClassName("const-data-input");
    var payLoad = {keys: [], dateStr: dateStr, toDateStr: ""};
    for (var i = 0; i < elems.length; i++) {
        if (elems[i].id != "time") {
            elems[i].value = "";
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