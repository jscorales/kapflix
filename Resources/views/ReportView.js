
ReportView = function(parent) {
	var self = this;
	self.parentWin = parent
	return self;
};

ReportView.prototype.init = function() {
	var self = this;
    
	self.view = Ti.UI.createScrollView({
		backgroundColor : '#fff',
		height : Ti.Platform.displayCaps.platformWidth - 50,
		width : Ti.Platform.displayCaps.platformHeight,
		left : 190
	});

	var imageview = Ti.UI.createImageView({
		image: "/Common/images/img_report.png",
		width: Ti.Platform.displayCaps.platformHeight,
		left: 0,
		top: 0
	});

	self.view.add(imageview);
	
	self.view.show();
};

exports.ReportView = ReportView;
