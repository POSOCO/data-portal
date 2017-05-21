// Demand specified is unrestricted demand. So the catered peak dem etc would be unrestricted - ls
// Freq corr is not specified by mseb

var hydroGen_MSEB = "NA";
var solarGen_MSEB = "NA";
var windGen_MSEB = "NA";
var drawal_MSEB = "NA";
var availability_MSEB = "NA";
var shortFallMUs_MSEB = "NA";
var dem24Hrs_MSEB = [];
var loadShedding24hrs_MSEB = [];
var frequencies_MSEB = [];
var maxDemTime_MSEB = 25;
var maxDem_MSEB = -1;
var dem3hrs_MSEB = -1;
var dem19hrs_MSEB = -1;
var dem20hrs_MSEB = -1;

var msebCsvAddresses = {
    ls_MW_col_MSEB: convertExcelAddressToXY("M2"),
    demand_MW_col_MSEB: convertExcelAddressToXY("Q2"),
    freq_col_MSEB: convertExcelAddressToXY("R2"),
    solar_MU_MSEB: convertExcelAddressToXY("AP2"),
    hydro_MU_MSEB: convertExcelAddressToXY("AB2"),
    wind_MU_MSEB: convertExcelAddressToXY("L2"),
    drawal_MU_MSEB: convertExcelAddressToXY("BM2"),
    availability_MU_MSEB: convertExcelAddressToXY("CA2")
};

