AnotherView = function(){
	var self = this;
	
	
	return self;
};

AnotherView.prototype.initialize = function(){
	var self = this;
	self.view = Ti.UI.createView({
		backgroundColor: 'red',
		height: 100,
		width: 200
	});
	
	self.initEventListeners();
	self.view.show();
};

AnotherView.prototype.initEventListeners = function(){
	var self = this;
	
	self.view.addEventListener('click', function(e){
		alert("You clicked another view.");
	});
};

exports.AnotherView = AnotherView;
