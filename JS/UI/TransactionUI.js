var GMach = GMach || {};
GMach.UI = GMach.UI || {};
GMach.UI.Transaction = GMach.UI.Transaction || {};

$(document).ready(function () {
    try {
        if ($('#transactions').length > 0) {
            AllTransactionsOnLoad();
        } else if ($('#Transaction-form').length > 0) {
            TransactionOnLoad();
        }
    }
    catch (ex) {
        sweetAlert("ארעה שגיאה", "יתכן והנתונים ששמרת לא נשמרו", "warning");
    }

});

function AllTransactionsOnLoad() {

    var allTransactions = GMach.UI.Transaction.GetAllTransactionsVM(GMach.Model.OneGmach.Transactions());

    $('#transactions').DataTable({

        data: allTransactions,
        pageLength: setDefaultSumRowsView(),
        columns: [
              { "data": "transactionType" },
              { "data": "contact" },
              { "data": "amount" },
              { "data": "transactionDate" },

        ],

        select: true,

        order: [3, 'desc'],

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
        var id = table.row(this).data().transactionId;
        window.location = "../HTML/Transaction.html?id=" + id;

    });

    $(".transactions select").change(function () {
        storeDefaultSumRowsView();
    });

    $(".transactions #addTran").click(function () {
        window.location = '../HTML/Transaction.html';
    });

}

function setDefaultSumRowsView() {
    var defaultSumRowsView = 10;
    defaultSumRowsView = JSON.parse(localStorage.getItem('DefaultSumRowsViewTran'));
    if (defaultSumRowsView != null && defaultSumRowsView != undefined) {
        return defaultSumRowsView;
    }
    return 10;
}

function storeDefaultSumRowsView() {
    var defaultSumRowsView = $('.transactions select').val();
    localStorage.setItem('DefaultSumRowsViewTran', JSON.stringify(defaultSumRowsView));
}
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

