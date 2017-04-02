var base_url = "http://localhost:3000";

document.onreadystatechange = function () {
    if (document.readyState == "interactive") {

    } else if (document.readyState == "complete") {
        populateColors(document.getElementById("colors"));
        populateOccasions(document.getElementById("occasions"));
        populateTags(document.getElementById("tags"));
        populateTypes(document.getElementById("product_types"));
        $(".chosen-select").chosen({enable_split_word_search: true, search_contains: true});
        enableImageRead();
    }
};

enableImageRead = function () {
    //Check File API support
    if (window.File && window.FileList && window.FileReader) {
        var filesInput = document.getElementById("product_images");
        filesInput.addEventListener("change", function (event) {
            var files = event.target.files; //FileList object
            var output = document.getElementById("product_images_preview");
            output.innerHTML = "";
            for (var i = files.length - 1; i >= 0; i--) {
                var file = files[i];
                //Only pics
                if (!file.type.match('image'))
                    continue;
                var picReader = new FileReader();
                picReader.addEventListener("load", (function (i) {
                    return function (event) {
                        var picFile = event.target;
                        var div = document.createElement("div");
                        div.innerHTML = "<input type='radio' style='height:100px' name='default_image_index' value=" + i + " checked><img class='thumbnail' src='" + picFile.result + "'" +
                            "title='" + picFile.name + "'/>";
                        output.insertBefore(div, output.firstChild);
                    };
                })(i));
                //Read the image
                picReader.readAsDataURL(file);
            }
        });
    }
    else {
        console.log("Your browser does not support File API");
    }
};

function populateTypes(element) {
    $.ajax({
        //fetch categories from sever
        url: "./api/product_types/",
        type: "GET",
        dataType: "json",
        success: function (data) {
            //toastr["info"]("Categories fetch result is " + JSON.stringify(data.categories));
            console.log("product_types fetched are " + JSON.stringify(data.product_types));
            fillProductTypesSelect(element, data.product_types);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            toastr.error("The error from server for product_types fetch is --- " + jqXHR.responseJSON.message);
        }
    });
}

function fillProductTypesSelect(sel, options) {
    if (options.constructor !== Array) {
        return;
    }
    var selectedVals = $(sel).val();
    $(sel).empty();
    $(sel).trigger("chosen:updated");
    for (var i = 0; i < options.length; i++) {
        $(sel).append($("<option/>", {
            value: options[i].id,
            text: options[i].type
        }));
    }
    //change selected entities by the following statement
    $(sel).val(selectedVals).trigger("chosen:updated");
    $(sel).trigger("chosen:updated");
}

function populateOccasions(element) {
    $.ajax({
        //fetch categories from sever
        url: "./api/occasions/",
        type: "GET",
        dataType: "json",
        success: function (data) {
            //toastr["info"]("Categories fetch result is " + JSON.stringify(data.categories));
            console.log("occasions fetched are " + JSON.stringify(data.occasions));
            fillOccasionsSelect(element, data.occasions);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            toastr.error("The error from server for occasions fetch is --- " + jqXHR.responseJSON.message);
        }
    });
}

function fillOccasionsSelect(sel, options) {
    if (options.constructor !== Array) {
        return;
    }
    var selectedVals = $(sel).val();
    $(sel).empty();
    $(sel).trigger("chosen:updated");
    for (var i = 0; i < options.length; i++) {
        $(sel).append($("<option/>", {
            value: options[i].id,
            text: options[i].occasion
        }));
    }
    //change selected entities by the following statement
    $(sel).val(selectedVals).trigger("chosen:updated");
    $(sel).trigger("chosen:updated");
}

function populateColors(element) {
    $.ajax({
        //fetch categories from sever
        url: "./api/colors/",
        type: "GET",
        dataType: "json",
        success: function (data) {
            //toastr["info"]("Categories fetch result is " + JSON.stringify(data.colors));
            console.log("colors fetched are " + JSON.stringify(data.colors));
            fillColorsSelect(element, data.colors);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            toastr.error("The error from server for colors fetch is --- " + jqXHR.responseJSON.message);
        }
    });
}

