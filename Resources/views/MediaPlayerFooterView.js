MediaPlayerFooterView = function(){
	var self = this;
	return self;
};

MediaPlayerFooterView.prototype.init = function(){
	var self = this;
	
	self.view = Ti.UI.createView({
		height: 25,
		width: '100%',
		backgroundColor: '#000',
		opacity: 0.6,
		//top: 40,
		bottom: 0,
		left: 0
	});
	
	self.initDisplay();
	self.view.show();
};

MediaPlayerFooterView.prototype.initDisplay = function(){
	var self = this;
	
	self.label = Ti.UI.createLabel({
		width: '100%',
		backgroundColor: 'transparent',
		height: 25,
		top: 0,
		left: 0,
		color: '#fff',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		backgroundImage: '/Common/images/scorebottom.png'
	});
	
	self.backButton = Ti.UI.createView({
		width: 30,
		height: 25,
		top: 0,
		right: 0
	});
	
	self.backButton.show();
	
	self.backButtonLabel = Ti.UI.createLabel({
		color: '#000',
		top: 0,
		left: 0,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		text: 'Back'
	});
	
	self.backButton.add(self.backButtonLabel);
	
	self.view.add(self.label);
	self.view.add(self.backButton);
};

exports.MediaPlayerFooterView = MediaPlayerFooterView;
