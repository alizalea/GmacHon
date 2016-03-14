$(document).ready(function () {
 
    var oneGmach = new GMach.Model.OneGmach();
   
    $("#inputMoney").text(numberWithCommas(oneGmach.inputMoney));
    $("#outputMoney").text(numberWithCommas(oneGmach.outputMoney));
    $("#diffMoney").text(numberWithCommas(oneGmach.diffMoney));
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}