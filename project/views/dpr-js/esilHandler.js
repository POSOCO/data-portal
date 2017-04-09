//ESIL DATA
var drawal_ESIL = "NA";
var timeBlkCol_ESIL = -1;
var firstBlkRow_ESIL = -1;
var demandCol_ESIL = -1;
var dem24Hrs_ESIL = [];
var maxDemTime_ESIL = 25;
var maxDem_ESIL = -1;
var dem3hrs_ESIL = -1;
var dem19hrs_ESIL = -1;
var dem20hrs_ESIL = -1;

function handleESIL() {
    drawal_ESIL = "NA";
    timeBlkCol_ESIL = -1;
    firstBlkRow_ESIL = -1;
    demandCol_ESIL = -1;
    dem24Hrs_ESIL = [];
    maxDemTime_ESIL = 25;
    maxDem_ESIL = -1;
    dem3hrs_ESIL = -1;
    dem19hrs_ESIL = -1;
    dem20hrs_ESIL = -1;
    var esilDataArray = dprReader.filesAfterReadArrays[consIDs[3]][0];
    for (var i = 0; i < esilDataArray.length; i++) {
        var row = esilDataArray[i];
        var val = findNonNullValueByTag(row, "Total energy consumption from ISTS:");
        if (val != null) {
            drawal_ESIL = val;
        }
        val = findColumnIndexOfStr(row, "Time");
        if (!(isNaN(val)) && val >= 0) {
            timeBlkCol_ESIL = val;
        }
        val = findColumnIndexOfStr(row, "Hourly Load from ISTS (MW)");
        if (!(isNaN(val)) && val >= 0) {
            demandCol_ESIL = val;
        }
    }
//find the 1stTimeBlk row
    firstBlkRow_ESIL = findRowIndexOfStrInCol(esilDataArray, timeBlkCol_ESIL, "00 -01 hrs.", false);
    if (firstBlkRow_ESIL != -1) {
        for (var hr = 1; hr <= 24; hr++) {
            dem24Hrs_ESIL[hr - 1] = esilDataArray[firstBlkRow_ESIL + hr - 1][demandCol_ESIL];
        }
    }
    maxDemTime_ESIL = indexOfMax(dem24Hrs_ESIL) + 1;
    maxDem_ESIL = dem24Hrs_ESIL[maxDemTime_ESIL - 1];
    dem3hrs_ESIL = dem24Hrs_ESIL[2];
    dem19hrs_ESIL = dem24Hrs_ESIL[18];
    dem20hrs_ESIL = dem24Hrs_ESIL[19];
    WriteLineConsole("*********** ESIL DATA ***********");
    WriteLineConsole("");
    WriteLineConsole(dem19hrs_ESIL);
    WriteLineConsole(0);
    WriteLineConsole("");
    WriteLineConsole(drawal_ESIL);
    WriteLineConsole("");
    WriteLineConsole(0);
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole(maxDem_ESIL);
    WriteLineConsole(0);
    WriteLineConsole(maxDemTime_ESIL);
    WriteLineConsole(dem3hrs_ESIL);
    WriteLineConsole(0);
    WriteLineConsole("*********** ESIL DATA ***********");
    WriteLineConsole("ESIL drawal is " + drawal_ESIL);
    WriteLineConsole("ESIL maxDemand is " + maxDem_ESIL);
    WriteLineConsole("ESIL maxDemand is at " + maxDemTime_ESIL + " hrs");
    WriteLineConsole("ESIL 3HrsDemand is " + dem3hrs_ESIL);
    WriteLineConsole("ESIL 19HrsDemand is " + dem19hrs_ESIL);
    WriteLineConsole("ESIL 20HrsDemand is " + dem20hrs_ESIL);
}