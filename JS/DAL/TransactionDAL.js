var GMach = GMach || {}; // global namespace, all good
GMach.DAL = GMach.DAL || {}; // global namespace, all good
GMach.DAL.Transaction = GMach.DAL.Transaction || {}; // global namespace, all good

GMach.DAL.Transaction.GetAllTransactions = function () {
    //var Transactions = [new GMach.Model.Transaction.Loan(1, 1, -5, "2012-02-01", new GMach.Model.Transaction.Freind("aliza", "twito", "0548402125", "test"), new GMach.Model.Transaction.Freind("fff", "hhhh", "0548402888", "test2"), null, false, 100),
    //                    new GMach.Model.Transaction.ReturnLoan(2, 2, 20, "2012-03-04"),
    //                    new GMach.Model.Transaction.Deposit(3, 3, 60, "2012-02-22", "2012-02-25", true, 20)

    //];

    //return Transactions;
    var transactionData = [
  {
      "id": 1,
      "transaction_type": "Loan",
      "contact": 1,
      "amount": "-90",
      "transaction_date": "2012-02-01",

      "return_date": "",
      "returned": false,
      "return_amount": 10,

      "freind1First_name": "freind1First_name",
      "freind1Last_name": "freind1Last_name",
      "freind1Phone_number": "freind1Phone_number",
      "freind1Remark": "freind1Remark",

      "freind2First_name": "freind2First_name",
      "freind2Last_name": "freind2Last_name",
      "freind2Phone_number": "freind2Phone_number",
      "freind2Remark": "freind2Remark",

  },
  {
      "id": 2,
      "transaction_type": "ReturnLoan",
      "contact": 1,
      "amount": "80",
      "transaction_date": "2014-02-01",
  },
  {
      "id": 3,
      "transaction_type": "Deposit",
      "contact": 2,
      "amount": "60",
      "transaction_date": "2012-02-25",

      "return_date": "2012-02-26",
      "returned": true,
      "return_amount": 20,
  }
    ]

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
        var con = GMach.DAL.Transaction.GetAllTransactions();

        if (editid != null) {

            for (var i in con) {
                if (con[i].id == editid) {
                    con[i].transaction_type = transaction.constructor.name;
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

                    if (transaction.freind2 != undefined) {
                        con[i].freind2First_name = transaction.freind2.first_name;
                        con[i].freind2Last_name = transaction.freind2.last_name;
                        con[i].freind2Phone_number = transaction.freind2.phone_number;
                        con[i].freind2Remark = transaction.freind2.remark;
                    }
                    //break; //Stop this loop, we found it!
                }
            }

        } else {
            var oneGmach = new GMach.Model.OneGmach();
            transaction.id = getMax(GMach.DAL.Transaction.GetAllTransactions(), "id") + 1;// oneGmach.nextTransactionID();
            transaction.transaction_type = transaction.constructor.name;
            con.push(transaction);

        }

        var transactionsTostore = JSON.stringify(con);
        localStorage.setItem('Gmach1Transactions', transactionsTostore);
        transactionsTostore = null;
        return true;

    } catch (e) {
        return false;
    }

}

function getMax(arr, column) {
    var max;
    for (var i = 0 ; i < arr.length ; i++) {
        if (!max || parseInt(arr[i][column]) > max)
            max = arr[i][column];
    }
    return max;
}

