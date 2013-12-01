$(document).ready( function(){
    $(function() {
        $( "#datepicker" ).datepicker({
            inline: true
        });
    });

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

    $(".drag-listener").on("mousedown", function(e) {
        startMoveListening($(this).parent(), e);

        $(".drag-listener").on("mouseup", function(e) {
            $(this).parent().removeClass("moving");
            $(document).unbind("mousemove");
        });
    });


    $(".calendar-click-listener").find("td").on("click", function(e) {
        var $filterPopUp = $(".filter-popup");
        $filterPopUp.removeClass('hidden');
        $filterPopUp.css("left", e.pageX);
        $filterPopUp.css("top", e.pageY);

        $(".bfh-selectbox").bfhselectbox('toggle')
    });

    $(".filter-popup-submit").on("click", function(e) {
        var $filterPopUp = $(".filter-popup");
        $filterPopUp.addClass("hidden");

        var $lecturePopup = $(".lecture-popup");
        $lecturePopup.removeClass('hidden');
        $lecturePopup.css("left", $filterPopUp.css("left"));
        $lecturePopup.css("top", $filterPopUp.css("top"));
    });

    $(".filter-popup-close").on("click", function() {
        var $filterPopUp = $(".filter-popup");
        $filterPopUp.addClass("hidden");
    });

    $(".lecture-popup-submit").on("click", function() {
        var $lecturePopup = $(".lecture-popup");
        $lecturePopup.addClass("hidden");
    });

    $(".lecture-popup-close").on("click", function() {
        var $lecturePopup = $(".lecture-popup");
        $lecturePopup.addClass("hidden");
    });
});