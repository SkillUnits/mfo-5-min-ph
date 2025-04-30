$(document).ready(function (){
    $('#phone-main').mask("+7 (000) 000-00-00", {placeholder: "+7 (xxx) xxx-xx-xx"});

    $('#summ_slider').ionRangeSlider({
        min: 10000,
        max: 500000,
        from: 75000,
        step: 500,
        hide_min_max: true,
        hide_from_to: true,
        skin: 'round',
        onStart: function (data) {
        },
        onChange: function (data) {
            calculateMoney(data);
        },
        onFinish: function (data) {
            calculateMoney(data);
        }
    });

    $('#days_slider').ionRangeSlider({
        min: 5,
        max: 30,
        from: 10,
        hide_min_max: true,
        hide_from_to: true,
        skin: 'round',
        onStart: function (data) {},
        onChange: function (data) {
            calculateDays(data);
        },
        onFinish: function (data) {
            calculateDays(data);
        },
    });

    function moneyVal(moneySlider) {
        let moneyF = moneySlider.from;
        let moneyT = moneySlider.to;

        let moneyFrom = parseInt(moneyF).toLocaleString('en-US');
        let moneyTo = parseInt(moneyT).toLocaleString('en-US');

        moneyFrom = moneyFrom.replace(/,/g, " ");
        moneyTo = moneyTo.replace(/,/g, " ");

        moneySlider.input.closest('.slider-item').find('.left-label span').text(moneyFrom);
        moneySlider.input.closest('.slider-item').find('.right-label span').text(moneyTo);
    }

    function calculateMoney(moneySlider) {
        let money = moneySlider.from;
        let days = parseInt($(moneySlider.input).closest('.slider-items').find('.slider-item.days input').val());
        let percent = parseInt(money) * 0.0001 * days;
        let percentSale = parseInt(money) * 0.01 * days;
        let getMoney = parseInt(money) + percent;
        let getMoneySale = parseInt(money) + percentSale;
        $('.money-current').html(money + '<span> ₱</span>');

        let moneyTake = Math.round(money).toLocaleString('en-US');
        moneyTake = moneyTake.replace(/,/g, " ");
        $('.information.take .money').text(moneyTake + ' ₱');
        // $('.button-main .money-btn').text(moneyTake + ' ₱');

        // let percentVal = Math.round(percent).toLocaleString('en-US');
        let percentVal = percent.toLocaleString('en-US');
            percentVal = percentVal.replace(/,/g, " ");
            $('.information.percent .money span').text(percentVal);

            // let moneyGive = Math.round(getMoney).toLocaleString('en-US');
        let moneyGive = getMoney.toLocaleString('en-US');
            moneyGive = moneyGive.replace(/,/g, " ");
            $('.information.give .money-back span').text(moneyGive);

        let moneyGiveSale = getMoneySale.toLocaleString('en-US');
            moneyGiveSale = moneyGiveSale.replace(/,/g, " ");
            $('.information.give .money-sale span').text(moneyGiveSale);
    }

    function calculateDays(daysSlider) {
        let money = parseInt($(daysSlider.input).closest('.slider-items').find('.slider-item.summ input').val());
        let days = daysSlider.from;
        let percent = parseInt(money) * 0.0001 * days;
        let percentSale = parseInt(money) * 0.01 * days;
        let getMoney = parseInt(money) + percent;
        let getMoneySale = parseInt(money) + percentSale;

        $('.days-current').html(days + '<span> дней</span>');

        let moneyTake = Math.round(money).toLocaleString('en-US');
        moneyTake = moneyTake.replace(/,/g, " ");
        $('.information.take .money span').text(moneyTake);

        // let percentVal = Math.round(percent).toLocaleString('en-US');
        let percentVal = percent.toLocaleString('en-US');
            percentVal = percentVal.replace(/,/g, " ");
            $('.information.percent .money span').text(percentVal);

            // let moneyGive = Math.round(getMoney).toLocaleString('en-US');
        let moneyGive = getMoney.toLocaleString('en-US');
            moneyGive = moneyGive.replace(/,/g, " ");
            $('.information.give .money-back span').text(moneyGive);

        let moneyGiveSale = getMoneySale.toLocaleString('en-US');
            moneyGiveSale = moneyGiveSale.replace(/,/g, " ");
            $('.information.give .money-sale span').text(moneyGiveSale);

        // calculateDateCredit(days);

    }

    // function calculateDateCredit(days) {
    //     let currentDate = new Date();
    //         currentDate.setDate(currentDate.getDate() + days);

    //     var day = currentDate.getDate();
    //     var month = currentDate.getMonth() + 1;
    //     var year = currentDate.getFullYear();

    //     if(day < 10) {
    //         day = '0' + day;
    //     }
    //     if(month < 10) {
    //         month = '0' + month;
    //     }

    //     var formattedDate = day + '.' + month + '.' + year;
    //     $('.information.term .money span').text(formattedDate);

    // }

    function countDown() {
        var hours = 0;
        var minutes = 45;
        var seconds = 56;

        function updateTimer() {
            var formattedHours = hours < 10 ? '0' + hours : hours;
            var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            var formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
            $('.countDown').text(formattedHours + ':' + formattedMinutes + ':' + formattedSeconds);

            if (seconds > 0) {
                seconds--;
            } else {
                if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                } else {
                    // Время истекло
                    clearInterval(timerInterval);
                }
            }
        }
        timerInterval = setInterval(updateTimer, 1000);
        updateTimer();
    }

    function currentTime(timehours, timeminutes) {
        var dt = new Date();
        var timeH = dt.getHours();
        var timeM = dt.getMinutes() + timeminutes;
        var formattedTime = timeH + ":" + timeM;
        $('.currentTime').text(formattedTime);
    }

    function currentDate(){
        let currentDate = new Date();
            currentDate.setDate(currentDate.getDate());

        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();

        if(day < 10) {
            day = '0' + day;
        }
        if(month < 10) {
            month = '0' + month;
        }

        var formattedDate = day + '.' + month + '.' + year;
        $('.currentDate').text(formattedDate);
    }

    // calculateDateCredit(5);
    // currentTime(0,20);
    // currentDate();
    // countDown();

    // Accordion
    $(".accordion-header").click(function() {
        $(".accordion-item").not($(this).parent()).removeClass("active");
        $(".accordion-content").not($(this).next()).slideUp();
        
        $(this).parent().toggleClass("active");
        $(this).next().slideToggle();
    });

    // Функция для инициализации вкладок
    function initTabs() {
        $('.tab-button').on('click', function() {
            var tabId = $(this).data('tab');
            $('.tab-button').removeClass('active');
            $('.tab-item').removeClass('active');
            $(this).addClass('active');
            $('.tab-item[data-tab="' + tabId + '"]').addClass('active');
        });
    }
    initTabs()

});
