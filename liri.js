// Pulls from the .env file to get the spotify API 
require("dotenv").config();
// Variables and Requires
var fs = require("fs");
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require ("moment");



var command = process.argv[2];
var parameter = process.argv[3];


// Liri App Functions
function userExp() {
    switch (command) {
        case 'spotify-this-song':
            findSong(parameter);
            break;
        case 'concert-this':
            bandsInTown(parameter);
            break;
        case 'movie-this':
            OMDBCall(parameter);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
    }
}

// Log everything that is input by the user

function logIT(dataToLog){
    console.log(dataToLog);
    fs.appendFileSync("./log.txt", dataToLog, function(err){
        if (err) console.log("An error occured!")
    });
}

// bands in town API Call for concert-this

function bandsInTown(parameter) {
    if (command === 'concert-this') {
        var artist = "";
        for (i = 3; i < process.argv.length; i++) {

            artist += process.argv[i];

        }
        console.log(artist);
    } else {
        artist = parameter;
    }




axios.get(
    "https://rest.bandsintown.com/artists/" +
parameter +
"/events?app_id=codingbootcamp"
)
    
    .then(function(response){
        for (var x = 0; x < response.data.length; x++){
            logIT("\n=======================================\n");
            logIT("\nLineup: " + response.data[x].lineup + "\n");
            logIT("\nVenue: " + response.data[x].venue.name + "\n");
            logIT("\nLocation: " + response.data[x].venue.city + " ," + response.data[x].venue.region + "," + response.data[x].venue.country + "\n");
            logIT("\nEvent Date: " + moment(response.data[x].datetime).format("MM/DD/YYYY") + "\n");
            logIT("\n=======================================\n");

        }
    })
}

// OMDB API Call

function OMDBCall(parameter){
    if(parameter === undefined){
        parameter = "Mr. Nobody";
        console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947");
        console.log("\n It's on Netflix!\n")
    } else{
        searchMovie = parameter;
    }

    axios.get("http://www.omdbapi.com/?t=" +
    parameter +
    "&y=&plot=short&apikey=trilogy")
    .then(function(response){
        logIT("\n===================================\n");
        logIT("\nTitle: " + response.data.Title + "\n");
        logIT("\nYear: " + response.data.Year + "\n");
        logIT("\nIMDB Rating: " + response.data.Ratings[0].Value + "\n");
        logIT("\nRotten Tomatoes: " + response.data.Ratings[1].Value + "\n");
        logIT("\nFilmed In: " + response.data.Country + "\n");
        logIT("\nSummary: " + response.data.Plot + "\n");
        logIT("\nActors: " + response.data.Actors + "\n");
        logIT("\n===================================\n");
    })
}

// spotify-this-song API Call

function findSong(parameter) {
    var searchSong;
    if (parameter === undefined) {
        searchSong = "The Sign ace of base";
    } else {
        searchSong = parameter;
    }
    spotify.search({
        type: "track",
        query: searchSong,
    }, function (err, data) {
        if (err) {
            console.log("ERROR!" + err);
            return;
        } else {
            logIT("\n========================================\n");
            logIT("\nArtist: " + data.tracks.items[0].artists[0].name + "\n");
            logIT("\nSong: " + data.tracks.items[0].name + "\n");
            logIT("\nPreview: " + data.tracks.items[0].preview_url + "\n");
            logIT("\nAlbum: " + data.tracks.items[0].album.name + "\n");
            logIT("\n========================================\n");
        }
    });
};

// Run the do-what-it-says function
function doWhatItSays(){
    fs.readFile("random.txt", "utf-8", function(err, data){
        if (err){
            return console.log(err);
        } else {
            console.log(data);
        }
        var dataArr = data.split(",");
        if (dataArr[0] === 'spotify-this-song'){
            var songcheck = dataArr[1].trim().slice(1,-1);
            findSong(songcheck);
        }
        else if (dataArr[0]=== 'concert-this'){
            var bandName = dataArr[1]
            bandsInTown(bandName);
        } else if (dataArr[0] === "movie-this"){
            var movie_name = dataArr[1].trim().slice(1,-1);
            OMDBCall(movie_name);
        }
    })
}
userExp();