var  GMach = GMach || {}; // global namespace, all good
GMach.tr = GMach.tr || {}; // global namespace, all good
    GMach.tr.transaction_type ={
        LOAN: "loan",//הלוואה
        RETURN_LOAN: "return_loan",//החזרת הלוואה
        DEPOSIT: "deposit",//הפקדה
        RETURN_DEPOSIT: "retur_deposit",//משיכת הפקדה
        DONATION: "donation"//תרומה
    };

    GMach.tr.Transaction= function (transaction_type, contact, amount, transaction_date) {
        this.transaction_type = transaction_type;
        this.contact = contact;
        this.amount = amount;
        this.transaction_date = transaction_date;

    };

    GMach.tr.Transaction_Deposit= function ( contact, amount, transaction_date, return_date, returned, return_amount) {
        GMach.tr.Transaction.call(this,GMach.tr.transaction_type.DEPOSIT, contact, amount, transaction_date);
        this.return_date = return_date;
        this.returned = returned;
        this.return_amount = return_amount;
    };
    GMach.tr.Transaction_Deposit.prototype = Object.create(GMach.tr.Transaction.prototype);
    GMach.tr.Transaction_Deposit.prototype.constructor = GMach.tr.Transaction_Deposit;


    GMach.tr.Freind =  function (first_name, last_name, phone_number, remark) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone_number = phone_number;
        this.remark = remark;
    };

    GMach.tr.Transaction_Loan = function (contact, amount, transaction_date, freind1, freind2, return_date, returned, return_amount) {
        GMach.tr.Transaction.call(this, GMach.tr.transaction_type.LOAN, contact, amount, transaction_date);
        this.return_date = return_date;
        this.returned = returned;
        this.return_amount = return_amount;
        this.freind1 = freind1;
        this.freind2 = freind2;
        this.return_date = return_date;
        this.returned = returned;
        this.return_amount = return_amount;
    };
    GMach.tr.Transaction_Loan.prototype = Object.create(GMach.tr.Transaction.prototype);
    GMach.tr.Transaction_Loan.prototype.constructor = GMach.tr.Transaction_Loan;

    GMach.tr.GetAllTransactions = function () {
        var Transactions = [new GMach.tr.Transaction(GMach.tr.transaction_type.LOAN, "lalal", 20, "21 / 2 / 2012"),
                            new GMach.tr.Transaction_Deposit( "gg", 20, "21 / 2 / 2012","10/10/2010",false,0)
                          //  new GMach.tr.Transaction_Loan( "aa", 20," 21 / 2 / 2012")צריך לתת ערבים
        ];

        return Transactions;

    };

