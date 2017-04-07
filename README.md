# HW-liri-node-app
UCLA Week 10 homework

This is a language interpretation and recognition interface (LIRI) app.  The assignment was to allow a user to call 4 different commands from the terminal using nodejs.  You can call, my-tweets to get the last 20 tweets I made, spotify-this-song "song name" to search for song info, movie-this "movie name" to get movie info, or do-what-this-says to get a command from the random.txt file.  If you don't put in a song name it will search for "Bye Bye Bye", but in the instructions it was suppose to search for "The Sign".  However, the spotify search was not working for that specific song so I had to use a different one.  If you don't add a movie name then it will give you a suggestion of a movie to watch. Another problem I ran into was creating the defaults for the empty search name, because I had to add an extra else if statement to the checkName function.

The else if (searchName.length < 1)) statement is the one I had to add in order to add in defaults for an empty search.

'''
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
'''

## Technologies Used
* Javascript
* Node JS
* NPM Request used to get movie info from OMDB
* NPM Spotify used to get song info from spotify
* NPM Twitter used to get last 20 tweets from user
* NPM FS used to read txt file
