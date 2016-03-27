var GMach = GMach || {};
GMach.Model = GMach.Model || {};
GMach.Model.OneGmach = GMach.Model.OneGmach || {};


GMach.Model.OneGmach = function () {
    //this.inputMoney = GetInputMoney();
    //this.outputMoney = GetOuputMoney();
    //this.diffMoney = this.inputMoney - this.outputMoney;
    this.nextContactID = getMax(GMach.Model.Contact.GetAllContacts(), "id") + 1;
    this.nextTransactionID = getMax(GMach.Model.Transaction.GetAllTransactions(), "id") + 1;
}
GMach.Model.OneGmach.prototype.Contacts = function () {
    return new GMach.Model.Contact.GetAllContacts();
};

GMach.Model.OneGmach.prototype.Transactions = function () {
    return new GMach.Model.Transaction.GetAllTransactions();
};

GMach.Model.OneGmach.inputMoney = function () {
    return GetInputMoney();
};

GMach.Model.OneGmach.outputMoney = function () {
    return GetOuputMoney();
};

GMach.Model.OneGmach.diffMoney = function () {
    return GMach.Model.OneGmach.inputMoney() - GMach.Model.OneGmach.outputMoney();
};


function GetInputMoney() {
    var total = 0;
    GMach.Model.Transaction.GetAllTransactions().forEach(function (tran) {
        if (tran.amount > 0)
            total += tran.amount;
    });
    return total;

}
function GetOuputMoney() {
    var total = 0;
    GMach.Model.Transaction.GetAllTransactions().forEach(function (tran) {
        if (tran.amount < 0)
            total += tran.amount;
    });
    return Math.abs(total);

}

function getMax(arr, column) {
    var max;
    for (var i = 0 ; i < arr.length ; i++) {
        if (!max || parseInt(arr[i][column]) > max)
            max = arr[i][column];
    }
    return max;
}