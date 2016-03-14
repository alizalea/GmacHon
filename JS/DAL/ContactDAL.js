//var Contacts = {};
var GMach = GMach || {};
GMach.DAL = GMach.DAL || {};
GMach.DAL.Contact = GMach.DAL.Contact || {};

   


GMach.DAL.Contact.GetAllContacts = function () {

   var conddal = [new GMach.Model.Contact("משה", "כהן", "111111111", "02-1111111", "054-8402125", "", "תורם חבל על הזמן"),
                                new GMach.Model.Contact("יוסי", "לוי", "222222222", "024444444", "085-9999999", "", "חיחחייח"),
                                new GMach.Model.Contact("יוסי", "כהן", "33333333", "024444444", "085-4444444", "", "חיחחייח"),
                                new GMach.Model.Contact("יוסי", "לוי", "44444444", "024444444", "085-5555555", "", "חיחחייח"),
                                new GMach.Model.Contact("חיים", "טויו", "222222222", "024444444", "085-9999999", "", "חיחחייח"),
                                new GMach.Model.Contact("אריאל", "פכטר", "222222222", "024444444", "085-9999999", "", "חיחחייח")];
   return conddal;

}

GMach.DAL.Contact.GetDatataContact = function (id) {
    var con = JSON.parse(localStorage.getItem('Gmach1Contacts'));
    var result = $.grep(con, function (e) { return e.id == id; });
    if (result.length == 0) {
        // not found
        return new GMach.Model.Contact();
    } else if (result.length == 1) {
        return result[0];
    }
    return null
    //else {
        // multiple items found
   // }
    

   

}
GMach.DAL.Contact.SetDatataContact = function (contact,edit) {
    try {
        var con = JSON.parse(localStorage.getItem('Gmach1Contacts'));
        var c = null;
        if (edit) {//צריך לראות איך לעדכן את האובייקט במערך
            c = GMach.DAL.Contact.GetDatataContact(contact.id)
            c.firstName = contact.firstName;
            c.lastName = contact.lastName;
            c.IdNumber = contact.IdNumber;
            c.phoneNumber = contact.phoneNumber;
            c.mobileNumber = contact.mobileNumber;
            c.address = contact.address;
            c.remarks = contact.remarks;

        } else {

            con.push(contact);//צריך להוסיף למשתנה הגלובלי של אנשי קשר לראות איך מוגדר מההתחלה
            var contactsTostore = JSON.stringify(con);
            localStorage.setItem('Gmach1Contacts', contactsTostore);
            contactsTostore = null;
        }
           
           
            return true;
        
    } catch (e) {
        return false;
    }

}