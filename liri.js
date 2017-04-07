// declare var for node modules
var fs = require("fs");
var Twitter = require("twitter");
var keys = require("./keys.js");
var spotify = require("spotify");
var request = require("request");

// declare var for getting user data
var searchType = process.argv[2];
var searchName = process.argv[3] || "";

// grab key for twitter and store in keys var
var keyList = keys.twitterKeys;
searchCheck();

// use switch function to determine which function is called
function searchCheck() {
    switch(searchType) {
    case "my-tweets":
	myTweets();
	break;
    case "spotify-this-song":
	checkName();
	break;
    case "movie-this":
    checkName();
	break;
    case "do-what-this-says":
	randomSearch();
	break;
    }
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
function checkName() {
    if (searchName === "") {
	if (searchType === "spotify-this-song"){
	    searchName = "Bye Bye Bye";
	    spotifySearch();
	} else {
	    console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
	    console.log("It's on Netflix!");
	}
    } else if (searchName.length > 1) {
	if(searchType === "spotify-this-song") {
	    spotifySearch();
	} else {
	    movieSearch();
	}
    } else {
	searchName = process.argv[3];
	if(searchType === "spotify-this-song") {
	    spotifySearch();
	} else {
	    movieSearch();
	}
    }

}// close checkName function

// create spotify callback function
function spotifySearch() {
    spotify.search({ type: 'track', query: searchName }, function(err, data) {
	if ( err ) {
            console.log('Error occurred: ' + err);
            return;
	} else {
	    console.log(JSON.stringify(data.tracks.items[0].artists, null, 2));
	    //artists
	    console.log("Artitst(s): " + data.tracks.items[0].artists[0].name);
	    // song name
	    console.log("Song Name: " + data.tracks.items[0].name);
	    // spotify link
	    console.log("Spotify Link: " + data.tracks.items[0].href);
	    // album
	    console.log("Album: " + data.tracks.items[0].album.name);
	}
    });
} // close spotify function

// create omdb request function
function movieSearch() {
    var encodeName = encodeURI(searchName);
    request("http://www.omdbapi.com/?t=" + encodeName + "&y=&plot=short&r=json", function(error, response, body) {
	if (!error && response.statusCode === 200) {
	    //console.log(JSON.parse(body));
	    console.log("Title: " + JSON.parse(body).Title);
	    // year
	    console.log("Year Released: " + JSON.parse(body).Year);
	    // imdb rating
	    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	    // country produced
	    console.log("Country: " + JSON.parse(body).Country);
	    // language of movie
	    console.log("Language: " + JSON.parse(body).Language);
	    // plot
	    console.log("Plot: " + JSON.parse(body).Plot);
	    // actors
	    console.log("Actors: " + JSON.parse(body).Actors);
	    // rotten tomatoes rating
	    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
	    // rotten tomotoes url
	    console.log("Rotten Tomatoes: https://www.rottentomatoes.com/search/?search=" + encodeName);
	} else {
	    console.log(error);
	}
    });
} // close movie search

// create random.txt readfile function
function randomSearch() {
    fs.readFile("random.txt", "utf8", function(error, data) {
	if (error) {
	    console.log(error);
	} else {
	    var randArr = data.split(",");
	    console.log(randArr);
	    searchName = randArr[1];
	    searchType = randArr[0];
	    searchCheck();
	}
    });
} // close random search
