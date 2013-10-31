var MediaPlayerHeaderView = require('/views/MediaPlayerHeaderView').MediaPlayerHeaderView;
var MediaPlayerFooterView = require('/views/MediaPlayerFooterView').MediaPlayerFooterView;
var videoControlTimeout = null;
var _headerView = null;
var _footerView = null;

MediaPlayerWindow = function(){
	var self = this;
	
	self.isHeaderFooterVisible = true;
	self.isVideoControlsVisible = true;
	self.checkDuration = false;
	return self;
};

MediaPlayerWindow.prototype.init = function(item){
	var self = this;
	
	self.item = item;
	self.window = Ti.UI.createWindow({
		backgroundColor:'#000',
		orientationModes:[Ti.UI.LANDSCAPE_LEFT],
		width: '100%',
		height: '100%',
		top:0,
		left:0
	});
	
	self.initVideoPlayer();
	
	if (item.id === '1'){ //drag n drop
		//self.videoPlayer.addEventListener('playing', function(e){
			self.initDragDropInteractions();
		//});
	}
		
	if (item.id !== '1') //multiple choice
		self.initInteractions(); 
	
	self.initHeaderView();
	self.initFooterView();
	self.window.open();
};

MediaPlayerWindow.prototype.showVideoControls = function(){
	var self = this;
	
	if (videoControlTimeout != null)
		clearTimeout(videoControlTimeout);
	
	_headerView.view.show();
	_footerView.view.show();
	
	videoControlTimeout = setTimeout(function(){
		_headerView.view.hide();
		_footerView.view.hide();
		if (videoControlTimeout != null)
			clearTimeout(videoControlTimeout);
	}, 5500);
};

var hideVideoControls = function(){
	if (videoControlTimeout != null)
		clearTimeout(videoControlTimeout);
		
	_headerView.view.hide();
	_footerView.view.hide();
};

MediaPlayerWindow.prototype.initVideoPlayer = function(){
	var self = this;
	
	self.videoPlayer = Ti.Media.createVideoPlayer({
		backgroundColor:'#000',
		movieControlStyle:Titanium.Media.VIDEO_CONTROL_EMBEDDED,
		scalingMode:Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
		autoplay:true,
		fullscreen:false,
		top: 25,
		bottom: 20,
		parentObj: self
	});
	
	self.videoPlayer.url = self.item.url;
	self.checkDuration = true;
	self.initVideoPlayerEventListeners();
	self.window.add(self.videoPlayer);
};

MediaPlayerWindow.prototype.initVideoPlayerEventListeners = function(){
	var self = this;
	
	self.videoPlayer.addEventListener('touchstart', function(e){
		if (videoControlTimeout != null)
			clearTimeout(videoControlTimeout);
			
		if (self.isHeaderFooterVisible){
			hideVideoControls();
			//Titanium.UI.iPhone.hideStatusBar({animationStyle: Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_NONE});
			//self.window.top = 0;
			//self.window.height = '100%';
			self.videoPlayer.movieControlStyle = Titanium.Media.VIDEO_CONTROL_NONE;
			//scalingMode = Titanium.Media.VIDEO_SCALING_ASPECT_FIT;
			self.isHeaderFooterVisible = false;
		}
		else{
			self.showVideoControls();
			//Titanium.UI.iPhone.showStatusBar({animationStyle: Ti.UI.iPhone.StatusBar.ANIMATION_STYLE_NONE});
			//self.window.top = -20;
			//self.window.height = Ti.Platform.displayCaps.platformHeight + 20;
			//scalingMode = Titanium.Media.VIDEO_SCALING_ASPECT_FIT;
			self.videoPlayer.movieControlStyle = Titanium.Media.VIDEO_CONTROL_EMBEDDED;
			self.isHeaderFooterVisible = true;
		}
	});	
	
	if (self.item.id == '2'){
		self.videoPlayer.addEventListener('durationavailable', function(e){
			var timer = setInterval(function(){
			    var currentTime = self.videoPlayer.getCurrentPlaybackTime();
			    if (currentTime > 0){
			    	var sec = currentTime / 1000;
			    	
			    	if (sec >= 38) {
			    		self.initHintInteraction();
			    		
				        clearInterval(timer);
				    }
			    }
			    
			}, 500);
		});
	}
};

MediaPlayerWindow.prototype.initHeaderView = function(){
	var self = this;
	
	self.headerView = new MediaPlayerHeaderView();
	self.headerView.init();
	self.headerView.label.text = 'Q' + self.item.id + '.  ' + self.item.videoTitle;
	self.window.add(self.headerView.view);	
	
	_headerView = self.headerView;
};

