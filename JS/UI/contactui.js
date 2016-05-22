//var allContacts = GMach.Model.Contact.GetAllContacts();
var oneGmach = new GMach.Model.OneGmach();
var allContacts = oneGmach.Contacts();
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

var contact = null;


$(document).ready(function () {
    if ($("#Contact-form").length) {

        if (idfromqs != null) {
            contact = GMach.Model.Contact.GetDataContact(idfromqs);
            $('#FirstName').val(contact.firstName);
            $('#LastName').val(contact.lastName);
            $('#IdNumber').val(contact.IdNumber);
            $('#PhoneNumber').val(contact.phoneNumber);
            $('#MobileNumber').val(contact.mobileNumber);
            $('#Address').val(contact.address);
            $('#Remarks').val(contact.remarks);
            //$('h2').text(f+" " +l);
            LoadLoanContact(idfromqs);
        } else {
            contact = new GMach.Model.Contact();
            //var oneGmach = new GMach.Model.OneGmach();
            //contact.id = oneGmach.nextContactID;
        }

        $("#btn_save").click(function () {
            // if (isvalid()) {

            // }
            contact.firstName = $('#FirstName').val();
            contact.lastName = $('#LastName').val();
            contact.IdNumber = $('#IdNumber').val();
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
    if ($("#contacts").length) {

        $('#contacts').DataTable({
            //  dom: "Bfrtip",

            //ajax: "../php/todo.php",
            data: allContacts,

            columns: [
                 { "data": "lastName" },
                 { "data": "firstName" },
                 { "data": "IdNumber" },
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
            var id = table.row(this).data().id;
            window.location = "/HTML/Contact.html?id=" + id;

        });

    }

});

function LoadLoanContact(id) {
    var loanTransactions =GMach.UI.Transaction.GetAllTransactionsVM( GMach.Model.Contact.GetLoanTransactions(id));

    $('#LoanContact').DataTable({

        data: loanTransactions,

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
    });
}

