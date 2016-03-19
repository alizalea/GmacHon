
function GetAllTransactionsVM(transList) {
    var trans = new Array();
    transList.forEach(function (tran) {
        var t = new Object();
        t.transaction_type = tran.constructor.name;
        t.contact = tran.contact;
        t.amount = tran.amount;
        t.transaction_date = tran.transaction_date;

        trans.push(t);
    }
     );

    return trans;

};

var oneGmach = new GMach.Model.OneGmach();
var allTransactions = GetAllTransactionsVM(oneGmach.Transactions());

$(document).ready(function () {

    $('#transactions').DataTable({

        data: allTransactions,

        columns: [
              { "data": "transaction_type" },
              { "data": "contact" },
              { "data": "amount" },
              { "data": "transaction_date" },

        ],

        select: true,

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

    var table = $('#transactions').DataTable();

    $('#transactions tbody').on('click', 'tr', function () {
        var id = table.row(this).data().id;
        window.location = "/HTML/Transaction.html?id=" + id;

    });

});
