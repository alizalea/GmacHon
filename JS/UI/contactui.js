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
}

function ContactOnLoad()
{
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
        // if (isvalid()) {

        // }
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


    });
    $("#btn_cancel").click(function (contact) {
        window.location = "/HTML/Contacts.html";

    });
}

function LoadLoanContact(id) {
    var contactTransactions = GMach.Model.Contact.GetContactTransactions(id);

    $('#LoanContact').DataTable({

        data: GMach.UI.Transaction.GetAllTransactionsVM(contactTransactions[0]),

        columns: [
              { "data": "transaction_type" },
              { "data": "amount" },
              { "data": "transaction_date" },

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
              { "data": "transaction_type" },
              { "data": "amount" },
              { "data": "transaction_date" },

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

        data:contactTransactions[4],

        columns: [
              { "data": "amount" },
              { "data": "transaction_date" },

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

