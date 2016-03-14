
//var GMach = GMach || {};
GMach.Model = GMach.Model || {};
GMach.Model.Contact = GMach.Model.Contact || {};


GMach.Model.Contact = function (firstName, lastName, IdNumber, phoneNumber, mobileNumber, address, remarks) {
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
    var con = JSON.parse(localStorage.getItem('Gmach1Contacts'));
    if (con != null && con != undefined) {
        return con;
    }
    else
    return GMach.DAL.Contact.GetAllContacts();

}
GMach.Model.Contact.GetDatataContact = function (id) {
    var con = JSON.parse(localStorage.getItem('Gmach1Contacts'));
    var result = $.grep(con, function (e) { return e.id == id; });
    if (result.length == 0) {
        // not found
        return new GMach.Model.Contact();
    } else if (result.length == 1) {
        return result[0];
    }
    return null
   // return GMach.DAL.Contact.GetDatataContact(id);

}
GMach.Model.Contact.SetDatataContact = function (contact) {

    return GMach.DAL.Contact.SetDatataContact(contact);

}



