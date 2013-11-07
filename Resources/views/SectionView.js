var utils = require('/Common/utils');

var parentWin = null;
SectionView = function(parent){
	var self = this;
    parentWin = parent;
	return self;
};

SectionView.prototype.init = function(){
	var self = this;

    
	self.view = Ti.UI.createView({
		backgroundColor: '#fff',	
		height: Ti.Platform.displayCaps.platformHeight,
		width: Ti.Platform.displayCaps.platformWidth,
		left: 190,
		top: utils.isiOS7() ? 10 : 0
	});

   self.headerView = Ti.UI.createView({	
		height: 50,
		top : 0,
		width: '100%',
		layout:'horizontal',
		backgroundColor:'red'
	});
	
 	self.imgQuant = Ti.UI.createImageView({
			  image:'Common/images/img_quant.png',
			  top : 53,
			  opacity:1,
              zIndex:20,
              width: '98%',
			  height: 204
			});
			
	 self.imgVerbal = Ti.UI.createImageView({
			  image:'Common/images/img_verbal.png',
			  top:262,
			  opacity:1,
              zIndex:20,
              width: '98%',
			  height: 204
			});
			
     self.imgVerbal.addEventListener('click', function() {    
	    parentWin.initItemView('verbal');
	});
   
    self.imgQuant.addEventListener('click', function() {    
	    parentWin.initItemView('quant');
	});
  
	self.view.add(self.imgQuant);
	self.view.add(self.imgVerbal);
	
	self.view.show();
	return self;
};

exports.SectionView = SectionView;