/**
 * Created by Nagasudhir on 8/26/2016.
 */
var dprReader = new DPRReader();
var consIDs = ["ChhattisgarhFileInput", "DDFileInput", "DNHFileInput", "ESILFileInput", "GoaFileInput", "GujaratFileInput", "MadhyaPradeshFileInput", "MaharashtraFileInput", "CPCCFileInput"];
dprReader.setConsIDs(consIDs);

var peakHrIndex = 18;

window.onload = function () {
    for (var i = 0; i < consIDs.length; i++) {
        var fileInput = document.getElementById(consIDs[i]);
        if (fileInput != null) {
            fileInput.addEventListener('change', function (e) {
                var fileInput = e.target;
                dprReader.resetAndCreateArrays(fileInput.getAttribute("id"));
                for (var b = 0; b < fileInput.files.length; b++) {
                    dprReader.pushFiles(fileInput.files[b], fileInput.getAttribute("id"));
                }
                dprReader.afterEachRead(fileInput.getAttribute("id"));
            });
        }
    }
};

function fetchFromArrays(ind) {
    if (ind == 0) {
        handleCSEB();
    } else if (ind == 6) {
        handleMP();
    } else if (ind == 3) {
        handleESIL();
    } else if (ind == 2) {
        handleDNH();
    } else if (ind == 1) {
        handleDD();
    } else if (ind == 4) {
        handleGoa();
    } else if (ind == 5) {
        handleGujarat();
    } else if (ind == 7) {
        handleMaharashtra();
    } else if (ind == 8) {
        handleIRE();
    }
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }
    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}

function findColumnIndexOfStr(row, tag, isCaseInsensitive) {
    var colNum = row.indexOf(tag);
    if (colNum != -1) {
        return colNum;
    } else if (typeof isCaseInsensitive != 'undefined' && isCaseInsensitive == true) {
        for (var i = 0; i < row.length; i++) {
            if (row[i].toLowerCase() == tag.toLowerCase()) {
                return i;
            }
        }
    }
    return -1;
}

function findRowIndexOfStrInCol(reportArray, colIndex, val, isNumber, startRowToSearch) {
    if (startRowToSearch == null || startRowToSearch < 0 || isNaN(startRowToSearch)) {
        startRowToSearch = 0;
    }
    if (colIndex == -1) {
        return -1;
    }
    for (var i = startRowToSearch; i < reportArray.length && i < startRowToSearch + 100; i++) {
        var cellVal = reportArray[i][colIndex];
        if (isNumber) {
            if (!isNaN(cellVal) && cellVal.trim() != "" && Number(val) == Number(cellVal)) {
                return i;
            }
        } else {
            if (val == cellVal) {
                return i;
            }
        }
    }
    return -1;
}
function findRowIndexOfNonEmptyInCol(reportArray, colIndex, startRowToSearch) {
    if (startRowToSearch == null || startRowToSearch < 0 || isNaN(startRowToSearch)) {
        startRowToSearch = 0;
    }
    if (colIndex == -1) {
        return -1;
    }
    for (var i = startRowToSearch; i < reportArray.length && i < startRowToSearch + 100; i++) {
        var cellVal = reportArray[i][colIndex];
        if (cellVal != null && cellVal.trim() != "") {
            return i;
        }
    }
    return -1;
}

function findNonNullValueByTag(row, tag) {
    var searchTagIndex = row.indexOf(tag);
    if (searchTagIndex > -1) {
        //found total tag value
        return findNonNullValueToRight(row, searchTagIndex);
    }
    return null;
}

function findNonNullValueToRight(row, searchTagIndex) {
    //proceed right and find value that is not null or "" or any spaces
    for (var i = 1; i < row.length - searchTagIndex; i++) {
        var val = row[searchTagIndex + i];
        if ((val != null) && (val.trim() != "")) {
            return val;
        }
    }
    return "Not Found...";
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}