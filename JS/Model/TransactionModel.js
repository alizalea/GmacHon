var GMach = GMach || {};
GMach.Model = GMach.Model || {};
GMach.Model.Transaction = GMach.Model.Transaction || {};

GMach.Model.Transaction.TransactionBase = function (id, contact, amount, transaction_date) {
    this.id = id;
    this.contact = contact;
    this.amount = amount;
    this.transaction_date = transaction_date;

};

GMach.Model.Transaction.TransactionWithReturn = function (id, contact, amount, transaction_date, plan_return_date, returned, return_amount) {
    GMach.Model.Transaction.TransactionBase.call(this, id, contact, amount, transaction_date);
    this.plan_return_date = plan_return_date;
    this.returned = returned;
    this.return_amount = return_amount;

};
GMach.Model.Transaction.TransactionWithReturn.prototype = Object.create(GMach.Model.Transaction.TransactionBase.prototype);
GMach.Model.Transaction.TransactionWithReturn.prototype.constructor = GMach.Model.Transaction.TransactionWithReturn;


GMach.Model.Transaction.Freind = function (first_name, last_name, phone_number, remark) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone_number = phone_number;
    this.remark = remark;
};

// LOAN: הלוואה
GMach.Model.Transaction.Loan = function Loan(id, contact, amount, transaction_date, freind1, freind2, return_date, returned, return_amount) {
    GMach.Model.Transaction.TransactionWithReturn.call(this, id, contact, amount, transaction_date, return_date, returned, return_amount);
    this.freind1 = freind1;
    this.freind2 = freind2;
};
GMach.Model.Transaction.Loan.prototype = Object.create(GMach.Model.Transaction.TransactionWithReturn.prototype);
GMach.Model.Transaction.Loan.prototype.constructor = GMach.Model.Transaction.Loan;

// RETURN_LOAN: "return_loan",//החזרת הלוואה
GMach.Model.Transaction.ReturnLoan = function ReturnLoan(id, contact, amount, transaction_date) {
    GMach.Model.Transaction.TransactionBase.call(this, id, contact, amount, transaction_date);

};

GMach.Model.Transaction.ReturnLoan.prototype = Object.create(GMach.Model.Transaction.TransactionBase.prototype);
GMach.Model.Transaction.ReturnLoan.prototype.constructor = GMach.Model.Transaction.ReturnLoan;

// DEPOSIT: "deposit": הפקדה
GMach.Model.Transaction.Deposit = function Deposit(id, contact, amount, transaction_date, return_date, returned, return_amount) {
    GMach.Model.Transaction.TransactionWithReturn.call(this, id, contact, amount, transaction_date, return_date, returned, return_amount);

};
GMach.Model.Transaction.Deposit.prototype = Object.create(GMach.Model.Transaction.TransactionWithReturn.prototype);
GMach.Model.Transaction.Deposit.prototype.constructor = GMach.Model.Transaction.Deposit;

//RETURN_DEPOSIT: משיכת הפקדה
GMach.Model.Transaction.ReturnDeposit = function ReturnDeposit(id, contact, amount, transaction_date) {
    GMach.Model.Transaction.TransactionBase.call(this, id, contact, amount, transaction_date);

};

GMach.Model.Transaction.ReturnDeposit.prototype = Object.create(GMach.Model.Transaction.TransactionBase.prototype);
GMach.Model.Transaction.ReturnDeposit.prototype.constructor = GMach.Model.Transaction.ReturnDeposit;

// DONATION: תרומה
GMach.Model.Transaction.Donation = function Donation(id, contact, amount, transaction_date) {
    GMach.Model.Transaction.TransactionBase.call(this, id, contact, amount, transaction_date);

};

GMach.Model.Transaction.Donation.prototype = Object.create(GMach.Model.Transaction.TransactionBase.prototype);
GMach.Model.Transaction.Donation.prototype.constructor = GMach.Model.Transaction.Donation;



GMach.Model.Transaction.GetAllTransactions = function () {

    var all = GMach.DAL.Transaction.GetAllTransactions();

    //for (var i = (messages.length - 1) ; i >= 0; i--) {
    //    var currMessage = new Messages.Message(messages[i].MessageID, messages[i].Title, messages[i].MessageText);
    //    loadMessage(currMessage);
    //}

    return all;

};

GMach.Model.Transaction.GetDataTransaction = function (id) {

    var con = GMach.Model.Transaction.GetAllTransactions();
    var result = $.grep(con, function (e) { return e.id == id; });

    if (result.length == 0) {
        return new GMach.Model.Transaction();// Contact Not Found
    }
    else if (result.length == 1) {
        return result[0];
    }
    else {
        throw "Error During GetDataTransaction"
    }
}
GMach.Model.Transaction.SetDataTransaction = function (transaction, idcon) {

    return GMach.DAL.Transaction.SetDataTransaction(transaction, idcon);

}

GMach.Model.Transaction.GetTransactionObject = function (dataBaseRow) {
    var curr = GetTransactionObjectByType(dataBaseRow.transaction_type);
    curr.id = dataBaseRow.id;
    curr.contact = dataBaseRow.contact;
    curr.amount = dataBaseRow.amount;
    curr.transaction_date = dataBaseRow.transaction_date;

    curr.return_date = dataBaseRow.return_date;
    curr.returned = dataBaseRow.returned;
    curr.return_amount = dataBaseRow.return_amount;

    if (dataBaseRow.transaction_type == "Loan") {

        var freind1 = new GMach.Model.Transaction.Freind();
        freind1.first_name = dataBaseRow.freind1.first_name;
        freind1.last_name = dataBaseRow.freind1.last_name;
        freind1.phone_number = dataBaseRow.freind1.phone_number;
        freind1.remark = dataBaseRow.freind1.remark;
        curr.freind1 = freind1;


        var freind2 = new GMach.Model.Transaction.Freind();
        freind2.first_name = dataBaseRow.freind2.first_name;
        freind2.last_name = dataBaseRow.freind2.last_name;
        freind2.phone_number = dataBaseRow.freind2.phone_number;
        freind2.remark = dataBaseRow.freind2.remark;
        curr.freind2 = freind2;
    }

    return curr;

};

function GetTransactionObjectByType(TransactionType) {
    var object;
    switch (TransactionType) {
       
        case "Loan":// "הלוואה":
            object = new GMach.Model.Transaction.Loan();
            object.freind1 = new GMach.Model.Transaction.Freind();
            object.freind2 = new GMach.Model.Transaction.Freind();
            break;
        case "ReturnLoan"://"החזרת הלוואה":
            object = new GMach.Model.Transaction.ReturnLoan();
            break;
        case "Deposit"://"הפקדה":
            object = new GMach.Model.Transaction.Deposit();
            break;
        case "ReturnDeposit"://"משיכת הפקדה":
            object = new GMach.Model.Transaction.ReturnDeposit();
            break;
        case "Donation"://"תרומה":
            object = new GMach.Model.Transaction.Donation();
            break;
    }
    return object;
}