MediaPlayerWindow.prototype.initDragDropInteractions = function(){
	var self = this;
	var deviceWidth = Ti.Platform.displayCaps.platformHeight;
	
	self.containerView = Ti.UI.createView({
		width: deviceWidth >= 568 ? 215 : 195,
		height: 105,
		top: 145,
		left: deviceWidth >= 568 ? 260 : 240,
		//borderColor: 'red',
		//borderWidth: 1
	});
	
	//create the drog n drop items
	self.dragItem1 = Ti.UI.createView({
		backgroundImage: '/Common/images/x.png',
		top: 67,
		left: deviceWidth >= 568 ? 60 : 40,
		width: 40,
		height: 40,
		transform: olt
	});
	
	self.dragItem2 = Ti.UI.createView({
		backgroundImage: '/Common/images/0.3.png',
		top: 67,
		left: deviceWidth >= 568 ? 96 : 76,
		width: 40,
		height: 40,
		transform: olt
	});
	
	self.dragItem3 = Ti.UI.createView({
		backgroundImage: '/Common/images/18.png',
		top: 67,
		left: deviceWidth >= 568 ? 134 : 114,
		width: 40,
		height: 40,
		transform: olt
	});
	
	self.dragItem4 = Ti.UI.createView({
		backgroundImage: '/Common/images/18.3.png',
		top: 67,
		left: deviceWidth >= 568 ? 166 : 146,
		width: 40,
		height: 40,
		transform: olt
	});
	
	self.window.add(self.containerView);
	
	self.containerView.add(self.dragItem1);
	self.containerView.add(self.dragItem2);
	self.containerView.add(self.dragItem3);
	self.containerView.add(self.dragItem4);
	
	self.initDragDropEventListeners(self.dragItem1);
	self.initDragDropEventListeners(self.dragItem2);
	self.initDragDropEventListeners(self.dragItem3);
	self.initDragDropEventListeners(self.dragItem4);
	
	self.initImageNextInteraction('Q');
};

var olt = Titanium.UI.create2DMatrix(), curX, curY;

MediaPlayerWindow.prototype.initDragDropEventListeners = function(dragDropItem){
	var self = this;
	
	dragDropItem.addEventListener('touchstart', function(e) {
	    curX = e.x;
	    curY = e.y;
	});
	
	dragDropItem.addEventListener('touchmove', function(e) {
	    var deltaX = e.x - curX, deltaY = e.y - curY;
	    olt = olt.translate(deltaX, deltaY);
	    e.source.transform = olt;
	});
	
	dragDropItem.addEventListener('touchend', function(e){
		//curX = 0;
		//curY = 0;
		olt = Titanium.UI.create2DMatrix();
	});
};

MediaPlayerWindow.prototype.initImageNextInteraction = function(videoId){
	var self = this;
	
	self.imageNextInteraction = Ti.UI.createView({
		top: 30,
		right: (videoId == 'Q' || videoId == 'A') ? 60 : 20,
		height: 30,
		width: 60,
		backgroundImage: '/Common/images/next.png'
	});
	
	self.addImageNextInteractionEventListeners(self.imageNextInteraction, videoId);
	self.window.add(self.imageNextInteraction);
};

MediaPlayerWindow.prototype.addImageNextInteractionEventListeners = function(interaction, videoId){
	var self = this;
	
	interaction.addEventListener('click', function(e){
		switch (videoId){
			case 'Q':
				self.videoPlayer.url = '/Common/videos/DragDrop-Answer.m4v';
				
				self.dragItem1.hide();
				self.dragItem2.hide();
				self.dragItem3.hide();
				self.dragItem4.hide();
				self.initImageNextInteraction('A');
				self.videoPlayer.play();
				break;
			case 'A':
				self.window.fireEvent('showReport', {});
				break;
		}
	});
};

