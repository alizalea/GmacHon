
//var GMach = GMach || {};
GMach.Model = GMach.Model || {};
GMach.Model.Contact = GMach.Model.Contact || {};


GMach.Model.Contact = function (firstName, lastName, IdNumber, phoneNumber, mobileNumber, address, remarks) {
    //this.id = id;

    if (GMach.Model.Contact.indexid == undefined) {
        GMach.Model.Contact.indexid = 1;
    }
    else {
        GMach.Model.Contact.indexid++;
    }
    this.id = GMach.Model.Contact.indexid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.IdNumber = IdNumber;
    this.phoneNumber = phoneNumber;
    this.mobileNumber = mobileNumber;
    this.address = address;
    this.remarks = remarks;
},

GMach.Model.Contact.GetAllContacts = function () {
    return GMach.DAL.Contact.GetAllContacts();
}
GMach.Model.Contact.GetDataContact = function (id) {

    var con = GMach.Model.Contact.GetAllContacts();// JSON.parse(localStorage.getItem('Gmach1Contacts'));
    var result = $.grep(con, function (e) { return e.id == id; });

    if (result.length == 0) {
        return new GMach.Model.Contact();// Contact Not Found
    }
    else if (result.length == 1) {
        return result[0];
    }
    else
    {
        throw "Error During GetDataContact"
    }
}
GMach.Model.Contact.SetDataContact = function (contact, idcon) {

    return GMach.DAL.Contact.SetDataContact(contact, idcon);

}

function GetContactObject(dataBaseRow) {
    var curr = new GMach.Model.Contact();

    curr.id = dataBaseRow.id;
    curr.firstName = dataBaseRow.firstName;
    curr.lastName = dataBaseRow.lastName;
    curr.IdNumber = dataBaseRow.IdNumber;
    curr.phoneNumber = dataBaseRow.phoneNumber;
    curr.mobileNumber = dataBaseRow.mobileNumber;
    curr.address = dataBaseRow.address;
    curr.remarks = dataBaseRow.remarks;

    return curr;

};



