var dnhCsvAddresses = {
    allocation_MW_col_DNH: convertExcelAddressToXY("B8"),
    demand_MW_col_DNH: convertExcelAddressToXY("C8"),
    ls_MW_col_DNH: convertExcelAddressToXY("D8"),
    drawal_MU_DNH: convertExcelAddressToXY("D41")
};

var drawal_DNH = "NA";
var dem24Hrs_DNH = [];
var ls24Hrs_DNH = [];
var maxDemTime_DNH = 25;
var maxDem_DNH = -1;
var dem3hrs_DNH = -1;
var dem19hrs_DNH = -1;
var dem20hrs_DNH = -1;
var lsMaxDem_DNH = -1;
var ls3hrs_DNH = -1;
var ls19hrs_DNH = -1;
var ls20hrs_DNH = -1;
function handleDNH() {
    drawal_DNH = "NA";
    dem24Hrs_DNH = [];
    ls24Hrs_DNH = [];
    maxDemTime_DNH = 25;
    maxDem_DNH = -1;
    dem3hrs_DNH = -1;
    dem19hrs_DNH = -1;
    dem20hrs_DNH = -1;
    lsMaxDem_DNH = -1;
    ls3hrs_DNH = -1;
    ls19hrs_DNH = -1;
    ls20hrs_DNH = -1;
    var dnhDataArray = dprReader.filesAfterReadArrays[consIDs[2]][0];
    drawal_DNH = dnhDataArray[dnhCsvAddresses["drawal_MU_DNH"]["row"]][dnhCsvAddresses["drawal_MU_DNH"]["col"]];
    for (var hr = 1; hr <= 24; hr++) {
        dem24Hrs_DNH[hr - 1] = dnhDataArray[dnhCsvAddresses["demand_MW_col_DNH"]["row"] + hr - 1][dnhCsvAddresses["demand_MW_col_DNH"]["col"]];
        var ls = dnhDataArray[dnhCsvAddresses["ls_MW_col_DNH"]["row"] + hr - 1][dnhCsvAddresses["ls_MW_col_DNH"]["col"]];
        if (isNaN(ls)) {
            ls = 0;
        }
        ls24Hrs_DNH[hr - 1] = ls;
    }

    maxDemTime_DNH = indexOfMax(dem24Hrs_DNH) + 1;
    maxDem_DNH = dem24Hrs_DNH[maxDemTime_DNH - 1];
    dem3hrs_DNH = dem24Hrs_DNH[2];
    dem19hrs_DNH = dem24Hrs_DNH[18];
    dem20hrs_DNH = dem24Hrs_DNH[19];
    lsMaxDem_DNH = ls24Hrs_DNH[maxDemTime_DNH - 1];
    ls3hrs_DNH = ls24Hrs_DNH[2];
    ls19hrs_DNH = ls24Hrs_DNH[18];
    ls20hrs_DNH = ls24Hrs_DNH[19];
    WriteLineConsole("*********** DNH DATA ***********");
    WriteLineConsole("");
    WriteLineConsole(dem19hrs_DNH);
    WriteLineConsole(ls19hrs_DNH);
    WriteLineConsole("");
    WriteLineConsole(drawal_DNH);
    WriteLineConsole(drawal_DNH);
    WriteLineConsole(drawal_DNH);
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole(maxDem_DNH);
    WriteLineConsole(lsMaxDem_DNH);
    WriteLineConsole(maxDemTime_DNH);
    WriteLineConsole(dem3hrs_DNH);
    WriteLineConsole(ls3hrs_DNH);
    WriteLineConsole("*********** DNH DATA ***********");
    WriteLineConsole("DNH drawal is " + drawal_DNH);
    WriteLineConsole("DNH maxDemand is " + maxDem_DNH);
    WriteLineConsole("DNH maxDemand is at " + maxDemTime_DNH + " hrs");
    WriteLineConsole("DNH 3HrsDemand is " + dem3hrs_DNH);
    WriteLineConsole("DNH 19HrsDemand is " + dem19hrs_DNH);
    WriteLineConsole("DNH 20HrsDemand is " + dem20hrs_DNH);
    fillDNHMapForm();
}

function fillDNHMapForm() {
    fillFormField('drawal_DNH', drawal_DNH);
    fillFormField('maxDemTime_DNH', maxDemTime_DNH);
    fillFormField('maxDem_DNH', maxDem_DNH);
    fillFormField('dem3hrs_DNH', dem3hrs_DNH);
    fillFormField('dem19hrs_DNH', dem19hrs_DNH);
    fillFormField('dem20hrs_DNH', dem20hrs_DNH);
    fillFormField('lsMaxDem_DNH', lsMaxDem_DNH);
    fillFormField('ls3hrs_DNH', ls3hrs_DNH);
    fillFormField('ls19hrs_DNH', ls19hrs_DNH);
    fillFormField('ls20hrs_DNH', ls20hrs_DNH);
}
