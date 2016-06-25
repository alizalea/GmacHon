$(document).ready(function () {
    if ($('#transactionsNextMounth').length > 0) {
        TransactionsNextMounthOnLoad();
    }
    else { FreeBalancePerDateOnLoad(); }

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
              { "data": "plan_returnDate" },

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

function FreeBalancePerDateOnLoad() {
    $("#btn_checkFreeBalance").click(function () {
        var checkDate = $('#CheckDate').val();
        if (checkDate != '') {
            if (checkDate > new Date().toJSON().slice(0, 10)) {
                var amount = GMach.Model.Transaction.GetFreeBalancePerDate(checkDate);
                $('#Amount').text(amount);
            }

            else { alert("הכנס תאריך עתידי"); }
        }
        else { alert("הכנס תאריך לבדיקה"); }
    })
}