function TransactionOnLoad() {
    $("#Transaction-form form").validate();
    $('#ReturnAmount').val(0);
    $("#TransactionType").change(function () {
        showOrHideControls();
    });

    var getUrlParameter = GMach.Model.OneGmach.getUrlParameter('id');
    var idfromqs = getUrlParameter ? getUrlParameter : null;

    var transaction;

    if (idfromqs != null) {

        transaction = GMach.Model.Transaction.GetDataTransaction(idfromqs);

        $('#TransactionType').val(GetTransactionDisplayType(transaction.constructor.name));
        $('#Contact').val(transaction.contactId);
        $('#Amount').val(transaction.amount);
        $('#TransactionDate').val(formatDate(transaction.transactionDate));
        $('#ReturnDate').val(transaction.returnDate);
        $('#Returned')[0].checked = transaction.returned;
        $('#ReturnAmount').val(transaction.returnAmount);

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

        var contact = GMach.Model.Contact.GetDataContact($('#Contact').val());
        var fullName = contact.idNumber + " " + contact.firstName + " " + contact.lastName;
        $("#ContactSearch").val(fullName);

    }

    var contacts = GMach.DAL.Contact.GetAllContacts();

    var options = {

        data: contacts,

        getValue: function (element) {
            return element.idNumber + " " + element.firstName + " " + element.lastName;
        },

        list: {
            onSelectItemEvent: function () {

                var selectedItemValue = $("#ContactSearch").getSelectedItemData().contactId;

                $("#Contact").val(selectedItemValue).trigger("change");
            },
            match: {
                enabled: true
            }

        }
    };

    $("#ContactSearch").easyAutocomplete(options);
    //בהקשת תוים ערך שדה מזהה איש קשר נמחק
    $("#ContactSearch").keypress(function (evt) {
        //  evt.preventDefault();
        $('#Contact').val('');
    });
    $('#ContactSearch-error').hide();
    $("#ContactSearch").blur(function () {
        validContactSearch();
    });
    function validContactSearch() {
        if ($('#Contact').val() == '') {
            if ($("#ContactSearch").val() != '')
            { $('#ContactSearch-error').text('חובה לבחור איש קשר מתוך הרשימה'); }
            $('#ContactSearch-error').show();
        }
        else {
            $('#ContactSearch-error').hide();
        }
    }
    $("#btn_save, #btn_save1").click(function () {
        validContactSearch();
        if ($("#Transaction-form form").valid() && $('#Contact').val() != '') {
            transaction = GetTransactionObjectUI($('#TransactionType').val());
            if (idfromqs != null) { transaction.transactionId = idfromqs; }

            transaction.contactId = $('#Contact').val();//$('#basics').val().split("#")[1]
            transaction.amount = $('#Amount').val();
            transaction.transactionDate = $('#TransactionDate').val();

            transaction.returnDate = $('#ReturnDate').val();
            transaction.returned = $('#Returned')[0].checked;
            transaction.returnAmount = $('#ReturnAmount').val();

            //if (transaction.freind1 != undefined) {
                transaction.freind1.first_name = $('#FirstNameFirstFreind').val();
                transaction.freind1.last_name = $('#LastNameFirstFreind').val();
                transaction.freind1.phone_number = $('#PhoneNumberFirstFreind').val();
                transaction.freind1.remark = $('#RemarkFirstFreind').val();
            //}

            //if (transaction.freind2 != undefined) {
                transaction.freind2.first_name = $('#FirstNameSecondFreind').val();
                transaction.freind2.last_name = $('#LastNameSecondFreind').val();
                transaction.freind2.phone_number = $('#PhoneNumberSecondFreind').val();
                transaction.freind2.remark = $('#RemarkSecondFreind').val();
            //}

            if (GMach.Model.Transaction.SetDataTransaction(transaction, idfromqs)) {
                window.location = "../HTML/Transactions.html";
            }

        }
    });

    $("#btn_cancel, #btn_cancel1").click(function (transaction) {
        window.location = "../HTML/Transactions.html";

    });

    //for validation
    $.validator.addMethod(
                   "regex",
                   function (value, element, regexp) {
                       var re = new RegExp(regexp);
                       return this.optional(element) || re.test(value);
                   },
                   //error message text
                   "הזנת תווים לא חוקיים"
                );

    /*  $('#ContactSearch').rules('add', {
        required:true

    });
     $('#ReturnDate').rules('add', {
          required: {
              depends: function (element) {
                  return ($('#ReturnDate').length>0);
              }
             }
  
      });*/
    $('#TransactionDate').rules('add', {
        required: true
    });


    $('#Amount').rules('add', {
        required: true,
        regex: "^[0-9]*$"
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
function GetTransactionObjectUI(TransactionDisplayType) {
    var object;
    switch (TransactionDisplayType) {
        case "הלוואה":
            object = new GMach.Model.Transaction.Loan();
            break;
        case "החזרת הלוואה":
            object = new GMach.Model.Transaction.ReturnLoan();
            break;
        case "הפקדה":
            object = new GMach.Model.Transaction.Deposit();
            break;
        case "משיכת הפקדה":
            object = new GMach.Model.Transaction.ReturnDeposit();
            break;
        case "תרומה":
            object = new GMach.Model.Transaction.Donation();
            break;
        default:
            console.error("UnKnown TransactionDisplayType: " + TransactionDisplayType);
            throw "UnKnown TransactionDisplayType";
    }
    object.freind1 = new GMach.Model.Transaction.Freind();
    object.freind2 = new GMach.Model.Transaction.Freind();

    return object;
}

GMach.UI.Transaction.GetAllTransactionsVM = function (transList) {
    var trans = new Array();
    transList.forEach(function (tran) {
        var t = new Object();
        t.transactionId = tran.transactionId;
        t.transactionType = GetTransactionDisplayType(tran.constructor.name);
        var contact = GMach.Model.Contact.GetDataContact(tran.contactId);
        t.contact = contact.firstName + " " + contact.lastName;
        t.amount = tran.amount;
        t.transactionDate = formatDate(tran.transactionDate);
        t.returnDate = tran.returnDate;


        trans.push(t);
    }
     );

    return trans;

};

function formatDate(longDate) {
       return new Date(longDate).toJSON().slice(0, 10);
  
}