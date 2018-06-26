//////////////////////////////////////////////////////
// Accordion with 4 options of preview				//
// Developed by Eng. Mohammed Yehia Abdul Mottalib  //
// http://www.dahabtech.com							//
// Mobile: (+20) 10 3930 361 OR (+20) 14 5325 822	//
// Landline: (+20) 69 3642 312						//
// Address: Masbat - Salah El Din Centre			//
// *************************************************//
// Developed for free use			                //
// Feel free to use this form anywhere in your		//
// in your website									//
// Date: 25th June 2010                             //
// Copyrights 2010 | Dahab TEchnology				//
//////////////////////////////////////////////////////


// Creating a new Object and sets its initials and properties

var Accordion = {
	
	// Initial Property : contains all the settings that affects the animation
	init: function() {
		
		// =========== Global Seetings ============= //
		
		Accordion.frameRate	    = 100;  // Frame rate of the animation (100 is the best so far)
		Accordion.duration		= 0.2;  // The duration on the animation
		
		// Case of Internet Explorer we reduce the amount of deceleration a little bit to avoid the wired effects
		// produced by IE 6 and IE 7 sometimes
		if (/MSIE[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
			Accordion.deceleration  = 6;
		// For other browsers we use 10 for the deceleration to make it more smooth at the end of the animation
		} else {
			Accordion.deceleration  = 10;
		}
		
		// Changing the way the accordion works upon the follwoing choices from the arrray
		// Guideline: As array indexes start with 0 so the options are as follows
		
		// 0- Clickable                       : Folds expands with mouse click and only one per click, other folds to collapse.
		// 1- Mouse over                      : Folds expands with a mouseover and only 1 expands and the rest are to collapse.
		// 2- All expandable                  : Folds expands with a mouse click and you can expands multiple of them 
		// 3- Mouse over with Click           : Folds expands with a mouse click or mouseover and only one to expand.
		
		// The behaviors array
		Accordion.behaviors		= new Array("clickable",
											"mouse over", 
											"all expandable", 
											"mouse over with click", 
											"mouseover and click all expandable"
								  );
		
		Accordion.choice	    = 0;    // <- change to the option that suits you.
		
		// The selected behavior defined here
		Accordion.selBehavior	= Accordion.behaviors[Accordion.choice]
		
		
		// =========== Accordion related document elements ============= //

		Accordion.links 	 = Core.getElementsByClass("content_link"); // find all the links within  the accordion with the class content_link
		Accordion.divs  	 = Core.getElementsByClass("content_container"); // find all the content divs with the class content_continer
		
		// Looping through the elements to assign every link an event listener and a reference to use it later.
		for( var i = 0, ii = Accordion.divs.length; i<ii; i++) {
			
			Accordion.links[i]._ref = i;  // assigning the link a reference to use it later in our functions
			Accordion.divs[i].style.height = "0";  // Assign a height property of 0 to all the divs at the start of the page
			
			// This sitch assigns event listeners on mouse click, mouse over and focus events depends on your choice
			// of how would you like the accordion to act.
			switch(Accordion.selBehavior) {

				case Accordion.behaviors[0]:
				Core.addEventListener(Accordion.links[i], "click", Accordion.clickListener);
				Core.addEventListener(Accordion.links[i], "focus", Accordion.clickListener);
				break;
				
				case Accordion.behaviors[1]:
				Core.addEventListener(Accordion.links[i], "mouseover", Accordion.mouseOverListener);
				Core.addEventListener(Accordion.links[i], "focus", Accordion.mouseOverListener);
				Core.addEventListener(Accordion.links[i], "click", Accordion.pdLink);
				break;
				
				case Accordion.behaviors[2]:
				Core.addEventListener(Accordion.links[i], "click", Accordion.clickListener);
				Core.addEventListener(Accordion.links[i], "focus", Accordion.clickListener);
				break;
				
				case Accordion.behaviors[3]:
				Core.addEventListener(Accordion.links[i], "mouseover", Accordion.mouseOverListener);
				Core.addEventListener(Accordion.links[i], "click", Accordion.clickListener);
				Core.addEventListener(Accordion.links[i], "focus", Accordion.clickListener);
				break;
				
				default:
				Core.addEventListener(Accordion.links[i], "click", Accordion.clickListener);
				Core.addEventListener(Accordion.links[i], "focus", Accordion.clickListener);
				break;
			}
		}
		
		// Starting the Accordion based on your choice
		if(Accordion.selBehavior == Accordion.behaviors[2]) { 
			Accordion.collapseAll();
			Accordion.doExpand(0);
		} else {
			Accordion.doExpand(0);
		}
	},
	
	// Prevent Default action for the links in case your choice is mouseover so clicking on the 
	// link wouldn't hurt
	pdLink: function(event) {
		Core.preventDefault(event);
	},
	
	// mouseover listener of the accordion
	mouseOverListener: function(event) {
		
		// defines the div using the reference we've defined before
		var div = Accordion.divs[this._ref];	
		
		// if the content div has the class collapsed then we apply the expand method to it 
		// to expand its contents
		if (Core.hasClass(div, "collapsed")) {
			Accordion.doExpand(this._ref);
		}
	},
	
	// click listener of the accordion 
	clickListener: function(event) {
		
		// defines the div using the reference we've defined before
		var div = Accordion.divs[this._ref];
		// if the content div has the class collapsed then we apply the expand method to it 
		// to expand its contents if not we apply the collapse method to collapse the div contents 
		(Core.hasClass(div, "collapsed"))? Accordion.doExpand(this._ref) : Accordion.doCollapse(this._ref);
		Core.preventDefault(event);
	},
	
	// The expand method stes up some settings before starting the animation
	doExpand: function(div) {
		
		// grab the link based on its reference to assign the class activelink later to it
		// in case if its contents are expanded
		var link = Accordion.links[div];
		
		// defines the contents div to apply setting and expand method to it.
		var div = Accordion.divs[div];
		
		// in case if you choosed the all expandable option as the default behavior of the accordion
		// we are no longer need to collapse all the div
		if(Accordion.selBehavior != Accordion.behaviors[2]) {
			Accordion.collapseAll();
		}
		
		// in case the div has not the class expanded we assign some setting to it as follows
		if(!Core.hasClass(div, "expanded")) {
			div.style.height = "0";	// sets the height of the div to 0;
			div._height = 0;		// defines a private property _height to control the height during the animation
			div._minheight = 0;		// defines a private property _minheight to use whith deceleration
			div._maxheight = div.scrollHeight;	// defines a private property _maxheight based on the contents height to use whith deceleration
			Core.removeClass(div, "collapsed");  // remove the class collapsed from the content div
			Core.addClass(div, "expanded");		 // add class expanded to the content div
			Core.addClass(link, "activelink");	 // add class activelink to the current link
			Accordion.expand(div);	// expands the content
		}
	},
	
	// The expand animation method
	expand: function(div) {
		
		// Start with the content div height and increase it with the deceleration factor to 
		// ensure the slowness at the end of the expansion
		div._height += (div._maxheight - div._height) / Accordion.deceleration;
		
		// if the heights exceeds the height of the content stops and assign the _height the scollHeight's value
		if(Math.round(div._height) >= div.scrollHeight) {	
			div._height = div.scrollHeight;
		// if not starts the animatino by setting a setTimeout on the expand method
		} else {
			div._timer = setTimeout(function() {
				Accordion.expand(div);
			}, 500 / Accordion.frameRate);
		}
		
		// add the _height value to the content div height
		div.style.height = Math.round(div._height) + "px";
		// sets the scrollTop of the content div to 0
		div.scrollTop = 0;	
	},
	
	// The expand method stes up some settings before starting the animation
	doCollapse: function(div) {
		
		// grab the link based on its reference to assign the class activelink later to it
		// in case if its contents are expanded
		var link = Accordion.links[div];
		
		// defines the contents div to apply setting and expand method to it.
		var div = Accordion.divs[div];

		// Defines the _height from the actual height of the content div
		div._height = parseInt(div.style.height, 10);
		
		// if the div has a class expanded the we clear the timeout of it and 
		// remove the class activelink from the link and apply collapse animated method
		if (Core.hasClass(div, "expanded")) {
		
			clearTimeout(div._timer);
			Accordion.collapse(div);
			Core.removeClass(link, "activelink");
		// if not then we applay the only the class collapsed to the content div
		} else {
			Core.addClass(div, "collapsed");
		}
	},

	// The expand animation method
	collapse: function(div) {
		
		// Start with the content div height and decrease it with the deceleration factor to 
		// ensure the slowness at the end of the collapsion
		div._height -= (div._minheight + div._height) / Accordion.deceleration;
		
		// if the _height is less or equals to 0 the we assign it to 0 
		// remove the class expanded from the div and add a class collapsed to it
		if(Math.round(div._height) <= 0) {	
			div._height = 0;
			Core.removeClass(div, "expanded");
			Core.addClass(div, "collapsed");
		// if not then we start the animation by setting the setTimeout on the collapse method
		} else {
			div._timer = setTimeout(function() {
				Accordion.collapse(div);
			}, 500 / Accordion.frameRate);
		}
		
		// add the _height value to the content div height 
		div.style.height = Math.round(div._height) + "px";	
	},
	
	// The collapse all method ensures collapsing all the divs while expanding the
	// selected one
	collapseAll: function() {
		
		for( var i = 0, ii = Accordion.divs.length; i<ii; i++) {
			Accordion.doCollapse(i);
		}
	}
};

// Initialize the Object 
Core.start(Accordion);