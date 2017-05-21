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
var bad_sak_exp_mu_MP = "0";
var bad_sak_imp_mu_MP = "0";
var bad_sak_exp_mw_MP = "0";
var bad_sak_imp_mw_MP = "0";
var bad_mod_exp_mu_MP = "0";
var bad_mod_imp_mu_MP = "0";
var bad_mod_exp_mw_MP = "0";
var bad_mod_imp_mw_MP = "0";
var meh_aur_exp_mu_MP = "0";
var meh_aur_imp_mu_MP = "0";
var meh_aur_exp_mw_MP = "0";
var meh_aur_imp_mw_MP = "0";
var mal_aur_exp_mu_MP = "0";
var mal_aur_imp_mu_MP = "0";
var mal_aur_exp_mw_MP = "0";
var mal_aur_imp_mw_MP = "0";

var mpCsvAddresses = {
    mp_hydel_MU_MP: convertExcelAddressToXY("G20"),
    indrasagar_MU_MP: convertExcelAddressToXY("G22"),
    omkareshwar_MU_MP: convertExcelAddressToXY("G23"),
    solar_MU_MP: convertExcelAddressToXY("G24"),
    wind_MU_MP: convertExcelAddressToXY("G25"),
    avail_excl_aux_MU_MP: convertExcelAddressToXY("G27"),
    avail_aux_MU_MP: convertExcelAddressToXY("E36"),
    drawal_MU_MP: convertExcelAddressToXY("E40"),
    demand_MW_col_MP: convertExcelAddressToXY("D5"),
    ls_MW_col_MP: convertExcelAddressToXY("F5"),
    unrestr_ls_MW_col_MP: convertExcelAddressToXY("G5"),
    freq_corr_MW_col_MP: convertExcelAddressToXY("H5"),
    "BADOD-SAKATPUR_EXPMU": convertExcelAddressToXY("I57"),
    "BADOD-SAKATPUR_IMPMU": convertExcelAddressToXY("I56"),
    "BADOD-SAKATPUR_EXPMW": convertExcelAddressToXY("C57"),
    "BADOD-SAKATPUR_IMPMW": convertExcelAddressToXY("C56"),
    "BHANPURA-MODAK_EXPMU": convertExcelAddressToXY("I59"),
    "BHANPURA-MODAK_IMPMU": convertExcelAddressToXY("I58"),
    "BHANPURA-MODAK_EXPMW": convertExcelAddressToXY("C59"),
    "BHANPURA-MODAK_IMPMW": convertExcelAddressToXY("C58"),
    "MEHGAON-AURAIYA_EXPMU": convertExcelAddressToXY("I61"),
    "MEHGAON-AURAIYA_IMPMU": convertExcelAddressToXY("I60"),
    "MEHGAON-AURAIYA_EXPMW": convertExcelAddressToXY("C61"),
    "MEHGAON-AURAIYA_IMPMW": convertExcelAddressToXY("C60"),
    "MALANPUR-AURAIYA_EXPMU": convertExcelAddressToXY("I63"),
    "MALANPUR-AURAIYA_IMPMU": convertExcelAddressToXY("I62"),
    "MALANPUR-AURAIYA_EXPMW": convertExcelAddressToXY("C63"),
    "MALANPUR-AURAIYA_IMPMW": convertExcelAddressToXY("C62")
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
        if (dataArray.length < 65) {
            mpHourlyDataArray = dataArray;
        } else {
            mpDataArray = dataArray;
        }
    }
    hydroGen_MP = Number(getByAddressFromArray(mpDataArray, mpCsvAddresses["mp_hydel_MU_MP"])) / 10;
    hydroGen_MP += Number(getByAddressFromArray(mpDataArray, mpCsvAddresses["indrasagar_MU_MP"])) / 10;
    hydroGen_MP += Number(getByAddressFromArray(mpDataArray, mpCsvAddresses["omkareshwar_MU_MP"])) / 10;
    drawal_MP = getByAddressFromArray(mpDataArray, mpCsvAddresses["drawal_MU_MP"]) / 10;
    var availabilityExc_MP = getByAddressFromArray(mpDataArray, mpCsvAddresses["avail_excl_aux_MU_MP"]) / 10;
    var availabilityAux_MP = getByAddressFromArray(mpDataArray, mpCsvAddresses["avail_aux_MU_MP"]) / 10;
    windGen_MP = getByAddressFromArray(mpDataArray, mpCsvAddresses["wind_MU_MP"]) / 10;
    solarGen_MP = getByAddressFromArray(mpDataArray, mpCsvAddresses["solar_MU_MP"]) / 10;
    for (var hr = 1; hr <= 24; hr++) {
        dem24Hrs_MP[hr - 1] = getByAddressFromArray(mpHourlyDataArray, mpCsvAddresses["demand_MW_col_MP"], hr - 1);
        loadShedding24hrs_MP[hr - 1] = Number(getByAddressFromArray(mpHourlyDataArray, mpCsvAddresses["ls_MW_col_MP"], hr - 1));
        loadShedding24hrs_MP[hr - 1] += Number(getByAddressFromArray(mpHourlyDataArray, mpCsvAddresses["unrestr_ls_MW_col_MP"], hr - 1));
    }
    if (availabilityAux_MP != null && availabilityExc_MP != null) {
        availability_MP = Number(availabilityAux_MP) + Number(availabilityExc_MP);
    }
    maxDemTime_MP = indexOfMax(dem24Hrs_MP) + 1;
    maxDem_MP = dem24Hrs_MP[maxDemTime_MP - 1];
    dem3hrs_MP = dem24Hrs_MP[2];
    dem19hrs_MP = dem24Hrs_MP[18];
    dem20hrs_MP = dem24Hrs_MP[19];
    shortFallMUs_MP = loadShedding24hrs_MP.reduce(function (pv, cv) {
            return pv + cv;
        }, 0) / 1000;
    WriteLineConsole("*********** MP DATA ***********");
    WriteLineConsole("");
    WriteLineConsole(dem24Hrs_MP[peakHrIndex]);
    WriteLineConsole(loadShedding24hrs_MP[peakHrIndex]);
    WriteLineConsole("");
    WriteLineConsole(drawal_MP);
    WriteLineConsole("");
    WriteLineConsole(availability_MP);
    WriteLineConsole(shortFallMUs_MP);
    WriteLineConsole(solarGen_MP);
    WriteLineConsole(hydroGen_MP);
    WriteLineConsole(windGen_MP);
    WriteLineConsole(maxDem_MP);
    WriteLineConsole(loadShedding24hrs_MP[maxDemTime_MP - 1]);
    WriteLineConsole(maxDemTime_MP);
    WriteLineConsole(dem3hrs_MP);
    WriteLineConsole(loadShedding24hrs_MP[2]);
    WriteLineConsole("*********** MP DATA ***********");
    WriteLineConsole("MP Hydro generation is " + hydroGen_MP);
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

    var convertStrToValMP = function (variab) {
        if (isNaN(variab)) {
            return 0;
        }
        return Number(variab);
    };
    bad_sak_exp_mu_MP = convertStrToValMP(getByAddressFromArray(mpDataArray, mpCsvAddresses["BADOD-SAKATPUR_EXPMU"])) / 10;
    bad_sak_imp_mu_MP = convertStrToValMP(getByAddressFromArray(mpDataArray, mpCsvAddresses["BADOD-SAKATPUR_IMPMU"])) / 10;
    bad_sak_exp_mw_MP = convertStrToValMP(getByAddressFromArray(mpDataArray, mpCsvAddresses["BADOD-SAKATPUR_EXPMW"]));
    bad_sak_imp_mw_MP = convertStrToValMP(getByAddressFromArray(mpDataArray, mpCsvAddresses["BADOD-SAKATPUR_IMPMW"]));
    bad_mod_exp_mu_MP = convertStrToValMP(getByAddressFromArray(mpDataArray, mpCsvAddresses["BHANPURA-MODAK_EXPMU"])) / 10;
    bad_mod_imp_mu_MP = convertStrToValMP(getByAddressFromArray(mpDataArray, mpCsvAddresses["BHANPURA-MODAK_IMPMU"])) / 10;
    bad_mod_exp_mw_MP = convertStrToValMP(getByAddressFromArray(mpDataArray, mpCsvAddresses["BHANPURA-MODAK_EXPMW"]));
    bad_mod_imp_mw_MP = convertStrToValMP(getByAddressFromArray(mpDataArray, mpCsvAddresses["BHANPURA-MODAK_IMPMW"]));
    meh_aur_exp_mu_MP = convertStrToValMP(getByAddressFromArray(mpDataArray, mpCsvAddresses["MEHGAON-AURAIYA_EXPMU"])) / 10;
    meh_aur_imp_mu_MP = convertStrToValMP(getByAddressFromArray(mpDataArray, mpCsvAddresses["MEHGAON-AURAIYA_IMPMU"])) / 10;
    meh_aur_exp_mw_MP = convertStrToValMP(getByAddressFromArray(mpDataArray, mpCsvAddresses["MEHGAON-AURAIYA_EXPMW"]));
    meh_aur_imp_mw_MP = convertStrToValMP(getByAddressFromArray(mpDataArray, mpCsvAddresses["MEHGAON-AURAIYA_IMPMW"]));
    mal_aur_exp_mu_MP = convertStrToValMP(getByAddressFromArray(mpDataArray, mpCsvAddresses["MALANPUR-AURAIYA_EXPMU"])) / 10;
    mal_aur_imp_mu_MP = convertStrToValMP(getByAddressFromArray(mpDataArray, mpCsvAddresses["MALANPUR-AURAIYA_IMPMU"])) / 10;
    mal_aur_exp_mw_MP = convertStrToValMP(getByAddressFromArray(mpDataArray, mpCsvAddresses["MALANPUR-AURAIYA_EXPMW"]));
    mal_aur_imp_mw_MP = convertStrToValMP(getByAddressFromArray(mpDataArray, mpCsvAddresses["MALANPUR-AURAIYA_IMPMW"]));
    fillMPForm();
}

