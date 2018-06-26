//////////////////////////////////////////////////////
// Sexy Community sharing 							//
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

var communities = {
	
	init: function() {
		
		communities.allImgs = Core.getElementsByClass("comm");
		
		for( var i = 0; i<communities.allImgs.length; i++) {
			
			Core.addEventListener(communities.allImgs[i], "mouseover", communities.mouseOverListener);
			Core.addEventListener(communities.allImgs[i], "mouseout", communities.mouseOutListener);
		}
		
		communities.imgPreloader();
		
	},
	
	mouseOverListener: function(event) {
		this.src = "_images/community_sharing/" + this.id + "_mover.png";
	},
	
	mouseOutListener: function(event) {
		this.src = "_images/community_sharing/" + this.id + "_mout.png";
	},
	
	imgPreloader: function() {
		
		 imageObj = new Image(); 
		 images = new Array();
		 
		 for( var i = 0; i<communities.allImgs.length; i++) {
			 
			 images[i] = "_images/community_sharing/" + communities.allImgs[i].id + "_mover.png";
			 imageObj.src=images[i];
			 
		 }
	} 
};

Core.start(communities);