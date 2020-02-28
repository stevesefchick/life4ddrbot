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



//
//SCORE SUBMISSION STUFF
//

  function getSubmissionsFromSheet(auth,callback)
{
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1qJ1-hor3dHw8w89mBOG6DNHfaAGmrVFnerq8x6xCCfw',
    range: 'Scores!A2:I',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    callback(null,rows);
  });
}



//
//MASTER SPREADSHEET STUFF
//

function checkThatMasterList(callback){

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


function playerMasterGetName(row, callback){
  setTimeout( function(){

            var returnedName = `${row[0]}`;

            if (returnedName.includes("'"))
            {
              //var spot = returnedName.indexOf("'");
              returnedName = returnedName.replace("'","''");
              console.log("NEW NAME IS " + returnedName);
              callback(null,returnedName);
        
            }
            else
            {
              callback(null,returnedName);
        
            }

  }, 25);
}; 

function playerMasterGetTag(row, callback){
  setTimeout( function(){

            var returnedRank = `${row[1]}`;

            callback(null,returnedRank)

  }, 25);
}; 

function playerMasterGetRival(row, callback){
  setTimeout( function(){

            var returnedRank = `${row[2]}`;

            callback(null,returnedRank)

  }, 25);
}; 


function playerMasterGetDiscord(row, callback){
  setTimeout( function(){

            var returnedRank = `${row[3]}`;

            callback(null,returnedRank)

  }, 25);
}; 

function playerMasterGetTwitter(row, callback){
  setTimeout( function(){

            var returnedRank = `${row[4]}`;

            callback(null,returnedRank)

  }, 25);
}; 

function playerMasterGetLIFE4Rank(row, callback){
  setTimeout( function(){

            var returnedRank = `${row[5]}`;

            callback(null,returnedRank)

  }, 25);
}; 

function playerMasterGetDivision(row, callback){
  setTimeout( function(){

            var returnedRank = `${row[6]}`;

            callback(null,returnedRank)

  }, 25);
}; 

function playerMasterGetTeam(row, callback){
  setTimeout( function(){

            var returnedRank = `${row[7]}`;

            callback(null,returnedRank)

  }, 25);
}; 

function playerMasterGetIsCaptain(row, callback){
  setTimeout( function(){

            var returnedRank = `${row[8]}`;

            callback(null,returnedRank)

  }, 25);
}; 

function insertNewPlayerMasterRecord(playerName,playerTag,playerRival,playerDiscord,playerTwitter,playerLIFE4Rank,playerDivision,playerTeam,playerIsCaptain,callback){

  setTimeout( function(){

    var insertplayerquery = "INSERT INTO life4tourneyplayerlist (tourneyPlayerName, tourneyPlayerTag, tourneyPlayerRivalCode, tourneyPlayerDiscordTag, tourneyPlayerTwitterHandle,tourneyPlayerLIFE4Rank,tourneyPlayerDivision,tourneyPlayerTeamName,tourneyPlayerIsCaptain) VALUES ('" + playerName + "','" + playerTag + "','" + playerRival + "','"+playerDiscord+"', '"+playerTwitter+"','"+playerLIFE4Rank+"','"+playerDivision+"','"+playerTeam+"','"+playerIsCaptain+"')";
    connection.query(insertplayerquery, function (error, results) {
        if (error) throw error;
        callback(null,results)

      });


}, 250);

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

  console.log("Job is starting!");

  //check if master list is 0
  var checkMasterList = wait.for(checkThatMasterList);
  //if there's nothing, pull from the master list
  if (!checkMasterList.length)
  {
    console.log("Populating master player sheet for the first time!");
    var masterPlayerSpreadsheet = wait.for(newGetMasterPlayersFromSheets, getauth);
    console.log("Master list retrieved!");

        if (masterPlayerSpreadsheet.length)
        {
          masterPlayerSpreadsheet.map((row) => {
            var playerName = wait.for(playerMasterGetName,row);
            var playerTag = wait.for(playerMasterGetTag,row);
            var playerRival = wait.for(playerMasterGetRival,row);
            var playerDiscord = wait.for(playerMasterGetDiscord,row);
            var playerTwitter = wait.for(playerMasterGetTwitter,row);
            var playerLIFE4Rank = wait.for(playerMasterGetLIFE4Rank,row);
            var playerDivision = wait.for(playerMasterGetDivision,row);
            var playerTeam = wait.for(playerMasterGetTeam,row);
            var playerIsCaptain = wait.for(playerMasterGetIsCaptain,row);
            console.log("Inserting record for " + playerName);
            var playerinsert = wait.for(insertNewPlayerMasterRecord,playerName,playerTag,playerRival,playerDiscord,playerTwitter,playerLIFE4Rank,playerDivision,playerTeam,playerIsCaptain);
            console.log("Done!");

          });
        }
        console.log("Master list completed!");

  }

  console.log("Starting score submissions!");
  var scoreSubmissions = wait.for(getSubmissionsFromSheet, getauth);
  if (scoreSubmissions.length)
  {
    //TODO: Create DB Schema - Score Submissions
    //TODO: Wipe Submissions DB
    //TODO: Pull submissions into DB - don't copy every row, check for existing player/song and then apply rules to it to get all score mods
    //TODO: Apply score mods to final list
    //TODO: Update Master spreadsheet
    //TODO: Update Team spreadsheet


  }




  }


  wait.launchFiber(LIFE4Revolutionsequence);
