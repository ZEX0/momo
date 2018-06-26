//////////////////////////////////////////////////////
// Language Bar 								 	//
// Developed by Eng. Mohammed Yehia Abdul Mottalib  //
// http://www.dahabtech.com							//
// Mobile: (+20) 10 3930 361 OR (+20) 14 5325 822	//
// Landline: (+20) 69 3642 312						//
// Address: Masbat - Salah El Din Centre			//
// *************************************************//
// Developed for free use			                //
// Feel free to use this form anywhere in your		//
// in your website									//
// Date: 22nd May 2010                              //
// Copyrights 2010 | Dahab TEchnology				//
//////////////////////////////////////////////////////

var languages = {
	
	init: function() {
		
		languages.allLngLinks = Core.getElementsByClass("lang");
		
		for( var i = 0; i<languages.allLngLinks.length; i++) {

			Core.addEventListener(languages.allLngLinks[i], "mouseover", languages.mouseOverListener);
			Core.addEventListener(languages.allLngLinks[i], "mouseout", languages.mouseOutListener);
		}
		
	},
	
	mouseOverListener: function(event) {
		this.style.filter = 'alpha(opacity = ' + 50 + ')';
		this.style.MozOpacity = 0.5;
		this.style.opacity = 0.5;
	},
	
	mouseOutListener: function(event) {
		this.style.filter = 'alpha(opacity = ' + 100 + ')';
		this.style.MozOpacity = 1;
		this.style.opacity = 1;
	}
};

Core.start(languages);