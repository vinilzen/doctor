$(function() {
   $("#priceSliderDoctorLeft").ionRangeSlider({
        type: "double",
        step: 500,
        postfix: " руб.",
        hasGrid: false,
        hideMinMax: false,
        hideFromTo: true,
        prettify: true,
        // onFinish: ajaxUpdateDoctorSearch
    });

   $('.tglsize').click(function(){
        $('#leftFilter').removeClass('size-lg').removeClass('size-sm').removeClass('size-md').addClass( $(this).val() );



       $("#priceSliderDoctorLeft").ionRangeSlider({
            type: "double",
            step: 500,
            postfix: " руб.",
            hasGrid: false,
            hideMinMax: false,
            hideFromTo: true,
            prettify: true,
            // onFinish: ajaxUpdateDoctorSearch
        });
        
   });

});