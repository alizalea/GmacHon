var GMach = GMach || {};
GMach.Model = GMach.Model || {};
GMach.Model.Transaction = GMach.Model.Transaction || {};

GMach.Model.Transaction.TransactionBase = function (transactionId, contactId, amount, transactionDate) {
    this.transactionId = transactionId;
    this.contactId = contactId;
    this.amount = amount;
    this.transactionDate = transactionDate;

};

GMach.Model.Transaction.TransactionWithReturn = function (transactionId, contactId, amount, transactionDate, returnDate, returned, returnAmount) {
    GMach.Model.Transaction.TransactionBase.call(this, transactionId, contactId, amount, transactionDate);
    this.returnDate = returnDate;
    this.returned = returned;
    this.returnAmount = returnAmount;

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
GMach.Model.Transaction.Loan = function Loan(transactionId, contactId, amount, transactionDate, freind1, freind2, returnDate, returned, returnAmount) {
    GMach.Model.Transaction.TransactionWithReturn.call(this, transactionId, contactId, amount, transactionDate, returnDate, returned, returnAmount);
    this.freind1 = freind1;
    this.freind2 = freind2;
};
GMach.Model.Transaction.Loan.prototype = Object.create(GMach.Model.Transaction.TransactionWithReturn.prototype);
GMach.Model.Transaction.Loan.prototype.constructor = GMach.Model.Transaction.Loan;

// RETURN_LOAN: "return_loan",//החזרת הלוואה
GMach.Model.Transaction.ReturnLoan = function ReturnLoan(transactionId, contactId, amount, transactionDate) {
    GMach.Model.Transaction.TransactionBase.call(this, transactionId, contactId, amount, transactionDate);

};

GMach.Model.Transaction.ReturnLoan.prototype = Object.create(GMach.Model.Transaction.TransactionBase.prototype);
GMach.Model.Transaction.ReturnLoan.prototype.constructor = GMach.Model.Transaction.ReturnLoan;

// DEPOSIT: "deposit": הפקדה
GMach.Model.Transaction.Deposit = function Deposit(transactionId, contactId, amount, transactionDate, returnDate, returned, returnAmount) {
    GMach.Model.Transaction.TransactionWithReturn.call(this, transactionId, contactId, amount, transactionDate, returnDate, returned, returnAmount);

};
GMach.Model.Transaction.Deposit.prototype = Object.create(GMach.Model.Transaction.TransactionWithReturn.prototype);
GMach.Model.Transaction.Deposit.prototype.constructor = GMach.Model.Transaction.Deposit;

//RETURN_DEPOSIT: משיכת הפקדה
GMach.Model.Transaction.ReturnDeposit = function ReturnDeposit(transactionId, contactId, amount, transactionDate) {
    GMach.Model.Transaction.TransactionBase.call(this, transactionId, contactId, amount, transactionDate);

};

GMach.Model.Transaction.ReturnDeposit.prototype = Object.create(GMach.Model.Transaction.TransactionBase.prototype);
GMach.Model.Transaction.ReturnDeposit.prototype.constructor = GMach.Model.Transaction.ReturnDeposit;

// DONATION: תרומה
GMach.Model.Transaction.Donation = function Donation(transactionId, contactId, amount, transactionDate) {
    GMach.Model.Transaction.TransactionBase.call(this, transactionId, contactId, amount, transactionDate);

};

GMach.Model.Transaction.Donation.prototype = Object.create(GMach.Model.Transaction.TransactionBase.prototype);
GMach.Model.Transaction.Donation.prototype.constructor = GMach.Model.Transaction.Donation;

GMach.Model.Transaction.GetAllTransactions = function () {

    var databaseData = GMach.DAL.Transaction.GetAllTransactions();

    var modelData = new Array();
    databaseData.forEach(function (row) {
        var curr = GMach.Model.Transaction.GetTransactionObject(row);
        modelData.push(curr);
    });


    return modelData;

};

GMach.Model.Transaction.GetDataTransactionOffline = function (id) {

    var con = GMach.Model.Transaction.GetAllTransactions();
    var result = $.grep(con, function (e) { return e.transactionId == id; });

    if (result.length == 0) {
        console.error("Transaction Not Found,id:" + id);
    }
    else if (result.length == 1) {
        return result[0];
    }
    else {
        console.error("Error During GetDataTransaction");
    }
}
GMach.Model.Transaction.GetDataTransaction = function (id) {

    var transaction = GMach.DAL.Transaction.GetDataTransaction(id);
    if (transaction == null) {
        throw "Error During GetDataTransaction";
    }
    else {
        var curr = GMach.Model.Transaction.GetTransactionObject(transaction);
        return curr;
    }


}
GMach.Model.Transaction.SetDataTransaction = function (transaction, idcon) {

    return GMach.DAL.Transaction.SetDataTransaction(transaction, idcon);

}

GMach.Model.Transaction.GetTransactionObject = function (dataBaseRow) {
    var curr = GetTransactionObjectByType(dataBaseRow.transactionType);
    curr.transactionId = dataBaseRow.transactionId;
    curr.contactId = dataBaseRow.contactId;
    curr.amount = parseInt(dataBaseRow.amount);
    curr.transactionDate = dataBaseRow.transactionDate;

    curr.returnDate = dataBaseRow.returnDate;
    curr.returned = dataBaseRow.returned;
    curr.returnAmount = dataBaseRow.returnAmount;

    if (dataBaseRow.transactionType == "Loan") {

        var freind1 = new GMach.Model.Transaction.Freind();
        freind1.first_name = dataBaseRow.freind1FirstName;
        freind1.last_name = dataBaseRow.freind1LastName;
        freind1.phone_number = dataBaseRow.freind1PhoneNumber;
        freind1.remark = dataBaseRow.freind1Remark;
        curr.freind1 = freind1;


        var freind2 = new GMach.Model.Transaction.Freind();
        freind2.first_name = dataBaseRow.freind2FirstName;
        freind2.last_name = dataBaseRow.freind2LastName;
        freind2.phone_number = dataBaseRow.freind2PhoneNumber;
        freind2.remark = dataBaseRow.freind2Remark;
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
        default:
            console.error("UnKnown TransactionType: " + TransactionType);
    }
    return object;
}

GMach.Model.Transaction.GetReturnLoanTransactions = function (scope) {

    var allTransactions = GMach.Model.Transaction.GetAllTransactions();
    var currentTime = new Date().toJSON().slice(0, 10);

    var nextMonthYear;
    if (scope == 'Month') { nextMonthYear = Date.today().add(1).months(); }
    else { nextMonthYear = Date.today().add(1).weeks(); }
    nextMonthYear = nextMonthYear.toJSON().slice(0, 10);

    var trans = new Array();
    allTransactions.forEach(function (tran) {
        if (tran.constructor.name == "Loan" && tran.returned == false
            && tran.returnDate >= currentTime && tran.returnDate <= nextMonthYear) {
            trans.push(tran);
        }
    }
     );

    return trans;

}

GMach.Model.Transaction.GetReturnDepositTransactions = function () {

    var allTransactions = GMach.Model.Transaction.GetAllTransactions();
    var currentTime = new Date().toJSON().slice(0, 10);

    var nextMonth;
    nextMonth = Date.today().add(1).months().toJSON().slice(0, 10);

    var trans = new Array();
    allTransactions.forEach(function (tran) {
        if (tran.constructor.name == "Deposit" && tran.returned == false
            && tran.returnDate >= currentTime && tran.returnDate <= nextMonth) {
            trans.push(tran);
        }
    }
     );

    return trans;

}

GMach.Model.Transaction.GetFreeBalancePerDate = function (chechDate) {
    var currentTime = new Date().toJSON().slice(0, 10);
    var total = 0;
    GMach.Model.Transaction.GetAllTransactions().forEach(function (tran) {
        var type = tran.constructor.name;
        if (tran.returned == false && tran.returnDate >= currentTime && tran.returnDate < chechDate)
        { }
        else
        {
            if (type == 'ReturnLoan' || type == 'Deposit' || type == 'Donation')
                total += tran.amount;
            else if (type == 'Loan' || type == 'ReturnDeposit')
                total -= tran.amount;
        }
    });
    return total;

}

