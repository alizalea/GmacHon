var GMach = GMach || {}; // global namespace, all good
GMach.DAL = GMach.DAL || {}; // global namespace, all good
GMach.DAL.Transaction = GMach.DAL.Transaction || {}; // global namespace, all good

GMach.DAL.Transaction.GetAllTransactionsOffline = function () {

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

GMach.DAL.Transaction.GetAllTransactions = function () {
    var transactionData = ConnectServer('http://databarn.azurewebsites.net/Gmachhon/data/transaction/GetAll', null);
    return transactionData;

}

GMach.DAL.Transaction.SetDataTransactionOffline = function (transaction, editid) {
    try {
        var con = GMach.DAL.Transaction.GetAllTransactions();

        if (editid != null) {

            for (var i in con) {
                if (con[i].transactionId == editid) {
                    con[i].transactionType = transaction.constructor.name;
                    con[i].contact = transaction.contact;
                    con[i].amount = transaction.amount;
                    con[i].transactionDate = transaction.transactionDate;

                    con[i].returnDate = transaction.returnDate;
                    con[i].returned = transaction.returned;
                    con[i].returnAmount = transaction.returnAmount;

                    if (transaction.freind1 != undefined) {
                        con[i].freind1FirstName = transaction.freind1.first_name;
                        con[i].freind1LastName = transaction.freind1.last_name;
                        con[i].freind1PhoneNumber = transaction.freind1.phone_number;
                        con[i].freind1Remark = transaction.freind1.remark;
                    }

                    if (transaction.freind2 != undefined) {
                        con[i].freind2FirstName = transaction.freind2.first_name;
                        con[i].freind2LastName = transaction.freind2.last_name;
                        con[i].freind2PhoneNumber = transaction.freind2.phone_number;
                        con[i].freind2Remark = transaction.freind2.remark;
                    }
                    //break; //Stop this loop, we found it!
                }
            }

        } else {
            transaction.transactionId = getMax(GMach.DAL.Transaction.GetAllTransactions(), "transactionId") + 1;
            transaction.transactionType = transaction.constructor.name;
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

GMach.DAL.Transaction.SetDataTransaction = function (transaction, editid) {
    transaction.transactionType = transaction.constructor.name;

    var transactionData = ConnectServer('http://databarn.azurewebsites.net/Gmachhon/data/transaction/Save', JSON.stringify(transaction));

    if (transactionData == null)
    { return false; }
    else { return true; }
}

GMach.DAL.Transaction.GetDataTransaction = function (transactionID) {
    var idString = '{Id:' + transactionID + "}";
    var transactionData = ConnectServer('http://databarn.azurewebsites.net/Gmachhon/data/transaction/GetById', idString);

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
            console.error("Error Connect Server " + xhr.status + ' ' + thrownError);
            swal("שים לב! ארעה שגיאה בשרת");
        }
    });
    return Rows;
}

