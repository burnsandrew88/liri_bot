// Pulls from the .env file to get the spotify API 
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


var request = process.argv[2];
var parameter = process.argv[3];

// Liri App Functions
function userExp(){
    switch (request){
        case 'spotify-this-song':
        findSong(parameter);
        break;
    }
}

// spotify-this-song API Call

function findSong(parameter){
    var searchSong;
    if(parameter === undefined){
        searchSong = "The Sign ace of base";
    } else{
        searchSong = parameter;
    }
spotify.search({
    type: "track",
    query: searchSong,
}, function(err, data){
    if(err){
        console.log("ERROR!" + err);
        return;
    } else {
        console.log("\n ---------------------------------------\n");
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song: "+ data.tracks.items[0].name);
        console.log("Preview: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("\n ---------------------------------------\n");
    }
});
};
userExp();