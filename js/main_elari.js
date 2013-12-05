$(document).ready( function(){
	$(function() {
		$( "#datepicker" ).datepicker({
			inline: true
			});
		});
		
		
	$(".calendar-click-listener").find("td").on("click", function(e) {
        var $messageBox = $(".message-box");
        $messageBox.attr("data-time",($(this).attr("id")));
        $messageBox.removeClass('hidden');
        $messageBox.css("left", e.pageX);
        $messageBox.css("top", e.pageY);

		var result = $messageBox.attr("data-time");
		var res = result.split("h");
		var day=parseInt(res[0]);		
		switch(day)
			{
			case 0: day="Esmaspäev"; break;
			case 1: day="Teisipäev"; break;
			case 2: day="Kolmapäev"; break;
			case 3: day="Neljapäev"; break;
			case 4: day="Reede";     break;
			}
		($(".message-box-datetime").val(day+" "+res[1]+".15"));
		
	});
	
	$(".message-box-submit").on("click", function() {
        var $messageBox = $(".message-box");
        var $messageBoxEvent = $(".message-box-event");

		$(".message-box-event").val("");
        $messageBox.addClass("hidden");
	});
	
	$(".message-box-close").on("click", function() {
        var $messageBox = $(".message-box");
        var $messageBoxEvent = $(".message-box-event");

        $messageBoxEvent.val(".data-time");
        $messageBox.addClass("hidden");
	});
	$(".student-list-button").on("click", function() {
        var $studentPanel = $(".student-list");
		$studentPanel.removeClass('hidden');	});
	$(".homework-panel-button").on("click", function() {
        var $studentPanel = $(".homework-panel");
		$studentPanel.removeClass('hidden');	});
	$(".homework-panel-close").on("click", function() {
        var $studentPanel = $(".homework-panel");
		$studentPanel.addClass('hidden');	});
	$(".student-list-close").on("click", function() {
        var $studentPanel = $(".student-list");
		$studentPanel.addClass('hidden');	});

  $('#date-today').datepicker({dateFormat: 'DD  MM  yy '}).datepicker('setDate', new Date());
  $('#date-today-message-box').datepicker({dateFormat: 'DD  MM  yy'}).datepicker('setDate', new Date());
  $('#time-today-message-box').datepicker({dateFormat: '',  timeFormat: 'hh:mm tt', timeOnly: true}).datepicker('setDatetime', new Date());

});