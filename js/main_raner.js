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
);

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


    $('#date-today').datepicker({dateFormat: 'DD  MM  yy '}).datepicker('setDate', new Date());
    $('#date-today-message-box').datepicker({dateFormat: 'DD  MM  yy'}).datepicker('setDate', new Date());
    $('#time-today-message-box').datepicker({dateFormat: '',  timeFormat: 'hh:mm tt', timeOnly: true}).datepicker('setDatetime', new Date());

});