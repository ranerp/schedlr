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

    var calendarEvents = {
        "eventsCount" : 3,
        "events":
            [
                {"id": "1", "subject": "Intelligentsed süsteemid", "startDate": "1h8", "endDate": "1h12"},
                {"id": "2", "subject": "Bakalaurusetöö seminar", "startDate": "1h14", "endDate": "1h16"},
                {"id": "3", "subject": "Krüptoloogia", "startDate": "5h8", "endDate": "5h12"}
            ]
    };

    var populateCalendar = function(events) {
        for(var i = 0; i < events.eventsCount; i++) {
            var event = events.events[i];
           pushEventToCalendar(event.startDate, event.endDate, event.subject, event.id);
        }
    };

    var eventColors = ["event-color-one", "event-color-two"];

    var colorAt = 0;

    var getEventColorClass = function() {
        return eventColors[colorAt];
    }

    var rotateColorAt = function() {
        if(colorAt == 0)
            colorAt = 1;
        else
            colorAt = 0;
    }

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

        if((y + $div.height()) > $window.height())
            $div.css("top", y - $div.height());
        else
            $div.css("top", y - $div.height() / 2);
    }

    var resolveLeftLocation = function(div, x) {
        var $window = $(window);
        var $div = $(div);

        if((x + $div.width()) > $window.width())
            $div.css("left", x - $div.width());
        else
            $div.css("left", x - $div.width() / 2);
    }

    var removeSelectedRow = function() {
        $(".calendar-selected-row").removeClass("calendar-selected-row");
    }

    var courseOptionsListener = function(e) {
        var $courseOptions = $(".course-options-popup");

        $courseOptions.removeClass("hidden");

        $courseOptions.attr("data-event-id", $(this).attr("data-event-id"));

        resolveLeftLocation($courseOptions, e.pageX);
        resolveTopLocation($courseOptions, e.pageY);
    }

    var calendarMouseDownListener = function() {
        var $filterPopUp = $(".filter-popup");
        var $this = $(this);

        calendarSelectedRowsArray.startDate = $this;
        calendarSelectedRowsArray.endDate = $this;

        var id = calendarEvents.eventsCount + 1;
        calendarEvents.eventsCount = id;

        calendarSelectedRowsArray.startDate.attr("data-event-id", id);

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

            $(selector).removeAttr("data-x-enter");
            resolveLeftLocation($filterPopUp, e.pageX);
            resolveTopLocation($filterPopUp, e.pageY);
        });

    };

    $(".drag-listener").on("mousedown", function(e) {
        startMoveListening($(this).parent(), e);

        $(".drag-listener").on("mouseup", function(e) {
            $(this).parent().removeClass("moving");
            $(document).unbind("mousemove");
        });
    });

    $(".filter-popup-submit").on("click", function(e) {
        var $filterPopUp = $(".filter-popup");

        var $lecturePopup = $(".lecture-popup");

        $lecturePopup.removeClass('hidden');
        resolveLeftLocation($lecturePopup, $filterPopUp.position().left + $filterPopUp.width());
        resolveTopLocation($lecturePopup, $filterPopUp.position().top + $filterPopUp.height());

        $filterPopUp.addClass("hidden");
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

        var startId = calendarSelectedRowsArray.startDate.attr("id");
        var endId = calendarSelectedRowsArray.endDate.attr("id");

        calendarEvents.events.push({
            "id": calendarSelectedRowsArray.startDate.attr("data-event-id"),
            "subject": course,
            "startDate": startId,
            "endDate": endId
            });

        pushEventToCalendar(startId, endId, course, calendarSelectedRowsArray.startDate.attr("data-event-id"));

        console.log(calendarEvents);

        removeSelectedRow();
    });

    var pushEventToCalendar = function(start, end, subject, eventId) {
        var startDates = start.split("h");
        startDates[0] = parseInt(startDates[0]);
        startDates[1] = parseInt(startDates[1]);

        var endDates = end.split("h");
        endDates[0] = parseInt(endDates[0]);
        endDates[1] = parseInt(endDates[1]);

        $.each($(".main-calendar").find(".event-column"), function() {
            var id = $(this).attr("id");
            var tdDates = id.split("h");
            tdDates[0] = parseInt(tdDates[0]);
            tdDates[1] = parseInt(tdDates[1]);

            if(tdDates[0] == startDates[0] && tdDates[1] == startDates[1]) {
                $(this).addClass("border-top");
                var $div = $("<div class='calendar-event'></div>");
                $div.css("position", "absolute");
                $div.css("height", $(this).height() + 8);
                $div.css("padding", "5px");
                $div.css("z-index", "10");
                $div.css("border-top-left-radius", "7px");
                $div.css("border-top-right-radius", "7px");

                if(tdDates[1] == endDates[1]) {
                    $div.css("border-bottom-left-radius", "7px");
                    $div.css("border-bottom-right-radius", "7px");
                }

                $div.css("top", $(this).position().top + 8);
                $div.append("<h5><strong>" + subject + "</strong></h5>");

                addEventPart($div, this, eventId);
            }
            else if(startDates[0] == tdDates[0] && tdDates[1] > startDates[1] && tdDates[1] < endDates[1]) {
                var $div = $("<div class='calendar-event'>&ensp;</div>");
                $div.css("position", "absolute");
                $div.css("height", $(this).height() + 16);
                $div.css("top", $(this).position().top);

                addEventPart($div, this, eventId);
            }
            else if(startDates[0] == tdDates[0] && tdDates[1] == endDates[1]) {
                var $div = $("<div class='calendar-event'>&ensp;</div>");
                $div.css("position", "absolute");
                $div.css("border-bottom-left-radius", "10px");
                $div.css("border-bottom-right-radius", "10px");
                $div.css("height", $(this).height() + 8);
                $div.css("top", $(this).position().top);

                addEventPart($div, this, eventId);
            }


            if(endDates[0] == tdDates[0] && tdDates[1] == endDates[1])
                $(this).addClass("border-bottom");
        });

        rotateColorAt();
    }

    var addEventPart = function(div, column, id) {

        div.addClass(getEventColorClass());
        div.css("width", $(column).width());

        $(column).append(div);
        $(column).removeClass("empty");
        $(column).addClass("full");
        $(column).unbind("mousedown");
        $(column).attr("data-event-id", id);
        $(column).on("click", courseOptionsListener);
    }

    var onWindowResizeEvent = function() {
        $.each($(".main-calendar").find(".calendar-event"), function() {
            $(this).css("width", $(this).parents("td").width());
        });
    }

    $(".lecture-popup-close").on("click", function() {
        var $lecturePopup = $(".lecture-popup");
        $lecturePopup.addClass("hidden");

        removeSelectedRow();
    });

    $(".course-options-popup-close").on("click", function() {
        var $courseOptions = $(".course-options-popup");
        $courseOptions.addClass("hidden");
    });

    $(".course-options-advise-submit").on("click", function(e) {
        var $courseOptionsPopup = $(".course-options-popup");

        var $friendsAdvisePopUp = $(".friends-advise-popup");
        $('.friends-advise-popup').find(".btn-chk").removeClass("active");

        $friendsAdvisePopUp.removeClass("hidden");

        resolveLeftLocation($friendsAdvisePopUp, $courseOptionsPopup.position().left + $courseOptionsPopup.width());
        resolveTopLocation($friendsAdvisePopUp, $courseOptionsPopup.position().top + $courseOptionsPopup.height());

        $courseOptionsPopup.addClass("hidden");
    });

    $(".course-options-remove-submit").on("click", function() {
        var eventId = $(this).parents(".course-options-popup").attr("data-event-id");

        var selector = "td[data-event-id=" + eventId  + "]";

        $.each($(".main-calendar").find(selector), function() {
            var $this = $(this);
            $this.removeClass("full");
            $this.removeAttr("data-event-id");
            $this.removeClass("event-color-one");
            $this.removeClass("event-color-two");
            $this.addClass("empty");
            $this.html("");
            $this.unbind("mousedown");
            $this.on("mousedown", calendarMouseDownListener);
        });

        for(var i = 0; i < calendarEvents.eventsCount; i++) {
            if(calendarEvents.events[i].id == eventId)
                if(i != -1) {
                    calendarEvents.events.splice(i, 1);
                    calendarEvents.eventsCount -= 1;
                }
        }

        $(".course-options-popup").addClass("hidden");
    });

    $(".friends-advise-popup-close").on("click", function() {
        $(".friends-advise-popup").addClass("hidden");
    });

    $(".friends-advise-popup-submit").on("click", function() {
        $(".friends-advise-popup").addClass("hidden");
    });

    $(".full").on("click", courseOptionsListener);
    $(".calendar-click-listener").find(".empty").on("mousedown", calendarMouseDownListener);

    $(window).resize(onWindowResizeEvent);

    populateCalendar(calendarEvents);
});