//////////////////////////////////////////////////////
// Content Resizer (Accordon alike style)		 	//
// Developed by Eng. Mohammed Yehia Abdul Mottalib  //
// http://www.dahabtech.com							//
// Mobile: (+20) 10 3930 361 OR (+20) 14 5325 822	//
// Landline: (+20) 69 3642 312						//
// Address: Masbat - Salah El Din Centre			//
// *************************************************//
// Developed for free use			                //
// Feel free to use this form anywhere in your		//
// in your website									//
// Date: 4th June 2010                              //
// Copyrights 2010 | Dahab TEchnology				//
//////////////////////////////////////////////////////

// I've created this depends on the hieght of the object calculated automatically using getComputedStyle
// and for Internet Explorer i've set a fixed height rate

var contentRsz = {

	init: function() {
		
		contentRsz.frameRate 	= 50;
		contentRsz.duration	    = 0.4;
		contentRsz.allLinks     = Core.getElementsByClass("linkIn");
		contentRsz.divs         = Core.getElementsByClass("tripsReadMore");
		contentRsz.divsCalc     = Core.getElementsByClass("tripsReadMoreContents");
		contentRsz._lastTick    = null;
		
		for(var i = 0, ii = contentRsz.allLinks.length; i<ii; i++) {
			
			contentRsz.allLinks[i]._ref = i;
			if (/MSIE[\/\s](\d+\.\d+)/.test(navigator.userAgent) || /Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
				contentRsz.divs[i].endH			= 750;
			} else {
				contentRsz.divs[i].endH			= parseInt(Core.getComputedStyle(contentRsz.divsCalc[i],"height"),10);
			}
			contentRsz.divs[i].startH       = Math.round((contentRsz.divs[i].endH * 20) / 100);
			contentRsz.divs[i].increment    = (contentRsz.divs[i].endH - contentRsz.divs[i].startH) / (contentRsz.frameRate * contentRsz.duration);
			contentRsz.divs[i].initH 		= contentRsz.divs[i].startH;
			contentRsz.divs[i].maxH 	    = contentRsz.divs[i].endH;
			contentRsz.divs[i].style.height = contentRsz.divs[i].startH + "px";
			Core.addEventListener(contentRsz.allLinks[i], "click", contentRsz.expandClickListener);
		}
	},

	expandClickListener: function(event) {
		
		(contentRsz.divs[this._ref].expanded == null)? contentRsz.doExpand(this._ref) : contentRsz.doCollapse(this._ref);
		Core.preventDefault(event);

	},

	doExpand: function(div) {
		
		if(contentRsz._lastTick != null) {
			contentRsz.doCollapse(contentRsz._lastTick);
		}
		contentRsz.allLinks[div].innerHTML = "Collapse";
		contentRsz.divs[div].expanded = 1;
		contentRsz.expand(div);
		contentRsz._lastTick = div;
	},

	doCollapse: function(div) {
		
		contentRsz.allLinks[div].innerHTML = "Expand";
		contentRsz.divs[div].expanded = null;
		contentRsz.collapse(div);
		if(div == contentRsz._lastTick) {
			contentRsz._lastTick = null;
		}
	},

	expand: function(div) {

		contentRsz.divs[div].initH += contentRsz.divs[div].increment;
		
		if (contentRsz.divs[div].initH >= contentRsz.divs[div].endH) {
		
			contentRsz.divs[div].initH = contentRsz.divs[div].endH;

		} else {
			
			setTimeout(function() { contentRsz.expand(div); },500 / contentRsz.frameRate);
		}
		
		contentRsz.divs[div].style.height = contentRsz.divs[div].initH + "px";

		if (contentRsz.divs[div].initH >= contentRsz.divs[div].endH) {
		
			contentRsz.divs[div].initH = contentRsz.divs[div].startH;
		}
	},

	collapse: function(div) {

		contentRsz.divs[div].maxH -= contentRsz.divs[div].increment;

		if (contentRsz.divs[div].maxH <= contentRsz.divs[div].startH) {
		
			contentRsz.divs[div].maxH = contentRsz.divs[div].startH;

		} else {
			
			setTimeout(function() { contentRsz.collapse(div); },500 / contentRsz.frameRate);
		}
		
		contentRsz.divs[div].style.height = contentRsz.divs[div].maxH + "px";

		if (contentRsz.divs[div].maxH <= contentRsz.divs[div].startH) {
		
			contentRsz.divs[div].maxH = contentRsz.divs[div].endH;	
		}
	}
};

Core.start(contentRsz);