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
    var Contacts = [new GMach.Model.Contact("משה", "כהן", "111111111", "02-1111111", "054-8402125", "", "תורם חבל על הזמן"),
                                 new GMach.Model.Contact("יוסי", "לוי", "222222222", "024444444", "085-9999999", "", "חיחחייח"),
                                 new GMach.Model.Contact("יוסי", "כהן", "33333333", "024444444", "085-4444444", "", "חיחחייח"),
                                 new GMach.Model.Contact("יוסי", "לוי", "44444444", "024444444", "085-5555555", "", "חיחחייח"),
                                 new GMach.Model.Contact("חיים", "טויו", "222222222", "024444444", "085-9999999", "", "חיחחייח"),
                                 new GMach.Model.Contact("אריאל", "פכטר", "222222222", "024444444", "085-9999999", "", "חיחחייח")];

    return Contacts;

}



