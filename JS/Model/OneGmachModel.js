var GMach = GMach || {};
GMach.Model = GMach.Model || {};
GMach.Model.OneGmach = GMach.Model.OneGmach || {};

//var inputMoney, outputMoney, diffMoney;


GMach.Model.OneGmach = function () {
    this.inputMoney = 3008;//צריך לבדוק איך שולפים ה
    this.outputMoney = 2000;
    this.diffMoney = this.inputMoney - this.outputMoney;
   /* this.Contacts = function () {
        return new GMach.Model.Contact.GetAllContacts();
    };
    this.Transactions = function () {
        return new GMach.Model.Transaction.GetAllTransactions();
    };
    calcDiffMoney();*/
}
GMach.Model.OneGmach.prototype.Contacts = function () {
    return new GMach.Model.Contact.GetAllContacts();
};

GMach.Model.OneGmach.prototype.Transactions = function () {
    return new GMach.Model.Transaction.GetAllTransactions();
};
//יצירת מופע של גמח ושמירתו בlacalstorage
var oneGmach = new GMach.Model.OneGmach();

localStorage.clear();
var contactsTostore = JSON.stringify(oneGmach.Contacts());
localStorage.setItem('Gmach1Contacts', contactsTostore);
contactsTostore = null;
//צריך לשמור ככה כל דבר - שומרת בנפרד כדי שלא נצטרך לשלוף הכל כל פעם



/*function calcDiffMoney() {

    inputMoney = 3008;
    outputMoney = 2000;
    diffMoney = inputMoney - outputMoney;
}

GMach.Model.OneGmach.prototype.GetInputMoney = function () {

    return inputMoney;

}

GMach.Model.OneGmach.prototype.GetOutputMoney = function () {

    return outputMoney;

}

GMach.Model.OneGmach.prototype.GetDiffMoney = function () {

    return diffMoney;

}*/
