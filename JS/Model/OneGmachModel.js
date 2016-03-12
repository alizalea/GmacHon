var GMach = GMach || {};
GMach.Model = GMach.Model || {};
GMach.Model.OneGmach = GMach.Model.OneGmach || {};

var inputMoney, outputMoney, diffMoney;


GMach.Model.OneGmach = function () {

    calcDiffMoney();
},

GMach.Model.OneGmach.prototype.Contacts = function () {
    return new GMach.Model.Contact.GetAllContacts();
};

GMach.Model.OneGmach.prototype.Transactions = function () {
    return new GMach.Model.Transaction.GetAllTransactions();
};

function calcDiffMoney() {

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

}