function handleMaharashtra() {
    hydroGen_MSEB = "NA";
    solarGen_MSEB = "NA";
    windGen_MSEB = "NA";
    drawal_MSEB = "NA";
    availability_MSEB = "NA";
    dem24Hrs_MSEB = [];
    loadShedding24hrs_MSEB = [];
    frequencies_MSEB = [];
    maxDemTime_MSEB = 25;
    maxDem_MSEB = -1;
    dem3hrs_MSEB = -1;
    dem19hrs_MSEB = -1;
    dem20hrs_MSEB = -1;
    var msebDataArray = [];
    var msebHourlyDataArray = [];
    for (var k = 0; k < 2; k++) {
        var dataArray = dprReader.filesAfterReadArrays[consIDs[7]][k];
        if (dataArray.length < 4) {
            msebDataArray = dataArray
        } else {
            msebHourlyDataArray = dataArray;
        }
    }
    hydroGen_MSEB = getByAddressFromArray(msebDataArray, msebCsvAddresses["hydro_MU_MSEB"]);
    windGen_MSEB = getByAddressFromArray(msebDataArray, msebCsvAddresses["wind_MU_MSEB"]);
    solarGen_MSEB = getByAddressFromArray(msebDataArray, msebCsvAddresses["solar_MU_MSEB"]);
    drawal_MSEB = getByAddressFromArray(msebDataArray, msebCsvAddresses["drawal_MU_MSEB"]);
    availability_MSEB = getByAddressFromArray(msebDataArray, msebCsvAddresses["availability_MU_MSEB"]);
    for (var hr = 1; hr <= 24; hr++) {
        loadShedding24hrs_MSEB[hr - 1] = getByAddressFromArray(msebHourlyDataArray, msebCsvAddresses["ls_MW_col_MSEB"], hr - 1);
        dem24Hrs_MSEB[hr - 1] = getByAddressFromArray(msebHourlyDataArray, msebCsvAddresses["demand_MW_col_MSEB"], hr - 1) - loadShedding24hrs_MSEB[hr - 1];
        frequencies_MSEB[hr - 1] = getByAddressFromArray(msebHourlyDataArray, msebCsvAddresses["freq_col_MSEB"], hr - 1) - loadShedding24hrs_MSEB[hr - 1];
    }
    maxDemTime_MSEB = indexOfMax(dem24Hrs_MSEB) + 1;
    maxDem_MSEB = dem24Hrs_MSEB[maxDemTime_MSEB - 1];
    dem3hrs_MSEB = dem24Hrs_MSEB[2];
    dem19hrs_MSEB = dem24Hrs_MSEB[18];
    dem20hrs_MSEB = dem24Hrs_MSEB[19];
    shortFallMUs_MSEB = loadShedding24hrs_MSEB.reduce(function (pv, cv) {
            return pv + cv;
        }, 0) / 1000;
    WriteLineConsole("*********** Maharashtra DATA ***********");
    WriteLineConsole(dem19hrs_MSEB - loadShedding24hrs_MSEB[peakHrIndex]);
    WriteLineConsole(dem19hrs_MSEB);
    WriteLineConsole(loadShedding24hrs_MSEB[peakHrIndex]);
    WriteLineConsole("");
    WriteLineConsole(drawal_MSEB);
    WriteLineConsole("");
    WriteLineConsole(availability_MSEB);
    WriteLineConsole(shortFallMUs_MSEB);
    WriteLineConsole(solarGen_MSEB);
    WriteLineConsole(hydroGen_MSEB);
    WriteLineConsole(windGen_MSEB);
    WriteLineConsole(maxDem_MSEB - loadShedding24hrs_MSEB[maxDemTime_MSEB]);
    WriteLineConsole(loadShedding24hrs_MSEB[maxDemTime_MSEB - 1]);
    WriteLineConsole(maxDemTime_MSEB);
    WriteLineConsole(dem3hrs_MSEB - loadShedding24hrs_MSEB[2]);
    WriteLineConsole(loadShedding24hrs_MSEB[2]);
    WriteLineConsole("*********** Maharashtra DATA ***********");
    WriteLineConsole("Maharashtra Hydro generation is " + hydroGen_MSEB);
    WriteLineConsole("Maharashtra Solar Generation is " + solarGen_MSEB);
    WriteLineConsole("Maharashtra Wind Generation is " + windGen_MSEB);
    WriteLineConsole("Maharashtra drawal is " + drawal_MSEB);
    WriteLineConsole("Maharashtra availability is " + availability_MSEB);
    WriteLineConsole("Maharashtra maxDemand is " + maxDem_MSEB);
    WriteLineConsole("Maharashtra maxDemand is at " + maxDemTime_MSEB + " hrs");
    WriteLineConsole("Maharashtra 3HrsDemand is " + dem3hrs_MSEB);
    WriteLineConsole("Maharashtra 19HrsDemand is " + dem19hrs_MSEB);
    WriteLineConsole("Maharashtra 20HrsDemand is " + dem20hrs_MSEB);
    WriteLineConsole("Maharashtra LoadShedding is " + shortFallMUs_MSEB + " MUs");
    WriteLineConsole("Maharashtra 3 hrs frequency is " + frequencies_MSEB[2]);
    WriteLineConsole("Maharashtra 19 hrs frequency is " + frequencies_MSEB[18]);
    WriteLineConsole("Maharashtra 20 hrs frequency is " + frequencies_MSEB[19]);
    WriteLineConsole("Maharashtra frequencies are " + frequencies_MSEB);
    fillMSEBMapForm();
}

function fillMSEBMapForm() {
    fillFormField('hydroGen_MSEB', hydroGen_MSEB);
    fillFormField('solarGen_MSEB', solarGen_MSEB);
    fillFormField('windGen_MSEB', windGen_MSEB);
    fillFormField('drawal_MSEB', drawal_MSEB);
    fillFormField('availability_MSEB', availability_MSEB);
    fillFormField('shortFallMUs_MSEB', shortFallMUs_MSEB);
    fillFormField('maxDemTime_MSEB', maxDemTime_MSEB);
    fillFormField('maxDem_MSEB', maxDem_MSEB);
    fillFormField('dem3hrs_MSEB', dem3hrs_MSEB);
    fillFormField('dem19hrs_MSEB', dem19hrs_MSEB);
    fillFormField('dem20hrs_MSEB', dem20hrs_MSEB);
    fillFormField('ls3hrs_MSEB', loadShedding24hrs_MSEB[2]);
    fillFormField('ls19hrs_MSEB', loadShedding24hrs_MSEB[18]);
    fillFormField('ls20hrs_MSEB', loadShedding24hrs_MSEB[19]);
    fillFormField('lsMaxDem_MSEB', loadShedding24hrs_MSEB[maxDemTime_MSEB - 1]);
}