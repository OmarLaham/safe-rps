
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
var ext_pipe = []

//dict of exts. available to add (could have already been added or not)
var ext_available = {
    "Extension A": {
        "added": false,
        "dependencies": ["clustering-and-finding-markers"]
    }
}

var ext_add_after = "";

$('#modal-add-extension').on('shown.bs.modal', function () {

});

$(document).on('click', '.btn-follow-by-extension', function() {
    //find pipeline-step-card
    ext_add_after = $(this).closest('.pipeline-step').attr("id");
});

$("#btn-add-extension").click(function() {

    //get extension template html
    var ext_html = $('#extension-template').html();

    let ext_title = "Extension A";
    let ext_id = "step-" + ext_title.replace(" ", "-").toLowerCase();

    let ext_inputs = ["inp1", "inp2"];
    let ext_dep = ["dep1", "dep2"];
    let ext_summary = "<li>summary1</li><li>summary2</li>";
    let ext_outputs = ["output1", "output2"];

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
        $('#' + ext_id + " .step-dependecies").append(html);
    }

    //set outputs
    for (var i = 0; i < ext_outputs.length; i++) {
        let html = "<span class=\"badge bg-light step-input\">" + ext_outputs[i] + "</span>&nbsp;";
        $('#' + ext_id + " .step-outputs").append(html);
    }

    $('#modal-add-extension').modal('hide');

});

//========================== / Adding extensions =========================

