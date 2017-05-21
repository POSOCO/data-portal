// Demand specified is unrestricted and catered demand. So the catered peak dem etc would be directly used
// Freq corr is specified by MP

var hydroGen_MP = "NA";
var solarGen_MP = "NA";
var windGen_MP = "NA";
var drawal_MP = "NA";
var availability_MP = "NA";
var shortFallMUs_MP = "NA";
var dem24Hrs_MP = [];
var loadShedding24hrs_MP = [];
var maxDemTime_MP = 25;
var maxDem_MP = -1;
var dem3hrs_MP = -1;
var dem19hrs_MP = -1;
var dem20hrs_MP = -1;

var mpCsvAddresses = {
    mp_hydel_MU_MP: convertExcelAddressToXY("G20"),
    indrasagar_MU_MP: convertExcelAddressToXY("G22"),
    omkareshwar_MU_MP: convertExcelAddressToXY("G23"),
    solar_MU_MP: convertExcelAddressToXY("G24"),
    wind_MU_MP: convertExcelAddressToXY("G25"),
    req_excl_aux_MU_MP: convertExcelAddressToXY("G27"),
    req_aux_MU_MP: convertExcelAddressToXY("E36"),
    drawal_MU_MP: convertExcelAddressToXY("E40"),
    demand_MW_col_MP: convertExcelAddressToXY("D5"),
    ls_MW_col_MP: convertExcelAddressToXY("F5"),
    unrestr_ls_MW_col_MP: convertExcelAddressToXY("G5"),
    freq_corr_MW_col_MP: convertExcelAddressToXY("H5")
};

function handleMP() {
    hydroGen_MP = "NA";
    solarGen_MP = "NA";
    windGen_MP = "NA";
    drawal_MP = "NA";
    availability_MP = "NA";
    dem24Hrs_MP = [];
    loadShedding24hrs_MP = [];
    maxDemTime_MP = 25;
    maxDem_MP = -1;
    dem3hrs_MP = -1;
    dem19hrs_MP = -1;
    dem20hrs_MP = -1;
    var mpDataArray = [];
    var mpHourlyDataArray = [];
    for (var k = 0; k < 2; k++) {
        var dataArray = dprReader.filesAfterReadArrays[consIDs[6]][k];
        if (dataArray.length < 40) {
            mpHourlyDataArray = dataArray;
        } else {
            mpDataArray = dataArray;
        }
    }
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
    fillMPForm();
}

function fillMPForm() {
    fillFormField('hydroGen_MP', hydroGen_MP);
    fillFormField('hydroGen1_MP', hydroGen1_MP);
    fillFormField('hydroGen2_MP', hydroGen2_MP);
    fillFormField('solarGen_MP', solarGen_MP);
    fillFormField('windGen_MP', windGen_MP);
    fillFormField('drawal_MP', drawal_MP);
    fillFormField('availability_MP', availability_MP);
    fillFormField('shortFallMUs_MP', shortFallMUs_MP);
    fillFormField('maxDemTime_MP', maxDemTime_MP);
    fillFormField('maxDem_MP', maxDem_MP);
    fillFormField('dem3hrs_MP', dem3hrs_MP);
    fillFormField('dem19hrs_MP', dem19hrs_MP);
    fillFormField('dem20hrs_MP', dem20hrs_MP);
    fillFormField('ls3hrs_MP', loadShedding24hrs_MP[2]);
    fillFormField('ls19hrs_MP', loadShedding24hrs_MP[18]);
    fillFormField('ls20hrs_MP', loadShedding24hrs_MP[19]);
    fillFormField('lsMaxDem_MP', loadShedding24hrs_MP[maxDemTime_MP - 1]);
}