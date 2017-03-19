 $(function() {
	$.ajax({
		url: 'https://randomuser.me/api/?results=7',
		dataType: 'json',
		success: successHandler,
		error: function(error) {
			$('body .wrapper').text("Server does not response");
		}
	});
});

var successHandler = function(resp){
	$('body .wrapper').append('<div class="search-block clearfix">' +
		'<a id="inline" class="open-window" href="#">Show Chart</a>' +
		'<input type="text" id="search" placeholder="First name search"></div>'
	);
	$('body .wrapper').append('<div id="accordion"></div>');
	
	createAccordion(resp);
	
	$('#search').on('keyup', function(e){
		var searchName = $('#search').val();
		var searchResult = resp.results.filter(function(item) {
			return item.name.first.indexOf(searchName) != -1
		});
		$('#accordion').empty();
		if(searchResult.length > 0){
			createAccordion({"results": searchResult});
		} else {
			$('#accordion').text("There are no users")
		}
	});
	
	var maleCount = 0;
	var femaleCount = 0;
	for(var i = 0; i < resp.results.length; i++){
		if(resp.results[i].gender === 'male'){
			maleCount++;
		} else {
			femaleCount++;
		}
	}
	
	$('body .wrapper').append('<div class="overlay"></div>' +
		'<div class="popup">' +
		'<div class="close-window">x</div>' +
			'<div id="chartContainer" style="height: 300px; width: 100%;"></div>' +
		'</div>');
	var femalePercent = + ((femaleCount / resp.results.length) * 100).toFixed(2);
	var malePercent = + (100 - femalePercent).toFixed(2);

	var chart = getChart(femaleCount, maleCount, femalePercent, malePercent);
	chart.render();
	
	$('.popup .close-window, .overlay').click(function (){
		$('.popup, .overlay').css({'opacity': 0, 'visibility': 'hidden'});
	});
	$('.open-window').click(function (e){
		$('.popup, .overlay').css({'opacity': 1, 'visibility': 'visible'});
		e.preventDefault();
	});
};
			
			