MediaPlayerWindow.prototype.initInteractions = function(){
	var self = this;
	var deviceWidth = Ti.Platform.displayCaps.platformHeight;
	
	self.interactionA = Ti.UI.createView({
		height: 29,
		width: 110,
		top: 165,
		left: deviceWidth >= 568 ? 100 : 60,
		borderColor: 'red',
		borderWidth: 0,
		id: 'A'
	});
	
	self.interactionB = Ti.UI.createView({
		height: 27,
		width: 110,
		top: 196,
		left: deviceWidth >= 568 ? 100 : 60,
		borderColor: 'red',
		borderWidth: 0,
		id: 'B'
	});
	
	self.interactionC = Ti.UI.createView({
		height: 29,
		width: 110,
		top: 230,
		left: deviceWidth >= 568 ? 100 : 60,
		borderColor: 'red',
		borderWidth: 0,
		id: 'C'
	});
	
	self.addInteractionEventListeners(self.interactionA);
	self.addInteractionEventListeners(self.interactionB);
	self.addInteractionEventListeners(self.interactionC);
	
	self.window.add(self.interactionA);
	self.window.add(self.interactionB);
	self.window.add(self.interactionC);
};

MediaPlayerWindow.prototype.initHintInteraction = function(videoId){
	var self = this;
	var deviceWidth = Ti.Platform.displayCaps.platformWidth;
	
	self.hintInteraction = Ti.UI.createView({
		height: ((videoId === 'A' || videoId === 'B' || videoId === 'C') ? 72 :  65),
		width: ((videoId === 'A' || videoId === 'B' || videoId === 'C') ? 80 :  80),
		top: ((videoId === 'A' || videoId === 'B' || videoId === 'C') ? 138 : 150),
		left: ((videoId === 'A' || videoId === 'B' || videoId === 'C') ? (deviceWidth >= 568 ? 330 : 285): (deviceWidth >= 568 ? 300 : 270)),
		borderColor: 'red',
		borderWidth: 0,
		id: 'H'
	});
	
	self.addInteractionEventListeners(self.hintInteraction);
	
	self.window.add(self.hintInteraction);
};

MediaPlayerWindow.prototype.initNextInteraction = function(){
	var self = this;
	var deviceWidth = Ti.Platform.displayCaps.platformWidth;
	
	self.nextInteraction = Ti.UI.createView({
		height: 45,
		width: 100,
		top: 148,
		left: deviceWidth >= 568 ? 330 : 280,
		borderColor: 'red',
		borderWidth: 0,
		id: 'N'
	});
	
	self.addInteractionEventListeners(self.nextInteraction);
	
	self.window.add(self.nextInteraction);
};

MediaPlayerWindow.prototype.addInteractionEventListeners = function(interaction){
	var self = this;
	
	interaction.addEventListener('touchstart', function(e){
		interaction.borderWidth = 1;
	});
	
	interaction.addEventListener('touchend', function(e){
		interaction.borderWidth = 0;
	});
	
	interaction.addEventListener('click', function(e){
		var item = e.source;
		
		switch (item.id){
			case 'A':
				Ti.API.info(e.source.left);
				Ti.API.info("Width: " + Ti.Platform.displayCaps.platformWidth);
				Ti.API.info("Height: " + Ti.Platform.displayCaps.platformHeight);
				self.videoPlayer.url = '/Common/videos/AnswerA.m4v'; //'http://ktp.interactivevideo.s3.amazonaws.com/AnswerA.m4v';
				self.initHintInteraction('A');
				self.videoPlayer.play();
				break;
			case 'B':
				self.videoPlayer.url = '/Common/videos/AnswerB.m4v'; //'http://ktp.interactivevideo.s3.amazonaws.com/AnswerB.m4v';
				self.initHintInteraction('B');
				self.videoPlayer.play();
				break;
			case 'C':
				self.videoPlayer.url = '/Common/videos/AnswerC.m4v'; //'http://ktp.interactivevideo.s3.amazonaws.com/AnswerC.m4v';
				self.initNextInteraction('C');
				self.videoPlayer.play();
				break;
			case 'H':
				//self.videoPlayer.removeEventListener('durationavailable', self.handleDurationAvailable);
				self.videoPlayer.url = '/Common/videos/Hint.m4v'; //'http://ktp.interactivevideo.s3.amazonaws.com/Hint.m4v';
				try{
				self.window.remove(self.nextInteraction);
				}
				catch(e){
					
				}
				self.videoPlayer.play();
				
				break;
			case 'N':
				self.window.fireEvent('showReport', {});
				break;
		}
		
		
		self.checkDuration = false;
	});
};

MediaPlayerWindow.prototype.initFooterView = function(){
	var self = this;
	
	self.footerView = new MediaPlayerFooterView();
	self.footerView.init();
	
	self.footerView.backButton.addEventListener('click', function(e){
		self.window.close();	
	});
	
	self.window.add(self.footerView.view);	
	
	_footerView = self.footerView;
};

exports.MediaPlayerWindow = MediaPlayerWindow;
