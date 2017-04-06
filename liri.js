// declare var for node modules
var fs = require("fs");
var Twitter = require("twitter");
var keys = require("./keys.js");
var spotify = require("spotify");
var request = require("request");

// declare var for getting user data
var searchType = process.argv[2];
var name = process.argv.slice(3);

// grab key for twitter and store in keys var
var keyList = keys.twitterKeys;

// use switch to determine which function is called
switch(searchType) {
case "my-tweets":
    myTweets();
    break;
case "spotify-this-song":
    song();
    break;
case "movie-this":
    movieSearch();
    break;
case "do-what-this-says":
    randomSearch();
    break;
}


// create twitter callback function
function myTweets() {
    var client = new Twitter (keyList);
    var params = {screen_name: 'jmw5050'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
	if (!error) {
	    for(var i = 0; i < tweets.length; i++) {
		console.log(tweets[i].created_at);
		console.log(tweets[i].text);
	    }
	} else {
	    console.log(error);
	}
    });
}; // close myTweets function

// spotify check for song function
function song() {
    if (name === " ") {
	console.log("no name");
	name = "The Sign";
	spotifySearch();
    } else {
	spotifySearch();
    }

}// close song function

// create spotify callback function
function spotifySearch() {
    spotify.search({ type: 'track', query: name }, function(err, data) {
	if ( err ) {
            console.log('Error occurred: ' + err);
            return;
	} else {
	    console.log(data.tracks.items[0].artists);
	    //artists
	    console.log("Artitst(s): " + data.tracks.items[0].artists.name);
	    // song name
	    console.log("Song Name: " + data.tracks.items[0].name);
	    // spotify link
	    console.log("Spotify Link " + data.tracks.items[0].href);
	    // album
	    console.log("Album: " + data.tracks.items[0].album.name);
	}
    });
} // close spotify function

// create omdb request function
function movieSearch() {

} // close movie search

// create random.txt readfile function
function randomSearch() {

} // close random search
