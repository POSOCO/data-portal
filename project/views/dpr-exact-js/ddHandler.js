// use parseFloat("20.324 mw") to extract load staggering from the string. we can also use "foo3bar5".match(/\d+/)[0]
// Demand specified is unrestricted demand. So the catered peak dem etc would be unrestricted - ls
// Freq corr is not specified by dd

var ddCsvAddresses = {
    allocation_MW_col_DD: convertExcelAddressToXY("B9"),
    demand_MW_col_DD: convertExcelAddressToXY("C9"),
    ls_MW_col_DD: convertExcelAddressToXY("D9"),
    drawal_MU_DD: convertExcelAddressToXY("B35")
};

var drawal_DD = "NA";
var dem24Hrs_DD = [];
var ls24Hrs_DD = [];
var maxDemTime_DD = 25;
var maxDem_DD = -1;
var dem3hrs_DD = -1;
var dem19hrs_DD = -1;
var dem20hrs_DD = -1;
var lsMaxDem_DD = -1;
var ls3hrs_DD = -1;
var ls19hrs_DD = -1;
var ls20hrs_DD = -1;

function handleDD() {
    drawal_DD = "NA";
    dem24Hrs_DD = [];
    maxDemTime_DD = 25;
    maxDem_DD = -1;
    dem3hrs_DD = -1;
    dem19hrs_DD = -1;
    dem20hrs_DD = -1;
    var ddDataArray = dprReader.filesAfterReadArrays[consIDs[1]][0];
    drawal_DD = getByAddressFromArray(ddDataArray, ddCsvAddresses["drawal_MU_DD"]);
    for (var hr = 1; hr <= 24; hr++) {
        ls24Hrs_DD[hr - 1] = parseFloat(getByAddressFromArray(ddDataArray, ddCsvAddresses["ls_MW_col_DD"], hr - 1));
        dem24Hrs_DD[hr - 1] = getByAddressFromArray(ddDataArray, ddCsvAddresses["demand_MW_col_DD"], hr - 1) - ls24Hrs_DD[hr - 1];
    }
    maxDemTime_DD = indexOfMax(dem24Hrs_DD) + 1;
    maxDem_DD = dem24Hrs_DD[maxDemTime_DD - 1];
    dem3hrs_DD = dem24Hrs_DD[2];
    dem19hrs_DD = dem24Hrs_DD[18];
    dem20hrs_DD = dem24Hrs_DD[19];
    ls3hrs_DD = ls24Hrs_DD[2];
    ls19hrs_DD = ls24Hrs_DD[18];
    ls20hrs_DD = ls24Hrs_DD[19];
    lsMaxDem_DD = ls24Hrs_DD[maxDemTime_DD - 1];
    WriteLineConsole("*********** DD DATA ***********");
    WriteLineConsole("");
    WriteLineConsole(dem24Hrs_DD[peakHrIndex]);
    WriteLineConsole(ls24Hrs_DD[peakHrIndex]);
    WriteLineConsole("");
    WriteLineConsole(drawal_DD);
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole("");
    WriteLineConsole(maxDem_DD);
    WriteLineConsole(lsMaxDem_DD);
    WriteLineConsole(maxDemTime_DD);
    WriteLineConsole(dem3hrs_DD);
    WriteLineConsole(ls3hrs_DD);
    WriteLineConsole("*********** DD DATA ***********");
    WriteLineConsole("DD drawal is " + drawal_DD);
    WriteLineConsole("DD maxDemand is " + maxDem_DD);
    WriteLineConsole("DD maxDemand is at " + maxDemTime_DD + " hrs");
    WriteLineConsole("DD 3HrsDemand is " + dem3hrs_DD);
    WriteLineConsole("DD 19HrsDemand is " + dem19hrs_DD);
    WriteLineConsole("DD 20HrsDemand is " + dem20hrs_DD);
    fillDDMapForm();
}

function fillDDMapForm() {
    fillFormField('drawal_DD', drawal_DD);
    fillFormField('maxDemTime_DD', maxDemTime_DD);
    fillFormField('maxDem_DD', maxDem_DD);
    fillFormField('dem3hrs_DD', dem3hrs_DD);
    fillFormField('dem19hrs_DD', dem19hrs_DD);
    fillFormField('dem20hrs_DD', dem20hrs_DD);
    fillFormField('lsMaxDem_DD', lsMaxDem_DD);
    fillFormField('ls3hrs_DD', ls3hrs_DD);
    fillFormField('ls19hrs_DD', ls19hrs_DD);
    fillFormField('ls20hrs_DD', ls20hrs_DD);
}