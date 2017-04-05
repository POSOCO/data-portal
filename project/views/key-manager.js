function loadConstKeys() {
    var selectBox = document.getElementById("genSelector");
    var user_id = selectBox.options[selectBox.selectedIndex].value;
    var url = "api/key_strings";
    if (user_id != null && !isNaN(user_id) && user_id > -1) {
        url += "?user_id=" + user_id;
    }
    $.ajax({
        url: url,
        type: 'GET',
        success: function (data) {
            toastr["info"]("Data successfully loaded!");
            var strs = [];
            var keys = data.keys;
            for (var i = 0; i < keys.length; i++) {
                strs[i] = keys[i]["users_id"] + ", " + keys[i]["key_str"] + ", " + keys[i]["description"] + ", " + keys[i]["type_info"];
            }
            document.getElementById("keyConfigStr").value = strs.join("\n");
            console.log(strs.join("\n"));
        },
        error: function (textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function saveConstKeys() {
    var str = document.getElementById("keyConfigStr").value;
    var sets = str.split("\n");
    var key_str = [];
    var key_info = [];
    var key_desc = [];
    var user_id = [];
    for (var i = 0; i < sets.length; i++) {
        var attrArray = sets[i].split(", ");
        if (attrArray.length == 4) {
            user_id.push(attrArray[0]);
            key_str.push(attrArray[1]);
            key_desc.push(attrArray[2]);
            key_info.push(attrArray[3]);
        }
    }
    var data = {user_id: user_id, key_str: key_str, key_desc: key_desc, key_info: key_info};
    //console.log("data to be saved is " + JSON.stringify(data));
    $.ajax({
        url: "api/key_strings/create",
        data: data,
        type: 'POST',
        success: function (data) {
            toastr["success"]("Data successfully saved!");
            console.log(data);
        },
        error: function (textStatus, errorThrown) {
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}