// Demand specified is unrestricted demand. So the catered peak dem etc would be unrestricted - ls
// Freq corr is not specified by cseb
var csebCsvAddresses = {
    demand_MW_col_CSEB: convertExcelAddressToXY("E8"),
    ls_sch_MW_col_CSEB: convertExcelAddressToXY("F8"),
    ls_unsch_MW_col_CSEB: convertExcelAddressToXY("G8"),
    solar_MU_CSEB: convertExcelAddressToXY("I8"),
    hydro_MU_CSEB: convertExcelAddressToXY("C37"),
    drawal_MU_CSEB: convertExcelAddressToXY("D54"),
    avail_excl_aux_MU_CSEB: convertExcelAddressToXY("D56"),
    avail_aux_MU_CSEB: convertExcelAddressToXY("D57"),
    RAIGRH_BUDHIPADR_EXPMU: convertExcelAddressToXY("F73"),
    RAIGRH_BUDHIPADR_IMPMU: convertExcelAddressToXY("D73"),
    RAIGRH_BUDHIPADR_EXPMW: convertExcelAddressToXY("H67"),
    RAIGRH_BUDHIPADR_IMPMW: convertExcelAddressToXY("D67"),
    KORBA_BUDHIPADR_2_EXPMU: convertExcelAddressToXY("F74"),
    KORBA_BUDHIPADR_2_IMPMU: convertExcelAddressToXY("D74"),
    KORBA_BUDHIPADR_2_EXPMW: convertExcelAddressToXY("H68"),
    KORBA_BUDHIPADR_2_IMPMW: convertExcelAddressToXY("D68"),
    KORBA_BUDHIPADR_3_EXPMU: convertExcelAddressToXY("F75"),
    KORBA_BUDHIPADR_3_IMPMU: convertExcelAddressToXY("D75"),
    KORBA_BUDHIPADR_3_EXPMW: convertExcelAddressToXY("H69"),
    KORBA_BUDHIPADR_3_IMPMW: convertExcelAddressToXY("D69")
};

var hydroGen_CSEB = "NA";
var solarGen_CSEB = "NA";
var drawal_CSEB = "NA";
var availability_CSEB = "NA";
var dem24Hrs_CSEB = [];
var loadShedding24hrs_CSEB = [];
var maxDemTime_CSEB = 25;
var maxDem_CSEB = -1;
var dem3hrs_CSEB = -1;
var dem19hrs_CSEB = -1;
var dem20hrs_CSEB = -1;
var shortFallMUs_CSEB = "NA";

var RAIGRH_BUDHIPADR_EXPMU = "";
var RAIGRH_BUDHIPADR_IMPMU = "";
var RAIGRH_BUDHIPADR_EXPMW = "";
var RAIGRH_BUDHIPADR_IMPMW = "";

var KORBA_BUDHIPADR_2_EXPMU = "";
var KORBA_BUDHIPADR_2_IMPMU = "";
var KORBA_BUDHIPADR_2_EXPMW = "";
var KORBA_BUDHIPADR_2_IMPMW = "";

var KORBA_BUDHIPADR_3_EXPMU = "";
var KORBA_BUDHIPADR_3_IMPMU = "";
var KORBA_BUDHIPADR_3_EXPMW = "";
var KORBA_BUDHIPADR_3_IMPMW = "";

