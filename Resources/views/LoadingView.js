
LoadingView = function(){
	var self = this;

    return self;
};


LoadingView.prototype.init = function(){
	var self = this;
	
	self.view = Ti.UI.createView({	
		height: '100%',
		top : 0,
		width: '100%',
	});
	
  var loadingScreenImage = Ti.UI.createImageView({
		  image:'Common/images/loading_screen_small.png',
		  top : 50,
		  left:190,
	      opacity:1,
          zIndex:20,
          width: 640,
		  height: 320
		});
	
  self.view.add(loadingScreenImage);
  self.view.show();

};

exports.LoadingView = LoadingView;