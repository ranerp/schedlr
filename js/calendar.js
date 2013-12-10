    var calendar = new Calendar();

    function Calendar() {

        this.calObj = this;

        this.mouseUpContainer = null;
        this.addEventButton = null;
        this.eventClickContainer = null;
        this.authClickButton = null;

        this.scheduleTypes = {
            "schedule": "Tunniplaan",
            "event": "Events",
            "homework": "Homeworks"
        };

        this.calendarSelectedRowsArray = {
            "startDate" : null,
            "endDate": null
        };

        this.calendarEvents = {
            "nextId" : 1,
            "eventsCount" : 0,
            "events":
                [

                ]
        };

        this.eventColors = ["event-color-one", "event-color-two"];
        this.colorAt = 0;

        this.getEventColorClass = function() {
            return this.eventColors[this.colorAt];
        }

        this.rotateColorAt = function() {
            if(this.colorAt == 0)
                this.colorAt = 1;
            else
                this.colorAt = 0;
        }

        this.monday = new Date();
        this.dayNumber = this.monday.getDay();
        this.monday.setTime(this.monday.getTime() - (1000 * 3600 * 24 * (this.dayNumber - 0.5)));

        this.sunday = new Date();
        this.sunday.setTime(this.sunday.getTime() + (1000 * 3600 * 24 * (7 - this.dayNumber)));

        this.fullMonthFromToday = new Date().setTime(this.monday.getTime() + (1000 * 3600 * 24 * 31));

        this.clientId = "267206477795-nmicslqg1i7kvt6tanp8d8208nnke05p.apps.googleusercontent.com";
        this.apiKey = "AIzaSyDXoUmbATnAIXsOWk9qqWZZYHizxD_k60s";
        this.scopes = "https://www.googleapis.com/auth/calendar";
    };

    Calendar.prototype.initialize = function() {
        var calObj = this.calObj;
        if(this.mouseUpContainer == null)
            throw "First popup not set!";
        if(this.addEventButton == null)
            throw "Submit event button not set!";
        if(this.eventClickContainer == null)
            throw "Event onclick popup not set!";

        this.onWindowsResizeEvent();
        this.addAuthClickListener();
        this.startDragListener();
        this.createInstance();
    };

    Calendar.prototype.createInstance = function() {
        var req = null;
        if(window.XMLHttpRequest) {
            req = new XMLHttpRequest();
        }
        else if (window.ActiveXObject) {
            try {
                req = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    req = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    alert("XHR not created");
                }
            }
        }
        return req;
    };

    Calendar.prototype.handleAuthResult = function(authResult) {
        var $authorizeButton = $("#authorize-button");
        if(authResult) {
            $authorizeButton.addClass("hidden");
            calendar.fetchData();
        }
    };

    Calendar.prototype.addAuthClickListener = function() {
        var cal = this.calObj;
        $(this.authClickButton).on("click", function() {
            gapi.auth.authorize(
                {
                    "client_id": cal.clientId,
                    "scope": cal.scopes,
                    "immediate": false
                },
                cal.handleAuthResult
            );
            return false;
        });
    };

    Calendar.prototype.makeApiCall = function(callId) {
        var cal = this;
        gapi.client.load('calendar', 'v3', function() {
            var request = gapi.client.calendar.events.list({
                'calendarId': callId,
                'timeMin': cal.monday,
                'timeMax': cal.sunday
            });

            request.execute(function(resp) {
                try{
                    for (var i = 0; i < resp.items.length; i++) {
                        try{
                            var tempObj = new Object();
                            tempObj.id = cal.calendarEvents.nextId;
                            cal.calendarEvents.eventsCount++;
                            cal.calendarEvents.nextId++;
                            tempObj.subject = resp.items[i].summary;
                            tempObj.startDate = cal.convertDateForFeed(new Date(resp.items[i].start.dateTime), "start");
                            tempObj.endDate = cal.convertDateForFeed(new Date(resp.items[i].end.dateTime), "end");
                            cal.calendarEvents.events.push(tempObj);
                        }catch(e){}
                    }
                    cal.populateCalendar(cal.calendarEvents);
                } catch(e){}
            });
        });
    };

    Calendar.prototype.convertDateForFeed = function(dateTime, type) {
        if(type == "end")
            var hour = parseInt(dateTime.getHours()) - 1;
        else
            var hour = dateTime.getHours();

        var day = dateTime.getDay();

        return day + "h" + hour;
    };

    Calendar.prototype.fetchData = function() {
        var cal = this;
        gapi.client.load('calendar', 'v3', function() {
            var request = gapi.client.calendar.calendarList.list();
            request.execute(function(resp) {
                for (var i = 0, length = resp.items.length; i < length; i++){
                    if(resp.items[i].summary == cal.scheduleTypes.schedule ||
                        resp.items[i].summary == cal.scheduleTypes.homework	)
                    {
                        cal.makeApiCall(resp.items[i].id);
                    }
                    else if(resp.items[i].summary == cal.scheduleTypes.schedule)
                    {
                        cal.makeApiCall(resp.items[i].id);
                    }
                }
            });
        });
    };

    Calendar.prototype.populateCalendar = function(events) {
        for(var i = 0; i < events.eventsCount; i++) {
            var event = events.events[i];
            this.pushEventToCalendar(event.startDate, event.endDate, event.subject, event.id);
        }
    };

    Calendar.prototype.startMoveListener = function(div, e) {
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
    };

    Calendar.prototype.startDragListener = function() {
        var cal = this.calObj;
        $(".drag-listener").on("mousedown", function(e) {
            cal.startMoveListener($(this).parent(), e);
             $(".drag-listener").on("mouseup", function(e) {
                $(this).parent().removeClass("moving");
                $(document).unbind("mousemove");
            });
        });
    };

    Calendar.prototype.mouseDownListener = function(column, e) {
        var cal = this.calObj;
        var $popup = $(this.mouseUpContainer);
        var $column = $(column);

        $column.addClass("calendar-selected-row");
        $column.attr("data-x-enter", e.pageY);

        this.calendarSelectedRowsArray.startDate = $column;
        this.calendarSelectedRowsArray.endDate = $column;

        var id = this.calendarEvents.eventsCount + 1;
        this.calendarEvents.eventsCount = id + 1;

        this.calendarSelectedRowsArray.startDate.attr("data-event-id", id);

        var dataDay = $(column).attr("data-day");
        var selector = "td[data-day=" + dataDay + "]";

        $(selector).on("mouseenter", function(e) {
            var $this = $(this);
            if(e.pageY > cal.calendarSelectedRowsArray.startDate.attr("data-x-enter")) {
                $this.attr('data-x-enter', e.pageY);
                $this.addClass("calendar-selected-row");
                cal.calendarSelectedRowsArray.endDate = $this;

                $this.on("mouseleave", function(e) {
                    $this = $(this);
                    if(e.pageY < $this.attr('data-x-enter') && e.pageY > cal.calendarSelectedRowsArray.startDate.attr("data-x-enter"))
                        $this.removeClass("calendar-selected-row");

                    $this.unbind("mouseleave");
                });
            }
        });

        $(document).on("mouseup", function(e) {
            $(selector).unbind("mouseenter");
            $(document).unbind("mouseup");

            $popup.removeClass('hidden');

            $(selector).removeAttr("data-x-enter");
            cal.resolveLeftLocation($popup, e.pageX);
            cal.resolveTopLocation($popup, e.pageY);
        });

    };

    Calendar.prototype.addEventOnClickListener = function(calObj, e, column) {
        var $popup = $(this.eventClickContainer);

        $popup.removeClass("hidden");

        $popup.attr("data-event-id", $(column).attr("data-event-id"));

        calObj.resolveLeftLocation($popup, e.pageX);
        calObj.resolveTopLocation($popup, e.pageY);
    };

    Calendar.prototype.resolveTopLocation = function(div, y) {
        var $window = $(window);
        var $div = $(div);

        if((y + $div.width()) > $window.height())
            $div.css("top", y - $div.height());
        else
            $div.css("top", y);
    };

    Calendar.prototype.resolveLeftLocation = function(div, x) {
        var $window = $(window);
        var $div = $(div);

        if((x + $div.width()) > $window.width())
            $div.css("left", x - $div.width());
        else
            $div.css("left", x);
    };

    Calendar.prototype.removeSelectedRow = function() {
        $(".calendar-selected-row").removeClass("calendar-selected-row");
    };

    Calendar.prototype.removeEvent = function() {

    };

    Calendar.prototype.pushEventToCalendar = function(start, end, subject, eventId) {
        var cal = this.calObj;
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
                $div.css("padding", "2px");
                $div.css("z-index", "10");
                $div.css("border-top-left-radius", "7px");
                $div.css("border-top-right-radius", "7px");

                if(tdDates[1] == endDates[1]) {
                    $div.css("border-bottom-left-radius", "7px");
                    $div.css("border-bottom-right-radius", "7px");
                }

                $div.css("top", $(this).position().top + 8);
                $div.append("<h5><strong>" + subject + "</strong></h5>");

                cal.addEventPart($div, this, eventId);
            }
            else if(startDates[0] == tdDates[0] && tdDates[1] > startDates[1] && tdDates[1] < endDates[1]) {
                var $div = $("<div class='calendar-event'>&ensp;</div>");
                $div.css("position", "absolute");
                $div.css("height", $(this).height() + 16);
                $div.css("top", $(this).position().top);

                cal.addEventPart($div, this, eventId);
            }
            else if(startDates[0] == tdDates[0] && tdDates[1] == endDates[1]) {
                var $div = $("<div class='calendar-event'>&ensp;</div>");
                $div.css("position", "absolute");
                $div.css("border-bottom-left-radius", "10px");
                $div.css("border-bottom-right-radius", "10px");
                $div.css("height", $(this).height() + 8);
                $div.css("top", $(this).position().top);

                cal.addEventPart($div, this, eventId);
            }


            if(endDates[0] == tdDates[0] && tdDates[1] == endDates[1])
                $(this).addClass("border-bottom");
        });

        cal.rotateColorAt();
    };

    Calendar.prototype.addEvent = function(object) {
        var course = $(object).attr("data-course");

        this.calendarSelectedRowsArray.startDate.addClass("full");

        var eventId = this.calendarSelectedRowsArray.startDate.attr("data-event-id");
        var startId = this.calendarSelectedRowsArray.startDate.attr("id");
        var endId = this.calendarSelectedRowsArray.endDate.attr("id");


        this.calendarEvents.events.push({"id": eventId, "subject": course, "startDate": startId, "endDate": endId});


        this.pushEventToCalendar(startId, endId, course, eventId);

        this.removeSelectedRow();
    };

    Calendar.prototype.addEventPart =function(div, column, id) {
        var calObj = this;

        div.addClass(this.getEventColorClass());
        div.css("width", $(column).width());

        $(column).append(div);
        $(column).removeClass("empty");
        $(column).addClass("full");
        $(column).unbind("mousedown");
        $(column).attr("data-event-id", id);
        $(column).on("click", function() {calObj.addEventOnClickListener(calObj, event, column)});

    };



    Calendar.prototype.onWindowsResizeEvent = function() {
        $.each($(".main-calendar").find(".calendar-event"), function() {
            $(this).css("width", $(this).parents("td").width());
        });
    };

    Calendar.prototype.setMouseUpPopup = function(div) {
        this.mouseUpContainer = div;
    };

    Calendar.prototype.setEventAddButton = function(button) {
        this.addEventButton = button;
    };

    Calendar.prototype.setEventClickPopup = function(div) {
        this.eventClickContainer = div;
    };

    Calendar.prototype.setAuthClick = function(button) {
        this.authClickButton = button;
    };

$(document).ready(function() {
    $('#date-today').datepicker({dateFormat: 'DD  MM  yy '}).datepicker('setDate', new Date());

    $(function() {
        $( "#datepicker" ).datepicker({
            inline: true
        });
    });
});