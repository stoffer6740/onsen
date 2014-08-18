
/* Logs you in to the server */
function login() {
	var e = $('#email').val().trim();
	var p = $('#password').val().trim();
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
        		if ($('#rEmail').prop('checked', true)) {
        			saveEmail();
        		}
        		console.log("case 1 success");
        		window.location.href = "content.html";
                /*$rootScope.ons.screen.presentPage('overview.html');*/
                break;
            case (data.status == -1):
            	console.log("case -1 fail");
                $('.error').html("Wrong password");
                break;
            case (data.status == -2):
            	console.log("case -2 fail");
                $('.error').html("Wrong username / User does not exist");
                break;
        }
}

/* Saves the token to localstorage in the browser (NEEDS ENCRYPTION?!) */
function saveToken (data) {
	console.log("savetoken");
	window.localStorage.setItem("token", data.userId + ":" + data.token);
}

/* Gets the token from localstorage */
function getToken () {
	var token = window.localStorage.getItem("token");
	var userId = window.localStorage.getItem("userId");
}

function saveEmail() {
	var email = $('#email').val();
	window.localStorage.setItem("email", email);
	console.log("Email saved as: " + email);
}


/* Gets the activities for the person who is logged in from the server */
function getActivities () {
	console.log("getActivities");
	var token = window.localStorage.getItem("token");
	$.ajax({
		url: 'http://dev.unicrm.dk/index.php?option=com_webitall_crm&task=api.getActivities&tmpl=api',
		type: 'GET',
		data: "token=" + token,
		dataType: 'json',
		async: false,

	})
	.done(function(data) {
		$.each(data.activities, function(index, val) {
			setTimeout(function() {
            $('#result').append("<ons-row class='activity-row row ons-row-inner'>" + 
                  "<ons-col width='15%' class='col ons-col-inner type' style='-webkit-box-flex: 0; flex: 0 0 15%; max-width: 15%; padding:5px;'>" +
                    val.type +
                  "</ons-col>" + 
                  "<ons-col width='30%' class='col ons-col-inner' style='-webkit-box-flex: 0; flex: 0 0 30%; max-width: 30%; padding:5px;'>" + 
                    val.date + "</br>" + val.time + 
                  "</ons-col>" + 
                  "<ons-col width='55%' class='col ons-col-inner' style='-webkit-box-flex: 0; flex: 0 0 55%; max-width: 55%; padding:5px;'>" + 
                    val.company + "</br>" + val.text + 
                  "</ons-col>" + 
                "</ons-row>");

				$(".type:contains('1')").html("<span class='label label-today'><i class='fa fa-phone'></i></span>");
				$(".type:contains('2')").html("<span class='label label-today'><i class='fa fa-envelope'></i></span>");
				$(".type:contains('3')").html("<span class='label label-today'><i class='fa fa-reply'></i></span>");
				$(".type:contains('4')").html("<span class='label label-today'><i class='fa fa-users'></i></span>");
				$(".type:contains('5')").html("<span class='label label-today'><i class='fa fa-paperclip'></i></span>");
				$(".type:contains('6')").html("<span class='label label-today'><i class='fa fa-pencil-square-o'></i></span>");
				/*$('#result').append("<section style='padding: 8px 8px 8px'><ons-row align='left' class='row ons-row-inner'><ons-row class='row ons-row-inner'><ons-col class='col ons-col-inner' style='-webkit-box-flex: 0; flex: 0 0 30%; max-width: 30%;''><b>" + val.text + "</b></ons-col></ons-row>" +
									"<ons-row class='row ons-row-inner'><ons-col class='col ons-col-inner' style='-webkit-box-flex: 0; flex: 0 0 30%; max-width: 30%;' width='30%'><b data-localize='type'>Type:</b></ons-col><ons-col class='col ons-col-inner'>" + val.type + "</ons-col></ons-row>" +
									"<ons-row class='row ons-row-inner'><ons-col class='col ons-col-inner' style='-webkit-box-flex: 0; flex: 0 0 30%; max-width: 30%;' width='30%'><b data-localize='date'>Dato:</b></ons-col><ons-col class='col ons-col-inner'>" + val.date + "</ons-col></ons-row>" +
									"<ons-row class='row ons-row-inner'><ons-col class='col ons-col-inner' style='-webkit-box-flex: 0; flex: 0 0 30%; max-width: 30%;' width='30%'><b data-localize='time'>Tidspunkt:</b></ons-col><ons-col class='col ons-col-inner'>" + val.time + "</ons-col></ons-row>" +
									"<ons-row class='row ons-row-inner'><ons-col class='col ons-col-inner' style='-webkit-box-flex: 0; flex: 0 0 30%; max-width: 30%;' width='30%'><b data-localize='company'>Virksomhed:</b></ons-col><ons-col class='col ons-col-inner'>" + val.company + "</ons-col></ons-row></ons-row></section>");*/
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


function getContacts () {
	console.log("getContacts");
	var token = window.localStorage.getItem("token");
	$.ajax({
		url: 'http://dev.unicrm.dk/index.php?option=com_webitall_crm&task=api.getContacts&tmpl=api',
		type: 'GET',
		data: "full=0&token=" + token,
		dataType: 'json',
		async: false,

	})
	.done(function(data) {
		$.each(data.contacts, function(index, val) {
			setTimeout(function() {
				var contacts = $('#contacts');
				contacts.append($("<option />").val(val.id).text(val.name));
			}, 0);
		});
		
		console.log(data.status + " " + data.contacts);
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
/* Get full contact info */
function getContactsFull () {
	console.log("getContacts");
	var token = window.localStorage.getItem("token");
	$.ajax({
		url: 'http://dev.unicrm.dk/index.php?option=com_webitall_crm&task=api.getContacts&tmpl=api',
		type: 'GET',
		data: "full=1&token=" + token,
		dataType: 'json',
		async: false,

	})
	.done(function(data) {
		console.log("Selected id is");
		
		console.log(data.status + " " + data.contacts);
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

/* Get contacts by ID */
function getContactsById () {
	console.log("getContacts");
	var id = $('#contacts').val();
	console.log("Your selected id is: " + id);
}

/* Gets the details of the activity you've clicked on */
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

/* LANGUAGES */

function chLang () {
	// TODO Switch case
}

function chlangDK () {
	var lang = "da";
	$(function(){
        var opts = { language: lang, pathPrefix: "languages"};
		$("[data-localize]").localize("lang", opts)
	})
	saveLang(lang);
}

function chlangEN () {
	var lang = "en";
	$(function(){
        var opts = { language: lang, pathPrefix: "languages"};
		$("[data-localize]").localize("lang", opts)

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
		$("[data-localize]").localize("lang", opts)
	})
	console.log("Language is now: " + window.localStorage.getItem("lang"));
}

function setUp () {
	var email = window.localStorage.getItem("email");
	$('#email').val(email);
}

function checklogin () {
	//TODO make a boolean checking if you have an active session on the server.
}