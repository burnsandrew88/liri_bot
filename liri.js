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
    }
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
            console.log("=======================================");
            console.log("Lineup: " + response.data[x].lineup);
            console.log("Venue: " + response.data[x].venue.name);
            console.log("Location: " + response.data[x].venue.city + " ," + response.data[x].venue.region + "," + response.data[x].venue.country);
            console.log("Event Date: " + moment(response.data[x].datetime).format("MM/DD/YYYY"));
            console.log("=======================================");

        }
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
            console.log("\n========================================\n");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview: " + data.tracks.items[0].preview_url);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("\n========================================\n");
        }
    });
};
userExp();