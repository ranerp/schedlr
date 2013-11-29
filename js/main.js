$(document).ready( function(){
	$(function() {
		$( "#datepicker" ).datepicker({
			inline: true
			});
		});
		
		
	$(".calendar-click-listener").find("td").on("click", function(e) {
		$(".message-box").attr("data-time",($(this).attr("id")));
		$(".message-box").removeClass('hidden');
		$(".message-box").css("left", e.pageX);
		$(".message-box").css("top", e.pageY);
		result=($(".message-box").attr("data-time"));
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
		$("#" + $(".message-box").attr("data-time")).html($(".message-box-event").val());
		$(".message-box-event").val("");
		$(".message-box").addClass("hidden");
	});
	$(".message-box-close").on("click", function() {
		$("#" + $(".message-box").attr("data-time")).html($(".message-box-event").val());
		$(".message-box-event").val(".data-time");
		$(".message-box").addClass("hidden");
	});
  

  $('#date-today').datepicker({dateFormat: 'DD  MM  yy '}).datepicker('setDate', new Date());
  $('#date-today-message-box').datepicker({dateFormat: 'DD  MM  yy'}).datepicker('setDate', new Date());
  $('#time-today-message-box').datepicker({dateFormat: '',  timeFormat: 'hh:mm tt', timeOnly: true}).datepicker('setDatetime', new Date());

});