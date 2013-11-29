		
		var monday = new Date();	
		var dayNumber= monday.getDay();
		if(dayNumber==0){dayNumber=7;}//Stupid americans
		monday.setTime(monday.getTime() - (1000*3600*24*(dayNumber-1)));
		var sunday = new Date();
		sunday.setTime(sunday.getTime() + (1000*3600*24*(7-dayNumber)));
		
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
			//insertEvent("vo98k45c7lqa9ikdqnbhdc2n3c@group.calendar.google.com");
		 	gapi.client.load('calendar', 'v3', function() {
				// event list algab siit
				var request = gapi.client.calendar.events.list({
				  'calendarId': calId,
				  'timeMin': monday,
				  'timeMax': sunday

				  
				});  
				request.execute(function(resp) {
				var calendarEntries= new Array();
				var calendarTimes= new Array();
				var calendarEndTimes= new Array();
					for (var i = 0; i < resp.items.length; i++) {
						try{
							if(resp.items[i].summary!=null){
							calendarEntries.push(resp.items[i].summary);
							calendarTimes.push(new Date(resp.items[i].start.dateTime));
							calendarEndTimes.push(new Date(resp.items[i].end.dateTime));
							}
						}catch(e){console.log(e);}
					}
				putResultToTable(calendarEntries, calendarTimes, calendarEndTimes);
				});
			});
		};
		function putResultToTable(calendarEntries, calendarTimes, calendarEndTimes){
			for(var i = 0; i < calendarEntries.length; i++){
				getHoursNumber(calendarTimes[i], calendarEntries[i], calendarEndTimes[i]);
			}
		}
		function getHoursNumber(datetime, calendarEntry , endTime){
			var endHours=endTime.getHours();
			var hours = datetime.getHours();
			var day= datetime.getDay();
			console.log(hours, endHours,  day);
			
			document.getElementById(day+'h'+hours).style.backgroundColor = 'orange';
			if(document.getElementById(day+'h'+hours).value!=""){
				document.getElementById(day+'h'+hours).innerHTML=calendarEntry;
				while(hours<endHours){
					hours+=1;
					document.getElementById(day+'h'+hours).style.backgroundColor = 'orange';
				}
			}
			
			

		}
		function listCalendars () {
			gapi.client.load('calendar', 'v3', function() {
        		var request = gapi.client.calendar.calendarList.list();
        		var listContent = '<form id="calendarForm">';
        		request.execute(function(resp) {
        			console.log(resp.items.length);
        			for(var i=0;i<resp.items.length;i++){
        				listContent += '<input type="radio" name="calendarId" value="'+resp.items[i].id+'">'+resp.items[i].summary+'<br>';
        			}
        			listContent += '<input type="submit" value="Vali kalender" onclick="chooseCalendar();"></form>';
        			document.getElementById('calendarList').innerHTML = listContent;
        			//console.log(resp);
        		});
        	});
		}
		
		function chooseCalendar(){
			var radios = document.getElementsByName('calendarId');
			for (var i = 0, length = radios.length; i < length; i++) {
				if (radios[i].checked) {
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
       
       