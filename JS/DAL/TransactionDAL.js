var GMach = GMach || {}; // global namespace, all good
GMach.DAL = GMach.DAL || {}; // global namespace, all good
GMach.DAL.Transaction = GMach.DAL.Transaction || {}; // global namespace, all good

GMach.DAL.Transaction.GetAllTransactions = function () {
    //var Transactions = [new GMach.Model.Transaction.Loan(1, 1, -5, "2012-02-01", new GMach.Model.Transaction.Freind("aliza", "twito", "0548402125", "test"), new GMach.Model.Transaction.Freind("fff", "hhhh", "0548402888", "test2"), null, false, 100),
    //                    new GMach.Model.Transaction.ReturnLoan(2, 2, 20, "2012-03-04"),
    //                    new GMach.Model.Transaction.Deposit(3, 3, 60, "2012-02-22", "2012-02-25", true, 20)

    //];

    //return Transactions;

    var databaseData;
    var con = localStorage.getItem('Gmach1Transactions');
    if (con != null && con != undefined) {
        databaseData = JSON.parse(con);
    }
    else {
        databaseData = transactionData;
        localStorage.setItem('Gmach1Transactions', JSON.stringify(transactionData));
    }

    return databaseData;

};

GMach.DAL.Transaction.SetDataTransaction = function (transaction, editid) {
    try {
        var con = GMach.Model.Transaction.GetAllTransactions();

        if (editid != null) {

            for (var i in con) {
                con[i].transaction_type = con[i].constructor.name;
                if (con[i].id == editid) {
                    con[i].contact = transaction.contact;
                    con[i].amount = transaction.amount;
                    con[i].transaction_date = transaction.transaction_date;

                    con[i].plan_return_date = transaction.plan_return_date;
                    con[i].returned = transaction.returned;
                    con[i].return_amount = transaction.return_amount;

                    if (transaction.freind1 != undefined) {
                        con[i].freind1First_name = transaction.freind1.first_name;
                        con[i].freind1Last_name = transaction.freind1.last_name;
                        con[i].freind1Phone_number = transaction.freind1.phone_number;
                        con[i].freind1Remark = transaction.freind1.remark;
                    }

                    if (transaction.freind1 != undefined) {
                        con[i].freind2First_name = transaction.freind2.first_name;
                        con[i].freind2Last_name = transaction.freind2.last_name;
                        con[i].freind2Phone_number = transaction.freind2.phone_number;
                        con[i].freind2Remark = transaction.freind2.remark;
                    }
                    //break; //Stop this loop, we found it!
                }
            }

        } else {

            con.push(transaction);//צריך להוסיף למשתנה הגלובלי של אנשי קשר לראות איך מוגדר מההתחלה

        }

        var transactionsTostore = JSON.stringify(con);
        localStorage.setItem('Gmach1Transactions', transactionsTostore);
        transactionsTostore = null;
        return true;

    } catch (e) {
        return false;
    }

}

