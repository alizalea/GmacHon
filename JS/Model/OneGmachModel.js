var GMach = GMach || {};
GMach.Model = GMach.Model || {};
GMach.Model.OneGmach = GMach.Model.OneGmach || {};


GMach.Model.OneGmach = function () {
  
},

GMach.Model.OneGmach.prototype.Contacts = function () {
    return new GMach.Model.Contact.GetAllContacts();
};

GMach.Model.OneGmach.prototype.Transactions = function () {
    return new GMach.Model.Transaction.GetAllTransactions();
};

GMach.Model.OneGmach.prototype.GetInputMoney = function () {

    return 0;

}
