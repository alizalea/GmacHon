﻿var GMach = GMach || {}; // global namespace, all good
GMach.DAL = GMach.DAL || {}; // global namespace, all good
GMach.DAL.Transaction = GMach.DAL.Transaction || {}; // global namespace, all good

GMach.DAL.Transaction.GetAllTransactions = function () {
    var Transactions = [new GMach.Model.Transaction.Loan(1, 1, -5, "21 / 2 / 2012", new GMach.Model.Transaction.Freind("aliza", "twito", "0548402125", "test"), new GMach.Model.Transaction.Freind("fff", "hhhh", "0548402888", "test2"), null, false, 100),
                        new GMach.Model.Transaction.ReturnLoan(2, 2, 20, "21 / 2 / 2012"),
                        new GMach.Model.Transaction.Deposit(3, 3, 60, "22 / 2 / 2012", null, true, 20)

    ];

    return Transactions;

};