function fillColorsSelect(sel, options) {
    if (options.constructor !== Array) {
        return;
    }
    var selectedVals = $(sel).val();
    $(sel).empty();
    $(sel).trigger("chosen:updated");
    for (var i = 0; i < options.length; i++) {
        $(sel).append($("<option/>", {
            value: options[i].id,
            text: options[i].color
        }));
    }
    //change selected entities by the following statement
    $(sel).val(selectedVals).trigger("chosen:updated");
    $(sel).trigger("chosen:updated");
}

function populateTags(element) {
    $.ajax({
        //fetch categories from sever
        url: "./api/tags/",
        type: "GET",
        dataType: "json",
        success: function (data) {
            //toastr["info"]("Tags fetch result is " + JSON.stringify(data.colors));
            console.log("tags fetched are " + JSON.stringify(data.tags));
            fillTagsSelect(element, data.tags);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            toastr.error("The error from server for tags fetch is --- " + jqXHR.responseJSON.message);
        }
    });
}

function fillTagsSelect(sel, options) {
    if (options.constructor !== Array) {
        return;
    }
    var selectedVals = $(sel).val();
    $(sel).empty();
    $(sel).trigger("chosen:updated");
    for (var i = 0; i < options.length; i++) {
        $(sel).append($("<option/>", {
            value: options[i].id,
            text: options[i].tag
        }));
    }
    //change selected entities by the following statement
    $(sel).val(selectedVals).trigger("chosen:updated");
    $(sel).trigger("chosen:updated");
}

function addNewProductType() {
    var newType = document.getElementById("new_product_type").value;
    if (newType == null || newType.trim() == "") {
        document.getElementById("new_product_type").value = "";
        return;
    }
    $.ajax({
        //fetch categories from sever
        url: "./api/product_types/",
        type: "POST",
        data: {"product_type": newType.trim()},
        dataType: "json",
        success: function (data) {
            //toastr["info"]("Categories fetch result is " + JSON.stringify(data.tags));
            console.log("product_type creation result is " + JSON.stringify(data));
            if (data.insertId == null) {
                toastr.error("Couldn't create a product_type --- " + JSON.stringify(data));
                return;
            }
            document.getElementById("new_product_type").value = "";
            populateTypes(document.getElementById("product_types"));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            toastr.error("The error from server for product_type create is --- " + jqXHR.responseJSON.message);
        }
    });

}

function addNewOccasion() {
    var new_occasion = document.getElementById("new_occasion").value;
    if (new_occasion == null || new_occasion.trim() == "") {
        document.getElementById("new_occasion").value = "";
        return;
    }
    $.ajax({
        //fetch categories from sever
        url: "./api/occasions/",
        type: "POST",
        data: {"occasion": new_occasion.trim()},
        dataType: "json",
        success: function (data) {
            //toastr["info"]("Categories fetch result is " + JSON.stringify(data.tags));
            console.log("occasion creation result is " + JSON.stringify(data));
            if (data.insertId == null) {
                toastr.error("Couldn't create an occasion --- " + JSON.stringify(data));
                return;
            }
            document.getElementById("new_occasion").value = "";
            populateOccasions(document.getElementById("occasions"));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            toastr.error("The error from server for occasion create is --- " + jqXHR.responseJSON.message);
        }
    });

}

function addNewColor() {
    var new_color = document.getElementById("new_color").value;
    if (new_color == null || new_color.trim() == "") {
        document.getElementById("new_color").value = "";
        return;
    }
    $.ajax({
        //fetch categories from sever
        url: "./api/colors/",
        type: "POST",
        data: {"color": new_color.trim()},
        dataType: "json",
        success: function (data) {
            //toastr["info"]("Categories fetch result is " + JSON.stringify(data.tags));
            console.log("color creation result is " + JSON.stringify(data));
            if (data.insertId == null) {
                toastr.error("Couldn't create a color --- " + JSON.stringify(data));
                return;
            }
            document.getElementById("new_color").value = "";
            populateColors(document.getElementById("colors"));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            toastr.error("The error from server for color create is --- " + jqXHR.responseJSON.message);
        }
    });

}

