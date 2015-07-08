var getEventsData = function(tag, near, cat) {

	dataDetails = {
		q: tag, 
		sort: "datetime_utc.asc",
	}

	// "near" parameter is truthy; if set, then will add geoip of user
	// to the query, and thereby limit the results.
	// intention is to display two search results for each user search:
	// first is events near the user.
	// second is all events from the search.
	if (near) {
		dataDetails["geoip"] = "true";
		dataDetails["range"] = "30mi";
	}

	if (cat) {
		dataDetails["taxonomies.name"] =  cat;
	}

	var result = $.ajax({
		url: "http://api.seatgeek.com/2/events",
		data: dataDetails,
		dataType: "jsonp",
		type: "GET"
		})
	.done(function(result){
		console.log(result);
		result.events.forEach(function(item, idx){
			console.log(item);
			console.log(item.title);

			if (item.time_tbd) {
				// necessary to have a separate response for this; 
				// otherwise, it defaults to 3:30am... which is potentially misleading.
				console.log("TBD TBD TBD!!!!");
			} else {
				/*var newTime = item.datetime_local.split("T");
				var locDate = new Date(newTime[0].replace(/-/g,"/"));*/
				var newDateTime = new Date(item.datetime_local);
				console.log(newDateTime);
			}

			console.log(item.url);
			console.log(item.stats);
		});
	})
	.fail(function(jqXHR, error, errorThrown){
		console.log(error);
	});

	console.log("my results: ");
	console.log(result);
};

var taxonomyObj = {
	taxonomyList : $.ajax({
		url: "http://api.seatgeek.com/2/taxonomies",
		dataType: "json",
		type: "GET"
		})
	.done(function(result){
		console.log(result);
	})
	.fail(function(jqXHR, error, errorThrown){
		console.log(error);
	}),

/*	nameList : this.taxonomyList.responseJSON.taxonomys.map(function(item, idx){
		return item.name;
	})*/
}

/*taxonomyObj.nameList = taxonomyObj.taxonomyList.responseJSON.taxonomys.map(function(item, idx){
	return item.name;
});*/