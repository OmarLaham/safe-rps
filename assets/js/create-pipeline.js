
$(document).ready(function() {
    //init all popovers
    const popoverTriggerList = document.querySelectorAll('[data-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
});
