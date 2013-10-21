// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.


// open a single window
var win = Ti.UI.createWindow({
	backgroundColor: 'white',
});

var albumButton = Ti.UI.createButton({
	top: "100dp",
	height: "100dp",
	width: "200dp",
	title: "album",
});
win.add(albumButton);

albumButton.addEventListener("click", function() {
	var albumWin = require("album").createWindow();
	albumWin.open();
});

var photoButton1 = Ti.UI.createButton({
	top: "250dp",
	height: "100dp",
	width: "200dp",
	title: "photo",
});
win.add(photoButton1);

photoButton1.addEventListener("click", function() {
	var albumWin = require("photo").createWindow();
	albumWin.open();
});

/*var photoButton2 = Ti.UI.createButton({
	top: "350dp",
	height: "100dp",
	width: "200dp",
	title: "photo(getThumbnail)",
});
win.add(photoButton2);

photoButton2.addEventListener("click", function() {
	var albumWin = require("photo").createWindow({mode: "getThumbnail"});
	albumWin.open();
});*/



win.open();