function addNewTag() {
    var new_tag = document.getElementById("new_tag").value;
    if (new_tag == null || new_tag.trim() == "") {
        document.getElementById("new_tag").value = "";
        return;
    }
    $.ajax({
        //fetch categories from sever
        url: "./api/tags/",
        type: "POST",
        data: {"tag": new_tag.trim()},
        dataType: "json",
        success: function (data) {
            //toastr["info"]("Tags fetch result is " + JSON.stringify(data.tags));
            console.log("tag creation result is " + JSON.stringify(data));
            if (data.insertId == null) {
                toastr.error("Couldn't create a tag --- " + JSON.stringify(data));
                return;
            }
            document.getElementById("new_tag").value = "";
            populateTags(document.getElementById("tags"));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            toastr.error("The error from server for tag create is --- " + jqXHR.responseJSON.message);
        }
    });

}

/* todo Not working, make it work - http://stackoverflow.com/questions/18706735/adding-text-other-than-the-selected-text-options-to-the-select-with-the-chosen-p/18707331#18707331*/
function manipulateTagsSelect() {
    var select, chosen;
    // Cache the select element as we'll be using it a few times
    select = document.getElementById("tags");
    // Init the chosen plugin
    select.chosen({no_results_text: 'Press Enter to add new entry:'});
    // Get the chosen object
    chosen = select.data('chosen');
    // Bind the keyup event to the search box input
    chosen.search_field.on('keyup', function (e) {
        // If we hit Enter and the results list is empty (no matches) add the option
        if (e.which == 13 && chosen.dropdown.find('li.no-results').length > 0) {
            var option = $("<option>").val(this.value).text(this.value);
            // Add the new option
            select.prepend(option);
            // Automatically select it
            select.find(option).prop('selected', true);
            // Trigger the update
            select.trigger("chosen:updated");
        }
    });
}

function createProduct() {
    document.getElementById("product_types_chosen").style.border = '';
    document.getElementById("product_images").style.border = '';
    var product_type_ids = $(document.getElementById("product_types")).val();
    var occasion_ids = $(document.getElementById("occasions")).val();
    var price = document.getElementById("price").value;
    var color_ids = $(document.getElementById("colors")).val();
    var size = document.getElementById("size").value;
    var description = document.getElementById("description").value;
    var tag_ids = $(document.getElementById("tags")).val();
    var imageFiles = [];
    var files = document.getElementById("product_images").files;

    var warning_messages = [];
    // there should be at least one product type
    if (product_type_ids == null || product_type_ids.length <= 0) {
        document.getElementById("product_types_chosen").style.border = '1px solid #f00';
        warning_messages.push("There should be at least 1 product type");
    }
    // there should be at least one image file
    if (files.length <= 0) {
        document.getElementById("product_images").style.border = '1px solid #f00';
        warning_messages.push("There should be at least 1 image");
    }

    if (warning_messages.length > 0) {
        document.getElementById("message_crumb").innerHTML = "" + warning_messages.join("  |  ");
        return;
    } else {
        document.getElementById("message_crumb").innerHTML = "";
    }
    var data = new FormData(document.getElementById("product_form"));

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        //Only pics
        if (!file.type.match('image')) {
            continue;
        }
        imageFiles.push(file);
    }
    //console.log("Form data is " + data);

    $.ajax({
        //fetch categories from sever
        url: "./api/products/",
        type: "POST",
        data: data,
        contentType: false,
        processData: false,
        success: function (data) {
            toastr["success"]("Successfully created a product with id " + data.insertId);
            //console.log("product creation result is " + JSON.stringify(data));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            toastr.error("The error from server for product create is --- " + jqXHR.responseJSON.message);
        }
    });
}


function clearForm() {
    $(document.getElementById("product_types")).val([]).trigger("chosen:updated");
    $(document.getElementById("occasions")).val([]).trigger("chosen:updated");
    document.getElementById("price").value = "";
    $(document.getElementById("colors")).val([]).trigger("chosen:updated");
    document.getElementById("size").value = "";
    document.getElementById("description").value = "";
    $(document.getElementById("tags")).val([]).trigger("chosen:updated");
    document.getElementById("product_images").value = "";
    var output = document.getElementById("product_images_preview");
    output.innerHTML = "";
}

function clearNonDbImages() {
    $.ajax({
        // fetch categories from sever
        url: "./api/products/deleteimages",
        type: "GET",
        success: function (data) {
            toastr["success"](JSON.stringify(data));
            //console.log("product creation result is " + JSON.stringify(data));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            toastr.error("Error --- " + jqXHR.responseJSON.message);
        }
    });
}