var LoginView = require('/views/LoginView').LoginView;
var MainView = require('/views/MainView').MainView;
var HeaderView = require('/views/HeaderView').HeaderView;
var SideBarView = require('/views/SideBarView').SideBarView;
var SectionView = require('/views/SectionView').SectionView;
var ItemView = require('/views/ItemView').ItemView;
var LoadingView = require('/views/LoadingView').LoadingView;
var ReportView = require('/views/ReportView').ReportView;

ApplicationWindow = function(){
	var self = this;
	
	self.isMenuOpen = false;
	
	return self;
};

ApplicationWindow.prototype.init = function(){
	var self = this;
	
	self.window = Ti.UI.createWindow({
		backgroundColor:'white',
		orientationModes:[Ti.UI.PORTRAIT]
	});
	
	self.initMainView();
	self.window.open();
};

ApplicationWindow.prototype.initMainView = function(){
	var self = this;
	
	self.mainView = new MainView();	
	self.mainView.init();
	
	self.initAnimations();
	self.initHeaderView();
	self.initSideBarView();
	self.initSectionView();
	
	//self.initLoadingView();
	
	//self.mainView.view.add(self.loadingView.view);
	self.mainView.view.add(self.sideBarView.view);
	self.mainView.view.add(self.sectionView.view);
	self.mainView.view.left = -190;
	
	self.mainView.view.add(self.headerView.view);
   	self.window.add(self.mainView.view);
   	
   	
};

ApplicationWindow.prototype.initAnimations = function(){
	var self = this;
	
	var openMenuAnimation = Titanium.UI.createAnimation({
		left : 0,
		duration : 300
	});
	self.openMenuAnimation = openMenuAnimation;
	
	var closeMenuAnimation = Titanium.UI.createAnimation({
		left : (-1) * 190,
		duration : 300
	});
	self.closeMenuAnimation = closeMenuAnimation;
};

ApplicationWindow.prototype.initHeaderView = function(){
	var self = this;
	
	self.headerView = new HeaderView();
	self.headerView.init();	
	self.headerView.setLabel('GMAT');
	self.headerView.menuButton.addEventListener('click', function(e){
	   if(e.source.backgroundImage.toLowerCase() == "/common/images/btn_menu.png"){
	   	
			if (!self.isMenuOpen){
				self.mainView.view.animate(self.openMenuAnimation);
				self.isMenuOpen = true;
			}
			else{
				self.mainView.view.animate(self.closeMenuAnimation);
				self.isMenuOpen = false;
			}
	  }
	  else if(e.source.backgroundImage.toLowerCase() == "/common/images/btn_home.png"){
	  	try{
	  		self.mainView.view.remove(self.reportView.view);
	  		self.mainView.view.remove(self.itemView.view);
	  	}
	  	catch(e){
	  		
	  	}
	  	self.headerView.setMenuButtonImage("btn_menu");
	  }
	  else{
	  	try{
	  		self.mainView.view.remove(self.itemView.view);
	  		self.headerView.setMenuButtonImage("btn_menu");
	  	}
	  	catch(e){
	  		
	  	}
	  }
	  
	});
};

ApplicationWindow.prototype.initSideBarView = function(){
	var self = this;
	
	self.sideBarView = new SideBarView();
	self.sideBarView.init();
	
	//init event listeners
	for (var i=0;i<self.sideBarView.menuItems.length;i++){
		var menuItem = self.sideBarView.menuItems[i];
		
		menuItem.Label.addEventListener('click', function(e){
			var item = e.source.Item;
			switch (item.id){
				case '1':
				case '2': //arithmetic
				case '3':
				case '4':
				case '5':
				case '6':
				case '7':
				case '8':
					self.window.fireEvent('openMediaPlayer', item);
					break;
				case '11': //logout
					self.window.fireEvent('logout', {});
					break;
			}
		});
		
		menuItem.Label.addEventListener('touchstart', function(e){
			var view = e.source;
			if (e.source._type == 'label')
				view = e.source._view;
			
			view.backgroundColor = '#666';
		});
		
		menuItem.Label.addEventListener('touchend', function(e){
			var view = e.source;
			if (e.source._type == 'label')
				view = e.source._view;
			
			view.backgroundColor = '#333';
		});
	}
};

ApplicationWindow.prototype.initSectionView = function(){
	var self = this;
	
	self.sectionView = new SectionView(self);
	self.sectionView.init();
	
};

ApplicationWindow.prototype.initItemView = function(itemType){
	var self = this;
	
	if (self.isMenuOpen){
		self.mainView.view.animate(self.closeMenuAnimation);
		self.isMenuOpen = false;
	}
	
	self.itemView = new ItemView(self);	
	self.itemView.init(itemType);
	
	self.itemView.view.top = 50;
	self.itemView.view.addEventListener('showReport', function(e){
		self.initReportView(true);
		e.mediaPlayerWindow.window.close();
	
	});
	
	self.mainView.view.add(self.itemView.view);
	self.headerView.setMenuButtonImage("btn_back");

};

ApplicationWindow.prototype.initReportView = function(fromItemView){
	var self = this;
	
	self.reportView = new ReportView();	
	self.reportView.init();
	
	self.reportView.view.top = 50;
	self.mainView.view.left = -190;
	self.mainView.view.add(self.reportView.view);
	self.headerView.setMenuButtonImage("btn_home");

};

ApplicationWindow.prototype.initLoadingView = function(){
	var self = this;

	self.loadingView = new LoadingView();
	self.loadingView.init();
	
	self.mainView.view.add(self.loadingView.view);
	
	self.window.orientationModes = [Ti.UI.LANDSCAPE_LEFT];
	
};


exports.ApplicationWindow = ApplicationWindow;
