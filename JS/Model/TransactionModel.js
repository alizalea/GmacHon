var GMach = GMach || {};
GMach.Model = GMach.Model || {};
GMach.Model.Transaction = GMach.Model.Transaction || {};

GMach.Model.Transaction.TransactionBase = function (id, contact, amount, transaction_date) {
    this.id = id;
    this.contact = contact;
    this.amount = amount;
    this.transaction_date = transaction_date;

};

GMach.Model.Transaction.TransactionWithReturn = function (contact, amount, transaction_date, return_date, returned, return_amount) {
    GMach.Model.Transaction.TransactionBase.call(this, contact, amount, transaction_date);
    this.return_date = return_date;
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
GMach.Model.Transaction.Loan = function Loan(contact, amount, transaction_date, freind1, freind2, return_date, returned, return_amount) {
    GMach.Model.Transaction.TransactionWithReturn.call(this, contact, amount, transaction_date, return_date, returned, return_amount);
    this.freind1 = freind1;
    this.freind2 = freind2;
};
GMach.Model.Transaction.Loan.prototype = Object.create(GMach.Model.Transaction.TransactionWithReturn.prototype);
GMach.Model.Transaction.Loan.prototype.constructor = GMach.Model.Transaction.Loan;

// RETURN_LOAN: "return_loan",//החזרת הלוואה
GMach.Model.Transaction.ReturnLoan = function ReturnLoan(contact, amount, transaction_date) {
    GMach.Model.Transaction.TransactionBase.call(this, contact, amount, transaction_date);

};

GMach.Model.Transaction.ReturnLoan.prototype = Object.create(GMach.Model.Transaction.TransactionBase.prototype);
GMach.Model.Transaction.ReturnLoan.prototype.constructor = GMach.Model.Transaction.ReturnLoan;

// DEPOSIT: "deposit": הפקדה
GMach.Model.Transaction.Deposit = function Deposit(contact, amount, transaction_date, return_date, returned, return_amount) {
    GMach.Model.Transaction.TransactionWithReturn.call(this, contact, amount, transaction_date, return_date, returned, return_amount);

};
GMach.Model.Transaction.Deposit.prototype = Object.create(GMach.Model.Transaction.TransactionWithReturn.prototype);
GMach.Model.Transaction.Deposit.prototype.constructor = GMach.Model.Transaction.Deposit;

//RETURN_DEPOSIT: משיכת הפקדה
GMach.Model.Transaction.ReturnDeposit = function ReturnDeposit(contact, amount, transaction_date) {
    GMach.Model.Transaction.TransactionBase.call(this, contact, amount, transaction_date);

};

GMach.Model.Transaction.ReturnDeposit.prototype = Object.create(GMach.Model.Transaction.TransactionBase.prototype);
GMach.Model.Transaction.ReturnDeposit.prototype.constructor = GMach.Model.Transaction.ReturnDeposit;

// DONATION: תרומה
GMach.Model.Transaction.Donation = function Donation(contact, amount, transaction_date) {
    GMach.Model.Transaction.TransactionBase.call(this, contact, amount, transaction_date);

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

GMach.Model.Transaction.GetTransactionObject = function (dataBaseRow) {
    var curr = new GMach.Model.Transaction.TransactionBase();
    //curr.contact

    return GMach.DAL.transaction.GetAllTransactions();

};

