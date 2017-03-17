//var Contacts = {};
var GMach = GMach || {};
GMach.DAL = GMach.DAL || {};
GMach.DAL.Contact = GMach.DAL.Contact || {};

GMach.DAL.Contact.GetAllContactsOffline = function () {

    var con = JSON.parse(localStorage.getItem('Gmach1Contacts'));
    if (con != null && con != undefined) {
        return con;
    }
    else {
        //return GMach.DAL.Contact.GetAllContacts();
        var databaseData = contactData;
        var modelData = new Array();
        databaseData.forEach(function (row) {
            var curr = GetContactObject(row);
            modelData.push(curr);
        });

        localStorage.setItem('Gmach1Contacts', JSON.stringify(modelData));

        return modelData;
    }

}

GMach.DAL.Contact.GetAllContactsWeb = function () {
    var contactData = ConnectServer('http://databarn.azurewebsites.net/Gmachhon/data/contact/GetAll', null);
    return contactData;

}

GMach.DAL.Contact.GetAllContacts = function () {
    var contactData = retrieveData('');
    return contactData;

}


GMach.DAL.Contact.SetDataContactOffline = function (contact, editid) {
    try {
        var con = GMach.DAL.Contact.GetAllContacts();

        if (editid != null) {//צריך לראות איך לעדכן את האובייקט במערך

            for (var i in con) {
                if (con[i].id == editid) {
                    con[i].firstName = contact.firstName;
                    con[i].lastName = contact.lastName;
                    con[i].idNumber = contact.IdNumber;
                    con[i].phoneNumber = contact.phoneNumber;
                    con[i].mobileNumber = contact.mobileNumber;
                    con[i].address = contact.address;
                    con[i].remarks = contact.remarks;
                    break; //Stop this loop, we found it!
                }
            }

        } else {

            contact.id = getMax(GMach.DAL.Contact.GetAllContacts(), "id") + 1;
            con.push(contact);//צריך להוסיף למשתנה הגלובלי של אנשי קשר לראות איך מוגדר מההתחלה

        }

        var contactsTostore = JSON.stringify(con);
        localStorage.setItem('Gmach1Contacts', contactsTostore);
        contactsTostore = null;
        return true;

    } catch (e) {
        return false;
    }

}

GMach.DAL.Contact.SetDataContact = function (contact, editid) {

    var contactData = ConnectServer('http://databarn.azurewebsites.net/Gmachhon/data/contact/Save', JSON.stringify(contact));

    if (contactData == null)
    { return false; }
    else { return true; }
}


GMach.DAL.Contact.GetDataContactWeb = function (contactID) {
    var idString = '{Id:' + contactID + "}";
    var contactData = ConnectServer('http://databarn.azurewebsites.net/Gmachhon/data/contact/GetById', idString);

    return contactData;
}

GMach.DAL.Contact.GetDataContact = function (contactID) {
    var contactData = retrieveData(contactID);
    return contactData[0];

}

function getMax(arr, column) {
    var max;
    for (var i = 0 ; i < arr.length ; i++) {
        if (!max || parseInt(arr[i][column]) > max)
            max = arr[i][column];
    }
    return max;
}

function ConnectServer(myUrl, MyData) {
    var url = myUrl;
    var Rows;
    $.ajax({
        url: url,
        type: 'POST',
        crossDomain: false,
        data: MyData,
        contentType: 'application/json',
        dataType: 'json',

        success: function (data) {
            Rows = data;
        },
        async: false,
        error: function (xhr, ajaxOptions, thrownError) {
            console.error("Error Connect Server " + xhr.status + ' ' + thrownError);
            //swal("שים לב! ארעה שגיאה בשרת");
            throw "ארעה שגיאה בשרת";
        }
    });
    return Rows;
}

function retrieveData(idFilter) {
    var rows;
    $.ajax({
        url: "http://localhost:8733/GmacHonService/RetrieveData",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({ tableName: "Person", idFilter: idFilter }),
        success: function (data) {
            rows = data;
        },
        async: false,
        error: function (data) {
            console.error("Error Connect Server " + data.responseText);
            throw "ארעה שגיאה בשרת";
        }
    });
    return rows;
}