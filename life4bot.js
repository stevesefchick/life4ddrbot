//Life4DDRBot
//Created by Steve Sefchick - 2019
//Tweets to [tbd]
//build using NodeJS

//Created to tweet player progression and new players joining the @Life4DDR ranking

//update readme

//add express calls

const fs = require('fs');
var twit = require('twit');
var config = require('./config.js');
var Twitter = new twit(config);

require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}!`));

//add get from spreadsheet
var getSpreadsheet = function()
{
    var spreadsheet = require('./spreadsheet.js');
}

//check file to spreadsheet
var compareLists = function()
{
    var stored_list = fs.readFileSync('stored_list.txt').toString().split("\n");
    for (i in stored_list){
        console.log(stored_list[i]);
    }
}


//check for needed activity
var life4actionTime = function()
{

    console.log('App is running!!!');

    //compareLists();

    getSpreadsheet();

    //tweetNewPlayer();

    //only enable during debug
    //initPlayerList();
}

//tweet new
var tweetNewPlayer = function()
{
    //var post = "test tweet!";
    //Twitter.post('statuses/update', {status: post}, function(err, data, response) {
    //    console.log(data)
    //})
}

//tweet rank up
var tweetPlayerRankUp = function()
{

}



life4actionTime();
