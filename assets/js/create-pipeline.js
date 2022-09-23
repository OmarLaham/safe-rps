
$(document).ready(function() {
    //init all popovers
    const popoverTriggerList = document.querySelectorAll('[data-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
});

$(document).on('click', '.btn-step-del', function() {

    let element = this;

    $.confirm({
        title: 'Sure?',
        content: 'Are you sure you want to remove this extension?',
        buttons: {
            Yes: function () {

                //find pipeline-step-card
                $(element).closest('.pipeline-step-card').remove();

                $.alert('Extension removed!');
            },
            Cancel: function () {
                $.alert('Canceled!');
            }
        }
    });


});



//========================== Adding extensions =========================

//list of exts. added to current pipeline
var ext_pipe = ["upload-data", "preprocessing", "dimensionality-reduction", "clustering-and-finding-markers"]

//dict of exts. available to add (could have already been added or not)
var ext_available = {
    "trajectory-analysis": {
        "title": "Trajectory Analysis",
        "added": false,
        "inputs": ['DEA results'],
        "dependencies": ["clustering-and-finding-markers"],
        "summary": "<ul><li>Root cells automatically detected</li><li>Pseudotime trajectory analysis</li></ul>",
        "outputs": ["Trajectory analysis UMAP/tSNE with nodes and pseudotime"]
    },
    "go-enrichment-analysis": {
        "title": "GO Enrichment Analysis",
        "added": false,
        "inputs": ['DEA results'],
        "dependencies": ["clustering-and-finding-markers"],
        "summary": "<ul><li>EnrichR is used for this analysis</li><li>Enrichemnt and depletion</li><li>Biological Processes</li><li>Cellular Components</li><li>Molecular Functions</li></ul>",
        "outputs": ["Enrichment analysis results", "Volcano and MA plots for each cluster"]
    },
    "extension-x": {
        "title": "Extension X",
        "added": false,
        "inputs": ['DEA results'],
        "dependencies": ["clustering-and-finding-markers"],
        "summary": "<ul><li>Example dependcy extension for cell-cell communication extension</li></ul>",
        "outputs": [".csv file for.."]
    },
    "cell-cell-communication": {
        "title": "Cell-Cell Communication",
        "added": false,
        "inputs": ['DEA results'],
        "dependencies": ["clustering-and-finding-markers", "extension-x"],
        "summary": "<ul><li>Root cells automatically detected</li><li>Pseudotime trajectory analysis</li></ul>",
        "outputs": ["Aggregated cell-cell communication network", "Single and overall visualization for the aggregated cell-cell communication network"]
    }
}

var ext_add_after = "";

//on add extension modal firing
$('#modal-add-extension').on('shown.bs.modal', function () {

    //alter available ext. list in add extension modal
    var html = ""; //html to show in modal-ext-lst inside modal

    //list all available NOT added extensions
    Object.keys(ext_available).forEach(function(key) {
        //console.log(key, ext_available[key]);
        let ext = ext_available[key];

        if (ext["added"] === false) {//list only non-added ext.
            let dependencies = ext["dependencies"];
            var missing_dependencies = [];
            for (let i = 0; i < dependencies.length; i++) {
                if(ext_pipe.includes(dependencies[i]) === false) {
                    missing_dependencies.push("<span class='badge bg-light'>" + ext_available[dependencies[i]]["title"] + "</span>");

                }
            }
            if(missing_dependencies.length == 0) { // no missing dependencies
                html += "<input type='radio' name='rdo-add-ext-names' value='" + key + "'> " + ext["title"] + "<br />";
            } else { // some missing dependencies
                html += "<input type='radio' name='rdo-add-ext-names' disabled='disabled' value='" + key + "'> " + ext["title"] + " <span class='badge bg-danger text-light'>Missing Dependencies: </span>: " + missing_dependencies.join("&nbsp;") + "<br />";
            }
        }


    });


    if(html != "") {
        $('#btn-add-extension').removeClass('d-none');
    } else { //if all are already added!
        html = "No other extensions can be added to your pipeline!<br />We are always happy to <a href='mailto@p.omarlahham@gmail.com'>get in touch</a> to discuss custom extensions for your research or business."
        $('#btn-add-extension').addClass('d-none');
    }

    //replace old HTML
    $('#modal-ext-lst').html(html);

});

$(document).on('click', '.btn-follow-by-extension', function() {
    //find pipeline-step-card to add extension after it
    ext_add_after = $(this).closest('.pipeline-step').attr("id");

});

$("#btn-add-extension").click(function() {

    //get extension template html
    var ext_html = $('#extension-template').html();

    //get id of added extension
    let ext_id = $("input[name=rdo-add-ext-names]:checked").val();

    let ext_title = ext_available[ext_id]["title"];
    let ext_inputs = ext_available[ext_id]["inputs"];
    let ext_dep = ext_available[ext_id]["dependencies"];
    let ext_summary = ext_available[ext_id]["summary"];
    let ext_outputs = ext_available[ext_id]["outputs"];

    //set card id so we can added it to fill the gaps in the template
    ext_html = ext_html.replace("step-id-place-holder", ext_id);

    //add card
    $("#" + ext_add_after).closest('.pipeline-step-card').after(ext_html);

    //set title
    $('#' + ext_id + " .step-title").html(ext_title);
    //set summary
    $('#' + ext_id + " .step-summary").html(ext_summary);

    //set inputs
    for (var i = 0; i < ext_inputs.length; i++) {
        let html = "<span class=\"badge bg-light step-input\">" + ext_inputs[i] + "</span>&nbsp;";
        $('#' + ext_id + " .step-inputs").append(html);
    }

    //set dependecies
    for (var i = 0; i < ext_dep.length; i++) {
        let html = "<span class=\"badge bg-light step-input\">" + ext_dep[i] + "</span>&nbsp;";
        $('#' + ext_id + " .step-dependencies").append(html);
    }

    //set outputs
    for (var i = 0; i < ext_outputs.length; i++) {
        let html = "<span class=\"badge bg-light step-input\">" + ext_outputs[i] + "</span>&nbsp;";
        $('#' + ext_id + " .step-outputs").append(html);
    }

    //TOOD: better to add in correct order to allow following by extensions only in the correct place
    ext_pipe.push(ext_id);

    $('#modal-add-extension').modal('hide');

});

//========================== / Adding extensions =========================

