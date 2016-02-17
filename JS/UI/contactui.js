$(document).ready(function () {
    $.get('Header.html', function (data) {
        $('#header').html(data);

    });
    $('#contacts').DataTable({

        data: Contacts,

        columns: [
             { "data": "first_name" },
             { "data": "last_name" },
             { "data": "tz" },
             { "data": "tel" },
             { "data": "pel" },
             { "data": "notes" }
        ],
        "language": {

            "lengthMenu": "מציג _MENU_ שורות לעמוד",

            "zeroRecords": "לא נמצאו אנשי קשר",

            "info": "מספר דף _PAGE_ מתוך _PAGES_",

            "infoEmpty": "אין פריטים לתצוגה",

            "infoFiltered": "(filtered from _MAX_ total records)",
            "search": "חיפוש",

            "paginate": {

                "first": "עמוד ראשון",

                "last": "עמוד אחרון",

                "next": "הבא",

                "previous": "הקודם"

            },
        }
    });

});