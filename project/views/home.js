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
        var str = "" + elems[i].value;
        if(str.trim() == ""){
            toastr["error"]("Please enter all the fields");
            return;
        }
        payLoad.keys.push(elems[i].id);
        payLoad.vals.push(elems[i].value);
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