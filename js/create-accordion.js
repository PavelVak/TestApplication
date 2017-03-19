var createAccordion = function(resp){
	$('#accordion').append('<div class="accordion-header clearfix"></div>');
	
	var headers = ['Last', 'First', 'Username', 'Phone', 'Location'];
	var asd = [];
	for (var i in headers) {
		asd.push('<div>' + headers[i] + '</div>');
	}
		
	$('.accordion-header').html(asd.join(''));
	
	for(var i = 0; i < resp.results.length; i++){
		$('#accordion').append('<div class="user"></div>');                
		var user = $('.user').eq(i);
		if(resp.results[i].gender === 'male'){
			user.addClass('male');
		} else{
			user.addClass('female');
		}
		user.append('<div class="user-item"></div><div class="user-details"></div>');
		var imgThumbnail = '<img src="' + resp.results[i].picture.thumbnail + '" title="' + resp.results[i].name.first + '">';
		var imgLarge = '<img src="' + resp.results[i].picture.large + '" title="' + resp.results[i].name.first + '">';
		user.find('.user-item').append('<div><div class="img-holder">' + imgThumbnail + '</div></div>')
			.append('<span>' + makeFirstLetterUppercase(resp.results[i].name.last) + '</span>')
			.append('<span class="first-name">' + makeFirstLetterUppercase(resp.results[i].name.first) + '</span>')
			.append('<span>' + resp.results[i].login.username + '</span>')
			.append('<span>' + resp.results[i].phone + '</span>')
			.append('<span>' + resp.results[i].location.state + '</span>');
		user.find('.user-details').append('<p><strong>'+ makeFirstLetterUppercase(resp.results[i].name.first) +'</strong></p>')
			.append('<div class="clearfix user-details-content"></div>');
		user.find('.user-details-content').append('<ul></ul>')
			.append('<ul></ul>')
			.append('<ul></ul>')
			.append('<div><div class="img-holder">' + imgLarge + '</div></div>');
		var listDetails = [{"login": "username"}, "registered", "email",
						   {"location": "street"}, {"location": "city"}, {"location": "postcode"}, 
						   "dob", "phone", "cell"];
		var listDate = ["registered", "dob"];
		var listRename = {"postcode": "zip code", "dob": "birthday"};
		var listDetailsPush = [];
		for(var j=0; j<listDetails.length; j++){
			if(typeof listDetails[j] == "object" ) {
				var key = Object.keys(listDetails[j])[0];
				var value = Object.values(listDetails[j])[0];
				var label = value;
				if ( $.inArray(label, Object.keys(listRename)) != -1){
					label = listRename[label];
				}
				listDetailsPush.push('<li><strong>'+ makeFirstLetterUppercase(label) +'</strong><span>'+ resp.results[i][key][value] +'</span></li>');
			} else {
				if ($.inArray(listDetails[j], listDate) != -1){
					resp.results[i][listDetails[j]] = new Date(resp.results[i][listDetails[j]]).toLocaleDateString('en-US');
				}
				var label = listDetails[j];
				if ( $.inArray(label, Object.keys(listRename)) != -1){
					label = listRename[label];
				} 
				listDetailsPush.push('<li><strong>'+ makeFirstLetterUppercase(label) +'</strong><span>'+ resp.results[i][listDetails[j]] +'</span></li>');
				
			}
		}
		
		user.find('.user-details-content ul:eq(0)').html(listDetailsPush.slice(0,3).join(''));
		user.find('.user-details-content ul:eq(1)').html(listDetailsPush.slice(3,6).join(''));
		user.find('.user-details-content ul:eq(2)').html(listDetailsPush.slice(6).join(''));
	}
	
	var allAccordionItems = $('#accordion .user-item');
	
	allAccordionItems.click(function() {
		if($(this).hasClass('open')){
			$(this).removeClass('open');
			$(this).next().slideUp("slow");
		} else {
			$('#accordion div.user-details').slideUp("slow");
			allAccordionItems.removeClass('open');
			$(this).addClass('open');
			$(this).next().slideDown("slow");
			return false;
		}
	});	
	
};

function makeFirstLetterUppercase(str){
	return str.charAt(0).toUpperCase()+ str.slice(1);
}