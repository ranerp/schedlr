$(document).ready( function(){
    $(function() {
        $( "#datepicker" ).datepicker({
            inline: true
        });
    });

    var calendarSelectedRowsArray = {
        "startDate" : null,
        "endDate": null
    };

    var eventColors = ["event-color-one", "event-color-two"];

    var startMoveListening = function(div, e) {

        $(div).addClass("moving");
        $(div).attr("x", e.pageX);
        $(div).attr("y", e.pageY);

        $(document).on("mousemove", function(e) {
            var $moving = $(".moving");

            var nX = $moving.attr("x") - e.pageX;
            var nY = $moving.attr("y") - e.pageY;

            $moving.attr("x", e.pageX);
            $moving.attr("y", e.pageY);

            $moving.css("left", $moving.position().left - nX);
            $moving.css("top", $moving.position().top - nY);
        });
    }

    var resolveTopLocation = function(div, y) {
        var $window = $(window);
        var $div = $(div);

        if((y + $div.width()) > $window.height())
            $div.css("top", y - $div.height());
        else
            $div.css("top", y);
    }

    var resolveLeftLocation = function(div, x) {
        var $window = $(window);
        var $div = $(div);

        if((x + $div.width()) > $window.width())
            $div.css("left", x - $div.width());
        else
            $div.css("left", x);
    }

    var removeSelectedRow = function() {
        $(".calendar-selected-row").removeClass("calendar-selected-row");
    }

    var courseOptionsListener = function(e) {
        var $courseOptions = $(".course-options-popup");

        $courseOptions.removeClass("hidden");

        resolveLeftLocation($courseOptions, e.pageX);
        resolveTopLocation($courseOptions, e.pageY);

    }

    $(".drag-listener").on("mousedown", function(e) {
        startMoveListening($(this).parent(), e);

        $(".drag-listener").on("mouseup", function(e) {
            $(this).parent().removeClass("moving");
            $(document).unbind("mousemove");
        });
    });


    $(".calendar-click-listener").find(".empty").on("mousedown", function(e) {
        var $filterPopUp = $(".filter-popup");
        var $this = $(this);

        calendarSelectedRowsArray.startDate = null;
        calendarSelectedRowsArray.endDate = null;

        calendarSelectedRowsArray.startDate = $this;

        $this.addClass("calendar-selected-row");

        var dataDay = $(this).attr("data-day");
        var selector = "td[data-day=" + dataDay + "]";

        $(selector).on("mouseenter", function(e) {
            var $this = $(this);
            $this.attr('data-x-enter', e.pageY);
            $this.addClass("calendar-selected-row");
            calendarSelectedRowsArray.endDate = $this;

            $this.on("mouseleave", function(e) {
                $this = $(this);
                if(e.pageY < $this.attr('data-x-enter'))
                    $this.removeClass("calendar-selected-row");

                $this.unbind("mouseleave");
            });
        });

        $(document).on("mouseup", function(e) {
            $(selector).unbind("mouseenter");
            $(document).unbind("mouseup");

            $filterPopUp.removeClass('hidden');

            $(selector).attr("data-x-enter", "");
            resolveLeftLocation($filterPopUp, e.pageX);
            resolveTopLocation($filterPopUp, e.pageY);
        });

    });

    $(".filter-popup-submit").on("click", function(e) {
        var $filterPopUp = $(".filter-popup");
        $filterPopUp.addClass("hidden");

        var $lecturePopup = $(".lecture-popup");

        $lecturePopup.removeClass('hidden');

        resolveLeftLocation($lecturePopup, $filterPopUp.css("left"));
        resolveTopLocation($lecturePopup, $filterPopUp.css("top"));
    });

    $(".filter-popup-close").on("click", function() {
        var $filterPopUp = $(".filter-popup");
        $filterPopUp.addClass("hidden");

        removeSelectedRow();
    });

    $(".lecture-popup-submit").on("click", function() {
        var $lecturePopup = $(".lecture-popup");
        $lecturePopup.addClass("hidden");

        var course = $(this).attr("data-course");

        calendarSelectedRowsArray.startDate.addClass("full");
        calendarSelectedRowsArray.startDate.html(course);

        $.each($(".calendar-selected-row"), function() {
            var id = $(this).attr("id");
            var ids = id.split("h");

            var startId = calendarSelectedRowsArray.startDate.attr("id");
            var startIds = startId.split("h");

            var endId = calendarSelectedRowsArray.endDate.attr("id");
            var endIds = endId.split("h");

            if(ids[1] == startIds[1])
                $(this).addClass("border-top");

            if(ids[1] >= startIds[1] && ids[1] <= endIds[1]) {
                $(this).addClass("full");
                $(this).removeClass("empty");
                $(this).unbind("mousedown");
                $(this).addClass("event-color-two");
                $(this).on("click", courseOptionsListener);
            }


            if(ids[1] == endIds[1])
                $(this).addClass("border-bottom");
        });

        removeSelectedRow();
    });

    $(".lecture-popup-close").on("click", function() {
        var $lecturePopup = $(".lecture-popup");
        $lecturePopup.addClass("hidden");

        removeSelectedRow();
    });

    $(".course-options-popup-close").on("click", function() {
        var $courseOptions = $(".course-options-popup");
        $courseOptions.addClass("hidden");
    });

    $(".full").on("click", courseOptionsListener);
});