/**
 * Created by Nagasudhir on 8/26/2016.
 */
//Console Functions
function WriteLineConsole(str, tag) {
    var mConsole = document.getElementById("console");
    if (mConsole == null) {
        console.log(str);
        return;
    }
    if (str === "") {
        mConsole.appendChild(document.createElement("br"));
    } else {
        var para = document.createElement("div");
        var node = document.createTextNode(str);
        para.appendChild(node);
        mConsole.appendChild(para);
        //mConsole.insertBefore(para, mConsole.firstChild);
        doStyling(para.style, tag, "small");
    }
}

//Console Functions
function doStyling(style, tag, fontSize) {
    style.display = 'block';
    style.fontSize = fontSize ? fontSize : "0.8em";
    style.fontFamily = "Courier New";
    if (tag == 'error') {
        style.color = 'red';
    } else if (tag == 'warning') {
        style.color = '#FF8C00';
    } else if (tag == 'info') {
        style.color = 'blue';
    } else if (tag == 'success') {
        style.color = 'blue';
    }
}

//Console Functions
function clearConsole() {
    var mConsole = document.getElementById("console");
    mConsole.innerHTML = "";
}