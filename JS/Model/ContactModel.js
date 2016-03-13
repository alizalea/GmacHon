
var GMach = GMach || {};
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
   
    return GMach.DAL.Contact.GetAllContacts();

}
GMach.Model.Contact.GetDatataContact = function (id) {

    return GMach.DAL.Contact.GetDatataContact(id);

}
GMach.Model.Contact.SetDatataContact = function (contact) {

    return GMach.DAL.Contact.SetDatataContact(contact);

}



