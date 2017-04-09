//DNH DATA
var drawal_DNH = "NA";
var timeBlkCol_DNH = -1;
var firstBlkRow_DNH = -1;
var demandCol_DNH = -1;
var dem24Hrs_DNH = [];
var maxDemTime_DNH = 25;
var maxDem_DNH = -1;
var dem3hrs_DNH = -1;
var dem19hrs_DNH = -1;
var dem20hrs_DNH = -1;
function handleDNH() {
    drawal_DNH = "NA";
    timeBlkCol_DNH = -1;
    firstBlkRow_DNH = -1;
    demandCol_DNH = -1;
    dem24Hrs_DNH = [];
    maxDemTime_DNH = 25;
    maxDem_DNH = -1;
    dem3hrs_DNH = -1;
    dem19hrs_DNH = -1;
    dem20hrs_DNH = -1;
    var dnhDataArray = dprReader.filesAfterReadArrays[consIDs[2]][0];
    for (var i = 0; i < dnhDataArray.length; i++) {
        var row = dnhDataArray[i];
        var val = findNonNullValueByTag(row, "Total Energy Consumption");
        if (val != null) {
            drawal_DNH = val;
        }
        val = findColumnIndexOfStr(row, "Hours");
        if (!(isNaN(val)) && val >= 0) {
            timeBlkCol_DNH = val;
        }
        val = findColumnIndexOfStr(row, "Demand");
        if (!(isNaN(val)) && val >= 0) {
            demandCol_DNH = val;
        }
    }
//find the 1stTimeBlk row
    firstBlkRow_DNH = findRowIndexOfStrInCol(dnhDataArray, timeBlkCol_DNH, 0, true);
    if (firstBlkRow_DNH != -1) {
        for (var hr = 1; hr <= 24; hr++) {
            dem24Hrs_DNH[hr - 1] = dnhDataArray[firstBlkRow_DNH + hr - 1][demandCol_DNH];
        }
    }
    maxDemTime_DNH = indexOfMax(dem24Hrs_DNH) + 1;
    maxDem_DNH = dem24Hrs_DNH[maxDemTime_DNH - 1];
    dem3hrs_DNH = dem24Hrs_DNH[2];
    dem19hrs_DNH = dem24Hrs_DNH[peakHrIndex];
    dem20hrs_DNH = dem24Hrs_DNH[19];
    WriteLineConsole("*********** DNH DATA ***********");
    WriteLineConsole("");
    WriteLineConsole(dem19hrs_DNH);
    WriteLineConsole(0);
    WriteLineConsole("");
    WriteLineConsole(drawal_DNH);
    WriteLineConsole(drawal_DNH);
    WriteLineConsole(drawal_DNH);
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole(maxDem_DNH);
    WriteLineConsole(0);
    WriteLineConsole(maxDemTime_DNH);
    WriteLineConsole(dem3hrs_DNH);
    WriteLineConsole(0);
    WriteLineConsole("*********** DNH DATA ***********");
    WriteLineConsole("DNH drawal is " + drawal_DNH);
    WriteLineConsole("DNH maxDemand is " + maxDem_DNH);
    WriteLineConsole("DNH maxDemand is at " + maxDemTime_DNH + " hrs");
    WriteLineConsole("DNH 3HrsDemand is " + dem3hrs_DNH);
    WriteLineConsole("DNH 19HrsDemand is " + dem19hrs_DNH);
    WriteLineConsole("DNH 20HrsDemand is " + dem20hrs_DNH);

}