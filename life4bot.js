//Life4DDRBot
//Created by Steve Sefchick - 2019
//Tweets to @Life4DDRBot
//build using NodeJS


const fs = require('fs');
var twit = require('twit');
var config = require('./config.js');
var Twitter = new twit(config);




require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;
//waitfor
var wait = require('wait.for');

var mysql = require('mysql');
var connection;



app.listen(port, () => console.log(`Listening on port ${port}!`));



function testTheBoy(callback)
{
  setTimeout( function(){


    callback(null,"hey!");


}, 750);

}









app.get("/api/test", function(req, res) {
/*
  connection = mysql.createConnection({
    host     : process.env.MYSQLHOST,
    user     : process.env.MYSQLUSER,
    password : process.env.MYSQLPW,
    database : process.env.MYSQLPLAYERDB
  });
  connection.connect();
  */
 
  //var testboy = wait.for(testTheBoy);



  res.status(200).json("the dang test worked!");
});


//run main class
var getSpreadsheet = function()
{
  var spreadsheet = require('./spreadsheet.js');
}

var botJoinDiscordChannel = function()
{

   const channel = bot.channels.find('name', 'general')
   channel.send('hello!')
   .then(message => console.log("sent!"))
   .catch(console.error);

    console.log("henlo");
}



//check for needed activity
var life4actionTime = function()
{

    console.log('App is running!!!');
    //this works
    getSpreadsheet();

}


life4actionTime();
