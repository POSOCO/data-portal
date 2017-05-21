// Demand specified is unrestricted demand. So the catered peak dem etc would be unrestricted - ls
// Freq corr is not specified by goa

var stateGen_GOA = "NA";
var drawal_GOA = "NA";
var dem24Hrs_GOA = [];
var srDem24Hrs_GOA = [];
var loadShedding24hrs_GOA = [];
var shortFallMUs_GOA = -1;
var maxDemTime_GOA = 25;
var maxDem_GOA = -1;
var dem3hrs_GOA = -1;
var dem19hrs_GOA = -1;
var dem20hrs_GOA = -1;
var xeldem_amb_imp_mu_GOA = -1;
var xeldem_amb_imp_mw_GOA = -1;
var goaCsvAddresses = {
    sr_demand_MW_col_GOA: convertExcelAddressToXY("F14"),
    tot_demand_MW_col_GOA: convertExcelAddressToXY("K14"),
    ls_MW_col_GOA: convertExcelAddressToXY("M14"),
    drawal_MU_GOA: convertExcelAddressToXY("I39"),
    sr_MU_GOA: convertExcelAddressToXY("I40"),
    ssl_MU_GOA: convertExcelAddressToXY("I41"),
    gepl_MU_GOA: convertExcelAddressToXY("I42"),
    gspl_MU_GOA: convertExcelAddressToXY("I43")
};

function handleGoa() {
    stateGen_GOA = "NA";
    var sslGen_GOA = "NA";
    var geplGen_GOA = "NA";
    var gsplGen_GOA = "NA";
    drawal_GOA = "NA";
    dem24Hrs_GOA = [];
    srDem24Hrs_GOA = [];
    loadShedding24hrs_GOA = [];
    shortFallMUs_GOA = -1;
    maxDemTime_GOA = 25;
    maxDem_GOA = -1;
    dem3hrs_GOA = -1;
    dem19hrs_GOA = -1;
    dem20hrs_GOA = -1;
    xeldem_amb_imp_mu_GOA = -1;
    xeldem_amb_imp_mw_GOA = -1;
    var goaDataArray = dprReader.filesAfterReadArrays[consIDs[4]][0];
    drawal_GOA = getByAddressFromArray(goaDataArray, goaCsvAddresses["drawal_MU_GOA"]);
    sslGen_GOA = getByAddressFromArray(goaDataArray, goaCsvAddresses["ssl_MU_GOA"]);
    geplGen_GOA = getByAddressFromArray(goaDataArray, goaCsvAddresses["gepl_MU_GOA"]);
    gsplGen_GOA = getByAddressFromArray(goaDataArray, goaCsvAddresses["gspl_MU_GOA"]);
    xeldem_amb_imp_mu_GOA = getByAddressFromArray(goaDataArray, goaCsvAddresses["sr_MU_GOA"]);
    var srImp24Hrs_GOA = [];
    for (var hr = 1; hr <= 24; hr++) {
        loadShedding24hrs_GOA[hr - 1] = Number(getByAddressFromArray(goaDataArray, goaCsvAddresses["ls_MW_col_GOA"], hr - 1));
        dem24Hrs_GOA[hr - 1] = Number(getByAddressFromArray(goaDataArray, goaCsvAddresses["tot_demand_MW_col_GOA"], hr - 1));
        dem24Hrs_GOA[hr - 1] -= Number(getByAddressFromArray(goaDataArray, goaCsvAddresses["sr_demand_MW_col_GOA"], hr - 1));
        dem24Hrs_GOA[hr - 1] -= loadShedding24hrs_GOA[hr - 1];
        srDem24Hrs_GOA[hr - 1] = Number(getByAddressFromArray(goaDataArray, goaCsvAddresses["sr_demand_MW_col_GOA"], hr - 1));
    }

    shortFallMUs_GOA = loadShedding24hrs_GOA.reduce(function (pv, cv) {
            return pv + cv;
        }, 0) / 1000;
    maxDemTime_GOA = indexOfMax(dem24Hrs_GOA) + 1;
    maxDem_GOA = dem24Hrs_GOA[maxDemTime_GOA - 1];
    dem3hrs_GOA = dem24Hrs_GOA[2];
    dem19hrs_GOA = dem24Hrs_GOA[18];
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
    fillGOAForm();
}

function fillGOAForm() {
    fillFormField('stateGen_GOA', stateGen_GOA);
    fillFormField('drawal_GOA', drawal_GOA);
    fillFormField('shortFallMUs_GOA', shortFallMUs_GOA);
    fillFormField('maxDemTime_GOA', maxDemTime_GOA);
    fillFormField('maxDem_GOA', maxDem_GOA);
    fillFormField('dem3hrs_GOA', dem3hrs_GOA);
    fillFormField('dem19hrs_GOA', dem19hrs_GOA);
    fillFormField('dem20hrs_GOA', dem20hrs_GOA);
    fillFormField('ls3hrs_GOA', loadShedding24hrs_GOA[2]);
    fillFormField('ls19hrs_GOA', loadShedding24hrs_GOA[18]);
    fillFormField('ls20hrs_GOA', loadShedding24hrs_GOA[19]);
    fillFormField('lsMaxDem_GOA', loadShedding24hrs_GOA[maxDemTime_GOA - 1]);
    fillFormField('XELDEM-AMBEWADI_IMPMU', xeldem_amb_imp_mu_GOA);
    fillFormField('XELDEM-AMBEWADI_IMPMW', srDem24Hrs_GOA[indexOfMax(srDem24Hrs_GOA)]);
}