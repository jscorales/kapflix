MediaPlayerHeaderView = function(){
	var self = this;
	return self;
};

MediaPlayerHeaderView.prototype.init = function(){
	var self = this;
	
	self.view = Ti.UI.createView({
		height: 45,
		width: '100%',
		backgroundColor: '#b9b5b9',
		opacity: 0.6,
		top: 0,
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
		top: 20,
		left: 0,
		color: '#000',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});	
	
	self.label.text = 'Arithmetic';
	
	self.doneLabel = Ti.UI.createLabel({
		width: 50,
		height: 20,
		top: 20,
		left: 5,
		color: '#000'
	});
	
	self.doneLabel.text = "Done";
	
	self.view.add(self.label);
	self.view.add(self.doneLabel);
};

exports.MediaPlayerHeaderView = MediaPlayerHeaderView;
