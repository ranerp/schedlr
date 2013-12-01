		var mainCalendar="Tunniplaan";
		var eventsCalendar="Events";
		var homeworkCalendar="Homeworks";
		var colour="#FAEBD7";
		var monday = new Date();
		var fullMonthFromToday=new Date();
		var dayNumber= monday.getDay();
		if(dayNumber==0){dayNumber=7;}//Stupid americans
		monday.setTime(monday.getTime() - (1000*3600*24*(dayNumber-1)));
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

		function handleAuthClick(event) {
			gapi.auth.authorize(
			{client_id: clientId, scope: scopes, immediate: false},
			handleAuthResult);
		  return false;
		}

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
		function getHoursNumber(datetime, calendarEntry , endTime){
			var endHours=endTime.getHours();
			var hours = datetime.getHours();
			var day= datetime.getDay();
			console.log(colour);
			document.getElementById(day+'h'+hours).style.backgroundColor = colour;
			if(document.getElementById(day+'h'+hours).value!=""){
				document.getElementById(day+'h'+hours).innerHTML=calendarEntry;
				while(hours<endHours){
					hours+=1;
					document.getElementById(day+'h'+hours).style.backgroundColor = colour;
				}
			}
			
			

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
       
       