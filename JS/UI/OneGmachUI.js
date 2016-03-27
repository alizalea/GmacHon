$(document).ready(function () {
 
    $("#inputMoney").text(numberWithCommas(GMach.Model.OneGmach.inputMoney()));
    $("#outputMoney").text(numberWithCommas(GMach.Model.OneGmach.outputMoney()));
    $("#diffMoney").text(numberWithCommas(GMach.Model.OneGmach.diffMoney()));
});

function numberWithCommas(x) {
    if (x != undefined) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    else throw "Undefined Number"
}