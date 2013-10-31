LoginView = function(){
	var self = this;
	
	return self;
};

LoginView.prototype.init = function(){
	var self = this;
	
	self.view = Ti.UI.createView({
		backgroundColor: '#f1f0f0',
		height: Ti.Platform.displayCaps.platformHeight,
		width: Ti.Platform.displayCaps.platformWidth,
		layout: 'vertical',
		left: 0
	});
	
	self.logo = Ti.UI.createImageView({
		backgroundColor: '#f1f0f0',
	  image:'Common/images/logo_login.png',
	  top:30,
	  width: Ti.Platform.displayCaps.platformWidth,
	  left: 2
	});
	
	self.view.add(self.logo);
	
	self.username = Titanium.UI.createTextField({
		color:'#336699',
		backgroundColor: '#fff',
		left:50,
		width:220,
		height:40,
		hintText:'Username',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType: Titanium.UI.RETURNKEY_NEXT,
		autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
		autocorrect: false,
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ONFOCUS,
		borderColor: '#ccc',
		top: -20,
		borderRadius: 3,
		paddingLeft: 6,
		//paddingRight: 5
	});
	self.view.add(self.username);
	
	self.password = Titanium.UI.createTextField({
		color:'#336699',
		backgroundColor: '#fff',
	    top:10,
		left:50,
		width:220,
		height:40,
		hintText:'Password',
		passwordMask:true,
		borderColor: '#ccc',
		keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		borderRadius: 3,
		paddingLeft: 6,
		paddingRight: 5
	});
	self.view.add(self.password);
	
	self.loginBtn = Ti.UI.createImageView({
	  image:'Common/images/btn_login.png',
	  width:220,
	  top:15,
	  height:40,
	  left:50,
	  borderRadius: 3
	});
	
	self.view.add(self.loginBtn);
	
	return self;
};

exports.LoginView = LoginView;
