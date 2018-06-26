// JavaScript Document
// Simple script to check validity of email addresses
// Written by Eng. Mohammed Yehia 1st May 2010

window.onload = DataComplete;

function chkname() {
	var name = document.getElementById('author').value;
	if(name == "") {
		document.getElementById("name_error").innerHTML = "Please enter a name";
		document.getElementById("name_error").className = "message";
		document.getElementById('author').className = "error";
		return false;
	} else {
		document.getElementById("name_error").innerHTML = "";
		document.getElementById("name_error").className = "success";
		document.getElementById('author').className = "ok";
		return true;
	}
}


function chkemail() {
	
	var email = document.getElementById('email').value;
	var atsign = email.indexOf("@");
	var dotsign = email.indexOf(".");
	var last_atsign = email.lastIndexOf("@");
	var last_dotsign = email.lastIndexOf(".");
	var length = email.length;
	var diff = dotsign - atsign;
	var rdiff = dotsign - atsign;
	var ldiff = length - last_atsign;
	var lrdiff = length - last_dotsign;
	
	if(email == "" || email == null) {
		document.getElementById("email_error").innerHTML = "Please enter an email";
		document.getElementById("email_error").className = "message";
		document.getElementById('email').className = "error";
		return false;
	} else if(atsign <= 0) {
		document.getElementById("email_error").innerHTML = "Please enter a valid email";
		document.getElementById("email_error").className = "message";
		document.getElementById('email').className = "error";
		return false;
	} else if(dotsign <= 0) {
		document.getElementById("email_error").innerHTML = "Please enter a valid email";
		document.getElementById("email_error").className = "message";
		document.getElementById('email').className = "error";
		return false;
	} else if(diff == 1) {
		document.getElementById("email_error").innerHTML = "Please enter a valid email";
		document.getElementById("email_error").className = "message";
		document.getElementById('email').className = "error";
		return false;
	} else if(rdiff == -1) {
		document.getElementById("email_error").innerHTML = "Please enter a valid email";
		document.getElementById("email_error").className = "message";
		document.getElementById('email').className = "error";
		return false;
	} else if(ldiff == 1) {
		document.getElementById("email_error").innerHTML = "Please enter a valid email";
		document.getElementById("email_error").className = "message";
		document.getElementById('email').className = "error";
		return false;
	} else if(lrdiff == 1) {
		document.getElementById("email_error").innerHTML = "Please enter a valid email";
		document.getElementById("email_error").className = "message";
		document.getElementById('email').className = "error";
		return false;
	} else {
		document.getElementById("email_error").innerHTML = "Valid email address";
		document.getElementById("email_error").className = "success";
		document.getElementById('email').className = "ok";
		return true;
	}
}

function DataComplete() {
	if(chkname() == true && chkemail() == true) {
		document.getElementById('button').disabled = false;
	} else {
		document.getElementById('button').disabled = "disabled";
	}
}