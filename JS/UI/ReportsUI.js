$(document).ready(function () {
    if ($('#transactionsNextMounth').length > 0) {
        TransactionsNextMounthOnLoad();
    } 

});

function TransactionsNextMounthOnLoad() {

    var weekOrMonth = 'Week';
    var m = 'חודש';
    if (document.title.indexOf(m) > -1) { weekOrMonth = 'Month'; }

    var allTransactions = GMach.UI.Transaction.GetAllTransactionsVM(GMach.Model.Transaction.GetReturnLoanTransactions(weekOrMonth));

    $('#transactionsNextMounth').DataTable({

        data: allTransactions,

        columns: [
              { "data": "contact" },
              { "data": "amount" },
              { "data": "plan_return_date" },

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
