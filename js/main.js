$(function() {
    // покажем карту по клику на адрес
    $("#searchResults, #doctorPage").on("click", ".doctorMap", function() {
        var markLat = $(this).data("marklat"),
            markLong = $(this).data("marklong"),
            mapZoom = $(this).data("mapzoom"),
            name = $(this).data("name"),
            url = $(this).closest("[data-clinicurl]").data("clinicurl"),
            addr = $(this).text();

        $("#map1").empty();

        ymaps.ready(init);

        var myMap1;

        function init(){
            myMap1 = new ymaps.Map ("map1", { center: [ markLat, markLong ], zoom: mapZoom });
            myMap1.controls.add('zoomControl');
            myMap1.balloon.open([ markLat, markLong ], '<a href="http://'+url+'"><b>'+name+'</b></a><br>'+addr, { closeButton: false });
        }

        $("#mapModal").modal();

        return false;
    });

    // покажем попап "записаться на прием"
    $("#searchResults").on("click", ".showScheduleBtn", function () {
        var timeTxt = '',
            dateTxt = '',
            data_doctor = $(this).closest("[data-doctor]");

        $("#docModal .doc-datetime").hide();
        $("#docModal .doc-date span").html(dateTxt);
        $("#docModal .doc-time span").html(timeTxt);


        var doctorName = data_doctor.data("name"),
            doctorFamilyName = data_doctor.data("family"),
            doctorSpeciality = data_doctor.data("speciality"),
            doctorPhoto = data_doctor.data("photo"),
            clinicPhone = data_doctor.data("clinicphone"),
            clinicLogo = data_doctor.data("cliniclogo"),
            clinicUrl = data_doctor.data("clinicurl");

        $("#docModal .doc-name h4").html(doctorName);
        $("#docModal .doc-name h3").html(doctorFamilyName);
        $("#docModal .doc-name .specialty").html(doctorSpeciality);
        $("#docModal .doc-name img").attr('src', doctorPhoto);
        $("#docModal .doc-address img.map").attr('src', clinicLogo);
        $("#docModal .bookByPhone").html(clinicPhone ? 'Для записи на прием позвоните по телефону <b>'+clinicPhone+'</b>.' : '');

        var doctorMetro = data_doctor.data("metro"),
            doctorAddress = data_doctor.data("address");
        $("#docModal .doc-address .metro span").html(doctorMetro);
        $("#docModal .doc-address .address span").html(doctorAddress);

        // форма отправки
        var doctorId = data_doctor.data("doctor");
        var date = $(this).attr("data-date");
        var time = $(this).attr("data-time");
        $("#docModal input[name=workerId]").val(doctorId);
        $("#docModal input[name=orderDate]").val(date);
        $("#docModal input[name=orderTime]").val(time);

        // вспоминаем клиента
        var fio = localStorage.getItem('fio');
        var email = localStorage.getItem('email');
        var phone = localStorage.getItem('phone');
        if (fio)   $("#docModal input[name=fio], #callbackModalContainer input[name=clName]").val(fio);
        if (email) $("#docModal input[name=email]").val(email);
        if (phone) $("#docModal input[name=phone], #callbackModalContainer input[name=userTel]").val(phone);

        $("#docModal input").trigger("keyup");
        $("#docModal .addComment").html("Добавить комментарий");
        $("#docModal .patientComment").hide();


        // логика кнопок
        $("#docModal .smsCodeBlock").hide();
        $("#docModal .successBlock").hide();
        $("#docModal .continueBlock").show();

        $("#docModal .codeInput").css('opacity', 0);
        $("#docModal input[name=code]").val('');
        $("#docModal .getCodeLink").show();
        $("#docModal .getCodeText").hide();
        $("#docModal [name=continueBookingBtn]").html('Продолжить');

        // init
        $("#docModal button[type=submit]").attr("disabled", false);
        $("#docModal button[type=submit] i").addClass("icon-ok").removeClass("icon-spinner icon-spin");

        $("#docModal button[name=bookCustomer]").attr("disabled", true);

        $("#patientComment").hide();

        $("#docModal").modal().on('shown.bs.modal', function(){
            console.log('123');
            $("#docModal .addComment").toogle(function(){
                $("#docModal .patientComment").show();
            }, function(){
                $("#docModal .patientComment").hide();
            });
        });
        return false;
    });

    $(".rating[rel=popover2068]").popover({
        trigger: 'hover',
        placement: 'top',
        html: 'true',
        content: '<div class="rating-params">'+
        '<div class="form-group">'+
        '  <label for="rateParam1">Тщательность обследования:</label>'+
        '  <span class="ratingStar rating-5_0"></span>'+
        '</div>'+
        
        '<div class="form-group">'+
        '  <label for="rateParam1">Эффективность лечения:</label>'+
        '  <span class="ratingStar rating-5_0"></span>'+
        '</div>'+
        
        '<div class="form-group">'+
        '  <label for="rateParam1">Отношение к пациенту:</label>'+
        '  <span class="ratingStar rating-4_0"></span>'+
        '</div>'+
        
        '<div class="form-group">'+
        '  <label for="rateParam1">Информирование пациента:</label>'+
        '  <span class="ratingStar rating-3_0"></span>'+
        '</div>'+
        
        '<div class="form-group">'+
        '  <label for="rateParam1">Посоветуете ли вы врача?</label>'+
        '  <span class="ratingStar rating-2_0"></span>'+
        '</div>'+
        '</div>'
    }).on('shown.bs.popover', function () {
        $('.popover .arrow').attr({style:'left:88%;'});
    });
});
