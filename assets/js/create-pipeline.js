
$(document).ready(function() {
    //init all popovers
    const popoverTriggerList = document.querySelectorAll('[data-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
});

$('.btn-step-del').click(function() {
    //find pipeline-step-card
    $(this).closest('.pipeline-step-card').remove();
});