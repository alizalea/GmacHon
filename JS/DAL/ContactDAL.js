 //var Contacts = {};
var GMach = GMach || {};
GMach.DAL = GMach.DAL || {};
GMach.DAL.Contact = GMach.DAL.Contact || {};

   


GMach.DAL.Contact.GetAllContacts = function () {

   //var conddal = [new GMach.Model.Contact("משה", "כהן", "111111111", "02-1111111", "054-8402125", "", "תורם חבל על הזמן"),
   //                             new GMach.Model.Contact("יוסי", "לוי", "222222222", "024444444", "085-9999999", "", "חיחחייח"),
   //                             new GMach.Model.Contact("יוסי", "כהן", "33333333", "024444444", "085-4444444", "", "חיחחייח"),
   //                             new GMach.Model.Contact("יוסי", "לוי", "44444444", "024444444", "085-5555555", "", "חיחחייח"),
   //                             new GMach.Model.Contact("חיים", "טויו", "222222222", "024444444", "085-9999999", "", "חיחחייח"),
   //                             new GMach.Model.Contact("אריאל", "פכטר", "222222222", "024444444", "085-9999999", "", "חיחחייח")];
   //return conddal;
   return contactData;

}


GMach.DAL.Contact.SetDataContact = function (contact,editid) {
    try {
        var con = JSON.parse(localStorage.getItem('Gmach1Contacts'));
    
        if (editid!=null) {//צריך לראות איך לעדכן את האובייקט במערך
            
            for (var i in con) {
                if (con[i].id == editid) {
                    con[i].firstName = contact.firstName;
                    con[i].lastName = contact.lastName;
                    con[i].IdNumber = contact.IdNumber;
                    con[i].phoneNumber = contact.phoneNumber;
                    con[i].mobileNumber = contact.mobileNumber;
                    con[i].address = contact.address;
                    con[i].remarks = contact.remarks;
                        break; //Stop this loop, we found it!
                    }
                }
          
           

        } else {

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