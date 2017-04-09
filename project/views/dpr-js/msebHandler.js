//Maharashtra global data
var hydroGen_MSEB = "NA";
var solarGen_MSEB = "NA";
var windGen_MSEB = "NA";
var drawal_MSEB = "NA";
var availability_MSEB = "NA";
var shortFallMUs_MSEB = "NA";
var timeBlkCol_MSEB = -1;
var firstBlkRow_MSEB = -1;
var demandCol_MSEB = -1;
var loadSheddingCol_MSEB = -1;
var dem24Hrs_MSEB = [];
var loadShedding24hrs_MSEB = [];
var frequencies_MSEB = [];
var maxDemTime_MSEB = 25;
var maxDem_MSEB = -1;
var dem3hrs_MSEB = -1;
var dem19hrs_MSEB = -1;
var dem20hrs_MSEB = -1;


function handleMaharashtra() {
    hydroGen_MSEB = "NA";
    solarGen_MSEB = "NA";
    windGen_MSEB = "NA";
    drawal_MSEB = "NA";
    availability_MSEB = "NA";
    dem24Hrs_MSEB = [];
    loadShedding24hrs_MSEB = [];
    frequencies_MSEB = [];
    maxDemTime_MSEB = 25;
    maxDem_MSEB = -1;
    dem3hrs_MSEB = -1;
    dem19hrs_MSEB = -1;
    dem20hrs_MSEB = -1;
    for (var k = 0; k < 2; k++) {
        timeBlkCol_MSEB = -1;
        firstBlkRow_MSEB = -1;
        demandCol_MSEB = -1;
        loadSheddingCol_MSEB = -1;
        var hydroCol_MSEB = -1;
        var windCol_MSEB = -1;
        var solarCol_MSEB = -1;
        var drawalCol_MSEB = -1;
        var availabilityCol_MSEB = -1;
        var freqCol_MSEB = -1;
        var msebDataArray = dprReader.filesAfterReadArrays[consIDs[7]][k];
        for (var i = 0; i < msebDataArray.length; i++) {
            var row = msebDataArray[i];
            var val = findColumnIndexOfStr(row, "HYDRO_D");
            if (!(isNaN(val)) && val >= 0) {
                hydroCol_MSEB = val;
                var hydroRow_MSEB = i;
            }
            val = findColumnIndexOfStr(row, "WIND_D");
            if (!(isNaN(val)) && val >= 0) {
                windCol_MSEB = val;
                var windRow_MSEB = i;
            }
            val = findColumnIndexOfStr(row, "SOLAR_D");
            if (!(isNaN(val)) && val >= 0) {
                solarCol_MSEB = val;
                var solarRow_MSEB = i;
            }
            val = findColumnIndexOfStr(row, "TOTALCS_D");
            if (!(isNaN(val)) && val >= 0) {
                drawalCol_MSEB = val;
                var drawalRow_MSEB = i;
            }
            val = findColumnIndexOfStr(row, "STATE_EC_D");
            if (!(isNaN(val)) && val >= 0) {
                availabilityCol_MSEB = val;
                var availabilityRow_MSEB = i;
            }
            val = findColumnIndexOfStr(row, "TIME_SRNO");
            if (!(isNaN(val)) && val >= 0) {
                timeBlkCol_MSEB = val;
                var timeBlkRow_MSEB = i;
            }
            val = findColumnIndexOfStr(row, "LOAD_SHEDDING");
            if (!(isNaN(val)) && val >= 0) {
                loadSheddingCol_MSEB = val;
                var loadSheddingRow_MSEB = i;
            }
            val = findColumnIndexOfStr(row, "STATE_DEMAND");
            if (!(isNaN(val)) && val >= 0) {
                demandCol_MSEB = val;
                var demandRow_MSEB = i;
            }
            val = findColumnIndexOfStr(row, "FREQ");
            if (!(isNaN(val)) && val >= 0) {
                freqCol_MSEB = val;
                var freqRow_MSEB = i;
            }
        }
        //find the 1stTimeBlk row
        if (timeBlkCol_MSEB != -1) {
            firstBlkRow_MSEB = findRowIndexOfStrInCol(msebDataArray, timeBlkCol_MSEB, 1, true);
        }
        //find the demand and load shedding columns
        if (firstBlkRow_MSEB != -1) {
            for (var hr = 1; hr <= 24; hr++) {
                dem24Hrs_MSEB[hr - 1] = msebDataArray[firstBlkRow_MSEB + hr - 1][demandCol_MSEB];
            }
            for (var hr = 1; hr <= 24; hr++) {
                loadShedding24hrs_MSEB[hr - 1] = Number(msebDataArray[firstBlkRow_MSEB + hr - 1][loadSheddingCol_MSEB]);
            }
            for (var hr = 1; hr <= 24; hr++) {
                frequencies_MSEB[hr - 1] = Number(msebDataArray[firstBlkRow_MSEB + hr - 1][freqCol_MSEB]);
            }
        }
        // find the hydro generation
        //find the 1stNonEmpty row
        if (hydroCol_MSEB != -1) {
            var hydroValRow_MSEB = findRowIndexOfNonEmptyInCol(msebDataArray, hydroCol_MSEB, hydroRow_MSEB + 1);
            if (hydroValRow_MSEB != -1) {
                hydroGen_MSEB = msebDataArray[hydroValRow_MSEB][hydroCol_MSEB];
            }
        }
        // find the wind generation
        //find the 1stNonEmpty row
        if (windCol_MSEB != -1) {
            var windValRow_MSEB = findRowIndexOfNonEmptyInCol(msebDataArray, windCol_MSEB, windRow_MSEB + 1);
            if (windValRow_MSEB != -1) {
                windGen_MSEB = msebDataArray[windValRow_MSEB][windCol_MSEB];
            }
        }
        // find the solar generation
        //find the 1stNonEmpty row
        if (solarCol_MSEB != -1) {
            var solarValRow_MSEB = findRowIndexOfNonEmptyInCol(msebDataArray, solarCol_MSEB, solarRow_MSEB + 1);
            if (solarValRow_MSEB != -1) {
                solarGen_MSEB = msebDataArray[solarValRow_MSEB][solarCol_MSEB];
            }
        }
        // find the drawal_MSEB mus
        //find the 1stNonEmpty row
        if (drawalCol_MSEB != -1) {
            var drawalValRow_MSEB = findRowIndexOfNonEmptyInCol(msebDataArray, drawalCol_MSEB, drawalRow_MSEB + 1);
            if (drawalValRow_MSEB != -1) {
                drawal_MSEB = msebDataArray[drawalValRow_MSEB][drawalCol_MSEB];
            }
        }
        // find the requiremnt mus
        //find the 1stNonEmpty row\
        if (availabilityCol_MSEB != -1) {
            var availabilityValRow_MSEB = findRowIndexOfNonEmptyInCol(msebDataArray, availabilityCol_MSEB, availabilityRow_MSEB + 1);
            if (availabilityValRow_MSEB != -1) {
                availability_MSEB = msebDataArray[availabilityValRow_MSEB][availabilityCol_MSEB];
            }
        }
    }
    maxDemTime_MSEB = indexOfMax(dem24Hrs_MSEB) + 1;
    maxDem_MSEB = dem24Hrs_MSEB[maxDemTime_MSEB - 1];
    dem3hrs_MSEB = dem24Hrs_MSEB[2];
    dem19hrs_MSEB = dem24Hrs_MSEB[18];
    dem20hrs_MSEB = dem24Hrs_MSEB[19];
    shortFallMUs_MSEB = loadShedding24hrs_MSEB.reduce(function (pv, cv) {
            return pv + cv;
        }, 0) / 1000;
    WriteLineConsole("*********** Maharashtra DATA ***********");
    WriteLineConsole(dem19hrs_MSEB);
    WriteLineConsole(dem19hrs_MSEB - loadShedding24hrs_MSEB[peakHrIndex]);
    WriteLineConsole(loadShedding24hrs_MSEB[peakHrIndex]);
    WriteLineConsole("");
    WriteLineConsole(drawal_MSEB);
    WriteLineConsole("");
    WriteLineConsole(availability_MSEB);
    WriteLineConsole(shortFallMUs_MSEB);
    WriteLineConsole(solarGen_MSEB);
    WriteLineConsole(hydroGen_MSEB);
    WriteLineConsole(windGen_MSEB);
    WriteLineConsole(maxDem_MSEB - loadShedding24hrs_MSEB[maxDemTime_MSEB]);
    WriteLineConsole(loadShedding24hrs_MSEB[maxDemTime_MSEB - 1]);
    WriteLineConsole(maxDemTime_MSEB);
    WriteLineConsole(dem3hrs_MSEB - loadShedding24hrs_MSEB[2]);
    WriteLineConsole(loadShedding24hrs_MSEB[2]);
    WriteLineConsole("*********** Maharashtra DATA ***********");
    WriteLineConsole("Maharashtra Hydro generation is " + hydroGen_MSEB);
    WriteLineConsole("Maharashtra Solar Generation is " + solarGen_MSEB);
    WriteLineConsole("Maharashtra Wind Generation is " + windGen_MSEB);
    WriteLineConsole("Maharashtra drawal is " + drawal_MSEB);
    WriteLineConsole("Maharashtra availability is " + availability_MSEB);
    WriteLineConsole("Maharashtra maxDemand is " + maxDem_MSEB);
    WriteLineConsole("Maharashtra maxDemand is at " + maxDemTime_MSEB + " hrs");
    WriteLineConsole("Maharashtra 3HrsDemand is " + dem3hrs_MSEB);
    WriteLineConsole("Maharashtra 19HrsDemand is " + dem19hrs_MSEB);
    WriteLineConsole("Maharashtra 20HrsDemand is " + dem20hrs_MSEB);
    WriteLineConsole("Maharashtra LoadShedding is " + shortFallMUs_MSEB + " MUs");
    WriteLineConsole("Maharashtra 3 hrs frequency is " + frequencies_MSEB[2]);
    WriteLineConsole("Maharashtra 19 hrs frequency is " + frequencies_MSEB[18]);
    WriteLineConsole("Maharashtra 20 hrs frequency is " + frequencies_MSEB[19]);
    WriteLineConsole("Maharashtra frequencies are " + frequencies_MSEB);
}