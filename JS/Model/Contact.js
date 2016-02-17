function Contact(first_name, last_name, tz, tel, pel, notes) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.tz = tz;
    this.tel = tel;
    this.pel = pel;
    this.notes = notes;
}
   // this.transactions = new 
var Contacts = [new Contact("משה", "כהן", "111111111", "02-1111111", "054-8402125", "תורם חבל על הזמן"),
                 new Contact("יוסי", "לוי", "222222222", "024444444", "085-9999999", "חיחחייח"),
                 new Contact("יוסי", "כהן", "33333333", "024444444", "085-4444444", "חיחחייח"),
                 new Contact("יוסי", "לוי", "44444444", "024444444", "085-5555555", "חיחחייח"),
                 new Contact("חיים", "טויו", "222222222", "024444444", "085-9999999", "חיחחייח"),
                 new Contact("אריאל", "פכטר", "222222222", "024444444", "085-9999999", "חיחחייח")];
