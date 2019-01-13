//Life4DDRBot
//Created by Steve Sefchick - 2019
//Tweets to [tbd]
//build using NodeJS

//Created to tweet player progression and new players joining the @Life4DDR ranking

//update readme

//add express calls

const fs = require('fs');
var twit = require('twit');
require('dotenv').config();
var Promise = require('promise');


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

}


//check for needed activity
var life4actionTime = function()
{

    return getSpreadsheet()
    .then(initPlayerList);
    //console.log('App is running!!!');

    //getSpreadsheet();


    //getSpreadsheet();

    //only enable during debug
    //initPlayerList();
}

//run this for init...only debug!
var initPlayerList = function()
{
    var fs = require('fs');
    fs.copyFile('current_list.txt', 'stored_list.txt', (err) => {
        if (err) throw err;
        console.log('list was copied!');
      });
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
