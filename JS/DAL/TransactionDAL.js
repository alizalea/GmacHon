var GMach = GMach || {}; // global namespace, all good
GMach.DAL = GMach.DAL || {}; // global namespace, all good
GMach.DAL.Transaction = GMach.DAL.Transaction || {}; // global namespace, all good

GMach.DAL.Transaction.GetAllTransactions = function () {

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

GMach.DAL.Transaction.GetAllTransactionsOffline = function () {
    var transactionData = ConnectServer('http://databarn.azurewebsites.net/Gmachhon/data/transaction/GetAll', null);
    return transactionData;

}

GMach.DAL.Transaction.SetDataTransaction = function (transaction, editid) {
    try {
        var con = GMach.DAL.Transaction.GetAllTransactions();

        if (editid != null) {

            for (var i in con) {
                if (con[i].transactionId == editid) {
                    con[i].transaction_type = transaction.constructor.name;
                    con[i].contact = transaction.contact;
                    con[i].amount = transaction.amount;
                    con[i].transaction_date = transaction.transaction_date;

                    con[i].return_date = transaction.plan_return_date;
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
            transaction.transactionId = getMax(GMach.DAL.Transaction.GetAllTransactions(), "transactionId") + 1;
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

GMach.DAL.Transaction.SetDataTransactionOffline = function (transaction, editid) {

    var transactionData = ConnectServer('http://databarn.azurewebsites.net/Gmachhon/data/transaction/Save', JSON.stringify(transaction));

    if (transactionData == null)
    { return false; }
    else { return true; }
}

GMach.DAL.Transaction.GetDataTransaction = function (transactionID) {
    var idString = '{Id:' + transactionID + "}";
    var transactionData = ConnectServer('http://databarn.azurewebsites.net/Gmachhon/data/contact/GetById', idString);

    return transactionData;
}

function getMax(arr, column) {
    var max;
    for (var i = 0 ; i < arr.length ; i++) {
        if (!max || parseInt(arr[i][column]) > max)
            max = arr[i][column];
    }
    return max;
}

function ConnectServer(myUrl, MyData) {
    var url = myUrl;
    var Rows;
    $.ajax({
        url: url,
        type: 'POST',
        crossDomain: false,
        data: MyData,
        contentType: 'application/json',
        dataType: 'json',

        success: function (data) {
            Rows = data;
        },
        async: false,
        error: function (xhr, ajaxOptions, thrownError) {
            alert("Error Connect Server " + xhr.status + ' ' + thrownError);
            console.error();
        }
    });
    return Rows;
}

