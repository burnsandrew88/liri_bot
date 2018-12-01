# liri_bot

## This application functions just like Siri, but instead of using voice inputs from the user, it takes in written requests by using the following commands-
            spotify-this-song
            concert-this
            movie-this
            do-what-it-says

## What each requests does

### concert-this:
    This will call out to the Bands In Town API with an Axios call and return the data by displaying the requested categories to the user including: 
            Line Up: <artist/band name>
            Venue: <location of the concert>
            Location: <shows the state,country of where the show is taking place>
            Date of Event: <display the date in MM/DD/YYYY Format>

### spotify-this-song:
    This will make a call out the Spotify API and return the given data to the user including: 
            Artist: <the name of the artist/band>
            Song: <name of the song>
            preview: <provide the preview link for the user to enter into a broswer to hear a 30 second sample of the song>
            Album: <album name that the song is on>

### movie-this:
    This will use the OMBD Database/API to find the given movie name in the database and return the given catergories to the user: 

            Title: <title of the movie>
            Year: <release year of the movie>
            IMDB Rating: <imdb score for the movie>
            Rotten Tomatoes: <rotten tomatoes percentage of the movie>
            Filmed In: <country the movie was filmed in>
            Summary: <plot summary of the movie>

### do-what-it-says:
    This will take in the text that it located in random.txt and it will read the file to use the command and parameter that is written in the random.txt file. In this case, it will spotify-this-song "I Want It That Way". This will give you the infomration in the bast for the popular Backstreet Boys song!



### play around with these requests by typing in node liri.js in your command terminal with Node.js package loaded up and have a great time! 

## Watch this video of me doing a demo of using the liri bot! : 