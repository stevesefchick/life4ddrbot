//Life4DDRBot - Tournament Job
//Created by Steve Sefchick
//2019 - 2020
//built using NodeJS



                //TODO: Apply score mods to final list



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
    range: 'Scores!A2:J',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    callback(null,rows);
  });
}

function scoreGetVerification(row, callback){
  setTimeout( function(){

            var returnedVer = `${row[0]}`;

              callback(null,returnedVer);
        

  }, 25);
}; 

function scoreGetName(row, callback){
  setTimeout( function(){

            var returnedName = `${row[1]}`;

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


function scoreSubGetValue(row, col, callback){
  setTimeout( function(){

            var returnedValue = `${row[col]}`;
            callback(null,returnedValue);

  }, 25);
}; 


function scoreCheckForExisting(scoreSubPlayer, scoreSubSong, callback){
  setTimeout( function(){

    var checkforplayerquery = "SELECT tourneyTourneyPlayerScoresID,tourneyTourneyPlayerScoresName,tourneyTourneyPlayerScoresSong,tourneyTourneyPlayerScoresSongEX,tourneyTourneyPlayerScoresSongBonusLamp,tourneyTourneyPlayerScoresSongBonusGrade,tourneyTourneyPlayerScoresSongBonusPersonalBest FROM life4TourneyPlayerScores where tourneyTourneyPlayerScoresName = '" + scoreSubPlayer + "' and tourneyTourneyPlayerScoresSong = '" + scoreSubSong + "'";
    connection.query(checkforplayerquery, function (error, results) {
        if (error) throw error;
        callback(null,results)

      });

  }, 25);
}; 

function insertNewScoreSubRecord(playerName, playerTeam, playerDivision, playerSong,playerSongEX,playerBonusLamp,playerBonusGrade,playerBonusPB,callback){

  setTimeout( function(){

    var insertscorequery = "INSERT INTO life4TourneyPlayerScores (tourneyTourneyPlayerScoresName, tourneyTourneyPlayerScoresTeam, tourneyTourneyPlayerScoresDivision, tourneyTourneyPlayerScoresSong, tourneyTourneyPlayerScoresSongEX, tourneyTourneyPlayerScoresSongBonusLamp, tourneyTourneyPlayerScoresSongBonusGrade, tourneyTourneyPlayerScoresSongBonusPersonalBest) VALUES ('" + playerName + "','" + playerTeam + "','" + playerDivision + "','"+playerSong+"','"+playerSongEX+"','"+playerBonusLamp+"', '"+playerBonusGrade+"','"+playerBonusPB+"', now())";
    connection.query(insertscorequery, function (error, results) {
        if (error) throw error;
        callback(null,results)

      });


}, 250);

}

function updateNewScoreSubRecord(playerID,playerSongEX,playerBonusLamp,playerBonusGrade,playerBonusPB,callback){

  setTimeout( function(){

    var updatescorequery = "UPDATE life4TourneyPlayerScores set tourneyTourneyPlayerScoresSongEX = "+ playerSongEX +" and tourneyTourneyPlayerScoresSongBonusLamp = " + playerBonusLamp +" and tourneyTourneyPlayerScoresSongBonusGrade = " + playerBonusGrade + " and tourneyTourneyPlayerScoresSongBonusPersonalBest = " + playerBonusPB + " where tourneyTourneyPlayerScoresID = "+playerID;
    connection.query(updatescorequery, function (error, results) {
        if (error) throw error;
        callback(null,results)

      });


}, 250);

}

function updateScoreSubRecord(playerID,playerSongEX,callback){

  setTimeout( function(){

    var updatescorequery = "UPDATE life4TourneyPlayerScores set tourneyTourneyPlayerScoresSongEX = "+ playerSongEX +" where tourneyTourneyPlayerScoresID = "+playerID;
    connection.query(updatescorequery, function (error, results) {
        if (error) throw error;
        callback(null,results)

      });


}, 250);

}

function updatePBSubRecord(playerID,callback){

  setTimeout( function(){

    var updatescorequery = "UPDATE life4TourneyPlayerScores set tourneyTourneyPlayerScoresSongBonusPersonalBest = 'YES' where tourneyTourneyPlayerScoresID = "+playerID;
    connection.query(updatescorequery, function (error, results) {
        if (error) throw error;
        callback(null,results)

      });


}, 250);

}

function updateGradeSubRecord(playerID,newGrade,callback){

  setTimeout( function(){

    var updatebonusquery = "UPDATE life4TourneyPlayerScores set tourneyTourneyPlayerScoresSongBonusGrade = '"+ newGrade + "' where tourneyTourneyPlayerScoresID = "+playerID;
    connection.query(updatebonusquery, function (error, results) {
        if (error) throw error;
        callback(null,results)

      });


}, 250);

}

function checkForHigherBonusGrade(oldGrade, newGrade,callback){

  setTimeout( function(){

    if (oldGrade =='n/a')
    {
      callback(null,true);
    }
    else if (oldGrade == 'AA')
    {
      if (newGrade == 'AA+')
      {
        callback(null,true);    

      }
      else if (newGrade == 'AAA')
      {
        callback(null,true);    

      }
      else
      {
        callback(null,false);    
      }
    }
    else if (oldGrade == 'AA+')
    {
      if (newGrade == 'AAA')
      {
        callback(null,true);    

      }
      else
      {
        callback(null,false);    
      }
    }
    else
    {
      callback(null,false);
    }


}, 250);

}

function updateLampSubRecord(playerID,newLamp,callback){

  setTimeout( function(){

    var updatebonusquery = "UPDATE life4TourneyPlayerScores set tourneyTourneyPlayerScoresSongBonusLamp = '"+ newLamp + "' where tourneyTourneyPlayerScoresID = "+playerID;
    connection.query(updatebonusquery, function (error, results) {
        if (error) throw error;
        callback(null,results)

      });


}, 250);

}

function checkForHigherLamp(oldLamp, newLamp,callback){

  setTimeout( function(){

    if (oldLamp =='n/a')
    {
      callback(null,true);
    }
    else if (oldLamp == 'LIFE4 Clear')
    {
      if (newLamp == 'Good Full Combo')
      {
        callback(null,true);    

      }
      else if (newLamp == 'Great Full Combo')
      {
        callback(null,true);    

      }
      else if (newLamp == 'Perfect Full Combo')
      {
        callback(null,true);    
      }
      else if (newLamp == 'Marvelous Full Combo')
      {
        callback(null,true);    
      }
      else
      {
        callback(null,false);    
      }
    }
    else if (oldLamp == 'Good Full Combo')
    {
      if (newLamp == 'Great Full Combo')
      {
        callback(null,true);    
      }
      else if (newLamp == 'Perfect Full Combo')
      {
        callback(null,true);    
      }
      else if (newLamp == 'Marvelous Full Combo')
      {
        callback(null,true);    
      }
      else
      {
        callback(null,false)    
      }
    }
    else if (oldLamp == 'Great Full Combo')
    {
      if (newLamp == 'Perfect Full Combo')
      {
        callback(null,true);    
      }
      else if (newLamp == 'Marvelous Full Combo')
      {
        callback(null,true);    
      }
      else
      {
        callback(null,false)    
      }
    }
    else if (oldLamp == 'Perfect Full Combo')
    {
      if (newLamp == 'Marvelous Full Combo')
      {
        callback(null,true);    
      }
      else
      {
        callback(null,false)    
      }
    }
    else
    {
      callback(null,false)
    }


}, 250);

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
  console.log("Score submissions received!");

    if (scoreSubmissions.length)
    {
        playerSpreadsheetList.map((row) => {

          var verification = wait.for(scoreGetVerification,row);
          
          if (verification == "X")
          {
            var scoreSubName = wait.for(scoreGetName,row);
            var scoreSubTeam = wait.for(scoreSubGetValue,2,row);
            var scoreSubDivision = wait.for(scoreSubGetValue,3,row);
            var scoreSubSong = wait.for(scoreSubGetValue,4,row);
            var scoreSubEX = wait.for(scoreSubGetValue,5,row);
            var scoreSubBonusLamp = wait.for(scoreSubGetValue,6,row);
            var scoreSubBonusGrade = wait.for(scoreSubGetValue,7,row);
            var scoreSubBonusPB = wait.for(scoreSubGetValue,8,row);
            console.log("Player info from spreadsheet retrieved");

            //check for existing
            var currentPlayerScore = wait.for(scoreCheckForExisting, scoreSubName, scoreSubSong);

            //if exists!
            if (currentPlayerScore && currentPlayerScore.length)
            {
              console.log("Player " + scoreSubName + " // Song " + scoreSubSong + " // EXISTS!");

                //var playerupdate = wait.for(updateNewScoreSubRecord,currentPlayerScore.tourneyTourneyPlayerScoresID,scoreSubEX,scoreSubBonusLamp,scoreSubBonusGrade,scoreSubBonusPB);
                //check EX
                if (currentPlayerScore.tourneyTourneyPlayerScoresSongEX < scoreSubEX)
                {
                  var playerupdate = wait.for(updateScoreSubRecord,currentPlayerScore.tourneyTourneyPlayerScoresID,scoreSubEX);
                  console.log("EX Updated!");

                }
                //check grade bonus
                if (currentPlayerScore.tourneyTourneyPlayerScoresSongBonusGrade != scoreSubBonusGrade)
                {
                  var isHigher = wait.for(checkForHigherBonusGrade,currentPlayerScore.tourneyTourneyPlayerScoresSongBonusGrade,scoreSubBonusGrade);
                  if (isHigher == true)
                  {
                    var gradeupdate = wait.for(updateGradeSubRecord,currentPlayerScore.tourneyTourneyPlayerScoresID,scoreSubBonusGrade);
                  }
                  console.log("Bonus grade updated!");
                }
                //check lamp bonus
                if (currentPlayerScore.tourneyTourneyPlayerScoresSongBonusLamp != scoreSubBonusLamp)
                {
                  var isHigher = wait.for(checkForHigherLamp,currentPlayerScore.tourneyTourneyPlayerScoresSongBonusLamp,scoreSubBonusLamp);
                  if (isHigher == true)
                  {
                    var lampupdate = wait.for(updateLampSubRecord,currentPlayerScore.tourneyTourneyPlayerScoresID,scoreSubBonusLamp);
                  }

                  console.log("Bonus lamp updated!");
                }
                //check pb bonus
                if (currentPlayerScore.tourneyTourneyPlayerScoresSongBonusPersonalBest == 'NO' && scoreSubBonusPB == 'YES')
                {
                  var playerupdate = wait.for(updatePBSubRecord,currentPlayerScore.tourneyTourneyPlayerScoresID);
                  console.log("Bonus PB updated!");
                }



                console.log("Entry updated!");

            }
            //if doesn't exist!
            else
            {
              console.log("Player " + scoreSubName + " // Song " + scoreSubSong + " // DOES NOT EXIST!");
                var playerinsert = wait.for(insertNewScoreSubRecord,scoreSubName,scoreSubTeam,scoreSubDivision,scoreSubSong,scoreSubEX,scoreSubBonusLamp,scoreSubBonusGrade,scoreSubBonusPB);
                console.log("Entry added!");

            }



          }

        });

        //TODO: Figure out division --> score mapping
                //TODO: Wipe Master/Team spreadsheet
                //TODO: Update Master spreadsheet
                //TODO: Update Team spreadsheet
    }

  }


  wait.launchFiber(LIFE4Revolutionsequence);
