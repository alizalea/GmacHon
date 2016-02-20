var allTransactions = new GMach.GetAllTransactions();
$(document).ready(function () {
    $.get('Header.html', function (data) {
        $('#header').html(data);

    });
    $('#transactions').DataTable({

        data: allTransactions,

        columns: [
              { "data": "transaction_type" },
             { "data": "contact" },
            { "data": "amount" },
             { "data": "transaction_date" },
            
        ],
        "language": {

            "lengthMenu": "מציג _MENU_ שורות לעמוד",

            "zeroRecords": "לא נמצאו תנועות",

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