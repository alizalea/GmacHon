$(document).ready(function () {
    if ($("#contacts").length) {
        AllContactsOnLoad();
    }
    if ($("#Contact-form").length) {
        ContactOnLoad();
    }
});

function AllContactsOnLoad()
{
    var oneGmach = new GMach.Model.OneGmach();
    var allContacts = oneGmach.Contacts();

    $('#contacts').DataTable({
        //  dom: "Bfrtip",

        //ajax: "../php/todo.php",
        data: allContacts,
        pageLength: setDefaultSumRowsView(),
        columns: [
             { "data": "lastName" },
             { "data": "firstName" },
             { "data": "idNumber" },
             { "data": "phoneNumber" },
             { "data": "mobileNumber" },
             { "data": "remarks" }
        ],
        select: true,

        /*  buttons: [
  
             { extend: "create", editor: editor },
  
              { extend: "edit", editor: editor },
  
              { extend: "remove", editor: editor }
  
          ],*/
        "language": {

            "lengthMenu": "מציג _MENU_ שורות לעמוד",

            "zeroRecords": "לא נמצאו אנשי קשר",

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

    var table = $('#contacts').DataTable();

    $('#contacts tbody').on('click', 'tr', function () {
        var id = table.row(this).data().contactId;
        window.location = "/HTML/Contact.html?id=" + id;

    });

    //מספר פריטים לתצוגה תוך שימוש ב localstorage
    setDefaultSumRowsView();

    $(".contacts select").change(function () {
        storeDefaultSumRowsView();
    });

}

function  setDefaultSumRowsView()
{
    var defaultSumRowsView = 10;
    defaultSumRowsView = JSON.parse(localStorage.getItem('DefaultSumRowsView'));
   /* if (defaultSumRowsView != null && defaultSumRowsView != undefined) {
        $('.contacts select').val(defaultSumRowsView);
    }*/
    return defaultSumRowsView;
}   
 
function storeDefaultSumRowsView() {
    var defaultSumRowsView = $('.contacts select').val();
     localStorage.setItem('DefaultSumRowsView', JSON.stringify(defaultSumRowsView));
}

function ContactOnLoad()
{
    debugger;
    $("#Contact-form form").validate();
    var getUrlParameter = GMach.Model.OneGmach.getUrlParameter('id');
    var idfromqs = getUrlParameter ? getUrlParameter : null;

    var contact = null;

    if (idfromqs != null) {
        contact = GMach.Model.Contact.GetDataContact(idfromqs);
        $('#FirstName').val(contact.firstName);
        $('#LastName').val(contact.lastName);
        $('#IdNumber').val(contact.idNumber);
        $('#PhoneNumber').val(contact.phoneNumber);
        $('#MobileNumber').val(contact.mobileNumber);
        $('#Address').val(contact.address);
        $('#Remarks').val(contact.remarks);
        //$('h2').text(f+" " +l);
        LoadLoanContact(idfromqs);
    } else {
        $('#TransactionContact').hide();
        contact = new GMach.Model.Contact();
        //var oneGmach = new GMach.Model.OneGmach();
        //contact.id = oneGmach.nextContactID;
    }

   
    $("#btn_save").click(function () {
        if ($("#Contact-form form").valid()) {
            contact.firstName = $('#FirstName').val();
            contact.lastName = $('#LastName').val();
            contact.idNumber = $('#IdNumber').val();
            contact.phoneNumber = $('#PhoneNumber').val();
            contact.mobileNumber = $('#MobileNumber').val();
            contact.address = $('#Address').val();
            contact.remarks = $('#Remarks').val();
            debugger;
            if (GMach.Model.Contact.SetDataContact(contact, idfromqs)) {
                window.location = "/HTML/Contacts.html";
            }
        }


    });
    $("#btn_cancel").click(function (contact) {
        window.location = "/HTML/Contacts.html";

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
    
    $('#FirstName').rules('add', {
        regex: "^[a-zA-Z0-9א-ת]*$",
        required: true,
        maxlength: 25
    });
    $('#LastName').rules('add', {
        regex: "^[a-zA-Z0-9א-ת]*$",
        required: true,
        maxlength: 25
    });
    $('#IdNumber').rules('add', {
        regex: "^[0-9]*$",
        required: true,
        maxlength: 9
    });
    $('#PhoneNumber').rules('add', {
        regex: "^[0-9-]*$",
        required: true,
        maxlength: 11
    });
    $('#MobileNumber').rules('add', {
        regex: "^[0-9-]*$",
        required: true,
        maxlength: 11
    });
    $('#Address').rules('add', {
        regex: "^[a-zA-Z0-9א-ת]*$",
        required: false,
        maxlength: 50
    });


   
}

    function LoadLoanContact(id) {
        var contactTransactions = GMach.Model.Contact.GetContactTransactions(id);

        $('#LoanContact').DataTable({

            data: GMach.UI.Transaction.GetAllTransactionsVM(contactTransactions[0]),

            columns: [
                  { "data": "transactionType" },
                  { "data": "amount" },
                  { "data": "transactionDate" },

            ],

            order: [2, 'desc'],
            paging: false,
            ordering: false,
            info: false,
            filter: false,
            "language": {
                "zeroRecords": "לא נמצאו הלוואות",
            },
        });
        $('#SumLoanContact').text(contactTransactions[1]);

        $('#DepositContact').DataTable({

            data: GMach.UI.Transaction.GetAllTransactionsVM(contactTransactions[2]),

            columns: [
                  { "data": "transactionType" },
                  { "data": "amount" },
                  { "data": "transactionDate" },

            ],

            order: [2, 'desc'],
            paging: false,
            ordering: false,
            info: false,
            filter: false,
            "language": {
                "zeroRecords": "לא נמצאו הפקדות",
            },
        });
        $('#SumDeposit').text(contactTransactions[3]);

        $('#DonationContact').DataTable({

            data: GMach.UI.Transaction.GetAllTransactionsVM(contactTransactions[4]),

            columns: [
                  { "data": "amount" },
                  { "data": "transactionDate" },

            ],

            order: [1, 'desc'],
            paging: false,
            ordering: false,
            info: false,
            filter: false,
            "language": {
                "zeroRecords": "לא נמצאו תרומות",
            },
        });
    }

