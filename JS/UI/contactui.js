﻿//var oneGmach = new GMach.Model.OneGmach();
var allContacts = GMach.Model.Contact.GetAllContacts();
    //oneGmach.Contacts();


$(document).ready(function () {
      
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

});