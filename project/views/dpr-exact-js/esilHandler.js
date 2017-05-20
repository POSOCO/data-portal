var esilCsvAddresses = {
    allocation_MW_col_ESIL: convertExcelAddressToXY("B4"),
    demand_MW_col_ESIL: convertExcelAddressToXY("D4"),
    drawal_MU_ESIL: convertExcelAddressToXY("D30")
};


var drawal_ESIL = "NA";
var dem24Hrs_ESIL = [];
var maxDemTime_ESIL = 25;
var maxDem_ESIL = -1;
var dem3hrs_ESIL = -1;
var dem19hrs_ESIL = -1;
var dem20hrs_ESIL = -1;

function handleESIL() {
    drawal_ESIL = "NA";
    dem24Hrs_ESIL = [];
    maxDemTime_ESIL = 25;
    maxDem_ESIL = -1;
    dem3hrs_ESIL = -1;
    dem19hrs_ESIL = -1;
    dem20hrs_ESIL = -1;
    var esilDataArray = dprReader.filesAfterReadArrays[consIDs[3]][0];
    drawal_ESIL = esilDataArray[esilCsvAddresses["drawal_MU_ESIL"]["row"]][esilCsvAddresses["drawal_MU_ESIL"]["col"]];
    for (var hr = 1; hr <= 24; hr++) {
        dem24Hrs_ESIL[hr - 1] = esilDataArray[esilCsvAddresses["demand_MW_col_ESIL"]["row"] + hr - 1][esilCsvAddresses["demand_MW_col_ESIL"]["col"]];
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
    fillESILMapForm();
}

function fillESILMapForm() {
    fillFormField('drawal_ESIL', drawal_ESIL);
    fillFormField('maxDemTime_ESIL', maxDemTime_ESIL);
    fillFormField('maxDem_ESIL', maxDem_ESIL);
    fillFormField('dem3hrs_ESIL', dem3hrs_ESIL);
    fillFormField('dem19hrs_ESIL', dem19hrs_ESIL);
    fillFormField('dem20hrs_ESIL', dem20hrs_ESIL);
}