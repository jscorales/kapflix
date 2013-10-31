var ApplicationWindow = require('/views/ApplicationWindow').ApplicationWindow;
var LoginWindow = require('/views/LoginWindow').LoginWindow;
var MediaPlayerWindow = require('/views/MediaPlayerWindow').MediaPlayerWindow;

ApplicationController = function(){
	var self = this;
	
	self.isMediaPlayerOpen = false;
	
	return self;
};

ApplicationController.prototype.init = function(){
	var self = this;
	
	self.loginWindow = new LoginWindow();
	self.loginWindow.init();
	self.loginWindow.window.addEventListener('close', function(e){
		self.initApp();
	});
};

ApplicationController.prototype.initApp = function(){
	var self = this;
	
	self.appWindow = new ApplicationWindow();
	self.appWindow.init();
	
	//handle logout
	self.appWindow.window.addEventListener('logout', function(e){
		self.appWindow.window.close();
		self.init();
	});
	
	//handle media player
	self.appWindow.window.addEventListener('openMediaPlayer', function(e){
		self.mediaPlayerWindow = new MediaPlayerWindow();
		self.mediaPlayerWindow.init(e);
		self.isMediaPlayerOpen = true;
		self.mediaPlayerWindow.window.addEventListener('showReport', function(e){
			self.appWindow.initReportView();
			self.mediaPlayerWindow.window.close();
		});
	});
};

exports.ApplicationController = ApplicationController;
