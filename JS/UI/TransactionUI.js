
function GetAllTransactionsVM(transList) {
    var trans = new Array();
    transList.forEach(function (tran) {
        var t = new Object();
        t.id = tran.id;
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
    if ($('#transactions').length > 0) {
        AllTransactionsOnLoad();
    } else if ($('#Transaction-form').length > 0)
    {
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

function TransactionOnLoad()
{
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
            
            //$('#TransactionType').val(transaction.transaction_type);
            $('#Contact').val(transaction.contact);
            $('#Amount').val(transaction.amount);
           
            //$('h2').text(f+" " +l);
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



}