function fillMPForm() {
    fillFormField('hydroGen_MP', hydroGen_MP);
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
    fillFormField('BADOD-SAKATPUR_EXPMU', bad_sak_exp_mu_MP);
    fillFormField('BADOD-SAKATPUR_IMPMU', bad_sak_imp_mu_MP);
    fillFormField('BADOD-SAKATPUR_EXPMW', bad_sak_exp_mw_MP);
    fillFormField('BADOD-SAKATPUR_IMPMW', bad_sak_imp_mw_MP);
    fillFormField('BHANPURA-MODAK_EXPMU', bad_mod_exp_mu_MP);
    fillFormField('BHANPURA-MODAK_IMPMU', bad_mod_imp_mu_MP);
    fillFormField('BHANPURA-MODAK_EXPMW', bad_mod_exp_mw_MP);
    fillFormField('BHANPURA-MODAK_IMPMW', bad_mod_imp_mw_MP);
    fillFormField('MEHGAON-AURAIYA_EXPMU', meh_aur_exp_mu_MP);
    fillFormField('MEHGAON-AURAIYA_IMPMU', meh_aur_imp_mu_MP);
    fillFormField('MEHGAON-AURAIYA_EXPMW', meh_aur_exp_mw_MP);
    fillFormField('MEHGAON-AURAIYA_IMPMW', meh_aur_imp_mw_MP);
    fillFormField('MALANPUR-AURAIYA_EXPMU', mal_aur_exp_mu_MP);
    fillFormField('MALANPUR-AURAIYA_IMPMU', mal_aur_imp_mu_MP);
    fillFormField('MALANPUR-AURAIYA_EXPMW', mal_aur_exp_mw_MP);
    fillFormField('MALANPUR-AURAIYA_IMPMW', mal_aur_imp_mw_MP);
}