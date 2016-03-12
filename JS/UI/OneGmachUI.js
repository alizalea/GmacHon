$(document).ready(function () {
 
    var oneGmach = new GMach.Model.OneGmach();
   
    $("#inputMoney").text(oneGmach.GetInputMoney());
    $("#outputMoney").text(oneGmach.GetOutputMoney());
    $("#diffMoney").text(oneGmach.GetDiffMoney());
});