//Life4DDRBot
//Created by Steve Sefchick - 2019
//Tweets to @Life4DDRBot
//build using NodeJS

//update readme

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

var botJoinDiscordChannel = function()
{
    console.log("henlo");
}

//check for needed activity
var life4actionTime = function()
{

    console.log('App is running!!!');

    getSpreadsheet();
}

life4actionTime();
