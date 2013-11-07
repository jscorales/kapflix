var utils = require('/Common/utils');

HeaderView = function(){
	var self = this;
	
	return self;
};

HeaderView.prototype.init = function(){
	var self = this;
	
	self.view = Ti.UI.createView({
		height: utils.isiOS7() ? 60 : 50,
		backgroundColor: '#49a942',
		width: Ti.Platform.displayCaps.platformWidth,
		top: 0,
		left: 190,
		layout: 'horizontal'
	});
	
	self.initComponents();
	self.view.show();
};

HeaderView.prototype.initComponents = function(){
	var self = this;
	
	//menuButton
	self.menuButton = Ti.UI.createView({
		top: utils.isiOS7() ? 30 : 20,
		left: 10,
		height: 20,
		width: 25,
		backgroundImage: '/Common/images/btn_menu.png'
	});
	
	self.view.add(self.menuButton);
	
	//label
	self.menuLabel = Ti.UI.createLabel({
		top: -35,
		left: 0,
		height: 50,
		color: '#fff',
		backgroundColor: 'transparent',
		width: Ti.Platform.displayCaps.platformWidth,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: { fontSize: 16, fontWeight: 'bold'}
	});
	
	self.menuLabel.text = 'GRAD';
	
	self.view.add(self.menuLabel);
	
	//ktp logo
	self.menuLogo = Ti.UI.createImageView({
		image: '/Common/images/logo_ktp.png',
		height: 28,
		width: 28,
		top: -40,
		right: 0,
		left: Ti.Platform.displayCaps.platformWidth - 35
	});
	
	self.view.add(self.menuLogo);
};

HeaderView.prototype.setMenuButtonImage = function(imageName){
	var self = this;
	self.menuButton.backgroundImage = "/Common/images/" + imageName + ".png";
	/*
	if (imageName === 'btn_home'){
		self.menuButton.height = 25;
		self.menuButton.top = 18;
	}
	else{
		self.menuButton.height = 20;
		self.menuButton.top = 20;
	}*/
};

HeaderView.prototype.setLabel = function(labelText){
	var self = this;
	self.menuLabel.text = labelText;
};

exports.HeaderView = HeaderView;
