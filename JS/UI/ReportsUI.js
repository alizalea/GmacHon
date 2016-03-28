$(document).ready(function () {
    if ($('#transactionsNextMounth').length > 0) {
        TransactionsNextMounthOnLoad();
    } 

});

function TransactionsNextMounthOnLoad() {

    var allTransactions = GetAllTransactionsVM(GMach.Model.Transaction.GetReturnLoanTransactions());

    $('#transactionsNextMounth').DataTable({

        data: allTransactions,

        columns: [
              { "data": "contact" },
              { "data": "amount" },
              { "data": "plan_transaction_date" },

        ],

        select: true,

        order: [2, 'asc'],

        "language": {


            "lengthMenu": "מציג _MENU_ שורות לעמוד",

            "zeroRecords": "לא נמצאו החזרים",

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

   

}
function GetAllTransactionsVM(transList) {
    var trans = new Array();
    transList.forEach(function (tran) {
        var t = new Object();
        var contact = GMach.Model.Contact.GetDataContact(tran.contact);
        t.contact = contact.firstName + " " + contact.lastName;
        t.amount = tran.amount;
        t.plan_transaction_date = tran.transaction_date;

        trans.push(t);
    }
     );

    return trans;

};