var GMach = GMach || {}; // global namespace, all good
GMach.DAL = GMach.DAL || {}; // global namespace, all good
GMach.DAL.Transaction = GMach.DAL.Transaction || {}; // global namespace, all good

GMach.DAL.Transaction.GetAllTransactions = function () {
    var Transactions = [new GMach.Model.Transaction.Loan(1, 1, -5, "2012-02-01", new GMach.Model.Transaction.Freind("aliza", "twito", "0548402125", "test"), new GMach.Model.Transaction.Freind("fff", "hhhh", "0548402888", "test2"), null, false, 100),
                        new GMach.Model.Transaction.ReturnLoan(2, 2, 20, "2012-03-04"),
                        new GMach.Model.Transaction.Deposit(3, 3, 60, "2012-02-22", "2012-02-25", true, 20)

    ];

    return Transactions;


};

GMach.DAL.Transaction.SetDataTransaction = function (contact, editid) {
    try {
        var con = GMach.DAL.Transaction.GetAllTransactions();

        if (editid != null) {//צריך לראות איך לעדכן את האובייקט במערך

            for (var i in con) {
                if (con[i].id == editid) {
                    con[i].contact = contact.contact;
                    //con[i].lastName = contact.lastName;
                    //con[i].IdNumber = contact.IdNumber;
                    //con[i].phoneNumber = contact.phoneNumber;
                    //con[i].mobileNumber = contact.mobileNumber;
                    //con[i].address = contact.address;
                    //con[i].remarks = contact.remarks;
                    break; //Stop this loop, we found it!
                }
            }

        } else {

            con.push(contact);//צריך להוסיף למשתנה הגלובלי של אנשי קשר לראות איך מוגדר מההתחלה

        }

        var transactionsTostore = JSON.stringify(con);
        localStorage.setItem('Gmach1Transactions', transactionsTostore);
        transactionsTostore = null;
        return true;

    } catch (e) {
        return false;
    }

}