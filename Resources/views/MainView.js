MainView = function(){
	var self = this;
	
	return self;
};

MainView.prototype.init = function(){
	var self = this;
	
	self.view = Ti.UI.createView({
		height: Ti.Platform.displayCaps.platformHeight,
		width: Ti.Platform.displayCaps.platformWidth + 190
	});
	
	self.view.show();
};

exports.MainView = MainView;


