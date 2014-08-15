function login() {
	var e = $('#email').val();
	var p = $('#password').val();
	$.ajax({
		url: 'http://dev.unicrm.dk/index.php?option=com_webitall_crm&task=api.login&tmpl=api',
		type: 'GET',
		data: "email=" + e + "&pass=" + p,
		dataType: 'json',

	})
	.done(function(data) {
		console.log("success");
		checkLogin(data);
	})
	.fail(function() {
		console.log("error");
		$('.error').css("color", "red");
		$('.error').html("An error occurred");
	})
	.always(function() {
		console.log("done");
	});
}

function getActivities () {
	var token = window.localStorage.getItem("token");
	$.ajax({
		url: 'http://dev.unicrm.dk/index.php?option=com_webitall_crm&task=api.getActivities&tmpl=api',
		type: 'GET',
		data: "token=" + token,
		dataType: 'json',

	})
	.done(function(data) {
		/*$('#result').append("<table>" +
								"<tr>" +
									"<tr><th>Type</th></tr>" + 
									"<tr><th>Dato</th></tr>" +
									"<tr><th>Tidspunkt</th></tr>" +
									"<tr><th>Virksomhed</th></tr>" +
									"<tr><th>Note</th></tr>" +
								"</tr>" +
								"<tr>");
		$.each(data.activities, function(index, val) {
			 console.log(val);
			 $('#result').append("<tr><td>" + val.type + "</td></tr>");
			 $('#result').append("<tr><td>" + val.date + "</td></tr>");
			 $('#result').append("<tr><td>" + val.time + "</td></tr>");
			 $('#result').append("<tr><td>" + val.company + "</td></tr>");
			 $('#result').append("<tr><td>" + val.text + "</td></tr>");
			 $('#result').append("</tr>" +
		 					"</table>");
		});*/

		$.each(data.activities, function(index, val) {
			setTimeout(function() {
				$('#result').append("<div class='col-xs-12 activities_small nopadding'>");
					$('#result').append("<div class='col-xs-12'><b>"+ val.text + "</b></div>");
					$('#result').append("<div class='col-xs-4'><b>Type:</b> </div><div class='col-xs-8'>" + val.type + "</div>");
					$('#result').append("<div class='col-xs-4'><b>Dato:</b> </div><div class='col-xs-8'>" + val.date + "</div>");
					$('#result').append("<div class='col-xs-4'><b>Tidspunkt:</b> </div><div class='col-xs-8'>" + val.time + "</div>");
					$('#result').append("<div class='col-xs-4'><b>Virksomhed:</b> </div><div class='col-xs-8'>" + val.company + "</div>");
				$('#result').append("</div>");
			}, 0);
		});
		
		console.log(data.status + " " + data.activities);
	})
	.fail(function() {
		console.log("error");
		$('.error').css("color", "red");
		$('.error').html("An error occurred");
	})
	.always(function() {
		console.log("done");
	});
}

function getActivityDetails () {
	var token = window.localStorage.getItem("token");
	$.ajax({
		url: 'http://dev.unicrm.dk/index.php?option=com_webitall_crm&task=api.getActivities&tmpl=api',
		type: 'GET',
		data: "token=" + token,
		dataType: 'json',

	})
	.done(function(data) {
		$.each(data.activities, function(index, val) {
			$('#result').append("<div class='col-xs-3'><b>Type:</b> </div><div class='col-xs-9'>" + val.type + "</div>");
			$('#result').append("<div class='col-xs-3'><b>Dato:</b> </div><div class='col-xs-9'>" + val.date + "</div>");
			$('#result').append("<div class='col-xs-3'><b>Tidspunkt:</b> </div><div class='col-xs-9'>" + val.time + "</div>");
			$('#result').append("<div class='col-xs-3'><b>Virksomhed:</b> </div><div class='col-xs-9'>" + val.company + "</div>");
			$('#result').append("<div class='col-xs-3'><b>Note:</b> </div><div class='col-xs-9'>" + val.text + "</div>");
		});
		
		console.log(data.status + " " + data.activities);
	})
	.fail(function() {
		console.log("error");
		$('.error').css("color", "red");
		$('.error').html("An error occurred");
	})
	.always(function() {
		console.log("done");
	});
}

function checkLogin(data) {
	console.log("checkLogin invoked");
	console.log("status" + data.status);
	$.each(data, function(index, val) {console.log(val);});
	switch(true) {
			default:
				console.log("default");
				break;
            case (data.status == 1):
        		saveToken(data);
        		console.log("case 1 success");
        		window.location.href = "activities.html";
                /*$rootScope.ons.screen.presentPage('overview.html');*/
                break;
            case (data.status == -1):
            	console.log("case -1 fail");
                $('.error').html("Forkert kodeord");
                break;
            case (data.status == -2):
            	console.log("case -2 fail");
                $('.error').html("Forkert brugernavn / bruger eksisterer ikke");
                break;
        }
}

function saveToken (data) {
	console.log("savetoken");
	window.localStorage.setItem("userId", data.userId);
	window.localStorage.setItem("token", data.userId + ":" + data.token);
}

function getToken () {
	var token = window.localStorage.getItem("token");
	var userId = window.localStorage.getItem("userId");
}

/* LANGUAGES */

function chlangDK () {
	var lang = "da";
	$(function(){
        var opts = { language: lang, pathPrefix: "languages"};
		$("[data-localize]").localize("example", opts)
	})
	saveLang(lang);
}

function chlangEN () {
	var lang = "en";
	$(function(){
        var opts = { language: lang, pathPrefix: "languages"};
		$("[data-localize]").localize("example", opts)
	})
	saveLang(lang);
}

function saveLang (flag) {
	var lang = window.localStorage.setItem("lang" , flag);
	console.log("Language saved: " + window.localStorage.getItem("lang"));
}

function getLang () {
	var lang = window.localStorage.getItem("lang");
	$(function(){
        var opts = { language: lang, pathPrefix: "languages"};
		$("[data-localize]").localize("example", opts)
	})
	console.log("Language is now: " + window.localStorage.getItem("lang"));
}