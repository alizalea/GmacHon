var  GMach = GMach || {}; // global namespace, all good
GMach.transaction = GMach.transaction || {}; // global namespace, all good

    GMach.transaction.TransactionBase = function (contact, amount, transaction_date) {
        this.contact = contact;
        this.amount = amount;
        this.transaction_date = transaction_date;
      
    };

    GMach.transaction.TransactionWithReturn = function (contact, amount, transaction_date, return_date, returned, return_amount) {
        GMach.transaction.TransactionBase.call(this, contact, amount, transaction_date);
        this.return_date = return_date;
        this.returned = returned;
        this.return_amount = return_amount;

    };
    GMach.transaction.TransactionWithReturn.prototype = Object.create(GMach.transaction.TransactionBase.prototype);
    GMach.transaction.TransactionWithReturn.prototype.constructor = GMach.transaction.TransactionWithReturn;


    GMach.transaction.Freind = function (first_name, last_name, phone_number, remark) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.remark = remark;
    };

// LOAN: הלוואה
    GMach.transaction.Loan = function Loan(contact, amount, transaction_date, freind1, freind2, return_date, returned, return_amount) {
        GMach.transaction.TransactionWithReturn.call(this, contact, amount, transaction_date, return_date,returned,return_amount);
             this.freind1 = freind1;
        this.freind2 = freind2;
    };
    GMach.transaction.Loan.prototype = Object.create(GMach.transaction.TransactionWithReturn.prototype);
    GMach.transaction.Loan.prototype.constructor = GMach.transaction.Loan;

// RETURN_LOAN: "return_loan",//החזרת הלוואה
    GMach.transaction.ReturnLoan = function ReturnLoan(contact, amount, transaction_date) {
        GMach.transaction.TransactionBase.call(this, contact, amount, transaction_date);

    };

    GMach.transaction.ReturnLoan.prototype = Object.create(GMach.transaction.TransactionBase.prototype);
    GMach.transaction.ReturnLoan.prototype.constructor = GMach.transaction.ReturnLoan;

// DEPOSIT: "deposit": הפקדה
    GMach.transaction.Deposit = function Deposit(contact, amount, transaction_date, return_date, returned, return_amount) {
        GMach.transaction.TransactionWithReturn.call(this, contact, amount, transaction_date, return_date, returned, return_amount);
       
    };
    GMach.transaction.Deposit.prototype = Object.create(GMach.transaction.TransactionWithReturn.prototype);
    GMach.transaction.Deposit.prototype.constructor = GMach.transaction.Deposit;

//RETURN_DEPOSIT: משיכת הפקדה
    GMach.transaction.ReturnDeposit = function ReturnDeposit(contact, amount, transaction_date) {
        GMach.transaction.TransactionBase.call(this, contact, amount, transaction_date);

    };

    GMach.transaction.ReturnDeposit.prototype = Object.create(GMach.transaction.TransactionBase.prototype);
    GMach.transaction.ReturnDeposit.prototype.constructor = GMach.transaction.ReturnDeposit;

// DONATION: תרומה
    GMach.transaction.Donation = function Donation(contact, amount, transaction_date) {
        GMach.transaction.TransactionBase.call(this, contact, amount, transaction_date);

    };

    GMach.transaction.Donation.prototype = Object.create(GMach.transaction.TransactionBase.prototype);
    GMach.transaction.Donation.prototype.constructor = GMach.transaction.Donation;



    GMach.transaction.GetAllTransactions = function () {

     var all=    GMach.DAL.transaction.GetAllTransactions();

        //for (var i = (messages.length - 1) ; i >= 0; i--) {
        //    var currMessage = new Messages.Message(messages[i].MessageID, messages[i].Title, messages[i].MessageText);
        //    loadMessage(currMessage);
        //}

        return

    };

    GMach.transaction.GetTransactionObject = function (dataBaseRow) {
        var curr = new GMach.transaction.TransactionBase();
//curr.contact

        return GMach.DAL.transaction.GetAllTransactions();

    };

