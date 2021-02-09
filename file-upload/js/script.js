$(document).ready(function () {
    $('#upload').on('click', function() {
        console.log($('#resume')[0].files[0]);
        var formData = new FormData();
        formData.append('file', $('#resume')[0].files[0]);
    });
});