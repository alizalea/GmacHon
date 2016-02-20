var GMach = GMach || {};
var GMach = {

    Transaction: function (transaction_type, contact, amount, transaction_date) {
        this.transaction_type = transaction_type;
        this.contact = contact;
        this.amount = amount;
        this.transaction_date = transaction_date;

    },
    GetAllTransactions: function () {
        var Transactions = [new GMach.Transaction(1 ,"aa", 20, "21/02/2012")
                                    ,
        ];

        return Transactions;

    }

};