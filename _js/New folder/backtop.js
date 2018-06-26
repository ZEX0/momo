//////////////////////////////////////////////////////
// Back to top of the page						  	//
// Developed by Eng. Mohammed Yehia Abdul Mottalib  //
// http://www.dahabtech.com							//
// Mobile: (+20) 10 3930 361 OR (+20) 14 5325 822	//
// Landline: (+20) 69 3642 312						//
// Address: Masbat - Salah El Din Centre			//
// *************************************************//
// Developed for free use			                //
// Feel free to use this form anywhere in your		//
// in your website									//
// Date: 12th June 2010                              //
// Copyrights 2010 | Dahab TEchnology				//
//////////////////////////////////////////////////////


var back2Top = {
	
	init: function() {
		
		back2Top.links = Core.getElementsByClass("backtotop");
		
		for(var i = 0, ii = back2Top.links.length; i<ii; i++) {
			Core.addEventListener(back2Top.links[i], "click", back2Top.b2tClickListener);
		}
		
		//if (/MSIE[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
		//	back2Top.deceleration = 1.2;
		//} else if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
		//	back2Top.deceleration = 1.2; // <= (minimum = 1.1 | slow motion), (maximum = 2 | faster motion);
		//} else {
			back2Top.deceleration = 1.2; // <= (minimum = 1.1 | slow motion), (maximum = 2 | faster motion);
		//}
		
	},
	
	b2tClickListener: function(event) {
		
		back2Top.getNewDimensions();
		back2Top.backToTop();
		Core.preventDefault(event);
	},
	
	getNewDimensions: function() {
		back2Top.x = window.scrollX;
		back2Top.y = window.scrollY;
		
		if (document.all) {
			back2Top.x = document.documentElement.scrollLeft || 0;
			back2Top.y = document.documentElement.scrollTop || 0;
		}
	},
	
	backToTop: function() {
		
		back2Top.x = Math.floor(back2Top.x / back2Top.deceleration);
		back2Top.y = Math.floor(back2Top.y / back2Top.deceleration);
		
		window.scrollTo(back2Top.x, back2Top.y);
	
		if (back2Top.x > 0 || back2Top.y > 0) {
			setTimeout("back2Top.backToTop()", 25);
		}
	}
};

Core.start(back2Top);