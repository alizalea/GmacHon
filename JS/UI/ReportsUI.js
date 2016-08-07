$(document).ready(function () {
    try {
        if ($('#transactionsNextMounth').length > 0) {
            TransactionsNextMounthOnLoad();
        }

        else if ($('.reports').length > 0) {
            reportsMenue();

        }

        else { FreeBalancePerDateOnLoad(); }

    }
    catch (ex) {
        sweetAlert("ארעה שגיאה", "יתכן והנתונים ששמרת לא נשמרו", "warning");
    }
});

function reportsMenue() {
    $(".reports #ReturnForNextWeek").click(function () {
        window.location = 'ReturnForNextWeek.html';
    });

    $(".reports #ReturnForNextMounth").click(function () {
        window.location = 'ReturnForNextMounth.html';
    });

    $(".reports #FreeBalancePerDate").click(function () {
        window.location = 'FreeBalancePerDate.html';
    });

    DrawBackground();
}

function DrawBackground()
{
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    // Create gradient
    var grd = ctx.createLinearGradient(0, 0, 700, 0);

    grd.addColorStop(0, "#375D3B");
    grd.addColorStop(0.25, "#ABC8A4");
    grd.addColorStop(0.5, "#C4D7A4");
    grd.addColorStop(0.75, "#E1E6B9");
    grd.addColorStop(1, "#E1E6B9");
    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 1500, 800);
}

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
              { "data": "returnDate" },

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
                $('#Amount').text(numberWithCommas(amount));
            }

            else {
                swal("הכנס תאריך עתידי");
            }
        }
        else { swal("הכנס תאריך לבדיקה"); }
    })
}

function numberWithCommas(x) {
    if (x != undefined) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    else throw "Undefined Number"
}

