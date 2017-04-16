/*
 Find the headers NAME, IMPMW, EXPMW, IMPMU, EXPMU

 Find the input tags with 'const-data-input' class and get the id attribute of that tags

 If keys end with _IMPMW, _EXPMW, _IMPMU, _EXPMU, then find the corresponding values
 from the excel by intercept look up of the csv array and populate the input tag

 */

var namecol_CPCCV = -1;
var namerow_CPCCV = -1;
var impMWcol_CPCCV = -1;
var impMWrow_CPCCV = -1;
var expMWcol_CPCCV = -1;
var expMWrow_CPCCV = -1;
var impMUcol_CPCCV = -1;
var impMUrow_CPCCV = -1;
var expMUcol_CPCCV = -1;
var expMUrow_CPCCV = -1;

function handleIRE() {
    var ireDataArray = dprReader.filesAfterReadArrays[consIDs[8]][0];
    // Find headers columns and rows
    for (var i = 0; i < ireDataArray.length; i++) {
        var row = ireDataArray[i];
        var val = findColumnIndexOfStr(row, "NAME");
        if (!(isNaN(val)) && val >= 0) {
            namecol_CPCCV = val;
            namerow_CPCCV = i;
        }
        val = findColumnIndexOfStr(row, "IMPMW");
        if (!(isNaN(val)) && val >= 0) {
            impMWcol_CPCCV = val;
            impMWrow_CPCCV = i;
        }
        val = findColumnIndexOfStr(row, "EXPMW");
        if (!(isNaN(val)) && val >= 0) {
            expMWcol_CPCCV = val;
            expMWrow_CPCCV = i;
        }
        val = findColumnIndexOfStr(row, "IMPMU");
        if (!(isNaN(val)) && val >= 0) {
            impMUcol_CPCCV = val;
            impMUrow_CPCCV = i;
        }
        val = findColumnIndexOfStr(row, "EXPMU");
        if (!(isNaN(val)) && val >= 0) {
            expMUcol_CPCCV = val;
            expMUrow_CPCCV = i;
        }
    }

    // Find all the input Tags with class 'const-data-input'
    var inpTags = document.getElementsByClassName('const-data-input');
    for (var i = 0; i < inpTags.length; i++) {
        var elem = inpTags[i];
        var key = elem.id;
        var lineRow;
        var lineStr;
        var suffix;
        var colVar;
        if (endsWith(key, "_IMPMW")) {
            suffix = "_IMPMW";
            colVar = impMWcol_CPCCV;
        } else if (endsWith(key, "_EXPMW")) {
            suffix = "_EXPMW";
            colVar = expMWcol_CPCCV;
        } else if (endsWith(key, "_IMPMU")) {
            suffix = "_IMPMU";
            colVar = impMUcol_CPCCV;
        } else if (endsWith(key, "_EXPMU")) {
            suffix = "_EXPMU";
            colVar = expMUcol_CPCCV;
        }
        if(suffix == null){
            continue;
        }
        lineStr = key.slice(0, key.length - suffix.length);
        lineRow = findRowIndexOfStrInCol(ireDataArray, namecol_CPCCV, lineStr, false, namerow_CPCCV);
        if (lineRow && colVar != -1) {
            elem.value = ireDataArray[lineRow][colVar];
        }
    }
}