exports.createArrayFromSingleElement = function (elem, nCount) {
    var resultArray = new Array(nCount);
    for (var i = 0; i < nCount; i++) {
        resultArray[i] = elem; //here we get [?,?,?,?,?,?,?,?]
    }
    return resultArray;
};

exports.convertNonArrayArgumentsToArrayArguments = function () {
    var argumentList = Array.from(arguments);
    if (!(argumentList[0].constructor === Array)) {
        var CAFSE = ArrayHelper.createArrayFromSingleElement;
        for (var i = 0; i < argumentList.length; i++) {
            argumentList[i] = CAFSE(argumentList[i], 1);
        }
    }
    return argumentList;
};