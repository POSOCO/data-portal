document.onreadystatechange = function () {
    if (document.readyState == "interactive") {

    } else if (document.readyState == "complete") {
        var todayDate = new Date();
        todayDate.setDate(todayDate.getDate() - 1);
        var dateElem = document.getElementById("time");
        if (dateElem) {
            dateElem.value = todayDate.getFullYear() + "-" + makeTwoDigits(todayDate.getMonth() + 1) + "-" + makeTwoDigits(todayDate.getDate());
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
    for (var i = 0; i < elems.length; i++) {
        payLoad.keys.push(elems[i].id);
        payLoad.vals.push(elems[i].value);
    }
    $.ajax({
        url: "/api/const_data/create",
        type: 'POST',
        data: payLoad,
        success: function (result) {
            console.log(result);
        }
    });
}