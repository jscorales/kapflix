var syllabus = require('/Common/syllabus').syllabus;

SideBarView = function(){
	var self = this;
	
	self.menuItems = [];
	return self;
};

SideBarView.prototype.init = function(){
	var self = this;
	
	self.view = Ti.UI.createView({
		backgroundColor: '#333',
		height: Ti.Platform.displayCaps.platformHeight,
		font: {fontSize: 6.5},
		width: Ti.Platform.displayCaps.platformWidth,  //190,
		left: 0
	});
	
	self.initItemView();
	self.initItems();
	
	self.view.show();
};

SideBarView.prototype.initItemView = function(){
	var self = this;
	
	self.itemView = Ti.UI.createView({
		backgroundColor: '#333',
		width: '100%',
		height: '100%',
		layout: 'vertical',
		top: 10,
		left: 0
	});
	
	self.view.add(self.itemView);
};

SideBarView.prototype.initItems = function(){
	var self = this;
	
	for (var i = 0; i < syllabus.sections.length; i++){
		var section = syllabus.sections[i];
		var sectionLabel = self.createSectionLabel(section);
		self.itemView.add(sectionLabel);
		
		for (var j=0; j < section.sectionItems.length; j++){
			var sectionItem = section.sectionItems[j];
			var sectionItemLabel = self.createItemLabel(sectionItem);
			self.itemView.add(sectionItemLabel);
			sectionItem.Label = sectionItemLabel;
			sectionItem.Label.Item = sectionItem;
			self.menuItems.push(sectionItem);
		}
	}
	
	//add logout
	var section = {id: '10', title: 'System'};
	var sectionLabel = self.createSectionLabel(section);
	
	self.itemView.add(sectionLabel);
	
	var sectionItem = {id: '11', title: 'Logout'};
	var sectionItemLabel = self.createItemLabel(sectionItem);
	self.itemView.add(sectionItemLabel);
	sectionItem.Label = sectionItemLabel;
	sectionItem.Label.Item = sectionItem;
	self.menuItems.push(sectionItem);
	
};

SideBarView.prototype.createSectionLabel = function(section){
	var menuItemView = Ti.UI.createView({
		backgroundColor: '#666',
		height: 30,
		width: '100%',
		left: 0
	});
	
	var label = Ti.UI.createLabel({
		color: '#fff',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		touchEnabled: false,
		left: 15,
		top: 5,
		touchEnabled: false,
		font: {fontWeight: 'bold'},
	});
	
	label.text = section.title;
	
	menuItemView.add(label);
	return menuItemView;
};

SideBarView.prototype.createItemLabel = function(item){
	var menuItemView = Ti.UI.createView({
		backgroundColor: '#333',
		height: 35,
		width: '100%',
		left: 0
	});
	
	menuItemView._type = 'view';
	menuItemView.Item = item;
	
	var label = Ti.UI.createLabel({
		color: '#fff',
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		touchEnabled: false,
		font: { fontSize: 14 },
		left: 15,
		top: 10,
		touchEnabled: true,
		width: '100%'
	});
	
	label.text = item.title;
	label.Item = item;
	label._type = 'label';
	label._view = menuItemView;
	
	menuItemView.add(label);
	return menuItemView;
};

exports.SideBarView = SideBarView;
