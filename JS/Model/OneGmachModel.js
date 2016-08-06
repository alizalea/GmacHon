var GMach = GMach || {};
GMach.Model = GMach.Model || {};
GMach.Model.OneGmach = GMach.Model.OneGmach || {};


GMach.Model.OneGmach = function () {

}

GMach.Model.OneGmach.prototype.Contacts = function () {
    return GMach.Model.Contact.GetAllContacts();
};

GMach.Model.OneGmach.Transactions = function () {
    return GMach.Model.Transaction.GetAllTransactions();
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

GMach.Model.OneGmach.getUrlParameter = function (sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function GetInputMoney() {
    var total = 0;
    GMach.Model.Transaction.GetAllTransactions().forEach(function (tran) {
        var type = tran.constructor.name;
        if (  type=='Deposit' || type=='Donation')
            total += tran.amount;
        if (  type=='ReturnDeposit' )
            total -= tran.amount;
    });
    return total;
}
function GetOuputMoney() {
    var total = 0;
    GMach.Model.Transaction.GetAllTransactions().forEach(function (tran) {
        var type = tran.constructor.name;
        if (type == 'Loan' )
            total += tran.amount;
        if (type == 'ReturnLoan' )
            total -= tran.amount;
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