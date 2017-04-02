function getValObjFromDom(idArray) {
    var valObj = {};
    for (var i = 0; i < idArray.length; i++) {
        valObj[idArray[i]] = document.getElementById(idArray[i]).value;
    }
    return valObj;
}
