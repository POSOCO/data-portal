/**
 * Created by Nagasudhir on 8/26/2016.
 */
"use strict";

function DPRReader() {
    this.consIDs = [];
    this.filesArray = {};
    this.filesAfterReadArrays = {};
    this.fileIterator = {};
    this.resetAndCreateArrays = resetAndCreateArrays.bind(this);
    this.setConsIDs = setConsIDs.bind(this);
    this.pushFiles = pushFiles.bind(this);
    this.afterEachRead = afterEachRead.bind(this);
    this.loadNext = loadNext.bind(this);

    function setConsIDs(consIDs) {
        this.consIDs = consIDs;
    }

    function getConsIDs() {
        return this.consIDs
    }

    function resetAndCreateArrays(id) {
        this.filesArray[id] = [];
        this.filesAfterReadArrays[id] = [];
        this.fileIterator[id] = 0;
    }

    function pushFiles(newFile, id) {
        if (!Array.isArray(this.filesArray[id])) {
            this.filesArray[id] = [];
        }
        this.filesArray[id].push(newFile);
    }

    //file reader feature
    function loadNext(id) {
        //remove file from array to save memory
        this.filesArray[id][this.fileIterator[id]] = null;
        this.fileIterator[id] = this.fileIterator[id] + 1;
        if (this.fileIterator[id] < this.filesArray[id].length) {
            this.afterEachRead(id);
        }
    }

    //file reader feature
    function afterEachRead(id) {
        var reader = new FileReader();
        if (!Array.isArray(this.filesAfterReadArrays[id])) {
            this.filesAfterReadArrays[id] = [];
        }
        var file = this.filesArray[id][this.fileIterator[id]];
        reader.onload = function (e) {
            this.filesAfterReadArrays[id][this.fileIterator[id]] = CSVToArray(reader.result);
            //do something with the text here
            console.log("The parsed file for id " + id + " is ");
            console.log(this.filesAfterReadArrays[id][this.fileIterator[id]]);
            this.loadNext(id);
        }.bind(this);
        reader.readAsText(file);
    }
}