function handleCSEB() {
    hydroGen_CSEB = "NA";
    solarGen_CSEB = "NA";
    drawal_CSEB = "NA";
    var availabilityExc_CSEB = "NA";
    var availabilityAux_CSEB = "NA";
    availability_CSEB = "NA";
    dem24Hrs_CSEB = [];
    loadShedding24hrs_CSEB = [];
    maxDemTime_CSEB = 25;
    maxDem_CSEB = -1;
    dem3hrs_CSEB = -1;
    dem19hrs_CSEB = -1;
    dem20hrs_CSEB = -1;
    shortFallMUs_CSEB = "NA";

    var csebArray = dprReader.filesAfterReadArrays[consIDs[0]][0];
    hydroGen_CSEB = getByAddressFromArray(csebArray, csebCsvAddresses["hydro_MU_CSEB"]);
    drawal_CSEB = getByAddressFromArray(csebArray, csebCsvAddresses["drawal_MU_CSEB"]);
    availabilityExc_CSEB = getByAddressFromArray(csebArray, csebCsvAddresses["avail_excl_aux_MU_CSEB"]);
    availabilityAux_CSEB = getByAddressFromArray(csebArray, csebCsvAddresses["avail_aux_MU_CSEB"]);
    solarGen_CSEB = getByAddressFromArray(csebArray, csebCsvAddresses["solar_MU_CSEB"]);

    for (var hr = 1; hr <= 24; hr++) {
        loadShedding24hrs_CSEB[hr - 1] = Number(getByAddressFromArray(csebArray, csebCsvAddresses["ls_sch_MW_col_CSEB"], hr - 1)) + Number(getByAddressFromArray(csebArray, csebCsvAddresses["ls_unsch_MW_col_CSEB"], hr - 1));
    }
    for (var hr = 1; hr <= 24; hr++) {
        // since we are storing catered demand as demand
        dem24Hrs_CSEB[hr - 1] = getByAddressFromArray(csebArray, csebCsvAddresses["demand_MW_col_CSEB"], hr - 1);
        dem24Hrs_CSEB[hr - 1] = dem24Hrs_CSEB[hr - 1] - loadShedding24hrs_CSEB[hr - 1];
    }
    availability_CSEB = Number(availabilityAux_CSEB) + Number(availabilityExc_CSEB);
    maxDemTime_CSEB = indexOfMax(dem24Hrs_CSEB) + 1;
    maxDem_CSEB = dem24Hrs_CSEB[maxDemTime_CSEB - 1];
    dem3hrs_CSEB = dem24Hrs_CSEB[2];
    dem19hrs_CSEB = dem24Hrs_CSEB[18];
    dem20hrs_CSEB = dem24Hrs_CSEB[19];
    shortFallMUs_CSEB = loadShedding24hrs_CSEB.reduce(function (pv, cv) {
            return pv + cv;
        }, 0) / 1000;

    RAIGRH_BUDHIPADR_EXPMU = getByAddressFromArray(csebArray, csebCsvAddresses["RAIGRH_BUDHIPADR_EXPMU"]);
    RAIGRH_BUDHIPADR_IMPMU = getByAddressFromArray(csebArray, csebCsvAddresses["RAIGRH_BUDHIPADR_IMPMU"]);
    RAIGRH_BUDHIPADR_EXPMW = getByAddressFromArray(csebArray, csebCsvAddresses["RAIGRH_BUDHIPADR_EXPMW"]);
    RAIGRH_BUDHIPADR_IMPMW = getByAddressFromArray(csebArray, csebCsvAddresses["RAIGRH_BUDHIPADR_IMPMW"]);

    KORBA_BUDHIPADR_2_EXPMU = getByAddressFromArray(csebArray, csebCsvAddresses["KORBA_BUDHIPADR_2_EXPMU"]);
    KORBA_BUDHIPADR_2_IMPMU = getByAddressFromArray(csebArray, csebCsvAddresses["KORBA_BUDHIPADR_2_IMPMU"]);
    KORBA_BUDHIPADR_2_EXPMW = getByAddressFromArray(csebArray, csebCsvAddresses["KORBA_BUDHIPADR_2_EXPMW"]);
    KORBA_BUDHIPADR_2_IMPMW = getByAddressFromArray(csebArray, csebCsvAddresses["KORBA_BUDHIPADR_2_IMPMW"]);

    KORBA_BUDHIPADR_3_EXPMU = getByAddressFromArray(csebArray, csebCsvAddresses["KORBA_BUDHIPADR_3_EXPMU"]);
    KORBA_BUDHIPADR_3_IMPMU = getByAddressFromArray(csebArray, csebCsvAddresses["KORBA_BUDHIPADR_3_IMPMU"]);
    KORBA_BUDHIPADR_3_EXPMW = getByAddressFromArray(csebArray, csebCsvAddresses["KORBA_BUDHIPADR_3_EXPMW"]);
    KORBA_BUDHIPADR_3_IMPMW = getByAddressFromArray(csebArray, csebCsvAddresses["KORBA_BUDHIPADR_3_IMPMW"]);

    WriteLineConsole("*********** CSEB DATA ***********");
    WriteLineConsole("");
    WriteLineConsole(dem24Hrs_CSEB[peakHrIndex]);
    WriteLineConsole(loadShedding24hrs_CSEB[peakHrIndex]);
    WriteLineConsole("");
    WriteLineConsole(drawal_CSEB);
    WriteLineConsole("");
    WriteLineConsole(availability_CSEB);
    WriteLineConsole(shortFallMUs_CSEB);
    WriteLineConsole(solarGen_CSEB);
    WriteLineConsole(hydroGen_CSEB);
    WriteLineConsole("");
    WriteLineConsole(maxDem_CSEB);
    WriteLineConsole(loadShedding24hrs_CSEB[maxDemTime_CSEB - 1]);
    WriteLineConsole(maxDemTime_CSEB);
    WriteLineConsole(dem3hrs_CSEB);
    WriteLineConsole(loadShedding24hrs_CSEB[2]);
    WriteLineConsole("*********** CSEB DATA ***********");
    WriteLineConsole("CSEB Hydro generation is " + hydroGen_CSEB);
    WriteLineConsole("CSEB drawal is " + drawal_CSEB);
    WriteLineConsole("CSEB availability is " + availability_CSEB);
    WriteLineConsole("CSEB maxDemand is " + maxDem_CSEB);
    WriteLineConsole("CSEB maxDemand is at " + maxDemTime_CSEB + " hrs");
    WriteLineConsole("CSEB 3HrsDemand is " + dem3hrs_CSEB);
    WriteLineConsole("CSEB 19HrsDemand is " + dem19hrs_CSEB);
    WriteLineConsole("CSEB 20HrsDemand is " + dem20hrs_CSEB);
    WriteLineConsole("CSEB LoadShedding is " + shortFallMUs_CSEB + " MUs");
    fillCSEBMapForm();
}

