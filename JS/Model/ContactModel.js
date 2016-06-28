
//var GMach = GMach || {};
GMach.Model = GMach.Model || {};
GMach.Model.Contact = GMach.Model.Contact || {};


GMach.Model.Contact = function (id, firstName, lastName, idNumber, phoneNumber, mobileNumber, address, remarks) {
    this.id = id;

    /* if (GMach.Model.Contact.indexid == undefined) {
         GMach.Model.Contact.indexid = 1;
     }
     else {
         GMach.Model.Contact.indexid++;
     }
     this.id = GMach.Model.Contact.indexid;*/
    this.firstName = firstName;
    this.lastName = lastName;
    this.idNumber = idNumber;
    this.phoneNumber = phoneNumber;
    this.mobileNumber = mobileNumber;
    this.address = address;
    this.remarks = remarks;
},

GMach.Model.Contact.GetAllContacts = function () {
    return GMach.DAL.Contact.GetAllContacts();
}
GMach.Model.Contact.GetDataContactOffline = function (id) {

    var con = GMach.Model.Contact.GetAllContacts();// JSON.parse(localStorage.getItem('Gmach1Contacts'));
    var result = $.grep(con, function (e) { return e.id == id; });

    if (result.length == 0) {
        return new GMach.Model.Contact();// Contact Not Found
    }
    else if (result.length == 1) {
        return result[0];
    }
    else {
        throw "Error During GetDataContact"
    }
}
GMach.Model.Contact.GetDataContact = function (id) {

    var contact = GMach.DAL.Contact.GetDataContact(id);
    if (contact == null)
    {
        throw "Error During GetDataContact";
    }
    else {
        return contact;
    }


}
GMach.Model.Contact.SetDataContact = function (contact, idcon) {

    return GMach.DAL.Contact.SetDataContact(contact, idcon);

}

function GetContactObject(dataBaseRow) {
    var curr = new GMach.Model.Contact();

    curr.id = dataBaseRow.id;
    curr.firstName = dataBaseRow.firstName;
    curr.lastName = dataBaseRow.lastName;
    curr.idNumber = dataBaseRow.idNumber;
    curr.phoneNumber = dataBaseRow.phoneNumber;
    curr.mobileNumber = dataBaseRow.mobileNumber;
    curr.address = dataBaseRow.address;
    curr.remarks = dataBaseRow.remarks;

    return curr;

};

GMach.Model.Contact.GetContactTransactions = function (idContact) {

    var allTransactions = GMach.Model.Transaction.GetAllTransactions();

    var loanTrans = new Array();
    var loanAmount = 0;

    var depositTrans = new Array();
    var depositAmount = 0;

    var donationTrans = new Array();

    allTransactions.forEach(function (tran) {
        var tranType = tran.constructor.name;
        if (tran.contactId == idContact) {
            if ((tranType == "Loan" || tranType == "ReturnLoan")) {
                loanTrans.push(tran);
                (tranType == "Loan" ? loanAmount += tran.amount : loanAmount -= tran.amount);
            }
            if ((tranType == "Deposit" || tranType == "ReturnDeposit")) {
                depositTrans.push(tran);
                (tranType == "Deposit" ? depositAmount += tran.amount : depositAmount -= tran.amount);
            }
            if (tranType == "Donation")
            { donationTrans.push(tran); }
        }
    }
     );

    return [loanTrans, loanAmount, depositTrans, depositAmount, donationTrans];

}

