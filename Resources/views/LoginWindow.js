var LoginView = require('/views/LoginView').LoginView;

LoginWindow = function(){
	var self = this;
	return self;
};

LoginWindow.prototype.init = function(){
	var self = this;
	
	self.window = Ti.UI.createWindow({
		backgroundColor: '#000',
		orientationModes:[Ti.UI.PORTRAIT]
	});
	
	self.loginView = new LoginView();
	self.loginView.init();
	
	self.loginView.loginBtn.addEventListener('click',function(e)  
	{  
	    //if (self.loginView.username.value != '' && self.loginView.password.value != '')  
	    //{  
	        /*loginReq.open("POST","http://localhost:8888/post_auth.php");  
	        var params = {  
	            username: username.value,  
	            password: Ti.Utils.md5HexDigest(password.value)  
	        };  
	        loginReq.send(params);  
	        */
	       self.window.close();
	    //}  
	    //else  
	    //{  
	    //    alert("Username/Password are required");  
	    //}  
	});
	
	self.loginView.username.addEventListener('focus', function() {    
	    self.window.animate({bottom: '30%', duration:500});
	});    

	self.loginView.username.addEventListener('blur', function() { 
	    self.window.animate({bottom: 0, duration:500});
	});
	
	self.loginView.view.addEventListener('touchstart', function() { 
	    self.loginView.password.blur();
	    self.loginView.username.blur();
	});
	
	self.loginView.username.addEventListener('return', function() {
	    self.loginView.password.focus();
	});
	
	self.loginView.password.addEventListener('return', function() {
		if (self.loginView.password.value != '')
	    	self.window.close();
	});
	
	self.loginView.password.addEventListener('focus', function() {    
	    self.window.animate({bottom: '47%', duration:500});
	});    

	self.loginView.password.addEventListener('blur', function() { 
	    self.window.animate({bottom: 0, duration:500});
	});

	self.window.add(self.loginView.view);
	
	self.window.open();
	
	return self;
};

exports.LoginWindow = LoginWindow;
