var utils = require('/Common/utils');

MediaPlayerHeaderView = function(){
	var self = this;
	return self;
};

MediaPlayerHeaderView.prototype.init = function(){
	var self = this;
	
	self.view = Ti.UI.createView({
		height: utils.isiOS7() ? 45 : 20,
		width: '100%',
		backgroundColor: utils.isiOS7() ? '#b9b5b9' : '#000000',
		opacity: 0.6,
		top: utils.isiOS7() ? 0 : 20,
		left: 0
	});
	
	self.initDisplay();

	self.view.show();
};

MediaPlayerHeaderView.prototype.initDisplay = function(){
	var self = this;
	
	self.label = Ti.UI.createLabel({
		width: '100%',
		backgroundColor: 'transparent',
		height: 20,
		top: utils.isiOS7() ? 20 : 0,
		left: 0,
		color: utils.isiOS7() ? '#000' : '#fff',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});	
	
	self.label.text = 'Arithmetic';
	
	self.doneLabel = Ti.UI.createLabel({
		width: 50,
		height: 20,
		top: utils.isiOS7() ? 20 : 0,
		left: 5,
		color: utils.isiOS7() ? '#000' : '#fff'
	});
	
	self.doneLabel.text = "Done";
	
	self.view.add(self.label);
	self.view.add(self.doneLabel);
};

exports.MediaPlayerHeaderView = MediaPlayerHeaderView;
