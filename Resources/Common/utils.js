exports.isiOS7 = function(){
	if (Titanium.Platform.name == 'iPhone OS'){
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0],10);

		if (major >= 7)
			return true;
	}
	
	return false;
};
