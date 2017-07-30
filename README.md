# LIRI (Command Line App)

### Overview

LIRI (Language Interpretation and Recognition Interface) is a command line Node application that utilizes the Twitter, Spotify, and OMDb APIs. The purpose of this project was to further familiarize myself with making requests to APIs, and to implement these requests into a simple Node app that displays the results.

When the command "node liri.js my-tweets" is entered, the command line interface will display the ten most recent tweets from the Twitter user listed in the "liri.js" file as a variable called "params."

When the command "node liri.js spotify-this-song '<song name here>'" is entered, the app will send a request to the Spotify API to search for a song with the given title, and return the first result in the CLI.
  
When the command "node liri.js movie-this '<movie name here>'" is entered, a request is sent to the OMDb API to search for a movie with the title provided by the user. The first result found is given, along with the year of release, IMDB rating, country where it was produced, language, plot, lead actors, and a URL to the movie's Rotten Tomatoes page.
  
When the command "node liri.js do-what-it-says" is entered, the app will read the "random.txt" file, and run the command printed in the file, which can be any of the previous three commands.
