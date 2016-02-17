var allContacts = new GMach.GetAllContacts();
$(document).ready(function () {
    $.get('Header.html', function (data) {
        $('#header').html(data);

    });
    $('#contacts').DataTable({

        data: allContacts,

        columns: [
              { "data": "last_name" },
             { "data": "first_name" },
            { "data": "IdNumber" },
             { "data": "phoneNumber" },
             { "data": "mobileNumber" },
             { "data": "remarks" }
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