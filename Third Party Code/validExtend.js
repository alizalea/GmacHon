/*
 * Default messages for the jQuery validation plugin.
 */
(function ($)
{
	$.extend($.validator.messages, {
	    required: "השדה הזה הינו שדה חובה",
	    remote: "נא לתקן שדה זה",
	    email: "נא למלא כתובת מייל חוקית",
	    url: "נא למלא כתובת אינטרנט חוקית",
	    date: "נא למלא תאריך חוקי",
	    number: "נא למלא מספר",
	    digits: "נא למלא רק מספרים",
	    maxlength: $.validator.format("נא לא למלא יותר מ-{0} תווים"),
	    minlength: $.validator.format("נא למלא לפחות {0} תווים"),
	    rangelength: $.validator.format("נא למלא ערכים בין {0} ל- {1} תווים"),
	    range: $.validator.format("נא למלא ערך בין {0} ל- {1}"),
	    max: $.validator.format("{נא למלא ערך קטן או שווה ל {0"),
	    min: $.validator.format("{נא למלא ערך גדול או שווה ל {0")
	});

	/*$.extend($.datepicker.regional[''], {
	    validateDate: "נא למלא תאריך חוקי",
	    validateDateMin: "נא למלא תאריך החל מ-{0}",
	    validateDateMax: "נא למלא תאריך שאינו אחרי {0}",
	    validateDateMinMax: "נא למלא תאריך בין {0} לבין {1}",
	    validateDateCompare: "נא למלא תאריך {0} {1}",
	    validateDateToday: "היום",
	    validateDateOther: "תאריך אחר",
	    validateDateEQ: "זהה ל-",
	    validateDateNE: "אינו זהה ל-",
	    validateDateLT: "לפני",
	    validateDateGT: "אחרי",
	    validateDateLE: "לא אחרי",
	    validateDateGE: "לא לפני"
	});

	$.extend($.datepicker._defaults, $.datepicker.regional['']);*/
}(jQuery));








/****** Validation Group ******/

var formValidation;

$(document).ready(function () {

    if ($.fn.validate) {

        // Initialize validation on the entire ASP.NET form.

        formValidation = $("#aspnetForm").validate({

            // This prevents validation from running on every

            //  form submission by default.

            onsubmit: false

        });




        // Search for controls marked with the causesValidation flag 

        //  that are contained anywhere within elements marked as 

        //  validationGroups, and wire their click event up.

        //$('.validationGroup .causesValidation').on('click', ValidateAndSubmit);

        $('.validationGroup').on('click', '.causesValidation', ValidateAndSubmit);




        // Select any input[type=text] elements within a validation group

        //  and attach keydown handlers to all of them.

        $('.validationGroup :text').keydown(function (evt) {

            // Only execute validation if the key pressed was enter.

            if (evt.keyCode == 13) {

                ValidateAndSubmit(evt);

            }

        });

    }

});




function ValidateAndSubmit(evt) {

    // Ascend from the button that triggered this click event 

    //  until we find a container element flagged with 

    //  .validationGroup and store a reference to that element.

    var $group = $(evt.currentTarget).closest('.validationGroup');




    var isValid = true;




    // Descending from that .validationGroup element, find any input

    //  elements within it, iterate over them, and run validation on 

    //  each of them.

    $group.find(':input').not($(".RadComboBoxDropDown input[type='checkbox']")).each(function (i, item) {

        //if (!$(item).valid())

        if ($(item).is(':visible') && !$(item).valid())

            isValid = false;

    });




    // If any fields failed validation, prevent the button's click 

    //  event from triggering form submission.

    if (!isValid) {

        evt.preventDefault();

    }






}

/***** End Validation Group *****/

