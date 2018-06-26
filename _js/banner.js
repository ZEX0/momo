//////////////////////////////////////////////////////
// Fade In/Out SlideShow with Auto Play function    //
// and a news scroller								//
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


// Creating a new Object and sets its initials and properties

var fSS = {

	// Initial Property : contains all the settings that affects the animation
	init: function() {
		
		// =========== Duration and Frame Rate settings ============= //

		fSS.frameRate 		= 75;  // <- Frame Rate per seconds
		fSS.duration 		= 0.5; // <- Duration in seconds i prefer 1 seond to make it smooth 


		// =========== Fade In / Out settings ============ //
		
		fSS.endOP		    = 1;  // <- End of element's opacity setting. Don't change this value (Global Value)
		fSS.startOP 		= 0;  // <- Start of element's opacity setting. Don't change this value (Global Value)
		if (/MSIE[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {	// Internet Explorer: Avoid slow transition between scenes
			fSS.increment 		= 0.18;
		} else {
			fSS.increment 		= (fSS.endOP - fSS.startOP) / (fSS.frameRate * fSS.duration);  // <- Increment rate of the element's opacity
		}

		// The rest of the opacity settings defined in the next for loop as to set the initial value and the end value
		// of each element separatley
		
		
		// =========== Slider settings ============ //

		fSS.startTop		= 190;  // <- start of the "top" style value of the element's position
		fSS.endTop			= 220;  // <- end of the "top" style value of the element's position
		fSS.initTop			= fSS.startTop;  // <- element's initial position 
		fSS.maxTop			= fSS.endTop;    // <- element's final position 
		if (/MSIE[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {	// Internet Explorer: Avoid slow transition between scenes
			fSS.incrementTop 		= 4;
		} else {
			fSS.incrementTop 	= (fSS.endTop - fSS.startTop) / (fSS.frameRate * fSS.duration);  // <- Increment value of the elemen't position
		}
		
		// =========== SlideShow Related Elements ============ //

		fSS.divs 			= Core.getElementsByClass("hidden");			// <- Get all the divs with the class hidden 
		fSS.links		    = Core.getElementsByClass("links");				// <- Get all the links with the class links
		fSS.news		    = Core.getElementsByClass("pscrollernews");				// <- Get all the news headers with the class pscrollernews
		fSS.imgDesc			= document.getElementById("imgDescription");	// <- Get the Image Description container div
		fSS.label			= document.getElementById("descpanelfg");		// <- Get the label div
		

		// =========== SlideShow Global Settings ============ //
		
		fSS.autoPlay		= true;		// <- Set to false if you don't want to start auto play when page is loaded
		fSS.timeRate		= 5000;		// <- Time to swap slides default is 5000 = 5 seconds. You may change it to what suits you.
		fSS.nTimeRate		= 6000;		// <- Time to swap slides default is 5000 = 5 seconds. You may change it to what suits you.
		fSS.fLoaded			= 0;		// <- First slide to load. Note that the first = 0, second = 1 .... etc.
		fSS.hideShow		= true;		// <- Set to false if you don't want to start the image descriptiob slider when page is loaded
		
		// =========== News Scroller settings ============ //
		
		for(var i = 0, ii = fSS.news.length; i<ii; i++) {
			fSS.news[i].nDefault		= 28;
			fSS.news[i].nCurrent		= 3;
			fSS.news[i].nEnd			= -28;
		}
		    
		fSS.nincrementTop 	= (fSS.news[0].nDefault - fSS.news[0].nCurrent) / (fSS.frameRate * fSS.duration); 
		fSS.nFirstHeader 	= 0;
		fSS._lastViewed		= fSS.nFirstHeader;
		

		// Looping through the slides and assign settings to each one
		for(var i = 0, ii = fSS.links.length; i<ii; i++) {
			
			fSS.links[i]._ref 		 = i;				// <- Assign a reference number to the link so we can use it later
														// to grab its related slide.
			
			fSS.divs[i].initOP 		 = fSS.startOP;		// <- Initial opacity value for the div
			fSS.divs[i].maxOP 	     = fSS.endOP;		// <- Final opacity value of the div
			fSS.divs[i].title		 = fSS.divs[i].getAttribute("title");	// <- Grab the div's Title so we can use it as an image
																			// description
			
			Core.addEventListener(fSS.links[i], "click", fSS.fSSClickListener);  // <- assign a show slide click event listener for each link
			Core.addEventListener(fSS.links[i], "click", fSS.resetCounter);		 // <- assign a reset counter click event listener for each link
		}

		// =========== SlideShow controls settings ============ //

		fSS.startBtn = document.getElementById("start");		// <- Get the start button
		fSS.stopBtn = document.getElementById("stop");			// <- Get teh stop button
		fSS.hideShowBtn = document.getElementById("hideShow");			// <- Get teh stop button

		Core.addEventListener(fSS.startBtn, "click", fSS.startCounter);  	    // <- assign a start counter click event listener for the start button
		Core.addEventListener(fSS.stopBtn, "click", fSS.stopCounter);           // <- assign a stop counter click event listener for the stop button
		Core.addEventListener(fSS.hideShowBtn, "click", fSS.hideShowSlider);    // <- assign a hide / show click event listener for the hideShow button
		

		// Check if the auto play is on.
		// Case: true | start the slide show with autoplay function
		if(fSS.autoPlay) {
			
			fSS.startBtn.childNodes[0].src = "_images/playbtclicked.png";  // switch the play button to on state
			if(fSS.hideShow) {
				fSS.hideShowBtn.childNodes[0].src = "_images/show_hidebtnclicked.png";
			}
			fSS.checkThisRef(fSS.fLoaded);	// load the first slide
			fSS._lastTick = fSS.fLoaded;	// set the last clicked item to its number
			fSS.newsScrollerHandler(fSS.nFirstHeader);

			if(!fSS.timer || fSS.timer == "" || fSS.timer == null) {	
				fSS.timer = setInterval(fSS.play,fSS.timeRate);  // start the auto play function on an interval
				setInterval("fSS.newsPlay()",fSS.nTimeRate);
			}
		
		// Case: flase | start the first slide and the user can browser between the slides and also can start the 
		// slide show using the start button.
		} else {
			fSS.checkThisRef(fSS.fLoaded);
			fSS._lastTick = fSS.fLoaded;
		}
		

		// Images Pre-loading
		fSS.imgPreloader();
		
	},

	// Show Slide click listener
	fSSClickListener: function(event) {
		
		fSS.checkThisRef(this._ref);  // show slide related to this link
		fSS._lastTick = this._ref;	  // sets the last clicked item to the link number
		
		// Testing Purposes
		//(fSS.divs[this._ref].faded == null)? fSS.dofSSFadeIn(this._ref) : fSS.dofSSFadeOut(this._ref);
		
		Core.preventDefault(event);

	},
	
	// Start counter click listener
	startCounter: function(event) {
		fSS.startBtn.childNodes[0].src = "_images/playbtclicked.png";  // change the start button to on state
		fSS.stopBtn.childNodes[0].src = "_images/pausebt.png";		   // change the stop button to off state
		if(!fSS.timer || fSS.timer == "" || fSS.timer == null) {
			fSS.timer = setInterval(fSS.play,fSS.timeRate);			   // Switch the auto play function to on state
		}
		Core.preventDefault(event);
	},
	
	// Stop counter click listener
	stopCounter: function(event) {
		fSS.startBtn.childNodes[0].src = "_images/playbt.png";			// change the start button to off state
		fSS.stopBtn.childNodes[0].src = "_images/pausebtclicked.png";	// change the stop button to on state
		if(fSS.timer) {
			clearInterval(fSS.timer);		// Clear the timers
		}
		fSS.timer = null;					// set the timer to null
		Core.preventDefault(event);
	},
	
	hideShowSlider: function(event) {
		
		(fSS.hideShow == true)? fSS.doHideSlider() : fSS.doShowSlider();
		Core.preventDefault(event);
	},
	
	
	// This function uses the div number to implement some functions upon it
	checkThisRef: function(div) {
		
		// looping through the array and check the follwoing
		for(var i = 0, ii = fSS.links.length; i<ii; i++) {
			
			// if the div number equals to i then play the slide related to it,
			// switch the description realated to it and the label from the div's title
			// changes the link to current state
			if(i == div) {
				if(fSS.fadeTimer) {
					clearTimeout(fSS.fadeTimer);
				}
				fSS.dofSSFadeIn(div);
				if(fSS.hideShow) {
					fSS.fSSSlideLabelDown();	
				}
				Core.replaceClass(fSS.links[div], "current");
			
			// if i equals the last clicked item then this item faded out into the new clicked ietm
			// switch its link to disabled state
			} else if(i == fSS._lastTick) {
				fSS.dofSSFadeOut(i);
				Core.replaceClass(fSS.links[i], "disabled");

			// if non of the mentioned above then hide the rest of the divs and change thier links state to disabled
			} else {
				fSS.hideThisDiv(i);
				Core.replaceClass(fSS.links[i], "disabled");
			}
		}
		
	},

	dofSSFadeIn: function(div) {
		
		// Testing Purposes
		//fSS.divs[div].faded = 1;

		fSS.divs[div].style.display = "block";		// Display the Div if hidden in other fadeOut process
		fSS.fSSFadeIn(div);		// fade in the div

	},

	dofSSFadeOut: function(div) {
		
		// Testing Purposes
		//fSS.divs[div].faded = null;

		fSS.fSSFadeOut(div);	// fade out the div

	},
	
	doShowSlider: function() {
		
		fSS.hideShow = true;
		fSS.imgDesc.style.top = fSS.startTop + "px";
		fSS.label.innerHTML = fSS.divs[fSS._lastTick].title;
		fSS.hideShowBtn.childNodes[0].src = "_images/show_hidebtnclicked.png";

	},

	doHideSlider: function() {
		
		fSS.hideShow = false;
		fSS.imgDesc.style.top = fSS.endTop + "px";
		fSS.hideShowBtn.childNodes[0].src = "_images/show_hidebtn.png";

	},

	
	// The FadeIn function uses the initial opacity value and increment it
	// and when it reaches the maximum value it stops
	fSSFadeIn: function(div) {

		fSS.divs[div].initOP += fSS.increment;		// initial opacity increment by the increment value of the item
		
		if (fSS.divs[div].initOP >= fSS.endOP) {	// This condition prevents the initial value from overriding the maximum value
		
			fSS.divs[div].initOP = fSS.endOP;

		} else {
			
			fSS.fadeTimer = setTimeout(function() { fSS.fSSFadeIn(div); },500 / fSS.frameRate);  // if the initial value is not yet to reach the maximum value then we
																				 // set the timeout on the fadeIn function
		}
		
		// Setting the opacity of the item upon its increased initial value

		/*  Applies for Internet Explorer Browsers  */
		fSS.divs[div].style.filter = 'alpha(opacity=' + fSS.divs[div].initOP * 100 + ')';

		/*  Applies for Older Safari Browsers  */
		fSS.divs[div].style.KHTMLOpacity = fSS.divs[div].initOP / 100;

		/*  Applies for Older Mozilla Browsers  */
		fSS.divs[div].style.MozOpacity = fSS.divs[div].initOP / 100;

		/*  Applies for newer versions of Mozilla, Safari, Opera and Google Chrome Browsers  */
		fSS.divs[div].style.opacity = fSS.divs[div].initOP;


		// If the initial value reached the maximum value then we sets it back after the timer finish
		// to make sure we can fade it in again
		if (fSS.divs[div].initOP >= fSS.endOP) {
		
			fSS.divs[div].initOP = fSS.startOP;
		}
	},


	// The FadeOut function uses the maximum opacity value and decrement it
	// and when it reaches the initial value it stops
	fSSFadeOut: function(div) {

		fSS.divs[div].maxOP -= fSS.increment;		// maximum opacity increment by the increment value of the item

		if (fSS.divs[div].maxOP <= fSS.startOP) {	// This condition prevents the maximum value from overriding the initial value
		
			fSS.divs[div].style.display = "none";	// Hide the div after Opacity reaches 0;
			fSS.divs[div].maxOP = fSS.startOP;		// Set back the maxOP to 0;

		} else {
			
			setTimeout(function() { fSS.fSSFadeOut(div); },500 / fSS.frameRate);	// if the maximum value is not yet to reach the initial value then we
																				    // set the timeout on the fadeOut function
		}

		// Setting the opacity of the item upon its increased initial value

		/*  Applies for Internet Explorer Browsers  */
		fSS.divs[div].style.filter = 'alpha(opacity=' + fSS.divs[div].maxOP * 100 + ')';

		/*  Applies for Older Safari Browsers  */
		fSS.divs[div].style.KHTMLOpacity = fSS.divs[div].maxOP / 100;

		/*  Applies for Older Mozilla Browsers  */
		fSS.divs[div].style.MozOpacity = fSS.divs[div].maxOP / 100;

		/*  Applies for newer versions of Mozilla, Safari, Opera and Google Chrome Browsers  */
		fSS.divs[div].style.opacity = fSS.divs[div].maxOP;
		

		// If the maximum value reached the initial value then we sets it back after the timer finish
		// to make sure we can fade it out again
		if (fSS.divs[div].maxOP <= fSS.startOP) {
		
			fSS.divs[div].maxOP = fSS.endOP;	
		}
	},
	

	// This is the hide the rest of the divs function by setting the display to none
	hideThisDiv: function(div) {
		fSS.divs[div].style.display = "none";
	},
	

	// The image description slider Function uses the slider's initial layout and 
	// starts to pull it down and then up again you can say that its the same mechanism as 
	// fade in and out functions apart from that i uses the condition marked bellow

	fSSSlideLabelDown: function() {
		
		if(!fSS.hideShow) {
			return;
		}
		
		fSS.initTop += fSS.incrementTop;
		
		if (fSS.initTop >= fSS.endTop) {  // <- * Marked Condition : if the slider is down then we immediatlley 
										  // starts to bring it up again with the new label of the image	
			fSS.initTop = fSS.endTop;
			fSS.fSSSlideLabel();

		} else {
			
			setTimeout(fSS.fSSSlideLabelDown,500 / fSS.frameRate);
		}
		
		fSS.imgDesc.style.top = fSS.initTop + "px";

		if (fSS.initTop >= fSS.endTop) {
		
			fSS.initTop = fSS.startTop;
		}
	},

	// This is a realetd function to the image description function
	fSSSlideLabel: function() {

		fSS.maxTop -= fSS.incrementTop;
		fSS.label.innerHTML = fSS.divs[fSS._lastTick].title;	

		if (fSS.maxTop <= fSS.startTop) {
		
			fSS.maxTop = fSS.startTop;
			
		} else {
			
			setTimeout(fSS.fSSSlideLabel,500 / fSS.frameRate);
		}
		
		fSS.imgDesc.style.top = fSS.maxTop + "px";

		if (fSS.maxTop <= fSS.startTop) {
		
			fSS.maxTop = fSS.endTop;
		}
	},
	
	newsScrollerHandler: function(div) {
		
		for(var i = 0, ii = fSS.news.length; i<ii; i++) {
			if(div == i) {
				fSS.newsScrollUp(div);
			} else if(fSS._lastViewed == i) {
				fSS.newsScrollDown(fSS._lastViewed);
			} else {
				fSS.newsHide(i);
			}
		}
	},
	
	newsScrollUp: function(i) {
		
		fSS.news[i].nDefault -= fSS.nincrementTop;
		
		if(fSS.news[i].nDefault <= fSS.news[i].nCurrent) {
			
			fSS.news[i].nDefault = fSS.news[i].nCurrent;
		
		} else {
			
			setTimeout(function() { fSS.newsScrollUp(i); },500 / fSS.frameRate);
		}
		
		fSS.news[i].style.top = fSS.news[i].nDefault + "px";
		
		if(fSS.news[i].nDefault <= fSS.news[i].nCurrent) {
			
			fSS.news[i].nDefault = 28;
		
		}
		
	},
	
	newsScrollDown: function(i) {
		
		fSS.news[i].nCurrent -= fSS.nincrementTop;
		
		if(fSS.news[i].nCurrent <= fSS.news[i].nEnd) {
			
			fSS.news[i].nCurrent = fSS.news[i].nEnd;
		
		} else {
			
			setTimeout(function() { fSS.newsScrollDown(i); },500 / fSS.frameRate);
		}
		
		fSS.news[i].style.top = fSS.news[i].nCurrent + "px";
		
		if(fSS.news[i].nCurrent <= fSS.news[i].nEnd) {
			
			fSS.news[i].nCurrent = 3;
		
		}
		
	},
	
	newsHide: function(i) {
		
		fSS.news[i].style.top = fSS.news[i].nDefault + "px";
		
	},
	

	// This is a function that pre-loads the images while the page is loading
	// it helps sometimes but if the pictures are to big then it will take its time
	// to load
	imgPreloader: function() {
		
		 imageObj = new Image(); 
		 images = new Array();
		 
		 for( var i = 0, ii = fSS.links.length; i<ii; i++ ) {
			 
			 i = i+1;
			 images[i] = "_images/news" + i + ".jpg";
			 imageObj.src=images[i];
			 
		 }
	},
	
	// The autoplay function uses a counter to start with and its the 
	// fSS.loaded property and increase it and when its larger than 
	// the fSS.links.length then it resets it back to 0 and sets the last clicked item 
	// to the last div number. Otherwise it sets the fSS.loaded to the current played
	// slide and the last clicked slide as the last played slide.
	play : function() {
		
		fSS.fLoaded	++;
		if(fSS.fLoaded >= fSS.links.length) {
			fSS.fLoaded = 0;
			fSS._lastTick = fSS.links.length - 1;
		}
		fSS.checkThisRef(fSS.fLoaded);
		fSS._lastTick = fSS.fLoaded;
	},
	
	newsPlay : function() {
		
		fSS.nFirstHeader++;
		if(fSS.nFirstHeader >= fSS.news.length) {
			fSS.nFirstHeader = 0;
		}
		fSS.newsScrollerHandler(fSS.nFirstHeader);
		fSS._lastViewed = fSS.nFirstHeader;
	},
	
	// The reset counter function stops and clears the timer of the auto play function
	// and sets the fSS.floaded to the last clicked link number.
	resetCounter : function(div) {
		fSS.startBtn.childNodes[0].src = "_images/playbt.png";
		fSS.stopBtn.childNodes[0].src = "_images/pausebtclicked.png";
		if(fSS.timer) {
			clearInterval(fSS.timer);
		}
		fSS.timer = null;
		fSS.fLoaded = this._ref;
	}
};

// Starts the fSS.init 
Core.start(fSS);