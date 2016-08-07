$(document).ready(function () {
    try
    {
        $("#inputMoney").text(numberWithCommas(GMach.Model.OneGmach.inputMoney()));
        $("#outputMoney").text(numberWithCommas(GMach.Model.OneGmach.outputMoney()));
        $("#diffMoney").text(numberWithCommas(GMach.Model.OneGmach.diffMoney()));
        $("#massages").text(getMasseges());

        var dragSrcEl = null;

        function handleDragStart(e) {
            this.style.opacity = '0.4';
            // Target (this) element is the source node.
            dragSrcEl = this;

            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', this.innerHTML);
        }

        function handleDragOver(e) {
            if (e.preventDefault) {
                e.preventDefault(); // Necessary. Allows us to drop.
            }

            e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

            return false;
        }

        function handleDrop(e) {
            // this/e.target is current target element.
            if (e.stopPropagation) {
                e.stopPropagation(); // Stops some browsers from redirecting.
            }
            this.style.opacity = '1';
            dragSrcEl.style.opacity = '1';
            // Don't do anything if dropping the same column we're dragging.
            if (dragSrcEl != this) {
                // Set the source column's HTML to the HTML of the column we dropped on.
                dragSrcEl.innerHTML = this.innerHTML;
                this.innerHTML = e.dataTransfer.getData('text/html');
            }
       

            return false;
        }
   
        var panels = $('main .panel');
        [].forEach.call(panels, function (panel) {
            panel.addEventListener('dragstart', handleDragStart, false);
            panel.addEventListener('drop', handleDrop, false);
            panel.addEventListener('dragover', handleDragOver, false);
        });

        DrawColors();
    }
    catch (ex) {
        sweetAlert("ארעה שגיאה", "יתכן והנתונים ששמרת לא נשמרו", "warning");
    }
});

function DrawColors() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    // Create gradient
    var grd = ctx.createLinearGradient(0, 0, 700, 0);

    grd.addColorStop(0, "#375D3B");
    grd.addColorStop(0.25, "#ABC8A4");
    grd.addColorStop(0.5, "#C4D7A4");
    grd.addColorStop(0.75, "#E1E6B9");
    grd.addColorStop(1, "#E1E6B9");
    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 1500, 800);
}

function numberWithCommas(x) {
    if (x != undefined) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    else throw "Undefined Number"
}

function getMasseges() {
    var massages = '';
    var returnTransactions = GMach.Model.Transaction.GetReturnDepositTransactions();

    returnTransactions.forEach(function (tran) {
        var contact = GMach.Model.Contact.GetDataContact(tran.contactId);
        var contactName = contact.firstName + " " + contact.lastName;
        massages += "בתאריך " + new Date(tran.returnDate).toJSON().slice(0, 10) + " עליך להחזיר סכום של " + tran.amount + " ₪ ל" + contactName;
        massages += "\n";
    }
     );

    return massages;
}

