$(document).ready(function () {
 
    var oneGmach = new GMach.Model.OneGmach();
   
    $("#inputMoney").text(numberWithCommas(oneGmach.GetInputMoney()));
    $("#outputMoney").text(numberWithCommas(oneGmach.GetOutputMoney()));
    $("#diffMoney").text(numberWithCommas(oneGmach.GetDiffMoney()));
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}