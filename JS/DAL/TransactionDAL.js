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
      "amount": -90,
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
      "amount": 80,
      "transaction_date": "2014-02-01",
  },
  {
      "id": 3,
      "transaction_type": "Deposit",
      "contact": 2,
      "amount": 60,
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

    var modelData = new Array();
    databaseData.forEach(function (row) {
        var curr = GMach.Model.Transaction.GetTransactionObject(row);
        modelData.push(curr);
    });


    return modelData;

};

GMach.DAL.Transaction.SetDataTransaction = function (transaction, editid) {
    try {
        var con = GMach.DAL.Transaction.GetAllTransactions();

        if (editid != null) {//צריך לראות איך לעדכן את האובייקט במערך

            for (var i in con) {
                con[i].transaction_type = con[i].constructor.name;
                if (con[i].id == editid) {
                    con[i].contact = transaction.contact;
                    //con[i].lastName = contact.lastName;
                    //con[i].IdNumber = contact.IdNumber;
                    //con[i].phoneNumber = contact.phoneNumber;
                    //con[i].mobileNumber = contact.mobileNumber;
                    //con[i].address = contact.address;
                    //con[i].remarks = contact.remarks;
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

