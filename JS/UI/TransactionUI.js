
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

var allTransactions = GetAllTransactionsVM(new GMach.Model.Transaction.GetAllTransactions());

$(document).ready(function () {
 
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
