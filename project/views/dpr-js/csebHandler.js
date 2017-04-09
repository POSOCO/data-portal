//It is Chhattisgarh
var hydroGen_CSEB = "NA";
var solarGen_CSEB = "NA";
var drawal_CSEB = "NA";
var availabilityExc_CSEB = "NA";
var availabilityAux_CSEB = "NA";
var availability_CSEB = "NA";
var timeBlkCol_CSEB = -1;
var firstBlkRow_CSEB = -1;
var demandCol_CSEB = -1;
var loadSheddingCol_CSEB = -1;
var dem24Hrs_CSEB = [];
var loadShedding24hrs_CSEB = [];
var maxDemTime_CSEB = 25;
var maxDem_CSEB = -1;
var dem3hrs_CSEB = -1;
var dem19hrs_CSEB = -1;
var dem20hrs_CSEB = -1;
var shortFallMUs_CSEB = "NA";

function handleCSEB() {
    hydroGen_CSEB = "NA";
    solarGen_CSEB = "NA";
    drawal_CSEB = "NA";
    availabilityExc_CSEB = "NA";
    availabilityAux_CSEB = "NA";
    availability_CSEB = "NA";
    timeBlkCol_CSEB = -1;
    firstBlkRow_CSEB = -1;
    demandCol_CSEB = -1;
    loadSheddingCol_CSEB = -1;
    dem24Hrs_CSEB = [];
    loadShedding24hrs_CSEB = [];
    maxDemTime_CSEB = 25;
    maxDem_CSEB = -1;
    dem3hrs_CSEB = -1;
    dem19hrs_CSEB = -1;
    dem20hrs_CSEB = -1;
    shortFallMUs_CSEB = "NA";

    var csebArray = dprReader.filesAfterReadArrays[consIDs[0]][0];
    for (var i = 0; i < csebArray.length; i++) {
        var row = csebArray[i];
        var val = findNonNullValueByTag(row, "TOTAL HYDEL");
        if (val != null) {
            hydroGen_CSEB = val;
        }
        val = findNonNullValueByTag(row, "STATE DRAWL FROM GRID");
        if (val != null) {
            drawal_CSEB = val;
        }
        val = findNonNullValueByTag(row, "STATE CONSUM EXC AUX");
        if (val != null) {
            availabilityExc_CSEB = val;
        }
        val = findNonNullValueByTag(row, "AUX. CONSUMPTION");
        if (val != null) {
            availabilityAux_CSEB = val;
        }
        val = findColumnIndexOfStr(row, "TIME IN HRS");
        if (!(isNaN(val)) && val >= 0) {
            timeBlkCol_CSEB = val;
        }
        val = findColumnIndexOfStr(row, "DEMAND MW");
        if (!(isNaN(val)) && val >= 0) {
            demandCol_CSEB = val;
        }
        val = findColumnIndexOfStr(row, "SCH. RELIEF");
        if (!(isNaN(val)) && val >= 0) {
            loadSheddingCol_CSEB = val;
        }
        val = findColumnIndexOfStr(row, "TOTAL SOLAR GEN IN MU");
        if (!(isNaN(val)) && val >= 0) {
            var solarCol_CSEB = val;
            var solarRow_CSEB = i;
        }
    }
    //find the 1stTimeBlk row
    firstBlkRow_CSEB = findRowIndexOfStrInCol(csebArray, timeBlkCol_CSEB, 1, true);
    if (firstBlkRow_CSEB != -1) {
        for (var hr = 1; hr <= 24; hr++) {
            dem24Hrs_CSEB[hr - 1] = csebArray[firstBlkRow_CSEB + hr - 1][demandCol_CSEB];
        }
        for (var hr = 1; hr <= 24; hr++) {
            loadShedding24hrs_CSEB[hr - 1] = Number(csebArray[firstBlkRow_CSEB + hr - 1][loadSheddingCol_CSEB]) + Number(csebArray[firstBlkRow_CSEB + hr - 1][loadSheddingCol_CSEB + 1]);
        }
    }
    if (availabilityAux_CSEB != null && availabilityExc_CSEB != null) {
        availability_CSEB = Number(availabilityAux_CSEB) + Number(availabilityExc_CSEB);
    }
    maxDemTime_CSEB = indexOfMax(dem24Hrs_CSEB) + 1;
    maxDem_CSEB = dem24Hrs_CSEB[maxDemTime_CSEB - 1];
    dem3hrs_CSEB = dem24Hrs_CSEB[2];
    dem19hrs_CSEB = dem24Hrs_CSEB[peakHrIndex];
    dem20hrs_CSEB = dem24Hrs_CSEB[19];
    shortFallMUs_CSEB = loadShedding24hrs_CSEB.reduce(function (pv, cv) {
            return pv + cv;
        }, 0) / 1000;
    //find the 1stNonEmpty row
    var solarValRow_CSEB = findRowIndexOfNonEmptyInCol(csebArray, solarCol_CSEB, solarRow_CSEB + 1);
    if (solarValRow_CSEB != -1) {
        solarGen_CSEB = csebArray[solarValRow_CSEB][solarCol_CSEB];
    }
    WriteLineConsole("*********** CSEB DATA ***********");
    WriteLineConsole("");
    WriteLineConsole(dem19hrs_CSEB);
    WriteLineConsole(loadShedding24hrs_CSEB[peakHrIndex]);
    WriteLineConsole("");
    WriteLineConsole(drawal_CSEB);
    WriteLineConsole("");
    WriteLineConsole(availability_CSEB);
    WriteLineConsole(shortFallMUs_CSEB);
    WriteLineConsole(solarGen_CSEB);
    WriteLineConsole(hydroGen_CSEB);
    WriteLineConsole("");
    WriteLineConsole(maxDem_CSEB);
    WriteLineConsole(loadShedding24hrs_CSEB[maxDemTime_CSEB - 1]);
    WriteLineConsole(maxDemTime_CSEB);
    WriteLineConsole(dem3hrs_CSEB);
    WriteLineConsole(loadShedding24hrs_CSEB[2]);
    WriteLineConsole("*********** CSEB DATA ***********");
    WriteLineConsole("CSEB Hydro generation is " + hydroGen_CSEB);
    WriteLineConsole("CSEB drawal is " + drawal_CSEB);
    WriteLineConsole("CSEB availability is " + availability_CSEB);
    WriteLineConsole("CSEB maxDemand is " + maxDem_CSEB);
    WriteLineConsole("CSEB maxDemand is at " + maxDemTime_CSEB + " hrs");
    WriteLineConsole("CSEB 3HrsDemand is " + dem3hrs_CSEB);
    WriteLineConsole("CSEB 19HrsDemand is " + dem19hrs_CSEB);
    WriteLineConsole("CSEB 20HrsDemand is " + dem20hrs_CSEB);
    WriteLineConsole("CSEB LoadShedding is " + shortFallMUs_CSEB + " MUs");
}