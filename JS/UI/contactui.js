var allContacts = new GMach.Model.Contact.GetAllContacts();

var editor;
$(document).ready(function () {
   

    editor = new $.fn.dataTable.Editor({
        ajax: "../php/todo.php",
        table: "#contacts",
        fields: [{
            label: "שם משפחה:",
            name: "lastName"
        },
          {
              label: "שם פרטי:",
              name: "firstName",
          },

          {
              label: "תעודת זהות:",
              name: "IdNumber",
          },
          {
              label: "טלפון:",
              name: "phoneNumber",
          },
       {
           label: "טלפון סלולרי:",
           name: "mobileNumber",
       },
     {
         label: "הערות:",
         name: "remarks",
     }

        ]

    });
    $('#contacts').DataTable({
        dom: "Bfrtip",

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

        buttons: [

           { extend: "create", editor: editor },

            { extend: "edit", editor: editor },

            { extend: "remove", editor: editor }

        ],
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

});