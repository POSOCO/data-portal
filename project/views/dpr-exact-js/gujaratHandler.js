// condition ==> catered < unrestricted demand
// Demand specified is unrestricted and catered demand. So the catered peak dem etc is readily available
// Freq corr is specified by geb
var gebCsvAddresses = {
    uhps_MU_GEB: convertExcelAddressToXY("H12"),
    khps_MU_GEB: convertExcelAddressToXY("H17"),
    lbcpanam_MU_GEB: convertExcelAddressToXY("H18"),
    pvthydro_MU_GEB: convertExcelAddressToXY("H19"),
    apl_gen_MU_GEB: convertExcelAddressToXY("E79"),
    apl_gen_MW_GEB: convertExcelAddressToXY("G79"),
    drawal_MU_GEB: convertExcelAddressToXY("E82"),
    catered_dem_MU_GEB: convertExcelAddressToXY("B85"),
    restr_dem_MU_GEB: convertExcelAddressToXY("B88"),
    unrestr_dem_MU_GEB: convertExcelAddressToXY("B89"),
    wind_gen_MU_GEB: convertExcelAddressToXY("B91"),
    solar_gen_MU_GEB: convertExcelAddressToXY("B92"),
    demand_MW_col_GEB: convertExcelAddressToXY("I114"),
    ls_MW_col_GEB: convertExcelAddressToXY("J114"),
    freq_corr_MW_col_GEB: convertExcelAddressToXY("K114"),
    unrestr_dem_MW_col_GEB: convertExcelAddressToXY("M114")
};

var hydroGen_GEB = "NA";
var windGen_GEB = "NA";
var solarGen_GEB = "NA";
var availability_GEB = "NA";
var requirement_GEB = "NA";
var drawal_GEB = "NA";
var dem24Hrs_GEB = [];
var unrestrDem24Hrs_GEB = [];
var ls24Hrs_GEB = [];
var lsFreqCorr24Hrs_GEB = [];
var maxDemTime_GEB = 25;
var maxDem_GEB = -1;
var dem3hrs_GEB = -1;
var dem19hrs_GEB = -1;
var dem20hrs_GEB = -1;
var apl_gen_MU_GEB = -1;
var apl_gen_MW_GEB = -1;

