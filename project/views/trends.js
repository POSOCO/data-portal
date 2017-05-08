document.onreadystatechange = function () {
    if (document.readyState == "interactive") {

    } else if (document.readyState == "complete") {
        initializePlotDiv();
        var todayDate = new Date();
        var prevDate = new Date();
        prevDate.setDate(prevDate.getDate() - 30);
        var startDateElem = document.getElementById("startTimeInput");
        if (startDateElem) {
            startDateElem.value = prevDate.getFullYear() + "-" + makeTwoDigits(prevDate.getMonth() + 1) + "-" + makeTwoDigits(prevDate.getDate());
        }
        var endDateElem = document.getElementById("endTimeInput");
        if (endDateElem) {
            endDateElem.value = todayDate.getFullYear() + "-" + makeTwoDigits(todayDate.getMonth() + 1) + "-" + makeTwoDigits(todayDate.getDate());
        }
        if (startDateElem && endDateElem) {
            fetchKeyDateRangeValuesFromServer();
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

function initializePlotDiv() {
    var plotDiv = document.getElementById('plotArea');
    var blockLabels = Array.apply(null, {length: 96}).map(Function.call, function (k) {
        return k + 1
    });
    var blockValues = Array.apply(null, {length: 96}).map(Function.call, function (k) {
        return Math.random() * 100;
    });
    var trace1 = {
        x: [],
        y: [],
        name: 'Value Trend'
    };
    var plotData = [trace1];
    var layoutOpt = {
        title: "Value Trend",
        margin: {l: 50, pad: 4, t: 50}
    };
    Plotly.newPlot(plotDiv, plotData, layoutOpt);
}

function fetchKeyDateRangeValuesFromServer() {
    var keySelectElem = document.getElementById("plotKeysInput");
    var keyStr = keySelectElem.options[keySelectElem.selectedIndex].value;
    var startDateStr = document.getElementById("startTimeInput").value;
    var toDateStr = document.getElementById("endTimeInput").value;
    var payLoad = {
        keys: [keyStr],
        dateStr: startDateStr,
        toDateStr: toDateStr
    };
    var keyStrTimes = [];
    var keyStrVals = [];

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
                    if (dataArray[i]["key_string"] == keyStr) {
                        keyStrTimes.push(getDateTimeString(dataArray[i]["time"]));
                        keyStrVals.push(dataArray[i]["value_string"]);
                    }
                }
                var plotDiv = document.getElementById('plotArea');
                plotDiv.layout.title = keyStr + " Trend For " + startDateStr + " to " + toDateStr;
                document.title = keyStr + " Trend";
                plotDiv.data[0].x = keyStrTimes;
                plotDiv.data[0].y = keyStrVals;
                Plotly.redraw(plotDiv);

            }
        },
        error: function (textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function getDateTimeString(today) {
    today = new Date(today);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var hrs = today.getHours();
    var mins = today.getMinutes();
    var secs = today.getSeconds();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (hrs < 10) {
        hrs = '0' + hrs;
    }
    if (mins < 10) {
        mins = '0' + mins;
    }
    if (secs < 10) {
        secs = '0' + secs;
    }
    today = yyyy + '-' + mm + '-' + dd + " " + hrs + ":" + mins + ":" + secs;
    return today;
};