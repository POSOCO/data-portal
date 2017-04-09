//MP data
var hydroGen_MP = "NA";
var hydroGen1_MP = "NA";
var hydroGen2_MP = "NA";
var solarGen_MP = "NA";
var windGen_MP = "NA";
var drawal_MP = "NA";
var availabilityExc_MP = "NA";
var availabilityAux_MP = "NA";
var availability_MP = "NA";
var shortFallMUs_MP = "NA";
var timeBlkCol_MP = -1;
var firstBlkRow_MP = -1;
var demandCol_MP = -1;
var loadSheddingCol_MP = -1;
var dem24Hrs_MP = [];
var loadShedding24hrs_MP = [];
var maxDemTime_MP = 25;
var maxDem_MP = -1;
var dem3hrs_MP = -1;
var dem19hrs_MP = -1;
var dem20hrs_MP = -1;

function handleMP() {
    hydroGen_MP = "NA";
    hydroGen1_MP = "NA";
    hydroGen2_MP = "NA";
    solarGen_MP = "NA";
    windGen_MP = "NA";
    drawal_MP = "NA";
    availabilityExc_MP = "NA";
    availabilityAux_MP = "NA";
    availability_MP = "NA";
    timeBlkCol_MP = -1;
    firstBlkRow_MP = -1;
    demandCol_MP = -1;
    loadSheddingCol_MP = -1;
    dem24Hrs_MP = [];
    loadShedding24hrs_MP = [];
    maxDemTime_MP = 25;
    maxDem_MP = -1;
    dem3hrs_MP = -1;
    dem19hrs_MP = -1;
    dem20hrs_MP = -1;

    for (var k = 0; k < 2; k++) {
        var mpDataArray = dprReader.filesAfterReadArrays[consIDs[6]][k];
        for (var i = 0; i < mpDataArray.length; i++) {
            var row = mpDataArray[i];
            var val = findNonNullValueByTag(row, "MP HYDEL");
            if (val != null) {
                hydroGen_MP = val / 10;
            }
            val = findNonNullValueByTag(row, "Indira Sagar");
            if (val != null) {
                hydroGen1_MP = val / 10;
            }
            val = findNonNullValueByTag(row, "Omkareshwar");
            if (val != null) {
                hydroGen2_MP = val / 10;
            }
            val = findNonNullValueByTag(row, "MP Drawal LU");
            if (val != null) {
                drawal_MP = val / 10;
            }
            val = findNonNullValueByTag(row, "M.P.Supply Excl");
            if (val != null) {
                availabilityExc_MP = val / 10;
            }
            val = findNonNullValueByTag(row, "Aux.Cons.  LU");
            if (val != null) {
                availabilityAux_MP = val / 10;
            }
            val = findNonNullValueByTag(row, "Wind Injection");
            if (val != null) {
                windGen_MP = val / 10;
            }
            val = findNonNullValueByTag(row, "Solar Injection");
            if (val != null) {
                solarGen_MP = val / 10;
            }
            val = findColumnIndexOfStr(row, "HOURS");
            if (!(isNaN(val)) && val >= 0) {
                timeBlkCol_MP = val;
            }
            val = findColumnIndexOfStr(row, "CATERED\nDEMAND\nIncl Aux.Cons.");
            if (!(isNaN(val)) && val >= 0) {
                demandCol_MP = val;
            }
            val = findColumnIndexOfStr(row, " L.S.");
            if (!(isNaN(val)) && val >= 0) {
                loadSheddingCol_MP = val;
            }
        }
        //find the 1stTimeBlk row
        firstBlkRow_MP = findRowIndexOfStrInCol(mpDataArray, timeBlkCol_MP, 1, true);
        if (firstBlkRow_MP != -1) {
            for (var hr = 1; hr <= 24; hr++) {
                dem24Hrs_MP[hr - 1] = mpDataArray[firstBlkRow_MP + hr - 1][demandCol_MP];
            }
            for (var hr = 1; hr <= 24; hr++) {
                loadShedding24hrs_MP[hr - 1] = Number(mpDataArray[firstBlkRow_MP + hr - 1][loadSheddingCol_MP]) + Number(mpDataArray[firstBlkRow_MP + hr - 1][loadSheddingCol_MP + 1]);
            }
        }
    }
    if (availabilityAux_MP != null && availabilityExc_MP != null) {
        availability_MP = Number(availabilityAux_MP) + Number(availabilityExc_MP);
    }
    maxDemTime_MP = indexOfMax(dem24Hrs_MP) + 1;
    maxDem_MP = dem24Hrs_MP[maxDemTime_MP - 1];
    dem3hrs_MP = dem24Hrs_MP[2];
    dem19hrs_MP = dem24Hrs_MP[peakHrIndex];
    dem20hrs_MP = dem24Hrs_MP[19];
    shortFallMUs_MP = loadShedding24hrs_MP.reduce(function (pv, cv) {
            return pv + cv;
        }, 0) / 1000;
    WriteLineConsole("*********** MP DATA ***********");
    WriteLineConsole("");
    WriteLineConsole(dem19hrs_MP);
    WriteLineConsole(loadShedding24hrs_MP[peakHrIndex]);
    WriteLineConsole("");
    WriteLineConsole(drawal_MP);
    WriteLineConsole("");
    WriteLineConsole(availability_MP);
    WriteLineConsole(shortFallMUs_MP);
    WriteLineConsole(solarGen_MP);
    WriteLineConsole(hydroGen_MP + hydroGen1_MP + hydroGen2_MP);
    WriteLineConsole(windGen_MP);
    WriteLineConsole(maxDem_MP);
    WriteLineConsole(loadShedding24hrs_MP[maxDemTime_MP - 1]);
    WriteLineConsole(maxDemTime_MP);
    WriteLineConsole(dem3hrs_MP);
    WriteLineConsole(loadShedding24hrs_MP[2]);
    WriteLineConsole("*********** MP DATA ***********");
    WriteLineConsole("MP Hydro generation is " + (hydroGen_MP + hydroGen1_MP + hydroGen2_MP));
    WriteLineConsole("MP Solar Generation is " + solarGen_MP);
    WriteLineConsole("MP Wind Generation is " + windGen_MP);
    WriteLineConsole("MP drawal is " + drawal_MP);
    WriteLineConsole("MP availability is " + availability_MP);
    WriteLineConsole("MP maxDemand is " + maxDem_MP);
    WriteLineConsole("MP maxDemand is at " + maxDemTime_MP + " hrs");
    WriteLineConsole("MP 3HrsDemand is " + dem3hrs_MP);
    WriteLineConsole("MP 19HrsDemand is " + dem19hrs_MP);
    WriteLineConsole("MP 20HrsDemand is " + dem20hrs_MP);
    WriteLineConsole("MP LoadShedding is " + shortFallMUs_MP + " MUs");
}