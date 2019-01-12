//Life4DDRBot
//Created by Steve Sefchick - 2019
//Tweets to [tbd]
//build using NodeJS

//Created to tweet player progression and new players joining the @Life4DDR ranking

//update readme

//add express calls

var twit = require('twit');
var spreadsheet = require('./spreadsheet.js');
require('dotenv').config();


const express = require('express');
const app = express();
const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}!`));


//add plugin for spreadsheet

//add init from spreadsheet

//add get from spreadsheet

//check file to spreadsheet

//check for needed activity
var life4actionTime = function()
{
    console.log('App is running!!!');
}

//tweet init
var initPlayerList = function()
{

}

//tweet new
var tweetNewPlayer = function()
{

}

//tweet rank up
var tweetPlayerRankUp = function()
{

}



life4actionTime();
