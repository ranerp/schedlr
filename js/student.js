$(document).ready(function() {
    $(".filter-popup-submit").on("click", function(e) {
        var $filterPopUp = $(".filter-popup");
        $filterPopUp.addClass("hidden");

        var $lecturePopup = $(".lecture-popup");

        $lecturePopup.removeClass('hidden');

        calendar.resolveLeftLocation($lecturePopup, $filterPopUp.css("left"));
        calendar.resolveTopLocation($lecturePopup, $filterPopUp.css("top"));
    });

    $(".filter-popup-close").on("click", function() {
        var $filterPopUp = $(".filter-popup");
        $filterPopUp.addClass("hidden");

        calendar.removeSelectedRow();
    });

    $(".lecture-popup-submit").on("click", function() {
        var $lecturePopup = $(".lecture-popup");
        $lecturePopup.addClass("hidden");

        calendar.addEvent(this);
    });

    $(".lecture-popup-close").on("click", function() {
        var $lecturePopup = $(".lecture-popup");
        $lecturePopup.addClass("hidden");

        calendar.removeSelectedRow();
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

        calendar.resolveLeftLocation($friendsAdvisePopUp, $courseOptionsPopup.css("left"));
        calendar.resolveTopLocation($friendsAdvisePopUp, $courseOptionsPopup.css("top"));
    });

    $(".course-options-look-submit").on("click", function(e) {
        var id = $(this).parents(".course-options-popup").attr("data-event-id");
        var $courseLookupPopup = $(".course-lookup-popup");
        var $courseOptionsPopup = $(".course-options-popup");

        for(var i = 0; i < calendar.calendarEvents.eventsCount; i++) {
            var event = calendar.calendarEvents.events[i];
            if(event.id == id) {
                $courseLookupPopup.find(".course-title").html(event.subject);
                $courseLookupPopup.removeClass("hidden");

                calendar.resolveLeftLocation($courseLookupPopup, $courseOptionsPopup.css("left"));
                calendar.resolveTopLocation($courseLookupPopup, $courseOptionsPopup.css("top"));
                $courseOptionsPopup.addClass("hidden");
                break;
            }
        }
    });

    $(".course-lookup-popup-close").on("click", function(e) {
        var $courseLookupPopup = $(".course-lookup-popup");

        $courseLookupPopup.addClass("hidden");
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
            $this.on("mousedown", function() { calendar.mouseDownListener(this, event) });
        });

        $(".course-options-popup").addClass("hidden");
    });

    $(".friends-advise-popup-close").on("click", function() {
        $(".friends-advise-popup").addClass("hidden");
    });

    $(".friends-advise-popup-submit").on("click", function() {
        $(".friends-advise-popup").addClass("hidden");
    });
	/*Ottosoni poolt ALGUS*/
	/* ALGUS: õppekava script*/
	$('.show-curriculum-popup').on("click", function() {
		$('.pick-institution-popup').removeClass("hidden");
		$('.pick-institution-curriculum-popup-submit').removeClass("hidden");
		$('.pick-institution-teacher-popup-submit').addClass("hidden");
		$('.pick-institution-classes-popup-submit').addClass("hidden");
		$('.classes-popup').addClass("hidden");
		$('.curriculum-popup').addClass("hidden");
		$('.teacher-popup').addClass("hidden");
		$('.curriculum-description-popup').addClass("hidden");
		$('.search-results-popup').addClass("hidden");
		
	});
	$('.pick-institution-popup-close').on("click", function() {
		$('.pick-institution-popup').addClass("hidden");
		$('.pick-institution-curriculum-popup-submit').addClass("hidden");
		$('.pick-institution-teacher-popup-submit').addClass("hidden");
		$('.pick-institution-classes-popup-submit').addClass("hidden");
	});	
	
	$('.pick-institution-curriculum-popup-submit').on("click", function() {
		$('.pick-institution-popup').addClass("hidden");
		$('.pick-institution-curriculum-popup-submit').addClass("hidden");
		$('.curriculum-popup').removeClass("hidden");
	});		
	
	$('.curriculum-popup-close').on("click", function() {
		$('.curriculum-popup').addClass("hidden");
	});		
	
	$('.curriculum-description-popup-submit').on("click", function() {
		$('.curriculum-popup').addClass("hidden");
		$('.curriculum-description-popup').removeClass("hidden");
		$('.classes-popup').addClass("hidden");
		$('.curriculum-popup').addClass("hidden");
		$('.teacher-popup').addClass("hidden");
		$('.search-results-popup').addClass("hidden");
	});	

	$('.curriculum-description-popup-close').on("click", function() {
		$('.curriculum-description-popup').addClass("hidden");

	});		
	/* LÕPP: õppekava script*/
	
	
	/* ALGUS: õppeaine script*/
	$('.show-classes-popup').on("click", function() {
		$('.pick-institution-popup').removeClass("hidden");
		$('.pick-institution-classes-popup-submit').removeClass("hidden");
		$('.pick-institution-curriculum-popup-submit').addClass("hidden");
		$('.pick-institution-teacher-popup-submit').addClass("hidden");
		$('.classes-popup').addClass("hidden");
		$('.curriculum-popup').addClass("hidden");
		$('.teacher-popup').addClass("hidden");
		$('.curriculum-description-popup').addClass("hidden");
		$('.search-results-popup').addClass("hidden");
	});
	$('.pick-institution-popup-close').on("click", function() {
		$('.pick-institution-popup').addClass("hidden");
		$('.pick-institution-curriculum-popup-submit').addClass("hidden");
		$('.pick-institution-teacher-popup-submit').addClass("hidden");
		$('.pick-institution-classes-popup-submit').addClass("hidden");
	});	
	
	$('.pick-institution-classes-popup-submit').on("click", function() {
		$('.pick-institution-popup').addClass("hidden");
		$('.pick-institution-classes-popup-submit').addClass("hidden");
		$('.classes-popup').removeClass("hidden");
	});		
	
	$('.classes-popup-close').on("click", function() {
		$('.classes-popup').addClass("hidden");
	});		
			
	/* LÕPP: õppeaine script*/
	
	/* ALGUS: õppekava script*/
	$('.show-teacher-popup').on("click", function() {
		$('.pick-institution-popup').removeClass("hidden");
		$('.pick-institution-teacher-popup-submit').removeClass("hidden");
		$('.pick-institution-curriculum-popup-submit').addClass("hidden");
		$('.pick-institution-classes-popup-submit').addClass("hidden");
		$('.classes-popup').addClass("hidden");
		$('.curriculum-popup').addClass("hidden");
		$('.teacher-popup').addClass("hidden");
		$('.curriculum-description-popup').addClass("hidden");
		$('.search-results-popup').addClass("hidden");
	});
	$('.pick-institution-popup-close').on("click", function() {
		$('.pick-institution-popup').addClass("hidden");
		$('.pick-institution-curriculum-popup-submit').addClass("hidden");
		$('.pick-institution-teacher-popup-submit').addClass("hidden");
		$('.pick-institution-classes-popup-submit').addClass("hidden");
	});	
	
	$('.pick-institution-teacher-popup-submit').on("click", function() {
		$('.pick-institution-popup').addClass("hidden");
		$('.pick-institution-teacher-popup-submit').addClass("hidden");
		$('.teacher-popup').removeClass("hidden");
	});		
	
	$('.teacher-popup-close').on("click", function() {
		$('.teacher-popup').addClass("hidden");
	});		
	
	
	/* LÕPP: õppekava script*/
	/*ALGUS: otsing*/
	$('.search-box').keyup("click", function(e) {
		if(e.keyCode == 13)
			{
			$('.search-results-popup').removeClass("hidden");
			$('.classes-popup').addClass("hidden");
			$('.curriculum-popup').addClass("hidden");
			$('.teacher-popup').addClass("hidden");
			$('.curriculum-description-popup').addClass("hidden");
			$('.pick-institution-popup').addClass("hidden");
			}
	});	
	
	$('.search-results-popup-close').on("click", function() {
		$('.search-results-popup').addClass("hidden");
	});	
	/*LõPP: otsing*/
	/*Ottosoni poolt LÕPP*/
			

    /*
    * @parameter 1: button to click to get authenticated with google calendar
    * @parameter 2: on event click which popup to show
    * @parameter 3: button/href to press to add event to calendar
    * @parameter 4: first popup when rows are selected and user releases mouse button
    */
    calendar.setAuthClick(".handle-auth-click");
    calendar.setEventAddButton(".lecture-popup-submit");
    calendar.setEventClickPopup(".course-options-popup");
    calendar.setMouseUpPopup(".filter-popup");

    $(".calendar-click-listener").find(".empty").on("mousedown", function() {calendar.mouseDownListener(this, event)});

    calendar.initialize();

    /*
    * Test events
    * */

   /* var events = {
        "nextId" : 1,
        "eventsCount" : 3,
        "events":
            [
                {"id": "1", "subject": "Intelligentsed süsteemid", "startDate": "1h8", "endDate": "1h12"},
                {"id": "2", "subject": "Bakalaurusetöö seminar", "startDate": "1h14", "endDate": "1h16"},
                {"id": "3", "subject": "Krüptoloogia", "startDate": "5h8", "endDate": "5h12"}
            ]
    };*/
    /* Set calendarEvents and populate calendar with data*/
  /* calendar.calendarEvents = events;
    calendar.populateCalendar(events);*/
});