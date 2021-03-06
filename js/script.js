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

		var allCats = [];
		result.events.forEach(function(item, idx){
			console.log(item);
			console.log(item.title);

			item.taxonomies.forEach(function(tax, idx) {
				// I need to think of either a more functional or OOP method of doing this.
				if (allCats.indexOf(tax.name) == -1) {
					allCats.push(tax.name);
				}
			});

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
 
		// can use "allCats" to create dynamic category winnowing terms for the user to use.
		console.log(allCats);
	})
	.fail(function(jqXHR, error, errorThrown){
		console.log(error);
	});

	console.log("my results: ");
	console.log(result);
};

var onSuccess = function(geoipResponse) {
	var userCity = geoipResponse.city.names.en || "your city";
	updateCity(userCity);
}

var onError = function(error) {
	console.log(error);
	return;
}

geoip2.city(onSuccess, onError);

function updateCity(cityName) {
	console.log(cityName);
}

/*var monthNames = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
]

var dayNames = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
]*/

function dateObj (dateString) {
/*	this.month = monthNames[dateVal.getMonth()];
	this.day = dayNames[dateVal.getDay()];
	this.date = dateVal.getDate();*/
	this.showDate = moment(dateString).format('MMM Do');
	this.showTime = moment(dateString).format('h:mm a');

	// sad to deprecate the below; was fun to look up and refactor.
	// but i'm better off using the moment.js library.	
/*	var hours = dateVal.getHours();
	var minutes = dateVal.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours || 12;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	this.strTime = hours + ':' + minutes + ' ' + ampm;*/
}