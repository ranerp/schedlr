$(document).ready( function(){
  $('#date-today').datepicker({dateFormat: 'DD  MM  yy '}).datepicker('setDate', new Date());
	var mainCalendar="Tunniplaan";
	var eventsCalendar="Events";
	var homeworkCalendar="Homeworks";
	var colour="#FAEBD7";
	var monday = new Date();
	var fullMonthFromToday=new Date();
	var dayNumber= monday.getDay();
	if(dayNumber==0){dayNumber=7;}//Stupid americans
	monday.setTime(monday.getTime() - (1000*3600*24*(dayNumber-0.5)));
	var sunday = new Date();
	sunday.setTime(sunday.getTime() + (1000*3600*24*(7-dayNumber)));
	fullMonthFromToday.setTime(monday.getTime() + (1000*3600*24*31));
	
	var clientId = '267206477795-nmicslqg1i7kvt6tanp8d8208nnke05p.apps.googleusercontent.com';
	var apiKey = 'AIzaSyDXoUmbATnAIXsOWk9qqWZZYHizxD_k60s';
	var scopes = 'https://www.googleapis.com/auth/calendar';
	var sendToCalendarID = '';
	
	function handleClientLoad() {
		gapi.client.setApiKey(apiKey);
		//window.setTimeout(checkAuth,2);
		checkAuth();
	}

	function checkAuth() {
		gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
		handleAuthResult);
	}

	function handleAuthResult(authResult) {
		var authorizeButton = document.getElementById('authorize-button');
		if (authResult) {
			authorizeButton.style.visibility = 'hidden';
			listCalendars();
		}else {
			authorizeButton.style.visibility = '';
			authorizeButton.onclick = handleAuthClick;
	   }
	}
	$(".handleAuthClick").on("click", function(){
		gapi.auth.authorize(
		{client_id: clientId, scope: scopes, immediate: false},
		handleAuthResult);
	  return false;
	});

	function makeApiCall(calId) {
		gapi.client.load('calendar', 'v3', function() {
			var request = gapi.client.calendar.events.list({
			  'calendarId': calId,
			  'timeMin': monday,
			  'timeMax': sunday
			});  
			request.execute(function(resp) {
			var calendarEntries= new Array();
			var calendarTimes= new Array();
			var calendarEndTimes= new Array();
			try{
				for (var i = 0; i < resp.items.length; i++) {
					try{
						if(resp.items[i].summary!=null){
						calendarEntries.push(resp.items[i].summary);
						calendarTimes.push(new Date(resp.items[i].start.dateTime));
						calendarEndTimes.push(new Date(resp.items[i].end.dateTime));
						}
					}catch(e){}
				}
			}catch(e){}
			putResultToTable(calendarEntries, calendarTimes, calendarEndTimes);
			});
		});
	};
	function putResultToTable(calendarEntries, calendarTimes, calendarEndTimes){
		for(var i = 0; i < calendarEntries.length; i++){
			getHoursNumber(calendarTimes[i], calendarEntries[i], calendarEndTimes[i]);
		}
		colour="#F0F8FF"; 
	}
	var event_ID=0;
	function getHoursNumber(datetime, calendarEntry , endTime){
		var endHours=endTime.getHours();
		var hours = datetime.getHours();
		var day= datetime.getDay();
		//document.getElementById(day+'h'+hours).style.backgroundColor = colour;
		if(document.getElementById(day+'h'+hours).value!=""){
			var starts=day+'h'+hours;
			event_ID++;
		};
		while(hours<endHours){			
			hours+=1;
			//	document.getElementById(day+'h'+hours).style.backgroundColor = colour;
		}
		var ends=day+'h'+hours;
		console.log(starts);
		pushEventToCalendar(starts, ends, calendarEntry, event);

	}
	function listCalendars () {
		gapi.client.load('calendar', 'v3', function() {
			var request = gapi.client.calendar.calendarList.list();
			var listContent = '<form id="calendarForm">';
			request.execute(function(resp) {
				console.log(resp.items.length);
				for (var i = 0, length = resp.items.length; i < length; i++){
					if(resp.items[i].summary==mainCalendar || 
						resp.items[i].summary==homeworkCalendar	)
					{
						createCalendar(resp.items[i].id, resp.items[i].colorId);							
					}
					if(resp.items[i].summary==eventsCalendar)
					{
						createEventCalendar(resp.items[i].id);							
					}
				}
			});
		});
	}
	function createEventCalendar(calId){
		gapi.client.load('calendar', 'v3', function() {
			var request = gapi.client.calendar.events.list({
			  'calendarId': calId,
			  'timeMin': monday,
			  'timeMax': fullMonthFromToday
			});  
			request.execute(function(resp) {
			var calendarEntry="";
			var calendarTimes= new Array();
			var calendarEndTimes= new Array();
			var dateToday="";				
			try{
				for (var i = 0; i < resp.items.length; i++) {					
					if(resp.items[i].summary!=null){
						var eventTime=new Date(resp.items[i].start.dateTime);
						eventStartHour=eventTime.getHours();
						dateToday=$.datepicker.formatDate('DD dd MM  yy ', new Date(resp.items[i].start.dateTime));
						calendarEntry+='<strong>'+resp.items[i].summary+'</strong> - '+dateToday+' '+ eventStartHour+'.00 </br>';
					}
				}
			}catch(e){}
			document.getElementById('news-box').innerHTML=calendarEntry;
			});
		});

	}
	
	function createCalendar(eventId, colourId){
		var color=parseInt(colour);
		
		switch(color)
		{
		case 0: colour="brown"; break;
		case 1: colour="brown"; break;
		case 2: colour="red"; break;
		case 3: colour="red"; break;
		case 4: colour="red";     break;
		case 5: colour="red";     break;
		case 6: colour="orange";     break;
		case 7: colour="light-green";     break;
		case 8: colour="light-green";     break;
		case 9: colour="light-green";     break;
		case 10: colour="light-green";     break;
		case 11: colour="yellow";     break;
		case 12: colour="orange";     break;
		case 13: colour="cyan";     break;
		case 14: colour="light-blue";     break;
		case 15: colour="blue";     break;
		case 16: colour="blue";     break;
		case 17: colour="lilac";     break;
		case 18: colour="lilac";     break;
		case 19: colour="grey";     break;
		case 20: colour="grey";     break;
		case 21: colour="grey";     break;
		case 22: colour="pink";     break;
		case 23: colour="lilac";     break;
		case 24: colour="blue";     break;
		}
		makeApiCall(eventId);
	
	}
	function chooseCalendar(){
		var radios = document.getElementsByName('calendarId');
		for (var i = 0, length = radios.length; i < length; i++) {
			if (radios[i].checked) {
				console.log(radios[i].id);
				sendToCalendarID = radios[i].value;
				console.log("kalendri id kuhu salvestatakse: "+ sendToCalendarID);
				makeApiCall(radios[i].value);
			}
		}
		document.getElementById('calendarForm').innerHTML = '';
	}


	function Search(){
		title=document.getElementById('name').value;
		console.log(title);
		submitForm(title)
	}
	function createInstance(){
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


createInstance();

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
        "eventsCount" : "3",
        "events":
            [
            
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
        calendarEvents.eventsCount = id + 1;

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

        var startId = calendarSelectedRowsArray.startDate.attr("id");
        var endId = calendarSelectedRowsArray.endDate.attr("id");

        pushEventToCalendar(startId, endId, course, calendarSelectedRowsArray.startDate.attr("data-event-id"));

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

    $(".course-options-advise-submit").on("click", function() {
        var $courseOptionsPopup = $(".course-options-popup");
        $courseOptionsPopup.addClass("hidden");

        var $friendsAdvisePopUp = $(".friends-advise-popup");
        $('.friends-advise-popup').find(".btn-chk").removeClass("active");

        $friendsAdvisePopUp.removeClass("hidden");

        resolveLeftLocation($friendsAdvisePopUp, $courseOptionsPopup.css("left"));
        resolveTopLocation($friendsAdvisePopUp, $courseOptionsPopup.css("top"));
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