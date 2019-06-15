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

function sendTheBoy(res,deets,callback)
{
  setTimeout( function(){

    res.send(JSON.stringify(deets));
    //callback(null,"ok!");


}, 750);

}

function getAllPlayersfromDB(callback){

  setTimeout( function(){

    var playerAllQuery = "SELECT * from playerList";
    connection.query(playerAllQuery, function (error, results) {
      if (error) throw error;
      callback(null,results)

    });
    
}, 25);

}

function getSinglePlayerFromDB(playername, callback){

  setTimeout( function(){

    var playerOneQuery = "SELECT * from playerList where playerName = '"+playername+"'";
    connection.query(playerOneQuery, function (error, results) {
      if (error) throw error;
      callback(null,results)

    });
    
}, 25);

}

function translateTrialName(trialName)
{
  if (trialName == "heartbreak")
  {
    trialName = "HEARTBREAK (12)";
  }
  else if (trialName == "celestial")
  {
    trialName = "CELESTIAL (13)";
  }
  else if (trialName == "daybreak")
  {
    trialName = "DAYBREAK (14)";
  }
  else if (trialName == "hellscape")
  {
    trialName = "HELLSCAPE (14)";
  }
  else if (trialName == "clockwork")
  {
    trialName = "CLOCKWORK (15)";
  }
  else if (trialName == "pharaoh")
  {
    trialName = "PHARAOH (15)";
  }
  else if (trialName == "paradox")
  {
    trialName = "PARADOX (16)";
  }
  else if (trialName == "inhuman")
  {
    trialName = "INHUMAN (16)";
  }
  else if (trialName == "chemical")
  {
    trialName = "CHEMICAL (17)";
  }
  else if (trialName == "origin")
  {
    trialName = "ORIGIN (18)";
  }
  else if (trialName == "origin")
  {
    trialName = "ORIGIN (18)";
  }
  else if (trialName == "mainframe")
  {
    trialName = "MAINFRAME (13)";
  }
  else if (trialName == "countdown")
  {
    trialName = "COUNTDOWN (14)";
  }
  else if (trialName == "heatwave")
  {
    trialName = "HEATWAVE (15)";
  }
  else if (trialName == "snowdrift")
  {
    trialName = "SNOWDRIFT (16)";
  }
  else if (trialName == "ascension")
  {
    trialName = "ASCENSION (17)";
  }
  //TODO: Add new trials
  return trialName;
};


function getTopTrialsFromDB(trialname, trialtopnum, callback){

  setTimeout( function(){

    trialname = translateTrialName(trialname);

    var trialTopQuery = "SELECT playerName, trialName, playerRank,playerScore,playerDiff,playerUpdateDate from playertrialrank where trialName = '"+trialname+"' order by playerScore desc limit " + trialtopnum;
    connection.query(trialTopQuery, function (error, results) {
      if (error) throw error;
      callback(null,results)

    });
    
}, 25);

}


function getAllPlayersSequence(req,res)
{
  connection = mysql.createConnection({
    host     : process.env.MYSQLHOST,
    user     : process.env.MYSQLUSER,
    password : process.env.MYSQLPW,
    database : process.env.MYSQLPLAYERDB
  });
  connection.connect();

  console.log("Time for test!");
  wait.for(testTheBoy);
  var allplayers = wait.for(getAllPlayersfromDB);
  wait.for(sendTheBoy,res,allplayers);
};

function getSinglePlayerSequence(playername,req,res)
{
  connection = mysql.createConnection({
    host     : process.env.MYSQLHOST,
    user     : process.env.MYSQLUSER,
    password : process.env.MYSQLPW,
    database : process.env.MYSQLPLAYERDB
  });
  connection.connect();

  wait.for(testTheBoy);
  var oneplayer = wait.for(getSinglePlayerFromDB,playername);
  wait.for(sendTheBoy,res,oneplayer);
};

function getTopTrialSequence(trialname,limit,req,res)
{
  connection = mysql.createConnection({
    host     : process.env.MYSQLHOST,
    user     : process.env.MYSQLUSER,
    password : process.env.MYSQLPW,
    database : process.env.MYSQLPLAYERDB
  });
  connection.connect();

  wait.for(testTheBoy);
  var toptrials = wait.for(getTopTrialsFromDB,trialname,limit);
  wait.for(sendTheBoy,res,toptrials);
};


//GET ALL PLAYERS
app.get("/api/players/all", function(req, res) {
   
    wait.launchFiber(getAllPlayersSequence,req,res);
  
  });




  //GET SINGLE PLAYER
  app.get("/api/player", function(req, res) {
   
    //get the player's name
    var name = req.query.name;

    
    //if no name
    if (name == undefined)
    {
      res.status(400).json("Missing a name!");
    }
    //name found
    else
    {
    wait.launchFiber(getSinglePlayerSequence, name, req,res);
    }
  });

  //GET TRIAL TOP PLAYERS
  app.get("/api/trial", function(req, res) {
   
    //get the player's name
    var trialname = req.query.name;
    var limit = req.query.limit;

    if (limit == undefined)
    {
      limit = 99999;
    }

    //if no name
    if (trialname == undefined)
    {
      res.status(400).json("Trial name must be included!");
    }
    //name found
    else
    {
      wait.launchFiber(getTopTrialSequence, trialname,limit, req,res);
    }


  });


  //TEST
app.get("/api/test", function(req, res) {
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
