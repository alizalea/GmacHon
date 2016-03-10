$(document).ready(function () {
    $.get('../Header.html', function (data) {
        $('#header').html(data);
    });
});