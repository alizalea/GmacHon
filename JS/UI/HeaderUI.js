$(document).ready(function () {
    $.get('/HTML/Header.html', function (data) {
        $('#header').html(data);
    });
});