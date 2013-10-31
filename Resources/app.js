(function(){

Ti.UI.iPhone.setStatusBarStyle(Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK);
var ApplicationController = require('/controllers/ApplicationController').ApplicationController;

//var LoginController = require('/controllers/LoginController').LoginController;


var controller = new ApplicationController();

controller.init();

})();

/*var win = Ti.UI.createWindow({

backgroundColor:'#000',

orientationModes:[Ti.UI.LANDSCAPE_LEFT]

});



var View2 = require('app1').AnotherView;



var activeMovie = Titanium.Media.createVideoPlayer({

backgroundColor:'#fff',

med:Titanium.Media.VIDEO_CONTROL_EMBEDDED,

scalingMode:Titanium.Media.VIDEO_SCALING_NONE,

autoplay:true,

fullscreen:false

});



var subView = Ti.UI.createWindow({

backgroundColor: 'transparent',

height: 100,

width: 100

});



subView.addEventListener('click', function(e){

Titanium.API.info("You clicked the view");

//alert('Interactive Video');

var view2 = new View2();

view2.initialize();

//win.remove(subView);

win.add(view2.view);

 

});



subView.addEventListener('touchstart', function(e){

subView.borderWidth = 1;

subView.borderColor = 'red';

});



subView.addEventListener('touchend', function(e){

subView.borderWidth = 0;

//subView.borderColor = 'transparent';

});



activeMovie.url = 'http://assets.appcelerator.com.s3.amazonaws.com/video/media.m4v';

win.add(activeMovie);

win.add(subView);



win.open();

activeMovie.play();

*/