
function GetAllTransactionsVM(transList) {
    var trans = new Array();
    transList.forEach(function (tran) {
        var t = new Object();
        t.id = tran.id;
        t.transaction_type = GetTransactionDisplayType(tran.constructor.name);
        t.contact = tran.contact;
        t.amount = tran.amount;
        t.transaction_date = tran.transaction_date;

        trans.push(t);
    }
     );

    return trans;

};

function GetTransactionDisplayType(transactionType) {
    var name = "";
    switch (transactionType) {
        case "Loan":
            name = "הלוואה"
            break;
        case "ReturnLoan":
            name = "החזרת הלוואה";
            break;
        case "Deposit":
            name = "הפקדה"
            break;
        case "ReturnDeposit":
            name = "משיכת הפקדה"
            break;
        case "Donation":
            name = "תרומה"
            break;
    }
    return name;
}

var oneGmach = new GMach.Model.OneGmach();
var allTransactions = GetAllTransactionsVM(oneGmach.Transactions());

$(document).ready(function () {
    if ($('#transactions').length > 0) {
        AllTransactionsOnLoad();
    } else if ($('#Transaction-form').length > 0) {
        TransactionOnLoad();
    }

});

function AllTransactionsOnLoad() {
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

}

function TransactionOnLoad() {
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };
    var idfromqs = getUrlParameter('id') ? getUrlParameter('id') : null;

    var transaction;

    if (idfromqs != null) {
        transaction = GMach.Model.Transaction.GetDataTransaction(idfromqs);

        $('#TransactionType').val(GetTransactionDisplayType(transaction.constructor.name));
        $('#Contact').val(transaction.contact);
        $('#Amount').val(transaction.amount);
        $('#TransactionDate').val(transaction.transaction_date);
        $('#ReturnDate').val(transaction.plan_return_date);
        $('#Returned')[0].checked = transaction.returned;
        $('#ReturnAmount').val(transaction.return_amount);

        if (transaction.freind1 != undefined) {
            $('#FirstNameFirstFreind').val(transaction.freind1.first_name);
            $('#LastNameFirstFreind').val(transaction.freind1.last_name);
            $('#PhoneNumberFirstFreind').val(transaction.freind1.phone_number);
            $('#RemarkFirstFreind').val(transaction.freind1.remark);
        }

        if (transaction.freind2 != undefined) {
            $('#FirstNameSecondFreind').val(transaction.freind2.first_name);
            $('#LastNameSecondFreind').val(transaction.freind2.last_name);
            $('#PhoneNumberSecondFreind').val(transaction.freind2.phone_number);
            $('#RemarkSecondFreind').val(transaction.freind2.remark);
        }

        //$('h2').text(f+" " +l);

        showOrHideControls();

        $("#TransactionType").change(function () {
            showOrHideControls();

        });


    } else {
        contact = new GMach.Model.Transaction();
        //var oneGmach = new GMach.Model.OneGmach();
        //contact.id = oneGmach.nextContactID;
    }

    $("#btn_save").click(function (transaction) {
        // if (isvalid()) {

        // }
        transaction.contact = $('#Contact').val();
        contact.amount = $('#Amount').val();
        //contact.IdNumber = $('#IdNumber').val();
        //contact.phoneNumber = $('#PhoneNumber').val();
        //contact.mobileNumber = $('#MobileNumber').val();
        //contact.address = $('#Address').val();
        //contact.remarks = $('#Remarks').val();
        if (GMach.Model.Transaction.SetDataTransaction(transaction, idfromqs)) {
            window.location = "/HTML/Transactions.html";
        }



        $("#btn_cancel").click(function (contact) {
            window.location = "/HTML/Transactions.html";

        });
    });

    function showOrHideControls() {
        if ($("#TransactionType").val() != "הלוואה" && $("#TransactionType").val() != "הפקדה") {
            $('#ReturnDetails').addClass("HideDiv");
        }
        else {
            $('#ReturnDetails').removeClass("HideDiv");
        }

        if ($("#TransactionType").val() != "הלוואה") {
            $('#Freinds').addClass("HideDiv");
        }
        else {
            $('#Freinds').removeClass("HideDiv");
        }
    };

}