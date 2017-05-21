function convertExcelAlphabetToIndex(val) {
    var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', i, j, result = 0;

    for (i = 0, j = val.length - 1; i < val.length; i += 1, j -= 1) {
        result += Math.pow(base.length, j) * (base.indexOf(val[i]) + 1);
    }

    return result - 1;
}

function convertExcelAddressToXY(str) {
    var regexRes = str.match(/^([A-Z]+)([0-9]+)$/i);
    if (regexRes != null) {
        var alphabet = regexRes[1];
        var rowIndex = regexRes[2] - 1;
        return {
            col: convertExcelAlphabetToIndex(alphabet.toUpperCase()),
            row: rowIndex
        }
    }
    return null;
}

function getByAddressFromArray(arr, addressObj, rowOff, colOff) {
    if (rowOff == null) {
        rowOff = 0;
    }
    if (colOff == null) {
        colOff = 0;
    }
    return arr[addressObj["row"] + rowOff][addressObj["col"] + colOff];
}