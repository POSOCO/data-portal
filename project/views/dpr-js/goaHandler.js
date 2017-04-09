//GOA DATA
var stateGen_GOA = "NA";
var sslGen_GOA = "NA";
var geplGen_GOA = "NA";
var drawal_GOA = "NA";
var timeBlkCol_GOA = -1;
var firstBlkRow_GOA = -1;
var demandCol_GOA = -1;
var loadSheddingCol_GOA = -1;
var dem24Hrs_GOA = [];
var loadShedding24hrs_GOA = [];
var shortFallMUs_GOA = -1;
var maxDemTime_GOA = 25;
var maxDem_GOA = -1;
var dem3hrs_GOA = -1;
var dem19hrs_GOA = -1;
var dem20hrs_GOA = -1;

function handleGoa() {
    stateGen_GOA = "NA";
    sslGen_GOA = "NA";
    geplGen_GOA = "NA";
    drawal_GOA = "NA";
    timeBlkCol_GOA = -1;
    firstBlkRow_GOA = -1;
    demandCol_GOA = -1;
    loadSheddingCol_GOA = -1;
    dem24Hrs_GOA = [];
    loadShedding24hrs_GOA = [];
    shortFallMUs_GOA = -1;
    maxDemTime_GOA = 25;
    maxDem_GOA = -1;
    dem3hrs_GOA = -1;
    dem19hrs_GOA = -1;
    dem20hrs_GOA = -1;
    var goaDataArray = dprReader.filesAfterReadArrays[consIDs[4]][0];
    for (var i = 0; i < goaDataArray.length; i++) {
        row = goaDataArray[i];
        val = findNonNullValueByTag(row, "1) WR");
        if (val != null) {
            drawal_GOA = val / 1000000;
        }
        val = findNonNullValueByTag(row, "3) SSL");
        if (val != null) {
            sslGen_GOA = val / 1000000;
        }
        val = findNonNullValueByTag(row, "4) GEPL");
        if (val != null) {
            geplGen_GOA = val / 1000000;
        }
        val = findColumnIndexOfStr(row, "Hrs");
        if (!(isNaN(val)) && val >= 0) {
            timeBlkCol_GOA = val;
        }
        val = findColumnIndexOfStr(row, "Demand in MW", true);
        if (!(isNaN(val)) && val >= 0) {
            demandCol_GOA = val;
        }
        val = findColumnIndexOfStr(row, "Surplus");
        if (!(isNaN(val)) && val >= 0) {
            loadSheddingCol_GOA = val + 1;
        }
    }
//find the 1stTimeBlk row
    firstBlkRow_GOA = findRowIndexOfStrInCol(goaDataArray, timeBlkCol_GOA, 1, true);
    if (firstBlkRow_GOA != -1) {
        for (var hr = 1; hr <= 24; hr++) {
            dem24Hrs_GOA[hr - 1] = Number(goaDataArray[firstBlkRow_GOA + hr - 1][demandCol_GOA + 1]) + Number(goaDataArray[firstBlkRow_GOA + hr - 1][demandCol_GOA + 2]) + Number(goaDataArray[firstBlkRow_GOA + hr - 1][demandCol_GOA + 3]);
        }
        for (var hr = 1; hr <= 24; hr++) {
            loadShedding24hrs_GOA[hr - 1] = Number(goaDataArray[firstBlkRow_GOA + hr - 1][loadSheddingCol_GOA]);
        }
        shortFallMUs_GOA = loadShedding24hrs_GOA.reduce(function (pv, cv) {
                return pv + cv;
            }, 0) / 1000;
    }
    maxDemTime_GOA = indexOfMax(dem24Hrs_GOA) + 1;
    maxDem_GOA = dem24Hrs_GOA[maxDemTime_GOA - 1];
    dem3hrs_GOA = dem24Hrs_GOA[2];
    dem19hrs_GOA = dem24Hrs_GOA[peakHrIndex];
    dem20hrs_GOA = dem24Hrs_GOA[19];
    if (!isNaN(sslGen_GOA) && !isNaN(geplGen_GOA)) {
        stateGen_GOA = Number(sslGen_GOA) + Number(geplGen_GOA);
    }
    WriteLineConsole("*********** GOA DATA ***********");
    WriteLineConsole("");
    WriteLineConsole(dem19hrs_GOA);
    WriteLineConsole(loadShedding24hrs_GOA[peakHrIndex]);
    WriteLineConsole(stateGen_GOA);
    WriteLineConsole(drawal_GOA);
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole(shortFallMUs_GOA);
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole(maxDem_GOA);
    WriteLineConsole(loadShedding24hrs_GOA[maxDemTime_GOA - 1]);
    WriteLineConsole(maxDemTime_GOA);
    WriteLineConsole(dem3hrs_GOA);
    WriteLineConsole(loadShedding24hrs_GOA[2]);
    WriteLineConsole("*********** GOA DATA ***********");
    WriteLineConsole("GOA state generation is " + stateGen_GOA);
    WriteLineConsole("GOA drawal is " + drawal_GOA);
    WriteLineConsole("GOA maxDemand is " + maxDem_GOA);
    WriteLineConsole("GOA maxDemand is at " + maxDemTime_GOA + " hrs");
    WriteLineConsole("GOA 3HrsDemand is " + dem3hrs_GOA);
    WriteLineConsole("GOA 19HrsDemand is " + dem19hrs_GOA);
    WriteLineConsole("GOA 20HrsDemand is " + dem20hrs_GOA);
}