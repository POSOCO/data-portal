exports.getDateString = function (today) {
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    return today;
};

exports.getDateTimeString = function (today) {
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

exports.getNextDateString = function (today, nDays) {
    var tomorrow = new Date(today.getTime() + nDays * 86400000);
    var dd = tomorrow.getDate();
    var mm = tomorrow.getMonth() + 1; //January is 0!
    var yyyy = tomorrow.getFullYear();
    var hrs = tomorrow.getHours();
    var mins = tomorrow.getMinutes();
    var secs = tomorrow.getSeconds();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (hrs < 10) {
        dd = '0' + dd;
    }
    if (mins < 10) {
        mm = '0' + mm;
    }
    if (secs < 10) {
        dd = '0' + dd;
    }
    tomorrow = yyyy + '-' + mm + '-' + dd + " " + hrs + ":" + mins + ":" + secs;
    return tomorrow;
};


exports.isDateObjectValid = function (dateObj) {
    if (Object.prototype.toString.call(dateObj) === "[object Date]") {
        // it is a date
        if (isNaN(dateObj.getTime())) {  // d.valueOf() could also work
            // date is not valid
            return false;
        }
        else {
            // date is valid
            return true;
        }
    }
    else {
        // not a date
        return false;
    }
};