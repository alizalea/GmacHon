var GMach = GMach || {};
GMach.DAL = GMach.DAL || {};
GMach.DAL.Contact = GMach.DAL.Contact || {};

GMach.DAL.Contact.GetAllContacts = function () {
    var Contacts = [new GMach.Model.Contact("משה", "כהן", "111111111", "02-1111111", "054-8402125", "", "תורם חבל על הזמן"),
                                 new GMach.Model.Contact("יוסי", "לוי", "222222222", "024444444", "085-9999999", "", "חיחחייח"),
                                 new GMach.Model.Contact("יוסי", "כהן", "33333333", "024444444", "085-4444444", "", "חיחחייח"),
                                 new GMach.Model.Contact("יוסי", "לוי", "44444444", "024444444", "085-5555555", "", "חיחחייח"),
                                 new GMach.Model.Contact("חיים", "טויו", "222222222", "024444444", "085-9999999", "", "חיחחייח"),
                                 new GMach.Model.Contact("אריאל", "פכטר", "222222222", "024444444", "085-9999999", "", "חיחחייח")];

    return Contacts;

}