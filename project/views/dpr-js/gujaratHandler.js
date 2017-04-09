//GUJARAT DATA
var hydroGen_GEB = "NA";
var hydroGen1_GEB = "NA";
var hydroGen2_GEB = "NA";
var hydroGen3_GEB = "NA";
var windGen_GEB = "NA";
var solarGen_GEB = "NA";
var availability_GEB = "NA";
var requirement_GEB = "NA";
var drawal_GEB = "NA";
var timeBlkRow_GEB = -1;
var timeBlkCol_GEB = -1;
var firstBlkRow_GEB = -1;
var demandCol_GEB = -1;
var dem24Hrs_GEB = [];
var maxDemTime_GEB = 25;
var maxDem_GEB = -1;
var dem3hrs_GEB = -1;
var dem19hrs_GEB = -1;
var dem20hrs_GEB = -1;
var pageends_GEB = [];
var uhpsrow_GEB = -1;
var uhpscol_GEB = -1;
var khpsrow_GEB = -1;
var khpscol_GEB = -1;
var lbcpanamhydro_GEB = -1;
var pvthydro_GEB = -1;

function handleGujarat(){
    hydroGen_GEB = "NA";
    hydroGen1_GEB = "NA";
    hydroGen2_GEB = "NA";
    hydroGen3_GEB = "NA";
    windGen_GEB = "NA";
    solarGen_GEB = "NA";
    availability_GEB = "NA";
    requirement_GEB = "NA";
    drawal_GEB = "NA";
    timeBlkRow_GEB = -1;
    timeBlkCol_GEB = -1;
    firstBlkRow_GEB = -1;
    demandCol_GEB = -1;
    dem24Hrs_GEB = [];
    maxDemTime_GEB = 25;
    maxDem_GEB = -1;
    dem3hrs_GEB = -1;
    dem19hrs_GEB = -1;
    dem20hrs_GEB = -1;
    pageends_GEB = [];
    uhpsrow_GEB = -1;
    uhpscol_GEB = -1;
    khpsrow_GEB = -1;
    khpscol_GEB = -1;
    lbcpanamhydro_GEB = -1;
    pvthydro_GEB = -1;

    var gujaratDataArray = dprReader.filesAfterReadArrays[consIDs[5]][0];
    for (var i = 0; i < gujaratDataArray.length; i++) {
        var row = gujaratDataArray[i];

        //Each page ends with 1 and a blank row after that row. Using this we are going to find the page ending cells
        //row = row.map(Function.prototype.call, String.prototype.trim) //trim whole the row
        if (row.length == row.reduce(function (n, val) {
                return n + (val === "");
            }, 0) + 1 && gujaratDataArray[i + 1].length == gujaratDataArray[i + 1].reduce(function (n, val) {
                return n + (val === "");
            }, 0) && row[0] == "1") {
            pageends_GEB.push(i + 1);
        }
        if (pageends_GEB.length == 0) {
            //Row in page 1
            val = findNonNullValueByTag(row, "WIND FARM");
            if (val != null) {
                windGen_GEB = val;
            }
            val = findNonNullValueByTag(row, "SOLAR ENERGY");
            if (val != null) {
                solarGen_GEB = val;
            }
            val = findColumnIndexOfStr(row, "UHPS");
            if (!(isNaN(val)) && val >= 0) {
                uhpscol_GEB = val;
                uhpsrow_GEB = i;
            }
            val = findColumnIndexOfStr(row, "KHPS");
            if (!(isNaN(val)) && val >= 0) {
                khpscol_GEB = val;
                khpsrow_GEB = i;
            }
            val = findNonNullValueByTag(row, "LBC + PANAM");
            if (val != null) {
                lbcpanamhydro_GEB = val;
            }
            val = findNonNullValueByTag(row, "PVT HYDRO");
            if (val != null) {
                pvthydro_GEB = val;
            }
        } else if (pageends_GEB.length > 0 && pageends_GEB.length < 2) {
            //Row in page 2
            val = findNonNullValueByTag(row, "TOTAL");
            if (val != null) {
                drawal_GEB = val;
            }
            val = findNonNullValueByTag(row, "UN-RESTRICTED DEMAND");
            if (val != null) {
                requirement_GEB = val;
            }
            val = findNonNullValueByTag(row, "CATERED");
            if (val != null) {
                availability_GEB = val;
            }
        } else {
            //Row in Page 3
            val = findColumnIndexOfStr(row, "TIME HOURS");
            if (!(isNaN(val)) && val >= 0) {
                timeBlkRow_GEB = i;
                timeBlkCol_GEB = val;
            }
            val = findColumnIndexOfStr(row, "GUJARAT CATERED");
            if (!(isNaN(val)) && val >= 0) {
                demandCol_GEB = val;
            }
            val = findColumnIndexOfStr(row, "FREQ. CORRECT");
            if (!(isNaN(val)) && val >= 0) {
                loadSheddingCol_GEB = val - 1;
            }
        }
    }
//find the 1stTimeBlk row
    if (timeBlkCol_GEB >= 0 && !isNaN(timeBlkCol_GEB)) {
        firstBlkRow_GEB = findRowIndexOfStrInCol(gujaratDataArray, timeBlkCol_GEB, 1, true, timeBlkRow_GEB);
        if (firstBlkRow_GEB != -1) {
            for (var hr = 1; hr <= 24; hr++) {
                dem24Hrs_GEB[hr - 1] = Number(gujaratDataArray[firstBlkRow_GEB + hr - 1][demandCol_GEB]);
            }
        }
    }
//find the uhpshydro value
    if (uhpsrow_GEB != -1) {
        var uhpstotalrow = findRowIndexOfStrInCol(gujaratDataArray, uhpscol_GEB + 1, "TOTAL", false, uhpsrow_GEB);
        var uhpshydro = "NA";
        if (uhpstotalrow != -1) {
            row = gujaratDataArray[uhpstotalrow];
            val = findNonNullValueByTag(row, "TOTAL");
            if (val != null) {
                uhpshydro = val;
            }
        }
    }
//find the khpshydro value
    if (khpsrow_GEB != -1) {
        var khpstotalrow = findRowIndexOfStrInCol(gujaratDataArray, khpscol_GEB + 1, "TOTAL", false, khpsrow_GEB);
        var khpshydro = "NA";
        if (khpstotalrow != -1) {
            row = gujaratDataArray[khpstotalrow];
            val = findNonNullValueByTag(row, "TOTAL");
            if (val != null) {
                khpshydro = val;
            }
        }
    }
    maxDemTime_GEB = indexOfMax(dem24Hrs_GEB) + 1;
    maxDem_GEB = dem24Hrs_GEB[maxDemTime_GEB - 1];
    dem3hrs_GEB = dem24Hrs_GEB[2];
    dem19hrs_GEB = dem24Hrs_GEB[peakHrIndex];
    dem20hrs_GEB = dem24Hrs_GEB[19];
    hydroGen_GEB = Number(uhpshydro) + Number(khpshydro) + Number(lbcpanamhydro_GEB) + Number(pvthydro_GEB);
    WriteLineConsole("*********** GUJARAT DATA ***********");
    WriteLineConsole(dem19hrs_GEB);
    WriteLineConsole(dem19hrs_GEB);
    WriteLineConsole(0);
    WriteLineConsole("");
    WriteLineConsole(drawal_GEB);
    WriteLineConsole(requirement_GEB);
    WriteLineConsole(availability_GEB);
    WriteLineConsole(requirement_GEB - availability_GEB);
    WriteLineConsole(solarGen_GEB);
    WriteLineConsole(hydroGen_GEB);
    WriteLineConsole(windGen_GEB);
    WriteLineConsole(maxDem_GEB);
    WriteLineConsole(0);
    WriteLineConsole(maxDemTime_GEB);
    WriteLineConsole(dem3hrs_GEB);
    WriteLineConsole(0);
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
}