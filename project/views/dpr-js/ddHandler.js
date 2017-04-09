//DD DATA
var drawal_DD = "NA";
var timeBlkCol_DD = -1;
var firstBlkRow_DD = -1;
var demandCol_DD = -1;
var dem24Hrs_DD = [];
var maxDemTime_DD = 25;
var maxDem_DD = -1;
var dem3hrs_DD = -1;
var dem19hrs_DD = -1;
var dem20hrs_DD = -1;

function handleDD() {
    drawal_DD = "NA";
    timeBlkCol_DD = -1;
    firstBlkRow_DD = -1;
    demandCol_DD = -1;
    dem24Hrs_DD = [];
    maxDemTime_DD = 25;
    maxDem_DD = -1;
    dem3hrs_DD = -1;
    dem19hrs_DD = -1;
    dem20hrs_DD = -1;
    var ddDataArray = dprReader.filesAfterReadArrays[consIDs[1]][0];
    for (var i = 0; i < ddDataArray.length; i++) {
        var row = ddDataArray[i];
        var val = findNonNullValueByTag(row, "Total Energy Consumption");
        if (val != null) {
            drawal_DD = val;
        }
        val = findColumnIndexOfStr(row, "Hours ");
        if (!(isNaN(val)) && val >= 0) {
            timeBlkCol_DD = val;
        }
        val = findColumnIndexOfStr(row, "Demand");
        if (!(isNaN(val)) && val >= 0) {
            demandCol_DD = val;
        }
    }
//find the 1stTimeBlk row
    firstBlkRow_DD = findRowIndexOfStrInCol(ddDataArray, timeBlkCol_DD, 1, true);
    if (firstBlkRow_DD != -1) {
        for (var hr = 1; hr <= 24; hr++) {
            dem24Hrs_DD[hr - 1] = ddDataArray[firstBlkRow_DD + hr - 1][demandCol_DD];
        }
    }
    maxDemTime_DD = indexOfMax(dem24Hrs_DD) + 1;
    maxDem_DD = dem24Hrs_DD[maxDemTime_DD - 1];
    dem3hrs_DD = dem24Hrs_DD[2];
    dem19hrs_DD = dem24Hrs_DD[peakHrIndex];
    dem20hrs_DD = dem24Hrs_DD[19];
    WriteLineConsole("*********** DD DATA ***********");
    WriteLineConsole("");
    WriteLineConsole(dem19hrs_DD);
    WriteLineConsole(0);
    WriteLineConsole("");
    WriteLineConsole(drawal_DD);
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole(maxDem_DD);
    WriteLineConsole(0);
    WriteLineConsole(maxDemTime_DD);
    WriteLineConsole(dem3hrs_DD);
    WriteLineConsole(0);
    WriteLineConsole("*********** DD DATA ***********");
    WriteLineConsole("DD drawal is " + drawal_DD);
    WriteLineConsole("DD maxDemand is " + maxDem_DD);
    WriteLineConsole("DD maxDemand is at " + maxDemTime_DD + " hrs");
    WriteLineConsole("DD 3HrsDemand is " + dem3hrs_DD);
    WriteLineConsole("DD 19HrsDemand is " + dem19hrs_DD);
    WriteLineConsole("DD 20HrsDemand is " + dem20hrs_DD);
}