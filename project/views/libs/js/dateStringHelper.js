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
}