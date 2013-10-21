
function getPhotos(e) {
	
	var AndroidMediaQuery = require('com.oxgcp.androidmediaquery');
	var win = e.source;

	var table = Ti.UI.createTableView();
	win.add(table);
	
	var albums = AndroidMediaQuery.queryAlbumList();
	var rows = [];

	for (var i in albums) {
		
		var album = albums[i];
		
		console.log(album);
		
		var row = Ti.UI.createTableViewRow({
			height: "75dp",
		});
		
		var wrapper = Ti.UI.createView({
			width: Ti.UI.FILL, height: Ti.UI.FILL,
		});
		row.add(wrapper);
		
		var imageWrapper = Ti.UI.createView({
			left: 0,
			width: "75dp",
			height: "75dp",
		})
		wrapper.add(imageWrapper);
		
		var image = Ti.UI.createImageView({
			width: "75dp",
			height: (album.thumbnail_height * 75 / album.thumbnail_width) + "dp",
			image: "file://" + album.thumbnail,
		});
		imageWrapper.add(image);
		
		var title = Ti.UI.createLabel({
			left: "85dp",
			text: album.name,
			font: {fontSize: "15dp", fontWeight: "bold"},
			color: "#000",
		});
		wrapper.add(title);
		
		rows.push(row);
	}

	table.setData(rows);
}

function onCloseWindow(e) {
	e.source.addEventListener("open", getPhotos);
	e.source.addEventListener("close", onCloseWindow);
}

exports.createWindow = function() {
	
	var win = Ti.UI.createWindow({
		navBarHidden: true,
		backgroundColor: "#fff"
	})
	
	win.addEventListener("open", getPhotos);
	win.addEventListener("close", onCloseWindow);
	
	return win;
}