$(document).ready(function () {

    $("#inputMoney").text(numberWithCommas(GMach.Model.OneGmach.inputMoney()));
    $("#outputMoney").text(numberWithCommas(GMach.Model.OneGmach.outputMoney()));
    $("#diffMoney").text(numberWithCommas(GMach.Model.OneGmach.diffMoney()));
    $("#massages").text(getMasseges());

});

function numberWithCommas(x) {
    if (x != undefined) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    else throw "Undefined Number"
}

function getMasseges() {
    var massages = '';
    var returnTransactions = GMach.Model.Transaction.GetReturnDepositTransactions();

    returnTransactions.forEach(function (tran) {
        var contact = GMach.Model.Contact.GetDataContact(tran.contact);
        var contactName = contact.firstName + " " + contact.lastName;
        massages += "בתאריך " + tran.plan_return_date + " עליך להחזיר סכום של " + tran.amount + " ₪ ל" + contactName;
        massages += "\n";
    }
     );

    return massages;
}