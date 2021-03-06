var keysFile = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");
var command = process.argv[2];
var userInput = process.argv.slice(3);

var client = new Twitter(keysFile.twitterKeys);
var params = {screen_name: "lameimpala"};

function tweet(){
	client.get("statuses/user_timeline", params, function(error, tweets, response){
		if (!error) {
			for (var i = 0; i < tweets.length; i++) {
				console.log("-------------");
				console.log("@" + tweets[i].user.screen_name + ":");
				console.log(tweets[i].text);
				console.log(tweets[i].created_at);
				console.log("-------------");
			}
		}
	});
}

var spotify = new Spotify(keysFile.spotifyKeys);

function song(){
	spotify.search({type: "track", query: userInput, limit: 1}, function(err, data){
		if (err) {
			return console.log("Error occurred: " + err);
		}
		console.log("-------------");
		console.log("Artist: " + data.tracks.items[0].artists[0].name);
		console.log("Song: " + data.tracks.items[0].name);
		console.log("Album: " + data.tracks.items[0].album.name);
		console.log("Preview: " + data.tracks.items[0].external_urls.spotify);
		console.log("-------------");
	});
}

function movie(){
	request("http://www.omdbapi.com/?t=" + userInput + "&tomatoes=true&apikey=" + keysFile.omdbKey, function(error, response, body){
		if (!error && response.statusCode === 200){
			console.log("-------------");
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Year: " + JSON.parse(body).Year);
			console.log("IMDb Rating: " + JSON.parse(body).imdbRating);
			console.log("Produced in: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Starring: " + JSON.parse(body).Actors);
			console.log("Rotten Tomatoes: " + JSON.parse(body).tomatoURL);
			console.log("-------------");
		}
	});
}

function doThing(){
	fs.readFile("random.txt", "utf8", function(err, data){
		var txtCommand = data.split(",");
		if (err){
			return console.log(err);
		} else if (txtCommand[0] == "my-tweets"){
			tweet();
		} else if (txtCommand[0] == "spotify-this-song"){
			userInput = txtCommand[1];
			song();
		} else if (txtCommand[0] == "movie-this"){
			userInput = txtCommand[1];
			movie();
		}
		
	});
}

if (command == "my-tweets"){
	tweet();
} else if (command == "spotify-this-song"){
	song();
} else if (command == "movie-this"){
	movie();
} else if (command == "do-what-it-says"){
	doThing();
}