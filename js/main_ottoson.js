$(document).ready(function() {
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
});