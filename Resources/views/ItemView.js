var parentWin = null;
var syllabus = require('/Common/syllabus').syllabus;

ItemView = function(parent) {
	var self = this;
	self.isMediaPlayerOpen = false;
	parentWin = parent;
	return self;
};

ItemView.prototype.init = function(sectionName) {
	var self = this;
    //var sectionName = sectionName //"quant";
    var section = null;
    
	self.view = Ti.UI.createScrollView({
		backgroundColor : '#333',
		height : Ti.Platform.displayCaps.platformHeight - 50,
		width : Ti.Platform.displayCaps.platformWidth,
		left : 190
	});

	var table = Ti.UI.createTableView(
		{
			width : Ti.Platform.displayCaps.platformWidth
		}
	);
	
	var rows = [];
	
	for (var i = 0; i < syllabus.sections.length; i++) {
		if(sectionName == syllabus.sections[i].name){
			section = syllabus.sections[i];
		}
	}
	
	if(section != null && section.sectionItems != null && section.sectionItems.length > 0){
		for (var i = 0; i < section.sectionItems.length; i++) {
			rows.push(ItemView.prototype.createRow(section.sectionItems[i]));
		}
		table.setData(rows);
	}

	self.view.add(table);
	
	table.addEventListener('click', function(e) {
		
		//parentWin.initLoadingView();
		
		//	setTimeout(function () {
			    self.mediaPlayerWindow = new MediaPlayerWindow();	
				self.mediaPlayerWindow.init(e.row.item);
				self.isMediaPlayerOpen = true;
				self.mediaPlayerWindow.window.addEventListener('showReport', function(e){
					self.view.fireEvent('showReport', {mediaPlayerWindow: self.mediaPlayerWindow});
				});
		//	},5000);

	});
	
	self.view.show();
};

ItemView.prototype.createRow = function(item) {
	
	var tablerow = Ti.UI.createTableViewRow({
		height: 100,
		item: item,
		className: 'itemRow',
		hasChild: false,
	
	});
	var imageview = Ti.UI.createImageView({
		image: "Common/images/" + item.image + ".png",
		height: 80, 
		width: 130, 
		left: 5,
	});
	var titleview = Ti.UI.createLabel({
		text: item.title,
		color: '#000',		
		height: 15,
		font: {
			fontSize: 15,
			fontWeight:'bold'
		},
		left: 145,
		top: 10

	});
	var descriptionview = Ti.UI.createLabel({
		text: item.description,
		color: '#000',
		height: 85,
		font: {
			fontSize: 13,
			color:'#666666'
		},
		left: 145,
		top: 18
	});
	
	tablerow.add(imageview);
	tablerow.add(titleview);
	tablerow.add(descriptionview);
	
	return tablerow;
};

exports.ItemView = ItemView;
