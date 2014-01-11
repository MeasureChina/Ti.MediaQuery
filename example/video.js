

function getVideos(page, perPage) {
	
	var AndroidMediaQuery = require('com.tripvi.mediaquery');
	
	var videos = AndroidMediaQuery.queryVideos((page * perPage), perPage); // offset, limit
	var rows = [];
	var count = 0;
	
	for (var i in videos) {
		
		count += 1;
		
		var video = videos[i];
		
		console.log( "(" + i + ") " + (new Date(video.dateTaken)).toString());
		
		var row = Ti.UI.createTableViewRow({
			width: Ti.UI.FILL,
			height: Ti.UI.SIZE,
			layout: 'vertical',
		});
		
		var info = Ti.UI.createLabel({
			text: video.id + ') ' + video.path + "\n" + video.title,
		});
		row.add(info);
		
		var info1 = Ti.UI.createLabel({
			text: "date - " + (new Date(video.dateTaken)).toString(),
			// text: "date - " + photo.dateTaken,
		});
		row.add(info1);
		
		var info2 = Ti.UI.createLabel({
			text: "duration: " + video.duration + ", size: " + video.size + ", resolution: " + video.resolution,
		});
		row.add(info2);
		
		var info3 = Ti.UI.createLabel({
			text: video.lat + ', ' + video.lng,
		});
		row.add(info3);
		
		var img = Ti.UI.createImageView({
			image: video.thumbnail,
			width: video.thumbnail_width,
			height: video.thumbnail_height,
		});
		row.add(img);
		
		rows.push(row);
	}
	
	console.log("");
	console.log("page :: " + (page+1) + " / count :: " + count);
	console.log("");
	
	return {
		rows: rows,
		end: (count < perPage),
	};
}

function pagination(e) {
	if (e.source._delay) return;
	if (e.source._pageEnd) return;
	
	if (e.firstVisibleItem + e.visibleItemCount >= e.totalItemCount) {
		e.source._delay = true;
		setTimeout(function() {
			e.source._delay = false;
		}, 500);
		
		var data = getPhotos(e.source.page, e.source.perPage);
		e.source.appendRow(data["rows"]);
		e.source.page += 1;
		e.source._pageEnd = data["end"];
	}
}

function createTableView(e) {
	var win = e.source;

	var table = Ti.UI.createTableView({
		page: 0,
		perPage: 10,
		_pageEnd: false,
		_delay: false,
	});
	win.add(table);
	
	table.addEventListener("scroll", pagination);
	table._release = function() {
		table.removeEventListener("scroll", pagination);
		table = undefined;
	}
	
	var data = getVideos(table.page, table.perPage);
	table.appendRow(data["rows"]);
	table.page += 1;
	table._pageEnd = data["end"];
}

function onCloseWindow(e) {
	for(var child in e.source.getChildren()) {
		if (child._release) {
			e.source.remove(child);
			child._release();
			child = undefined;
		}
	}
	
	e.source.removeEventListener("open", createTableView);
	e.source.removeEventListener("close", onCloseWindow);
}

exports.createWindow = function(options) {
	
	options = options || {};
	
	var win = Ti.UI.createWindow({
		navBarHidden: true,
		backgroundColor: "#fff",
	})
	
	win.addEventListener("open", createTableView);
	win.addEventListener("close", onCloseWindow);
	
	return win;
}






