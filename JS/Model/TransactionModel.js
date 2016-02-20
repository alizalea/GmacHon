Transaction_Deposit.prototype = Object.create(Transaction.prototype);
Transaction_Deposit.prototype.constructor = Transaction_Deposit;

Transaction_Loan.prototype = Object.create(Transaction.prototype);
Transaction_Loan.prototype.constructor = Transaction_Loan;

var GMach = {

    transaction_type: {
        LOAN: "loan",//הלוואה
        RETURN_LOAN: "return_loan",//החזרת הלוואה
        DEPOSIT: "deposit",//הפקדה
        RETURN_DEPOSIT: "retur_deposit",//משיכת הפקדה
        DONATION: "donation"//תרומה
    },

    Transaction: function (transaction_type, contact, amount, transaction_date) {
        this.transaction_type = transaction_type;
        this.contact = contact;
        this.amount = amount;
        this.transaction_date = transaction_date;

    },

    Transaction_Deposit: function ( contact, amount, transaction_date, return_date, returned, return_amount) {
        Gmach.Transaction.call(this,Gmach.transaction_type.DEPOSIT, contact, amount, transaction_date);
        this.return_date = return_date;
        this.returned = returned;
        this.return_amount = return_amount;
    },

    Freind: function (first_name, last_name, phone_number, remark) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.remark = remark;
    },

    Transaction_Loan: function (contact, amount, transaction_date, freind1, freind2, return_date, returned, return_amount) {
        Gmach.Transaction.call(this, gmach.transaction_type.LOAN, contact, amount, transaction_date);
        this.return_date = return_date;
        this.returned = returned;
        this.return_amount = return_amount;
        this.freind1 = freind1;
        this.freind2 = freind2;
        this.return_date = return_date;
        this.returned = returned;
        this.return_amount = return_amount;
    },

    GetAllTransactions: function () {
        var Transactions = [new GMach.Transaction(gm.transaction_type.Loan, "aa", 20, 21 / 2 / 2012),
                                    ,
        ];

        return Contacts;

    }

};