function fillCSEBMapForm() {
    fillFormField('hydroGen_CSEB', hydroGen_CSEB);
    fillFormField('solarGen_CSEB', solarGen_CSEB);
    fillFormField('drawal_CSEB', drawal_CSEB);
    fillFormField('availability_CSEB', availability_CSEB);
    fillFormField('maxDemTime_CSEB', maxDemTime_CSEB);
    fillFormField('maxDem_CSEB', maxDem_CSEB);
    fillFormField('dem3hrs_CSEB', dem3hrs_CSEB);
    fillFormField('dem19hrs_CSEB', dem19hrs_CSEB);
    fillFormField('dem20hrs_CSEB', dem20hrs_CSEB);
    fillFormField('ls3hrs_CSEB', loadShedding24hrs_CSEB[2]);
    fillFormField('ls19hrs_CSEB', loadShedding24hrs_CSEB[18]);
    fillFormField('ls20hrs_CSEB', loadShedding24hrs_CSEB[19]);
    fillFormField('lsMaxDem_CSEB', loadShedding24hrs_CSEB[maxDemTime_CSEB - 1]);
    fillFormField('shortFallMUs_CSEB', shortFallMUs_CSEB);

    fillFormField('BUDHIPADR-KORBA_EXPMU', Number(KORBA_BUDHIPADR_2_EXPMU) + Number(KORBA_BUDHIPADR_3_EXPMU));
    fillFormField('BUDHIPADR-KORBA_IMPMU', Number(KORBA_BUDHIPADR_2_IMPMU) + Number(KORBA_BUDHIPADR_3_IMPMU));
    fillFormField('BUDHIPADR-KORBA_EXPMW', Number(KORBA_BUDHIPADR_2_EXPMW) + Number(KORBA_BUDHIPADR_3_EXPMW));
    fillFormField('BUDHIPADR-KORBA_IMPMW', Number(KORBA_BUDHIPADR_2_IMPMW) + Number(KORBA_BUDHIPADR_3_IMPMW));

    fillFormField('RAIGRH-BUDHIPADR_EXPMU', RAIGRH_BUDHIPADR_EXPMU);
    fillFormField('RAIGRH-BUDHIPADR_IMPMU', RAIGRH_BUDHIPADR_IMPMU);
    fillFormField('RAIGRH-BUDHIPADR_EXPMW', RAIGRH_BUDHIPADR_EXPMW);
    fillFormField('RAIGRH-BUDHIPADR_IMPMW', RAIGRH_BUDHIPADR_IMPMW);
}