function handleGujarat() {
    hydroGen_GEB = "NA";
    windGen_GEB = "NA";
    solarGen_GEB = "NA";
    availability_GEB = "NA";
    requirement_GEB = "NA";
    drawal_GEB = "NA";
    dem24Hrs_GEB = [];
    unrestrDem24Hrs_GEB = [];
    ls24Hrs_GEB = [];
    lsFreqCorr24Hrs_GEB = [];
    maxDemTime_GEB = 25;
    maxDem_GEB = -1;
    dem3hrs_GEB = -1;
    dem19hrs_GEB = -1;
    dem20hrs_GEB = -1;
    apl_gen_MU_GEB = -1;
    apl_gen_MW_GEB = -1;
    var lbcpanamhydro_GEB = -1;
    var pvthydro_GEB = -1;

    var gujaratDataArray = dprReader.filesAfterReadArrays[consIDs[5]][0];
    windGen_GEB = getByAddressFromArray(gujaratDataArray, gebCsvAddresses["wind_gen_MU_GEB"]);
    solarGen_GEB = getByAddressFromArray(gujaratDataArray, gebCsvAddresses["solar_gen_MU_GEB"]);
    lbcpanamhydro_GEB = getByAddressFromArray(gujaratDataArray, gebCsvAddresses["lbcpanam_MU_GEB"]);
    pvthydro_GEB = getByAddressFromArray(gujaratDataArray, gebCsvAddresses["pvthydro_MU_GEB"]);
    drawal_GEB = getByAddressFromArray(gujaratDataArray, gebCsvAddresses["drawal_MU_GEB"]);
    requirement_GEB = getByAddressFromArray(gujaratDataArray, gebCsvAddresses["unrestr_dem_MU_GEB"]);
    availability_GEB = getByAddressFromArray(gujaratDataArray, gebCsvAddresses["catered_dem_MU_GEB"]);
    var uhpshydro = getByAddressFromArray(gujaratDataArray, gebCsvAddresses["uhps_MU_GEB"]);
    var khpshydro = getByAddressFromArray(gujaratDataArray, gebCsvAddresses["khps_MU_GEB"]);
    apl_gen_MU_GEB = getByAddressFromArray(gujaratDataArray, gebCsvAddresses["apl_gen_MU_GEB"]);
    apl_gen_MW_GEB = getByAddressFromArray(gujaratDataArray, gebCsvAddresses["apl_gen_MW_GEB"]);

    for (var hr = 1; hr <= 24; hr++) {
        dem24Hrs_GEB[hr - 1] = Number(getByAddressFromArray(gujaratDataArray, gebCsvAddresses["demand_MW_col_GEB"], hr - 1));
        ls24Hrs_GEB[hr - 1] = Number(getByAddressFromArray(gujaratDataArray, gebCsvAddresses["ls_MW_col_GEB"], hr - 1));
        unrestrDem24Hrs_GEB[hr - 1] = Number(getByAddressFromArray(gujaratDataArray, gebCsvAddresses["unrestr_dem_MW_col_GEB"], hr - 1));
        lsFreqCorr24Hrs_GEB[hr - 1] = Number(getByAddressFromArray(gujaratDataArray, gebCsvAddresses["freq_corr_MW_col_GEB"], hr - 1));
    }

    maxDemTime_GEB = indexOfMax(dem24Hrs_GEB) + 1;
    maxDem_GEB = dem24Hrs_GEB[maxDemTime_GEB - 1];
    dem3hrs_GEB = dem24Hrs_GEB[2];
    dem19hrs_GEB = dem24Hrs_GEB[18];
    dem20hrs_GEB = dem24Hrs_GEB[19];
    hydroGen_GEB = Number(uhpshydro) + Number(khpshydro) + Number(lbcpanamhydro_GEB) + Number(pvthydro_GEB);
    WriteLineConsole("*********** GUJARAT DATA ***********");
    WriteLineConsole(dem24Hrs_GEB[peakHrIndex] + ls24Hrs_GEB[peakHrIndex] + lsFreqCorr24Hrs_GEB[peakHrIndex]);
    WriteLineConsole(dem24Hrs_GEB[peakHrIndex]);
    WriteLineConsole(ls24Hrs_GEB[peakHrIndex]);
    WriteLineConsole("");
    WriteLineConsole(drawal_GEB);
    WriteLineConsole(requirement_GEB);
    WriteLineConsole(availability_GEB);
    WriteLineConsole(requirement_GEB - availability_GEB);
    WriteLineConsole(solarGen_GEB);
    WriteLineConsole(hydroGen_GEB);
    WriteLineConsole(windGen_GEB);
    WriteLineConsole(maxDem_GEB);
    WriteLineConsole(ls24Hrs_GEB[maxDemTime_GEB - 1]);
    WriteLineConsole(maxDemTime_GEB);
    WriteLineConsole(dem3hrs_GEB);
    WriteLineConsole(ls24Hrs_GEB[2]);
    WriteLineConsole("*********** GUJARAT DATA ***********");
    WriteLineConsole("GUJARAT drawal is " + drawal_GEB);
    WriteLineConsole("GUJARAT availability is " + availability_GEB);
    WriteLineConsole("GUJARAT requirement is " + requirement_GEB);
    WriteLineConsole("GUJARAT solar generation is " + solarGen_GEB);
    WriteLineConsole("GUJARAT wind generation is " + windGen_GEB);
    WriteLineConsole("GUJARAT hydro generation is " + hydroGen_GEB);
    WriteLineConsole("GUJARAT maxDemand is " + maxDem_GEB);
    WriteLineConsole("GUJARAT maxDemand is at " + maxDemTime_GEB + " hrs");
    WriteLineConsole("GUJARAT 3HrsDemand is " + dem3hrs_GEB);
    WriteLineConsole("GUJARAT 19HrsDemand is " + dem19hrs_GEB);
    WriteLineConsole("GUJARAT 20HrsDemand is " + dem20hrs_GEB);
    fillGEBMapForm();
}

function fillGEBMapForm() {
    fillFormField('hydroGen_GEB', hydroGen_GEB);
    fillFormField('windGen_GEB', windGen_GEB);
    fillFormField('solarGen_GEB', solarGen_GEB);
    fillFormField('availability_GEB', availability_GEB);
    fillFormField('requirement_GEB', requirement_GEB);
    fillFormField('drawal_GEB', drawal_GEB);
    fillFormField('maxDemTime_GEB', maxDemTime_GEB);
    fillFormField('maxDem_GEB', maxDem_GEB);
    fillFormField('dem3hrs_GEB', dem3hrs_GEB);
    fillFormField('dem19hrs_GEB', dem19hrs_GEB);
    fillFormField('dem20hrs_GEB', dem20hrs_GEB);
    fillFormField('ls19hrs_GEB', ls24Hrs_GEB[18]);
    fillFormField('ls20hrs_GEB', ls24Hrs_GEB[19]);
    fillFormField('ls3hrs_GEB', ls24Hrs_GEB[2]);
    fillFormField('lsFreqCorr19hrs_GEB', lsFreqCorr24Hrs_GEB[18]);
    fillFormField('lsFreqCorr20hrs_GEB', lsFreqCorr24Hrs_GEB[19]);
    fillFormField('lsFreqCorr3hrs_GEB', lsFreqCorr24Hrs_GEB[2]);
    fillFormField('APL HVDC_EXPMU', apl_gen_MU_GEB);
    fillFormField('APL HVDC_EXPMW', apl_gen_MW_GEB);
}