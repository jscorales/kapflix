MediaPlayerHeaderView = function(){
	var self = this;
	return self;
};

MediaPlayerHeaderView.prototype.init = function(){
	var self = this;
	
	self.view = Ti.UI.createView({
		height: 20,
		width: '100%',
		backgroundColor: '#000',
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
		top: 0,
		left: 0,
		color: '#fff',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});	
	
	self.label.text = 'Arithmetic';
	self.view.add(self.label);
};

exports.MediaPlayerHeaderView = MediaPlayerHeaderView;
