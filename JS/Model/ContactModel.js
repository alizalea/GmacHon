var GMach = GMach || {};
GMach.Model = GMach.Model || {};
GMach.Model.Contact = GMach.Model.Contact || {};


GMach.Model.Contact = function (firstName, lastName, IdNumber, phoneNumber, mobileNumber, address, remarks) {
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



