var GMach = GMach || {};
GMach.Model = GMach.Model || {};
GMach.Model.Contact = GMach.Model.Contact || {};


GMach.Model.Contact = function (first_name, last_name, IdNumber, phoneNumber, mobileNumber, address, remarks) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.IdNumber = IdNumber;
    this.phoneNumber = phoneNumber;
    this.mobileNumber = mobileNumber;
    this.address = address;
    this.remarks = remarks;
},

GMach.Model.Contact.GetAllContacts = function () {
   
    return GMach.DAL.Contact.GetAllContacts();

}



