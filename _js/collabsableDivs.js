var block = null;

function doMove() {
	if(block.style.height != "100px") {
		block.style.height = parseInt(block.style.height)+10+'px';
		document.getElementById("buttonControl").innerHTML = "<a href=\"javascript:void(0);\" onclick=\"closeDiv();\">Close Login</a>";
		setTimeout(doMove,25); 
	} else {
		document.getElementById("login_form").style.display = 'block';
	}
}

function doNone() {
	document.getElementById("login_form").style.display = 'none';
	if(block.style.height != "0px") {
		block.style.height = parseInt(block.style.height)-10+'px';
		document.getElementById("buttonControl").innerHTML = "<a href=\"javascript:void(0);\" onclick=\"openDiv();\">Open Login</a>";
		setTimeout(doNone,25);
	}
}

function openDiv() {
	block = document.getElementById('headerloginblock'); 
 	block.style.height = '0px';
 	doMove(); 
}

function closeDiv() {
	doNone(); 
}