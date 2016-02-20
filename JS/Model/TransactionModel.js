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

    Transaction_Return: function (transaction_type, contact, amount, transaction_date, return_date, returned, return_amount) {
        Gmach.Transaction.call(transaction_type, contact, amount, transaction_date);
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