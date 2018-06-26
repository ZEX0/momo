//////////////////////////////////////////////////////
// Font Resizer						  	//
// Developed by Eng. Mohammed Yehia Abdul Mottalib  //
// http://www.dahabtech.com							//
// Mobile: (+20) 10 3930 361 OR (+20) 14 5325 822	//
// Landline: (+20) 69 3642 312						//
// Address: Masbat - Salah El Din Centre			//
// *************************************************//
// Developed for free use			                //
// Feel free to use this form anywhere in your		//
// in your website									//
// Date: 14th July 2010                              //
// Copyrights 2010 | Dahab TEchnology				//
//////////////////////////////////////////////////////

var fontSize = {
	
	init: function() {

		fontSize.allParagraphs = document.getElementsByTagName("p");
		fontSize.init = 12;
		fontSize.max = 20;
		fontSize.increment = 1;
		fontSize.x = fontSize.init;
		
		fontSize.increaseLink = document.getElementById("pup");
		fontSize.decreaseLink = document.getElementById("pdown");
		
		Core.addEventListener(fontSize.increaseLink, "click", fontSize.increaseListener);
		Core.addEventListener(fontSize.decreaseLink, "click", fontSize.decreaseListener);
	},
	
	increaseListener: function(event) {
		fontSize.increaseFontSize();
		Core.preventDefault(event);
	},
	
	decreaseListener: function(event) {
		fontSize.decreaseFontSize();
		Core.preventDefault(event);
	},
	
	increaseFontSize: function() {
		
		fontSize.x += fontSize.increment;
		
		if(fontSize.x >= fontSize.max) {
			fontSize.x = fontSize.max;
		}
		
		for(var i = 0, ii = fontSize.allParagraphs.length; i<ii; i++) {
			fontSize.allParagraphs[i].style.fontSize = fontSize.x + "px";
		}
	},
	
	decreaseFontSize: function() {
		
		fontSize.x -= fontSize.increment;
		
		if(fontSize.x <= fontSize.init) {
			fontSize.x = fontSize.init;
		}
	
		for(var i = 0, ii = fontSize.allParagraphs.length; i<ii; i++) {
			fontSize.allParagraphs[i].style.fontSize = fontSize.x + "px";
		}
	}
};

Core.start(fontSize);