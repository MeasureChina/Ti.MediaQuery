// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.


// open a single window
var win = Ti.UI.createWindow({
	backgroundColor: 'white',
});

var albumButton = Ti.UI.createButton({
	top: "50dp",
	height: "50dp",
	width: "200dp",
	title: "album",
});
win.add(albumButton);

albumButton.addEventListener("click", function() {
	var newWin = require("album").createWindow();
	newWin.open();
});

var photoButton1 = Ti.UI.createButton({
	top: "120dp",
	height: "50dp",
	width: "200dp",
	title: "photo(Pagination)",
});
win.add(photoButton1);

photoButton1.addEventListener("click", function() {
	var newWin = require("photo").createWindow();
	newWin.open();
});

var photoButton2 = Ti.UI.createButton({
	top: "190dp",
	height: "50dp",
	width: "200dp",
	title: "photo(Date range)",
});
win.add(photoButton2);

photoButton2.addEventListener("click", function() {
	var newWin = require("photosByDate").createWindow();
	newWin.open();
});

var photoButton3 = Ti.UI.createButton({
	top: "260dp",
	height: "50dp",
	width: "200dp",
	title: "photo(One Date)",
});
win.add(photoButton3);

photoButton3.addEventListener("click", function() {
	var newWin = require("photosByOneDate").createWindow();
	newWin.open();
});

var videoButton = Ti.UI.createButton({
	top: "310dp",
	height: "50dp",
	width: "200dp",
	title: "video",
});
win.add(videoButton);

videoButton.addEventListener("click", function() {
	var newWin = require("video").createWindow();
	newWin.open();
});


win.open();
