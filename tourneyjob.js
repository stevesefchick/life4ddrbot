//Life4DDRBot - Tournament Job
//Created by Steve Sefchick
//2019 - 2020
//built using NodeJS






//TODO: Leaderboard scores = current rank / total particpants * 10
//TODO: Combo Scores
/*
MFC = 7
PFC = 5
GFC = 3
GoodFC = 2
LIFE4 = 1
*/
//TODO: Grade scores
/*
AAA = 3
AA+ = 2
AA = 1
*/
//TODO: New PB +3
//TODO: Early Submission +1

//TODO: Schedule x1 per day

//TODO: Retrieve all teams/scores
//TODO: Retrieve single team, scores per player



const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
require('dotenv').config();
//twitter
var twit = require('twit');
var config = require('./config.js');
var Twitter = new twit(config);

//discord
var Discord = require('discord.js');
var bot = new Discord.Client();

//waitfor
var wait = require('wait.for');

//mysql
var mysql = require('mysql');
var connection;


bot.login(process.env.DISCORD_BOT_TOKEN);

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
  });


  function checkMasterList(callback){

    setTimeout( function(){
  
      var getQuery = "select * from life4tourneyplayerlist";
      connection.query(getQuery, function (error, results) {
        if (error) throw error;
        callback(null,results)
  
      });
      
  }, 25);
  
  };

  function newGetMasterPlayersFromSheets(auth,callback)
{
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1qJ1-hor3dHw8w89mBOG6DNHfaAGmrVFnerq8x6xCCfw',
    range: 'Master Player List!A2:I',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    callback(null,rows);
  });
}


  function LIFE4Revolutionsequence()
  {
  //connecting to DB
  connection = mysql.createConnection({
    host     : process.env.MYSQLHOST,
    user     : process.env.MYSQLUSER,
    password : process.env.MYSQLPW,
    database : process.env.MYSQLPLAYERDB
  });

  
  connection.connect();

  //check if master list is 0
  var checkMasterList = wait.for(checkMasterList);
  //if there's nothing, pull from the master list
  if (!checkMasterList.length)
  {
    //TODO: Populate DB

    var masterPlayerSpreadsheet = wait.for(newGetMasterPlayersFromSheets, getauth);

  }

  



    //TODO: Create DB Schema - Score Submissions

    //TODO: Read from submissions
    //TODO: Update Master
    //TODO: Apply score mods


  }


  wait.launchFiber(LIFE4Revolutionsequence);
