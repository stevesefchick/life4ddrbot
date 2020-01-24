//Life4DDRBot
//Created by Steve Sefchick
//2019 - 2020
//Tweets to @Life4DDRBot
//built using NodeJS

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


bot.login(process.env.DISCORD_BOT_TOKEN);

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
  });


//mysql
var mysql = require('mysql');
var connection;


var getTwitterImageURL = function(rank)
{
  var twitterImageURL = "";

  if (rank == "Gold I" || rank ==  "Gold I (P)")
  {
    twitterImageURL = './rankup_images/G1.png';
  }
  else if (rank == "Gold II" || rank ==  "Gold II (P)")
  {
    twitterImageURL = './rankup_images/G2.png';
  }
  else if (rank == "Gold III" || rank ==  "Gold III (P)")
  {
    twitterImageURL = './rankup_images/G3.png';
  }
  else if (rank == "Silver I" || rank == "Silver I (P)")
  {
    twitterImageURL = './rankup_images/S1.png';
  }
  else if (rank == "Silver II"  || rank ==  "Silver II (P)")
  {
    twitterImageURL = './rankup_images/S2.png';
  }
  else if (rank == "Silver III"  || rank ==  "Silver III (P)")
  {
    twitterImageURL = './rankup_images/S3.png';
  }
  else if (rank == "Bronze I"  || rank ==  "Bronze I (P)")
  {
    twitterImageURL = './rankup_images/B1.png';
  }
  else if (rank == "Bronze II"  || rank ==  "Bronze II (P)")
  {
    twitterImageURL = './rankup_images/B2.png';
  }
  else if (rank == "Bronze III"  || rank ==  "Bronze III (P)")
  {
    twitterImageURL = './rankup_images/B3.png';
  }
  else if (rank == "Diamond I")
  {
    twitterImageURL = './rankup_images/D1.png';
  }
  else if (rank == "Diamond II")
  {
    twitterImageURL = './rankup_images/D2.png';
  }
  else if (rank == "Diamond III")
  {
    twitterImageURL = './rankup_images/D3.png';
  }
  else if (rank == "Cobalt I")
  {
    twitterImageURL = './rankup_images/C1.png';
  }
  else if (rank == "Cobalt II")
  {
    twitterImageURL = './rankup_images/C2.png';
  }
  else if (rank == "Cobalt III")
  {
    twitterImageURL = './rankup_images/C3.png';
  }
  else if (rank == "Wood I" || rank ==  "Wood I (P)")
  {
    twitterImageURL = './rankup_images/W1.png';
  }
  else if (rank == "Wood II" || rank ==  "Wood II (P)")
  {
    twitterImageURL = './rankup_images/W2.png';
  }
  else if (rank == "Wood III" || rank ==  "Wood III (P)")
  {
    twitterImageURL = './rankup_images/W3.png';
  }
  else if (rank == "Amethyst I")
  {
    twitterImageURL = './rankup_images/A1.png';
  }
  else if (rank == "Amethyst II")
  {
    twitterImageURL = './rankup_images/A2.png';
  }
  else if (rank == "Amethyst III")
  {
    twitterImageURL = './rankup_images/A3.png';
  }
  else if (rank == "Emerald I")
  {
    twitterImageURL = './rankup_images/EMERALD1.png';
  }
  else if (rank == "Emerald II")
  {
    twitterImageURL = './rankup_images/EMERALD2.png';
  }
  else if (rank == "Emerald III")
  {
    twitterImageURL = './rankup_images/EMERALD3.png';
  }
  else if (rank == "Platinum I")
  {
    twitterImageURL = './rankup_images/p1_rankup.png';

  }
  else if (rank == "Platinum II")
  {
    twitterImageURL = './rankup_images/p2_rankup.png';

  }
  else if (rank == "Platinum III")
  {
    twitterImageURL = './rankup_images/p3_rankup.png';

  }

  return twitterImageURL;

}

var getDiscordIcon = function(rank)
{
  var discordemoji="";

  if (rank == "Gold I" || rank ==  "Gold I (P)")
  {
    discordemoji = "<:g1:530666992189964309>";
  }
  else if (rank == "Gold II" || rank ==  "Gold II (P)")
  {
    discordemoji = "<:g2:530667245911670784>";
  }
  else if (rank == "Gold III" || rank ==  "Gold III (P)")
  {
    discordemoji = "<:g3:530667268099670016>";
  }
  else if (rank == "Silver I" || rank == "Silver I (P)")
  {
    discordemoji = "<:s1:530666613595308034>";
  }
  else if (rank == "Silver II"  || rank ==  "Silver II (P)")
  {
    discordemoji = "<:s2:530666638903738379>";
  }
  else if (rank == "Silver III"  || rank ==  "Silver III (P)")
  {
    discordemoji = "<:s3:530666660051419136>";
  }
  else if (rank == "Bronze I"  || rank ==  "Bronze I (P)")
  {
    discordemoji = "<:b1:530665305694011404>";
  }
  else if (rank == "Bronze II"  || rank ==  "Bronze II (P)")
  {
    discordemoji = "<:b2:530665345858666496>";
  }
  else if (rank == "Bronze III"  || rank ==  "Bronze III (P)")
  {
    discordemoji = "<:b3:530665367417389097>";
  }
  else if (rank == "Diamond I")
  {
    discordemoji = "<:d1:530667766487842826>";
  }
  else if (rank == "Diamond II")
  {
    discordemoji = "<:d2:530667779775397889>";
  }
  else if (rank == "Diamond III")
  {
    discordemoji = "<:d3:530667792303783937>";
  }
  else if (rank == "Cobalt I")
  {
    discordemoji = "<:c1:530667803498250252>";
  }
  else if (rank == "Cobalt II")
  {
    discordemoji = "<:c2:530667816836399114>";
  }
  else if (rank == "Cobalt III")
  {
    discordemoji = "<:c3:530667834418921482>";
  }
  else if (rank == "Wood I" || rank ==  "Wood I (P)")
  {
    discordemoji = "<:w1:540808051284901898>";
  }
  else if (rank == "Wood II" || rank ==  "Wood II (P)")
  {
    discordemoji = "<:w2:540808115994492948>";
  }
  else if (rank == "Wood III" || rank ==  "Wood III (P)")
  {
    discordemoji = "<:w3:540808178108203018>";
  }
  else if (rank == "Amethyst I")
  {
    discordemoji = "<:a1:540807826323537930>";
  }
  else if (rank == "Amethyst II")
  {
    discordemoji = "<:a2:540807915850956810>";
  }
  else if (rank == "Amethyst III")
  {
    discordemoji = "<:a3:540807991373594633>";
  }
  else if (rank == "Emerald I")
  {
    discordemoji = "<:e1:592474998820569088>";
  }
  else if (rank == "Emerald II")
  {
    discordemoji = "<:e2:592474998367715347>";
  }
  else if (rank == "Emerald III")
  {
    discordemoji = "<:e3:592474998564716544>";
  }
  else if (rank == "Platinum I")
  {
    discordemoji = "<:p1:645457791942918164>";
  }
  else if (rank == "Platinum II")
  {
    discordemoji = "<:p2:645457792022347806>";
  }
  else if (rank == "Platinum III")
  {
    discordemoji = "<:p3:645457792081330193>";
  }

  return discordemoji;
}


var getTrialDiscordIcon = function(rank)
{
  var discordemoji="";

  if (rank == "Gold")
  {
    discordemoji = "<:g3:530667268099670016>";
  }
  else if (rank == "Silver")
  {
    discordemoji = "<:s3:530666660051419136>";
  }
  else if (rank == "Bronze")
  {
    discordemoji = "<:b3:530665367417389097>";
  }
  else if (rank == "Diamond")
  {
    discordemoji = "<:d3:530667792303783937>";
  }
  else if (rank == "Platinum")
  {
    discordemoji = "<:p3:638533071301378068>";
  }
  else if (rank == "Cobalt")
  {
    discordemoji = "<:c3:530667834418921482>";
  }
  else if (rank == "Amethyst")
  {
    discordemoji = "<:a3:540807991373594633>";
  }
  else if (rank == "Emerald")
  {
    discordemoji = "<:e3:592474998564716544>";
  }
  //special
  else if (rank == "Wood/Bronze/Silver")
  {
    discordemoji ="<:w3:540808178108203018> <:b3:530665367417389097> <:s3:530666660051419136>";
  }
  else if (rank == "Amethyst and Above")
  {
    discordemoji ="<:a3:540807991373594633> <:e3:592474998564716544>";
  }

  return discordemoji;
}

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';

/*
let tokenjson = {
  "access_token": process.env.G_ACCESS_TOKEN,
  "refresh_token": process.env.DISCORD_BOT_TOKEN,
  "scope":"https://www.googleapis.com/auth/spreadsheets.readonly",
  "token_type":"Bearer",
  "expiry_date":1547324367365
}
console.log(tokenjson);
*/

function getCredentials(callback){
  setTimeout( function(){
                fs.readFile('credentials.json', (err, content) => {
                  if (err) return console.log('Error loading client secret file:', err);
                  var creddata = JSON.parse(content);
                  callback(null,creddata);
                  //authorize(JSON.parse(content), newGetTrials);
                });
                //callback(null,'hi '+param);
      }, 1000);
};

function getBotStatus(callback){
  setTimeout( function(){

    var appStatus = "SELECT varValue from life4Controls where varName='appStatus'";


    connection.query(appStatus, function (error, results) {
      if (error) throw error;
      callback(null,results)

    });
    
}, 25);



}; 

function playerGetSpreadsheetRowNameValue(row, callback){
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

function playerGetSpreadsheetRowRankValue(row, callback){
  setTimeout( function(){

            var returnedRank = `${row[1]}`;

           // console.log("rank = " + returnedRank);

            callback(null,returnedRank)

  }, 25);
}; 

function playerGetSpreadsheetRowRivalValue(row, callback){
  setTimeout( function(){

            var returnedRival = `${row[2]}`;

           // console.log("rival = " + returnedRival);

            callback(null,returnedRival)

  }, 25);
}; 

function playerGetSpreadsheetRowTwitterValue(row, callback){
  setTimeout( function(){

            var returnedTwitter = `${row[3]}`;

           // console.log("twitter = " + returnedTwitter);

            callback(null,returnedTwitter)

  }, 25);
}; 


function trialGetSpreadsheetRowNameValue(row, callback){
  setTimeout( function(){

            var returnedName = `${row[0]}`;

           // console.log("name = " + returnedName);

            callback(null,returnedName)

  }, 25);
}; 

function trialEventGetSpreadsheetRowNameValue(row, callback){
  setTimeout( function(){

            var returnedName = `${row[1]}`;

           // console.log("name = " + returnedName);

            callback(null,returnedName)

  }, 25);
}; 


function insertPlayerInQueue(playerName,updateType,playerID,callback){


  setTimeout( function(){

    var insertQuery = "INSERT INTO playerQueue (playerName,updateType,updateCategory,playerID,trialID,queueStatus) VALUES ('"+playerName+"','"+updateType+"','PLAYER',"+ playerID+",null,'ACTIVE')";


    connection.query(insertQuery, function (error, results) {
      if (error) throw error;
      callback(null,results)

    });
    
}, 25);

}

function insertTrialEventInQueue(playerName,updateType, trialID,callback){


  setTimeout( function(){

    var insertQuery = "INSERT INTO playerQueue (playerName,updateType,updateCategory,playerID,trialID,queueStatus) VALUES ('"+playerName+"','"+updateType+"','TRIALEVENT', null,"+trialID+",'ACTIVE')";


    connection.query(insertQuery, function (error, results) {
      if (error) throw error;
      callback(null,results)

    });
    
}, 25);

}

function insertTrialInQueue(playerName,updateType, trialID,callback){


  setTimeout( function(){

    var insertQuery = "INSERT INTO playerQueue (playerName,updateType,updateCategory,playerID,trialID,queueStatus) VALUES ('"+playerName+"','"+updateType+"','TRIAL', null,"+trialID+",'ACTIVE')";


    connection.query(insertQuery, function (error, results) {
      if (error) throw error;
      callback(null,results)

    });
    
}, 25);

}

function setQueueItemToProcessed(playerQueueID,callback){

  setTimeout( function(){

    var updateQuery = "UPDATE playerQueue SET queueStatus = 'DONE' WHERE playerQueueID = " + playerQueueID; 

    connection.query(updateQuery, function (error, results) {
      if (error) throw error;
      callback(null,results)

    });
    
}, 25);

};

function setQueueItemToError(playerQueueID,callback){

  setTimeout( function(){

    var updateQuery = "UPDATE playerQueue SET queueStatus = 'ERROR' WHERE playerQueueID = " + playerQueueID; 

    connection.query(updateQuery, function (error, results) {
      if (error) throw error;
      callback(null,results)

    });
    
}, 25);

};

function getReadyFromQueue(callback){

  setTimeout( function(){

    var getQuery = "select playerQueueID, playerName, updateType, updateCategory, playerID, trialID, queueStatus from playerQueue where queueStatus = 'ACTIVE' limit 1";
    connection.query(getQuery, function (error, results) {
      if (error) throw error;
      callback(null,results)

    });
    
}, 25);

};

function getTrialQueueInfo(trialID,callback){

  setTimeout( function(){

    var trialQueueQuery = "SELECT * from playertrialrank WHERE playerTrialRankID = " + trialID;
    connection.query(trialQueueQuery, function (error, results) {
      if (error) throw error;
      callback(null,results)

    });
    
}, 25);

}


function getPlayerQueueInfo(playerID,callback){

  setTimeout( function(){

    var playerQueueQuery = "SELECT * from playerList WHERE playerID = " + playerID;
    connection.query(playerQueueQuery, function (error, results) {
      if (error) throw error;
      callback(null,results)

    });
    
}, 25);

}

function trialGetSpreadsheetRowRankValue(row, callback){
  setTimeout( function(){

            var returnedRank = `${row[1]}`;

           // console.log("rank = " + returnedRank);

            callback(null,returnedRank)

  }, 25);
}; 


function trialGetSpreadsheetRowTwitterHandleValue(row, callback){
  setTimeout( function(){

            var returnedtwitter = `${row[4]}`;

           // console.log("twitter  = " + returnedtwitter);

            callback(null,returnedtwitter)

  }, 25);
}; 

function trialEventGetSpreadsheetRowTwitterHandleValue(row, callback){
  setTimeout( function(){

            var returnedtwitter = `${row[5]}`;

           // console.log("twitter  = " + returnedtwitter);

            callback(null,returnedtwitter)

  }, 25);
}; 

function trialGetSpreadsheetRowRivalCodeValue(row, callback){
  setTimeout( function(){

            var returnedrival = `${row[3]}`;


            callback(null,returnedrival)

  }, 25);
}; 

function trialEventGetSpreadsheetRowRivalCodeValue(row, callback){
  setTimeout( function(){

            var returnedrival = `${row[4]}`;


            callback(null,returnedrival)

  }, 25);
}; 


function trialGetSpreadsheetRowScoreValue(row, callback){
  setTimeout( function(){
  
            var returnedScore = `${row[2]}`;
            returnedScore = returnedScore.substr(0, returnedScore.indexOf(' '));
            //console.log("score = " + returnedScore);

            callback(null,returnedScore)

  }, 25);
}; 

function trialEventGetSpreadsheetRowScoreValue(row, callback){
  setTimeout( function(){
  
            var returnedScore = `${row[3]}`;
            returnedScore = returnedScore.substr(0, returnedScore.indexOf(' '));
            //console.log("score = " + returnedScore);

            callback(null,returnedScore)

  }, 25);
}; 


function trialGetSpreadsheetRowDiffValue(row, callback){
  setTimeout( function(){

            var returnedDiff = `${row[2]}`;
            returnedDiff = returnedDiff.substr(returnedDiff.indexOf('('), returnedDiff.indexOf(')'));
            //console.log("diff = " + returnedDiff);

            callback(null,returnedDiff)

  }, 25);
}; 

function trialEventGetSpreadsheetRowDiffValue(row, callback){
  setTimeout( function(){

            var returnedDiff = `${row[3]}`;
            returnedDiff = returnedDiff.substr(returnedDiff.indexOf('('), returnedDiff.indexOf(')'));
            //console.log("diff = " + returnedDiff);

            callback(null,returnedDiff)

  }, 25);
}; 


function trialCheckForExistingTrial(playerName,trialName, callback){

  setTimeout( function(){

    var checkfortrialquery = "SELECT playerTrialRankID, playerRank, playerScore FROM playertrialrank where playerName = '" + playerName + "' and trialName = '" + trialName + "'";
    connection.query(checkfortrialquery, function (error, results) {
        if (error) throw error;
        callback(null,results)

      });


}, 100);

}

function getAllPlayerIDPlayerName(callback)
{
  setTimeout( function(){

    var getquery = "SELECT playerID, playerName from playerList WHERE activeStatus = 'ACTIVE'";
    connection.query(getquery, function (error, results) {
        if (error) throw error;
        callback(null,results)

      });


}, 100);
}

function playerUpdateName(playerName, callback){

  setTimeout( function(){

    if (playerName.includes("''"))
    {
      //var spot = returnedName.indexOf("'");
      playerName = playerName.replace("''","'");
      console.log("NEW NAME IS " + playerName);
      callback(null,playerName);

    }
    else
    {
      callback(null,playerName);

    }

}, 50);

}

function checkForExistingPlayer(playerName, callback){

  setTimeout( function(){

    var checkforplayerquery = "SELECT playerID,playerName,playerRank FROM playerList where playerName = '" + playerName + "'";
    connection.query(checkforplayerquery, function (error, results) {
        if (error) throw error;
        callback(null,results)

      });


}, 100);

}

function getranks(trialname, playerName, callback){

  setTimeout( function(){

    var checkrankquery = "SELECT playerName, playerScore from playertrialrank WHERE trialName = '"+trialname+"' order by playerScore DESC";
    var theRank = 0;
    connection.query(checkrankquery, function (error, results) {
        if (error) throw error;
        console.log(results);
        for (var i = 0; i < results.length;++i)
        {
            if (results[i].playerName == playerName)
            {
              theRank = i + 1;  
            }
        }
        callback(null,theRank)

      });


}, 100);

}

function getranksevent(trialname, playerName, playerRank, callback){

  setTimeout( function(){

    var checkrankquery = "SELECT playerName, playerScore from playertrialrank WHERE trialName = '"+trialname+"' AND playerRank = '"+ playerRank +"' order by playerScore DESC";
    var theRank = 0;
    connection.query(checkrankquery, function (error, results) {
        if (error) throw error;
        console.log(results);
        for (var i = 0; i < results.length;++i)
        {
            if (results[i].playerName == playerName)
            {
              theRank = i + 1;  
            }
        }
        callback(null,theRank)

      });


}, 100);

}


function updatePlayerRecord(playerName, playerRank, playerRival, playerTwitter,callback){

  setTimeout( function(){

    var updateplayerquery = "UPDATE playerList set playerRank='" + playerRank + "', playerRivalCode='"+playerRival+"', twitterHandle='"+ playerTwitter + "', playerDateEarned=now() where playerName = '" + playerName +"'";
    connection.query(updateplayerquery, function (error, results) {
        if (error) throw error;
        callback(null,results)

      });


}, 250);

}

function insertNewPlayerRecord(playerName, playerRank, playerRival, playerTwitter,callback){

  setTimeout( function(){

    var insertplayerquery = "INSERT INTO playerList (playerName, playerRank, playerRivalCode, twitterHandle, playerDateEarned) VALUES ('" + playerName + "','" + playerRank + "','" + playerRival + "','"+playerTwitter+"', now())";
    connection.query(insertplayerquery, function (error, results) {
        if (error) throw error;
        callback(null,results)

      });


}, 250);

}

function insertNewTrialRecord(playerName,playerRivalCode,trialName,playerRank,playerScore,playerDiff,playerTwitterHandle, callback){

  setTimeout( function(){

    var insertquery = "INSERT INTO playertrialrank (playerName, playerRivalCode, trialName, playerRank, playerScore, playerDiff, playerTwitterHandle, playerUpdateDate) VALUES ('"+playerName+"','"+playerRivalCode+"','"+trialName+"','"+playerRank+"','"+playerScore+"','"+playerDiff+"','"+playerTwitterHandle+"',now())";
    connection.query(insertquery, function (error, results) {
        if (error) throw error;
        callback(null,results)

      });


}, 250);

}

function updateTrialRecord(trialrecordID,playerName,playerRivalCode,playerRank,playerScore,playerDiff,playerTwitterHandle, callback){

  setTimeout( function(){

    var updatequery = "UPDATE playertrialrank set playerName = '"+playerName+"', playerRivalCode='"+playerRivalCode+"',playerRank='"+playerRank+"',playerScore="+playerScore+",playerDiff='"+playerDiff+"',playerTwitterHandle='"+playerTwitterHandle+"' where playerTrialRankID = " +trialrecordID;
    connection.query(updatequery, function (error, results) {
        if (error) throw error;
        callback(null,results)

      });


}, 250);

}

function insertNewTrialAuditRecord(playerTrialID,playerRank,playerScore,playerDiff,callback)
{
  setTimeout( function(){

    var insertquery = "INSERT INTO playertrialrankhistory (playerTrialRankID, playerRank, playerScore, playerDiff, playerUpdateDate) VALUES ('"+playerTrialID+"','"+playerRank+"','"+playerScore+"','"+playerDiff+"',now())";
    connection.query(insertquery, function (error, results) {
        if (error) throw error;
        callback(null,results)

      });


}, 250);

}

function insertNewPlayerAuditRecord(playerID,playerRank,callback)
{
  setTimeout( function(){

    var insertquery = "INSERT INTO playerHistory (playerID,playerRank,playerUpdate) VALUES ("+playerID+",'"+playerRank+"',now())";
    connection.query(insertquery, function (error, results) {
        if (error) throw error;
        callback(null,results)

      });


}, 250);

}


var getTwitterTrialImageURL = function(trial,rank)
{
  var twitterImageURL = "";

  //HEARTBREAK(12)
  if (rank == "Silver" && trial == "HEARTBREAK (12)")
  {
    twitterImageURL = './trial_images/HEARTBREAK/heartbreak_silver.png';
  }
  else if (rank == "Gold" && trial == "HEARTBREAK (12)")
  {
    twitterImageURL = './trial_images/HEARTBREAK/heartbreak_gold.png';
  }
  else if (rank == "Diamond" && trial == "HEARTBREAK (12)")
  {
    twitterImageURL = './trial_images/HEARTBREAK/heartbreak_diamond.png';
  }
  else if (rank == "Cobalt" && trial == "HEARTBREAK (12)")
  {
    twitterImageURL = './trial_images/HEARTBREAK/heartbreak_cobalt.png';
  }
  else if (rank == "Amethyst" && trial == "HEARTBREAK (12)")
  {
    twitterImageURL = './trial_images/HEARTBREAK/heartbreak_amethyst.png';
  }
  else if (rank == "Emerald" && trial == "HEARTBREAK (12)")
  {
    twitterImageURL = './trial_images/HEARTBREAK/heartbreak_emerald.png';
  }

//CELESTIAL(13)
else if (rank == "Silver" && trial == "CELESTIAL (13)")
{
  twitterImageURL = './trial_images/CELESTIAL/celestial_silver.png';
}
else if (rank == "Gold" && trial == "CELESTIAL (13)")
{
  twitterImageURL = './trial_images/CELESTIAL/celestial_gold.png';
}
else if (rank == "Diamond" && trial == "CELESTIAL (13)")
{
  twitterImageURL = './trial_images/CELESTIAL/celestial_diamond.png';
}
else if (rank == "Cobalt" && trial == "CELESTIAL (13)")
{
  twitterImageURL = './trial_images/CELESTIAL/celestial_cobalt.png';
}
else if (rank == "Amethyst" && trial == "CELESTIAL (13)")
{
  twitterImageURL = './trial_images/CELESTIAL/celestial_amethyst.png';
}
else if (rank == "Emerald" && trial == "CELESTIAL (13)")
{
  twitterImageURL = './trial_images/CELESTIAL/CELESTIAL_EMERALD.png';
}

//DAYBREAK(14)
else if (rank == "Silver" && trial == "DAYBREAK (14)")
{
  twitterImageURL = './trial_images/DAYBREAK/daybreak_silver.png';
}
else if (rank == "Gold" && trial == "DAYBREAK (14)")
{
  twitterImageURL = './trial_images/DAYBREAK/daybreak_gold.png';
}
else if (rank == "Diamond" && trial == "DAYBREAK (14)")
{
  twitterImageURL = './trial_images/DAYBREAK/daybreak_diamond.png';
}
else if (rank == "Cobalt" && trial == "DAYBREAK (14)")
{
  twitterImageURL = './trial_images/DAYBREAK/daybreak_cobalt.png';
}
else if (rank == "Amethyst" && trial == "DAYBREAK (14)")
{
  twitterImageURL = './trial_images/DAYBREAK/daybreak_amethyst.png';
}
else if (rank == "Emerald" && trial == "DAYBREAK (14)")
{
  twitterImageURL = './trial_images/DAYBREAK/daybreak_emerald.png';
}

//HELLSCAPE(15)
else if (rank == "Silver" && trial == "HELLSCAPE (15)")
{
  twitterImageURL = './trial_images/HELLSCAPE/hellscape_silver.png';
}
else if (rank == "Gold" && trial == "HELLSCAPE (15)")
{
  twitterImageURL = './trial_images/HELLSCAPE/hellscape_gold.png';
}
else if (rank == "Diamond" && trial == "HELLSCAPE (15)")
{
  twitterImageURL = './trial_images/HELLSCAPE/hellscape_diamond.png';
}
else if (rank == "Cobalt" && trial == "HELLSCAPE (15)")
{
  twitterImageURL = './trial_images/HELLSCAPE/hellscape_cobalt.png';
}
else if (rank == "Amethyst" && trial == "HELLSCAPE (15)")
{
  twitterImageURL = './trial_images/HELLSCAPE/hellscape_amethyst.png';
}
else if (rank == "Emerald" && trial == "HELLSCAPE (15)")
{
  twitterImageURL = './trial_images/HELLSCAPE/hellscape_emerald.png';
}

//CLOCKWORK(15)
else if (rank == "Silver" && trial == "CLOCKWORK (15)")
{
  twitterImageURL = './trial_images/CLOCKWORK/clockwork_silver.png';
}
else if (rank == "Gold" && trial == "CLOCKWORK (15)")
{
  twitterImageURL = './trial_images/CLOCKWORK/clockwork_gold.png';
}
else if (rank == "Diamond" && trial == "CLOCKWORK (15)")
{
  twitterImageURL = './trial_images/CLOCKWORK/clockwork_diamond.png';
}
else if (rank == "Cobalt" && trial == "CLOCKWORK (15)")
{
  twitterImageURL = './trial_images/CLOCKWORK/clockwork_cobalt.png';
}
else if (rank == "Amethyst" && trial == "CLOCKWORK (15)")
{
  twitterImageURL = './trial_images/CLOCKWORK/clockwork_amethyst.png';
}
else if (rank == "Emerald" && trial == "CLOCKWORK (15)")
{
  twitterImageURL = './trial_images/CLOCKWORK/clockwork_emerald.png';
}

//PHARAOH(15)
else if (rank == "Silver" && trial == "PHARAOH (15)")
{
  twitterImageURL = './trial_images/PHARAOH/pharaoh_silver.png';
}
else if (rank == "Gold" && trial == "PHARAOH (15)")
{
  twitterImageURL = './trial_images/PHARAOH/pharaoh_gold.png';
}
else if (rank == "Diamond" && trial == "PHARAOH (15)")
{
  twitterImageURL = './trial_images/PHARAOH/pharaoh_diamond.png';
}
else if (rank == "Cobalt" && trial == "PHARAOH (15)")
{
  twitterImageURL = './trial_images/PHARAOH/pharaoh_cobalt.png';
}
else if (rank == "Amethyst" && trial == "PHARAOH (15)")
{
  twitterImageURL = './trial_images/PHARAOH/pharaoh_amethyst.png';
}
else if (rank == "Emerald" && trial == "PHARAOH (15)")
{
  twitterImageURL = './trial_images/PHARAOH/pharaoh_emerald.png';
}

//PARADOX(16)
else if (rank == "Gold" && trial == "PARADOX (16)")
{
  twitterImageURL = './trial_images/PARADOX/paradox_gold.png';
}
else if (rank == "Diamond" && trial == "PARADOX (16)")
{
  twitterImageURL = './trial_images/PARADOX/paradox_diamond.png';
}
else if (rank == "Cobalt" && trial == "PARADOX (16)")
{
  twitterImageURL = './trial_images/PARADOX/paradox_cobalt.png';
}
else if (rank == "Amethyst" && trial == "PARADOX (16)")
{
  twitterImageURL = './trial_images/PARADOX/paradox_amethyst.png';
}
else if (rank == "Emerald" && trial == "PARADOX (16)")
{
  twitterImageURL = './trial_images/PARADOX/paradox_emerald.png';
}

//INHUMAN(16)
else if (rank == "Gold" && trial == "INHUMAN (16)")
{
  twitterImageURL = './trial_images/INHUMAN/inhuman_gold.png';
}
else if (rank == "Diamond" && trial == "INHUMAN (16)")
{
  twitterImageURL = './trial_images/INHUMAN/inhuman_diamond.png';
}
else if (rank == "Cobalt" && trial == "INHUMAN (16)")
{
  twitterImageURL = './trial_images/INHUMAN/inhuman_cobalt.png';
}
else if (rank == "Amethyst" && trial == "INHUMAN (16)")
{
  twitterImageURL = './trial_images/INHUMAN/inhuman_amethyst.png';
}
else if (rank == "Emerald" && trial == "INHUMAN (16)")
{
  twitterImageURL = './trial_images/INHUMAN/inhuman_emerald.png';
}

//CHEMICAL(17)
else if (rank == "Gold" && trial == "CHEMICAL (17)")
{
  twitterImageURL = './trial_images/CHEMICAL/chemical_gold.png';
}
else if (rank == "Diamond" && trial == "CHEMICAL (17)")
{
  twitterImageURL = './trial_images/CHEMICAL/chemical_diamond.png';
}
else if (rank == "Cobalt" && trial == "CHEMICAL (17)")
{
  twitterImageURL = './trial_images/CHEMICAL/chemical_cobalt.png';
}
else if (rank == "Amethyst" && trial == "CHEMICAL (17)")
{
  twitterImageURL = './trial_images/CHEMICAL/chemical_amethyst.png';
}
else if (rank == "Emerald" && trial == "CHEMICAL (17)")
{
  twitterImageURL = './trial_images/CHEMICAL/chemical_emerald_.png';
}

//ORIGIN(18)
else if (rank == "Diamond" && trial == "ORIGIN (18)")
{
  twitterImageURL = './trial_images/ORIGIN/origin_diamond.png';
}
else if (rank == "Cobalt" && trial == "ORIGIN (18)")
{
  twitterImageURL = './trial_images/ORIGIN/origin_cobalt.png';
}
else if (rank == "Amethyst" && trial == "ORIGIN (18)")
{
  twitterImageURL = './trial_images/ORIGIN/origin_amethyst.png';
}
else if (rank == "Emerald" && trial == "ORIGIN (18)")
{
  twitterImageURL = './trial_images/ORIGIN/origin_emerald.png';
}

//ASCENSION (17)
else if (rank == "Gold" && trial == "ASCENSION (17)")
{
  twitterImageURL = './trial_images/ASCENSION/ascension_gold.png';
}
else if (rank == "Diamond" && trial == "ASCENSION (17)")
{
  twitterImageURL = './trial_images/ASCENSION/ascension_diamond.png';
}
else if (rank == "Cobalt" && trial == "ASCENSION (17)")
{
  twitterImageURL = './trial_images/ASCENSION/ascension_cobalt.png';
}
else if (rank == "Amethyst" && trial == "ASCENSION (17)")
{
  twitterImageURL = './trial_images/ASCENSION/ascension_amethyst.png';
}
else if (rank == "Emerald" && trial == "ASCENSION (17)")
{
  twitterImageURL = './trial_images/ASCENSION/ascension_emerald.png';
}

//COUNTDOWN (14)
else if (rank == "Silver" && trial == "COUNTDOWN (14)")
{
  twitterImageURL = './trial_images/COUNTDOWN/countdown_silver.png';
}
else if (rank == "Gold" && trial == "COUNTDOWN (14)")
{
  twitterImageURL = './trial_images/COUNTDOWN/countdown_gold.png';
}
else if (rank == "Diamond" && trial == "COUNTDOWN (14)")
{
  twitterImageURL = './trial_images/COUNTDOWN/countdown_diamond.png';
}
else if (rank == "Cobalt" && trial == "COUNTDOWN (14)")
{
  twitterImageURL = './trial_images/COUNTDOWN/countdown_cobalt.png';
}
else if (rank == "Amethyst" && trial == "COUNTDOWN (14)")
{
  twitterImageURL = './trial_images/COUNTDOWN/countdown_amethyst.png';
}
else if (rank == "Emerald" && trial == "COUNTDOWN (14)")
{
  twitterImageURL = './trial_images/COUNTDOWN/countdown_emerald_1.png';
}

//HEATWAVE (15)
else if (rank == "Silver" && trial == "HEATWAVE (15)")
{
  twitterImageURL = './trial_images/HEATWAVE/heatwave_silver.png';
}
else if (rank == "Gold" && trial == "HEATWAVE (15)")
{
  twitterImageURL = './trial_images/HEATWAVE/heatwave_gold.png';
}
else if (rank == "Diamond" && trial == "HEATWAVE (15)")
{
  twitterImageURL = './trial_images/HEATWAVE/heatwave_diamond.png';
}
else if (rank == "Cobalt" && trial == "HEATWAVE (15)")
{
  twitterImageURL = './trial_images/HEATWAVE/heatwave_cobalt.png';
}
else if (rank == "Amethyst" && trial == "HEATWAVE (15)")
{
  twitterImageURL = './trial_images/HEATWAVE/heatwave_amethyst.png';
}
else if (rank == "Emerald" && trial == "HEATWAVE (15)")
{
  twitterImageURL = './trial_images/HEATWAVE/heatwave_emerald.png';
}

//MAINFRAME (13)
else if (rank == "Silver" && trial == "MAINFRAME (13)")
{
  twitterImageURL = './trial_images/MAINFRAME/mainframe_silver.png';
}
else if (rank == "Gold" && trial == "MAINFRAME (13)")
{
  twitterImageURL = './trial_images/MAINFRAME/mainframe_gold.png';
}
else if (rank == "Diamond" && trial == "MAINFRAME (13)")
{
  twitterImageURL = './trial_images/MAINFRAME/mainframe_diamond.png';
}
else if (rank == "Cobalt" && trial == "MAINFRAME (13)")
{
  twitterImageURL = './trial_images/MAINFRAME/mainframe_cobalt.png';
}
else if (rank == "Amethyst" && trial == "MAINFRAME (13)")
{
  twitterImageURL = './trial_images/MAINFRAME/mainframe_amethyst.png';
}
else if (rank == "Emerald" && trial == "MAINFRAME (13)")
{
  twitterImageURL = './trial_images/MAINFRAME/mainframe_emerald.png';
}

//SNOWDRIFT (16)
else if (rank == "Gold" && trial == "SNOWDRIFT (16)")
{
  twitterImageURL = './trial_images/SNOWDRIFT/snowdrift_gold.png';
}
else if (rank == "Diamond" && trial == "SNOWDRIFT (16)")
{
  twitterImageURL = './trial_images/SNOWDRIFT/snowdrift_diamond.png';
}
else if (rank == "Cobalt" && trial == "SNOWDRIFT (16)")
{
  twitterImageURL = './trial_images/SNOWDRIFT/snowdrift_cobalt.png';
}
else if (rank == "Amethyst" && trial == "SNOWDRIFT (16)")
{
  twitterImageURL = './trial_images/SNOWDRIFT/snowdrift_amethyst.png';
}
else if (rank == "Emerald" && trial == "SNOWDRIFT (16)")
{
  twitterImageURL = './trial_images/SNOWDRIFT/snowdrift_emerald.png';
}

//Primal (13)
else if (rank == "Silver" && trial == "PRIMAL (13)")
{
  twitterImageURL = './trial_images/PRIMAL/primal_silver.png';
}
else if (rank == "Gold" && trial == "PRIMAL (13)")
{
  twitterImageURL = './trial_images/PRIMAL/primal_gold.png';
}
else if (rank == "Diamond" && trial == "PRIMAL (13)")
{
  twitterImageURL = './trial_images/PRIMAL/primal_diamond.png';
}
else if (rank == "Cobalt" && trial == "PRIMAL (13)")
{
  twitterImageURL = './trial_images/PRIMAL/primal_cobalt.png';
}
else if (rank == "Amethyst" && trial == "PRIMAL (13)")
{
  twitterImageURL = './trial_images/PRIMAL/primal_amethyst.png';
}
else if (rank == "Emerald" && trial == "PRIMAL (13)")
{
  twitterImageURL = './trial_images/PRIMAL/primal_emerald.png';
}

//Wanderlust (15)
else if (rank == "Silver" && trial == "WANDERLUST (15)")
{
  twitterImageURL = './trial_images/WANDERLUST/wanderlust_silver.png';
}
else if (rank == "Gold" && trial == "WANDERLUST (15)")
{
  twitterImageURL = './trial_images/WANDERLUST/wanderlust_gold.png';
}
else if (rank == "Diamond" && trial == "WANDERLUST (15)")
{
  twitterImageURL = './trial_images/WANDERLUST/wanderlust_diamond.png';
}
else if (rank == "Cobalt" && trial == "WANDERLUST (15)")
{
  twitterImageURL = './trial_images/WANDERLUST/wanderlust_cobalt.png';
}
else if (rank == "Amethyst" && trial == "WANDERLUST (15)")
{
  twitterImageURL = './trial_images/WANDERLUST/wanderlust_amethyst.png';
}
else if (rank == "Emerald" && trial == "WANDERLUST (15)")
{
  twitterImageURL = './trial_images/WANDERLUST/wanderlust_emerald.png';
}

//CIRCADIA (16)
else if (rank == "Silver" && trial == "CIRCADIA (16)")
{
  twitterImageURL = './trial_images/CIRCADIA/circadia_silver.png';
}
else if (rank == "Gold" && trial == "CIRCADIA (16)")
{
  twitterImageURL = './trial_images/CIRCADIA/circadia_gold.png';
}
else if (rank == "Diamond" && trial == "CIRCADIA (16)")
{
  twitterImageURL = './trial_images/CIRCADIA/circadia_diamond.png';
}
else if (rank == "Cobalt" && trial == "CIRCADIA (16)")
{
  twitterImageURL = './trial_images/CIRCADIA/circadia_cobalt.png';
}
else if (rank == "Amethyst" && trial == "CIRCADIA (16)")
{
  twitterImageURL = './trial_images/CIRCADIA/circadia_amethyst.png';
}
else if (rank == "Emerald" && trial == "CIRCADIA (16)")
{
  twitterImageURL = './trial_images/CIRCADIA/circadia_emerald.png';
}

//QUANTUM (18)
else if (rank == "Gold" && trial == "QUANTUM (18)")
{
  twitterImageURL = './trial_images/QUANTUM/quantum_gold.png';
}
else if (rank == "Diamond" && trial == "QUANTUM (18)")
{
  twitterImageURL = './trial_images/QUANTUM/quantum_diamond.png';
}
else if (rank == "Cobalt" && trial == "QUANTUM (18)")
{
  twitterImageURL = './trial_images/QUANTUM/quantum_cobalt.png';
}
else if (rank == "Amethyst" && trial == "QUANTUM (18)")
{
  twitterImageURL = './trial_images/QUANTUM/quantum_amethyst.png';
}
else if (rank == "Emerald" && trial == "QUANTUM (18)")
{
  twitterImageURL = './trial_images/QUANTUM/quantum_emerald.png';
}

//SPECIES (13)
else if (rank == "Silver" && trial == "SPECIES (13)")
{
  twitterImageURL = './trial_images/SPECIES/species_silver.png';
}
else if (rank == "Gold" && trial == "SPECIES (13)")
{
  twitterImageURL = './trial_images/SPECIES/species_gold.png';
}
else if (rank == "Diamond" && trial == "SPECIES (13)")
{
  twitterImageURL = './trial_images/SPECIES/species_diamond.png';
}
else if (rank == "Cobalt" && trial == "SPECIES (13)")
{
  twitterImageURL = './trial_images/SPECIES/species_cobalt.png';
}
else if (rank == "Amethyst" && trial == "SPECIES (13)")
{
  twitterImageURL = './trial_images/SPECIES/species_amethyst.png';
}
else if (rank == "Emerald" && trial == "SPECIES (13)")
{
  twitterImageURL = './trial_images/SPECIES/species_emerald.png';
}

//TEMPEST (15)
else if (rank == "Silver" && trial == "TEMPEST (15)")
{
  twitterImageURL = './trial_images/TEMPEST/tempest_silver.png';
}
else if (rank == "Gold" && trial == "TEMPEST (15)")
{
  twitterImageURL = './trial_images/TEMPEST/tempest_gold.png';
}
else if (rank == "Diamond" && trial == "TEMPEST (15)")
{
  twitterImageURL = './trial_images/TEMPEST/tempest_diamond.png';
}
else if (rank == "Cobalt" && trial == "TEMPEST (15)")
{
  twitterImageURL = './trial_images/TEMPEST/tempest_cobalt.png';
}
else if (rank == "Amethyst" && trial == "TEMPEST (15)")
{
  twitterImageURL = './trial_images/TEMPEST/tempest_amethyst.png';
}
else if (rank == "Emerald" && trial == "TEMPEST (15)")
{
  twitterImageURL = './trial_images/TEMPEST/tempest_emerald.png';
}

//UPHEAVAL (14)
else if (rank == "Silver" && trial == "UPHEAVAL (14)")
{
  twitterImageURL = './trial_images/UPHEAVAL/upheaval_silver.png';
}
else if (rank == "Gold" && trial == "UPHEAVAL (14)")
{
  twitterImageURL = './trial_images/UPHEAVAL/upheaval_gold.png';
}
else if (rank == "Diamond" && trial == "UPHEAVAL (14)")
{
  twitterImageURL = './trial_images/UPHEAVAL/upheaval_diamond.png';
}
else if (rank == "Cobalt" && trial == "UPHEAVAL (14)")
{
  twitterImageURL = './trial_images/UPHEAVAL/upheaval_cobalt.png';
}
else if (rank == "Amethyst" && trial == "UPHEAVAL (14)")
{
  twitterImageURL = './trial_images/UPHEAVAL/upheaval_amethyst.png';
}
else if (rank == "Emerald" && trial == "UPHEAVAL (14)")
{
  twitterImageURL = './trial_images/UPHEAVAL/upheaval_emerald.png';
}


//DEVOTION (12)
else if (rank == "Silver" && trial == "DEVOTION (12)")
{
  twitterImageURL = './trial_images/DEVOTION/devotion_silver.png';
}
else if (rank == "Gold" && trial == "DEVOTION (12)")
{
  twitterImageURL = './trial_images/DEVOTION/devotion_gold.png';
}
else if (rank == "Diamond" && trial == "DEVOTION (12)")
{
  twitterImageURL = './trial_images/DEVOTION/devotion_diamond.png';
}
else if (rank == "Cobalt" && trial == "DEVOTION (12)")
{
  twitterImageURL = './trial_images/DEVOTION/devotion_cobalt.png';
}
else if (rank == "Amethyst" && trial == "DEVOTION (12)")
{
  twitterImageURL = './trial_images/DEVOTION/devotion_amethyst.png';
}
else if (rank == "Emerald" && trial == "DEVOTION (12)")
{
  twitterImageURL = './trial_images/DEVOTION/devotion_emerald.png';
}

//BELIEVE (12)
else if (rank == "Silver" && trial == "BELIEVE (12)")
{
  twitterImageURL = './trial_images/BELIEVE/believe_silver.png';
}
else if (rank == "Gold" && trial == "BELIEVE (12)")
{
  twitterImageURL = './trial_images/BELIEVE/believe_gold.png';
}
else if (rank == "Diamond" && trial == "BELIEVE (12)")
{
  twitterImageURL = './trial_images/BELIEVE/believe_diamond.png';
}
else if (rank == "Cobalt" && trial == "BELIEVE (12)")
{
  twitterImageURL = './trial_images/BELIEVE/believe_cobalt.png';
}
else if (rank == "Amethyst" && trial == "BELIEVE (12)")
{
  twitterImageURL = './trial_images/BELIEVE/believe_amethyst.png';
}
else if (rank == "Emerald" && trial == "BELIEVE (12)")
{
  twitterImageURL = './trial_images/BELIEVE/believe_emerald.png';
}

//PASSPORT (13)
else if (rank == "Silver" && trial == "PASSPORT (13)")
{
  twitterImageURL = './trial_images/PASSPORT/passport_silver.png';
}
else if (rank == "Gold" && trial == "PASSPORT (13)")
{
  twitterImageURL = './trial_images/PASSPORT/passport_gold.png';
}
else if (rank == "Diamond" && trial == "PASSPORT (13)")
{
  twitterImageURL = './trial_images/PASSPORT/passport_diamond.png';
}
else if (rank == "Cobalt" && trial == "PASSPORT (13)")
{
  twitterImageURL = './trial_images/PASSPORT/passport_cobalt.png';
}
else if (rank == "Amethyst" && trial == "PASSPORT (13)")
{
  twitterImageURL = './trial_images/PASSPORT/passport_amethyst.png';
}
else if (rank == "Emerald" && trial == "PASSPORT (13)")
{
  twitterImageURL = './trial_images/PASSPORT/passport_emerald.png';
}


//SPECTACLE (16)
else if (rank == "Gold" && trial == "SPECTACLE (16)")
{
  twitterImageURL = './trial_images/SPECTACLE/spectacle_gold.png';
}
else if (rank == "Diamond" && trial == "SPECTACLE (16)")
{
  twitterImageURL = './trial_images/SPECTACLE/spectacle_diamond.png';
}
else if (rank == "Cobalt" && trial == "SPECTACLE (16)")
{
  twitterImageURL = './trial_images/SPECTACLE/spectacle_cobalt.png';
}
else if (rank == "Amethyst" && trial == "SPECTACLE (16)")
{
  twitterImageURL = './trial_images/SPECTACLE/spectacle_amethyst.png';
}
else if (rank == "Emerald" && trial == "SPECTACLE (16)")
{
  twitterImageURL = './trial_images/SPECTACLE/spectacle_emerald.png';
}






//EVENTS!
//HALLOWED (13)
else if (rank == "Wood/Bronze/Silver" && trial == "HALLOWED (13)")
{
  twitterImageURL = './trial_images/HALLOWED/HALLOWED_SILVER_AND_BELOW.png';
}
else if (rank == "Gold" && trial == "HALLOWED (13)")
{
  twitterImageURL = './trial_images/HALLOWED/HALLOWED_GOLD.png';
}
else if (rank == "Diamond" && trial == "HALLOWED (13)")
{
  twitterImageURL = './trial_images/HALLOWED/HALLOWED_DIAMOND.png';
}
else if (rank == "Cobalt" && trial == "HALLOWED (13)")
{
  twitterImageURL = './trial_images/HALLOWED/HALLOWED_COBALT.png';
}
else if (rank == "Amethyst and Above" && trial == "HALLOWED (13)")
{
  twitterImageURL = './trial_images/HALLOWED/HALLOWED_AMETHYST_AND_ABOVE.png';
}




  return twitterImageURL;

}


function announceNewPlayerTrialTwitter(playerName, playerRank,playerScore,playerDiff,playerTwitterHandle,trialName, numberRank,callback)
{
  setTimeout( function(){

    var post = "";
    var isEvent = false;
    if (trialName == "HALLOWED (13)")
    {
        isEvent = true;
    }


    if (isEvent == true)
    {
        if (playerTwitterHandle != "" && playerTwitterHandle != "undefined")
        {
          post = "Player " + playerName + " (" + playerTwitterHandle + ") scored " + playerScore + " EX " + playerDiff + " on the Limited Edition Trial " + trialName + " for a " + playerRank + " division rank of #"+numberRank+"!";
        }
        else
        {
          post = "Player " + playerName + " scored " + playerScore + " EX " + playerDiff + " on the Limited Edition Trial " + trialName + " for a " + playerRank + " division rank of #"+numberRank+"!";
        }
    }
    else if (isEvent == false)
    {


        if (playerTwitterHandle != "" && playerTwitterHandle != "undefined")
        {
          post = "Player " + playerName + " (" + playerTwitterHandle + ") has earned the " + playerRank + " Trial Rank for " + trialName + " with " + playerScore + " EX " + playerDiff + " for a Trial Ranking of #"+numberRank+"!";
        }
        else
        {
          post = "Player " + playerName + " has earned the " + playerRank + " Trial Rank for " + trialName + " with " + playerScore + " EX " + playerDiff + " for a Trial Ranking of #"+numberRank+"!";
        }
    }


    var b64content = fs.readFileSync(getTwitterTrialImageURL(trialName,playerRank), { encoding: 'base64' })
                  
    // get the new image media on twitter!
    Twitter.post('media/upload', { media_data: b64content }, function (err, data, response) {
      var mediaIdStr = data.media_id_string
      var altText = "LIFE4 Trial rankup"
      var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
    
      Twitter.post('media/metadata/create', meta_params, function (err, data, response) {
        if (!err) {
          // post the tweet!
          var params = { status: post.toString(), media_ids: [mediaIdStr] }
    
          Twitter.post('statuses/update', params, function (err, data, response) {
            console.log(data)
          })
        }
      })
    });


    callback(null,"done");


}, 1000);

}


function announceUpdatePlayerTrialTwitter(playerName, playerRank,playerScore,playerDiff,playerTwitterHandle,trialName,numberRank,callback)
{
  setTimeout( function(){

    var post = "";
    var isEvent = false;
    if (trialName == "HALLOWED (13)")
    {
        isEvent = true;
    }
    
    if (isEvent == true)
    {
      if (playerTwitterHandle != "" && playerTwitterHandle != "undefined")
      {
        post = "Player " + playerName + " (" + playerTwitterHandle + ") scored " + playerScore + " EX " + playerDiff + " on the Limited Edition Trial " + trialName + " for a " + playerRank + " division rank of #"+numberRank+"!";
      }
      else
      {
        post = "Player " + playerName + " scored " + playerScore + " EX " + playerDiff + " on the Limited Edition Trial " + trialName + " for a " + playerRank + " division rank of #"+numberRank+"!";
      }
    }
    else if (isEvent == false)
    {
      if (playerTwitterHandle != "" && playerTwitterHandle != "undefined")
      {
        post = "Player " + playerName + " (" + playerTwitterHandle + ") has earned the " + playerRank + " Trial Rank for " + trialName + " with " + playerScore + " EX " + playerDiff + " for a Trial Ranking of #"+numberRank+"!";
      }
      else
      {
        post = "Player " + playerName + " has earned the " + playerRank + " Trial Rank for " + trialName + " with " + playerScore + " EX " + playerDiff + " for a Trial Ranking of #"+numberRank+"!";
      }
    }
    console.log(trialName + "||" + playerRank);
    var b64content = fs.readFileSync(getTwitterTrialImageURL(trialName,playerRank), { encoding: 'base64' })
                  
    // get the new image media on twitter!
    Twitter.post('media/upload', { media_data: b64content }, function (err, data, response) {
      var mediaIdStr = data.media_id_string
      var altText = "LIFE4 Trial rankup"
      var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
    
      Twitter.post('media/metadata/create', meta_params, function (err, data, response) {
        if (!err) {
          // post the tweet!
          var params = { status: post.toString(), media_ids: [mediaIdStr] }
    
          Twitter.post('statuses/update', params, function (err, data, response) {
            console.log(data)
          })
        }
      })
    });


    callback(null,"done");


}, 1000);

}

function announceNewPlayerTwitter(playerName, playerRank,playerTwitterHandle,callback)
{
  setTimeout( function(){

    var twitterpost ="";
    if (playerTwitterHandle != "" && playerTwitterHandle != "undefined")
    {
      twitterpost = "Player " + playerName + " (" + playerTwitterHandle + ") has joined LIFE4! Their current rank is " + playerRank + "!";
    }
    else
    {
      twitterpost = "Player " + playerName + " has joined LIFE4! Their current rank is " + playerRank + "!";
    }

    var b64content = fs.readFileSync(getTwitterImageURL(playerRank), { encoding: 'base64' })
                  
    // get the new image media on twitter!
    Twitter.post('media/upload', { media_data: b64content }, function (err, data, response) {
      var mediaIdStr = data.media_id_string
      var altText = "LIFE4 Player Rank"
      var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
    
      Twitter.post('media/metadata/create', meta_params, function (err, data, response) {
        if (!err) {
          // post the tweet!
          var params = { status: twitterpost.toString(), media_ids: [mediaIdStr] }
    
          Twitter.post('statuses/update', params, function (err, data, response) {
            console.log(data)
          })
        }
      })
    })


    callback(null,"done");


}, 1000);

}


function announcePlayerRankupTwitter(playerName, playerRank,playerTwitterHandle,callback)
{
  setTimeout( function(){

    var twitterpost ="";
    if (playerTwitterHandle != "" && playerTwitterHandle != "undefined")
    {
      twitterpost = "Player " + playerName + " (" + playerTwitterHandle + ") has earned a new rank! They are now " + playerRank +"! Congratulations! ";
    }
    else
    {
      twitterpost = "Player " + playerName + " has earned a new rank! They are now " + playerRank +"! Congratulations! ";
    }

    var b64content = fs.readFileSync(getTwitterImageURL(playerRank), { encoding: 'base64' })
                  
    // get the new image media on twitter!
    Twitter.post('media/upload', { media_data: b64content }, function (err, data, response) {
      var mediaIdStr = data.media_id_string
      var altText = "LIFE4 Player Rank"
      var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
    
      Twitter.post('media/metadata/create', meta_params, function (err, data, response) {
        if (!err) {
          // post the tweet!
          var params = { status: twitterpost.toString(), media_ids: [mediaIdStr] }
    
          Twitter.post('statuses/update', params, function (err, data, response) {
            console.log(data)
          })
        }
      })
    })


    callback(null,"done");


}, 1000);

}

function announcePlayerRankupDiscord(playerName, playerRank,callback)
{
  setTimeout( function(){

    var discordpost = "Player " + playerName + " has earned a new rank! They are now " + playerRank +"! Congratulations! "  + getDiscordIcon(playerRank);

    const channel = bot.channels.find('name', 'rankups')
    channel.send(discordpost)
    .then(message => console.log(discordpost))
    .catch(console.error);

    callback(null,"done");


}, 750);

}

function announceNewPlayerDiscord(playerName, playerRank,callback)
{
  setTimeout( function(){

    var discordpost = "Player " + playerName + " has joined LIFE4! Their current rank is " + playerRank + "! Welcome! " + getDiscordIcon(playerRank);

    const channel = bot.channels.find('name', 'rankups')
    channel.send(discordpost)
    .then(message => console.log(discordpost))
    .catch(console.error);

    callback(null,"done");


}, 750);

}


function announceNewPlayerTrialDiscord(playerName, playerRank,playerScore,playerDiff,trialName,numberRank,callback)
{
  setTimeout( function(){

    var isEvent=false;
    var discordpost = "";

    //if (trialName == "HALLOWED (13)")
    //{
    //    isEvent = true;
    //}

    //if (isEvent == true)
    //{
    //  discordpost = "Player " + playerName + " scored " + playerScore + " EX " + playerDiff + " on the Limited Edition Trial " + trialName + " for a " + playerRank + " " + getTrialDiscordIcon(playerRank) + " division rank of #"+numberRank+"!";
    //}
    //else if (isEvent == false)
    //{
      discordpost = "Player " + playerName + " has earned the " + playerRank + " " + getTrialDiscordIcon(playerRank) + " Trial Rank for " + trialName + " with " + playerScore + " EX " + playerDiff + " for a Trial Ranking of #"+numberRank+"!";
    //}

    
    const channel = bot.channels.find('name', 'trial-rankups')
    channel.send(discordpost)
    .then(message => console.log(discordpost))
    .catch(console.error);



    callback(null,"done");


}, 750);

}

function announceUpdatePlayerTrialDiscord(playerName, playerRank,playerScore,playerDiff,trialName, numberRank,callback)
{
  setTimeout( function(){

    //var isEvent=false;
    var discordpost = "";
    //if (trialName == "HALLOWED (13)")
    //{
    //    isEvent = true;
    //}

    //if (isEvent == true)
    //{
    //  discordpost = "Player " + playerName + " scored " + playerScore + " EX " + playerDiff + " on the Limited Edition Trial " + trialName + " for a " + playerRank + " " + getTrialDiscordIcon(playerRank) + " division rank of #"+numberRank+"!";
    //}
    //else if (isEvent == false)
    //{
      var discordpost = "Player " + playerName + " has earned the " + playerRank + " " + getTrialDiscordIcon(playerRank) + " Trial Rank for " + trialName + " with " + playerScore + " EX " + playerDiff + " for a Trial Ranking of #"+numberRank+"!";
    //}


    const channel = bot.channels.find('name', 'trial-rankups')
    channel.send(discordpost)
    .then(message => console.log(discordpost))
    .catch(console.error);



    callback(null,"done");


}, 750);

}

function LIFE4sequence()
{
  //connecting to DB
  connection = mysql.createConnection({
    host     : process.env.MYSQLHOST,
    user     : process.env.MYSQLUSER,
    password : process.env.MYSQLPW,
    database : process.env.MYSQLPLAYERDB
  });

  
  connection.connect();

  //old, readd if needed
  //var getTrialJSON = wait.for(getCredentials);
  //console.log("JSON Cred object retrieved!");
  //var getauth = wait.for(newauthorize,getTrialJSON);



  var getauth = wait.for(newauthorize);
  console.log("Authorization complete! Hot damn!");

  //GET BOT STATUS
  var botStatus = "ON";
  botStatus = wait.for(getBotStatus);
  botStatus = botStatus[0].varValue;

  if (botStatus =="OFF")
  {
    console.log("Bot is off! Nothing will run!");
  }
  else if (botStatus == "ERROR")
  {
    console.log("Bot is having issues! Bot will not run!");
  }
  else if (botStatus == "ON")
{
  console.log("Bot is on!");
  console.log("Checking queue for requests!");
  var queueResults = wait.for(getReadyFromQueue);

try
{

  if (queueResults.length)
  {
    console.log("Something exists in the queue!");

    //TODO: Add name check for ' for TRIALS
    //trial queue
    if (queueResults[0].updateCategory == "TRIAL")
    {
      console.log("Trial identified!");


      var trialInfo = wait.for(getTrialQueueInfo,queueResults[0].trialID);
        console.log("Trial #" + queueResults[0].trialID + "  retrieved!");

        var playerNumberRanking = wait.for(getranks, trialInfo[0].trialName,trialInfo[0].playerName);
        console.log("Ranking retrieved");

        if (queueResults[0].updateType == "NEW")
        {
          var twitterannounce = wait.for(announceNewPlayerTrialTwitter, trialInfo[0].playerName, trialInfo[0].playerRank,trialInfo[0].playerScore,trialInfo[0].playerDiff, trialInfo[0].playerTwitterHandle, trialInfo[0].trialName,playerNumberRanking);
          console.log("Twitter announcement complete!");
          var discordannounce = wait.for(announceNewPlayerTrialDiscord, trialInfo[0].playerName, trialInfo[0].playerRank,trialInfo[0].playerScore,trialInfo[0].playerDiff, trialInfo[0].trialName,playerNumberRanking);
          console.log("Discord announcement complete!");
        }
        else if (queueResults[0].updateType == "UPDATE")
        {
          var twitterannounce = wait.for(announceUpdatePlayerTrialTwitter, trialInfo[0].playerName, trialInfo[0].playerRank,trialInfo[0].playerScore,trialInfo[0].playerDiff, trialInfo[0].playerTwitterHandle, trialInfo[0].trialName,playerNumberRanking);
          console.log("Twitter announcement complete!");
          var discordannounce = wait.for(announceUpdatePlayerTrialDiscord, trialInfo[0].playerName, trialInfo[0].playerRank,trialInfo[0].playerScore,trialInfo[0].playerDiff, trialInfo[0].trialName,playerNumberRanking);
          console.log("Discord announcement complete!");

        }




    }
        //TODO: Add name check for ' for TRIAL EVENTS
    //trial event
    else if (queueResults[0].updateCategory == "TRIALEVENT")
    {
      console.log("Trial Event identified!");

      var trialInfo = wait.for(getTrialQueueInfo,queueResults[0].trialID);
        console.log("Trial #" + queueResults[0].trialID + "  retrieved!");

        var playerNumberRanking = wait.for(getranksevent, trialInfo[0].trialName,trialInfo[0].playerName,trialInfo[0].playerRank);
        console.log("Ranking retrieved");


        if (queueResults[0].updateType == "NEW")
        {
          var twitterannounce = wait.for(announceNewPlayerTrialTwitter, trialInfo[0].playerName, trialInfo[0].playerRank,trialInfo[0].playerScore,trialInfo[0].playerDiff, trialInfo[0].playerTwitterHandle, trialInfo[0].trialName,playerNumberRanking);
          console.log("Twitter announcement complete!");
          var discordannounce = wait.for(announceNewPlayerTrialDiscord, trialInfo[0].playerName, trialInfo[0].playerRank,trialInfo[0].playerScore,trialInfo[0].playerDiff, trialInfo[0].trialName,playerNumberRanking);
          console.log("Discord announcement complete!");
        }
        else if (queueResults[0].updateType == "UPDATE")
        {
          var twitterannounce = wait.for(announceUpdatePlayerTrialTwitter, trialInfo[0].playerName, trialInfo[0].playerRank,trialInfo[0].playerScore,trialInfo[0].playerDiff, trialInfo[0].playerTwitterHandle, trialInfo[0].trialName,playerNumberRanking);
          console.log("Twitter announcement complete!");
          var discordannounce = wait.for(announceUpdatePlayerTrialDiscord, trialInfo[0].playerName, trialInfo[0].playerRank,trialInfo[0].playerScore,trialInfo[0].playerDiff, trialInfo[0].trialName,playerNumberRanking);
          console.log("Discord announcement complete!");

        }
    }
    //player queue
    else if (queueResults[0].updateCategory == "PLAYER")
    {
        console.log("Player identified!");

        var playerInfo = wait.for(getPlayerQueueInfo,queueResults[0].playerID);
        var playerName = wait.for(playerUpdateName, playerInfo[0].playerName);

        console.log("Player " + playerName + " retrieved!");
        
        if (queueResults[0].updateType == "NEW")
        {
          var twitterannounce = wait.for(announceNewPlayerTwitter, playerName, playerInfo[0].playerRank, playerInfo[0].twitterHandle);
          console.log("Twitter announcement complete!");
          var discordannounce = wait.for(announceNewPlayerDiscord, playerName, playerInfo[0].playerRank);
          console.log("Discord announcement complete!");
        }
        else if (queueResults[0].updateType == "UPDATE")
        {
          var twitterannounce = wait.for(announcePlayerRankupTwitter, playerName, playerInfo[0].playerRank, playerInfo[0].twitterHandle);
          console.log("Twitter announcement complete!");
          var discordannounce = wait.for(announcePlayerRankupDiscord, playerName, playerInfo[0].playerRank);
          console.log("Discord announcement complete!");
        }
    } 

var queueDone = wait.for(setQueueItemToProcessed,queueResults[0].playerQueueID);


  }
  else
  {
    console.log("Queue is empty!");
  }

}
catch(error)
{
  console.log("ERROR!");


  const channel = bot.channels.find('name', 'admin-bot')
  channel.send("Uh oh! Something went wrong when posting an update! \n PlayerQueueID = "+queueResults[0].playerQueueID +"\n Logs: \n" + error)
  .then(message => console.log("Uh oh! Something went wrong when posting an update! \n PlayerQueueID = "+queueResults[0].playerQueueID +"\n Logs: \n" + error))
  .catch(console.error);

  var queueDone = wait.for(setQueueItemToError,queueResults[0].playerQueueID);

}

console.log("Queue updates are complete!");




//TODO: Add error catching for player retrieval
console.log("Player retrieval starting!");
var playerSpreadsheetList = wait.for(newGetPlayersFromSheets, getauth);
console.log("Player list retrieved!");


  if (playerSpreadsheetList.length)
  {
    playerSpreadsheetList.map((row) => {
      var playerName = wait.for(playerGetSpreadsheetRowNameValue,row);
      var playerRank = wait.for(playerGetSpreadsheetRowRankValue,row);
      var playerTwitter = wait.for(playerGetSpreadsheetRowTwitterValue,row);
      var playerRival = wait.for(playerGetSpreadsheetRowRivalValue,row);


      if ((playerName != null && playerName != undefined) &&
      (playerRank != null && playerRank != undefined))
    {
      //check for existing player
      var playerresults = wait.for(checkForExistingPlayer, playerName);



      //exists
      if (playerresults && playerresults.length)
      {
        console.log("Player "+playerName + " exists!");

        if (playerRank == playerresults[0].playerRank)
        {
          console.log("Same rank!");
        }
        else
        {
          console.log("New rank!");
          var updateplayerresults = wait.for(updatePlayerRecord, playerName,playerRank,playerRival,playerTwitter);
          console.log("Player updated!");
          var insertresults = wait.for(insertNewPlayerAuditRecord, playerresults[0].playerID, playerRank);
          console.log("Player Audit History complete!");
          var insertPlayerIntoQueue = wait.for(insertPlayerInQueue,playerName,"UPDATE",playerresults[0].playerID);
          console.log("Queue updated!");
        }

      }
      //does not exist!
      else
      {
        console.log("Player " + playerName + " does not exist!");
              //insert if new
        var playerinsert = wait.for(insertNewPlayerRecord,playerName,playerRank,playerRival,playerTwitter);
        console.log("Player " + playerName + " added!");
        //re-retrieve player
        playerresults = wait.for(checkForExistingPlayer, playerName);
        var insertresults = wait.for(insertNewPlayerAuditRecord, playerresults[0].playerID, playerRank);
        console.log("Player Audit History complete!");
        var insertPlayerIntoQueue = wait.for(insertPlayerInQueue,playerName,"NEW",playerresults[0].playerID);
        console.log("Queue updated!");

      }
    }
    });
  }
 

console.log("Players complete!");


//TODO: Add ' name check for TRIALS
console.log("Trials starting!");

var listOfTrials = [
  
  "HEARTBREAK (12)",
  "CELESTIAL (13)",
  "DAYBREAK (14)",
  "HELLSCAPE (15)",
  "CLOCKWORK (15)",
  "PHARAOH (15)",
  "PARADOX (16)",
  "INHUMAN (16)",
  "CHEMICAL (17)",
  "ORIGIN (18)",
  "MAINFRAME (13)",
  "COUNTDOWN (14)",
  "HEATWAVE (15)",
  "SNOWDRIFT (16)",
  "ASCENSION (17)",
  "PRIMAL (13)",
  "WANDERLUST (15)",
  "SPECIES (13)",
  "UPHEAVAL (14)",
  "TEMPEST (15)",
  "CIRCADIA (16)",
  "QUANTUM (18)",
  "DEVOTION (12)",
  "BELIEVE (12)",
  "PASSPORT (13)",
  "SPECTACLE (16)"
];

var trialRanges = [
  
  'HEARTBREAK (12)!B2:F',
  'CELESTIAL (13)!B2:F',
  'DAYBREAK (14)!B2:F',
  'HELLSCAPE (14)!B2:F',
  'CLOCKWORK (15)!B2:F',
  'PHARAOH (15)!B2:F',
  'PARADOX (16)!B2:F',
  'INHUMAN (16)!B2:F',
  'CHEMICAL (17)!B2:F',
  'ORIGIN (18)!B2:F',
  "MAINFRAME (13)!B2:F",
  "COUNTDOWN (14)!B2:F",
  "HEATWAVE (15)!B2:F",
  "SNOWDRIFT (16)!B2:F",
  "ASCENSION (17)!B2:F",
  "PRIMAL (13)!B2:F",
  "WANDERLUST (15)!B2:F",
  "SPECIES (13)!B2:F",
  "UPHEAVAL (14)!B2:F",
  "TEMPEST (15)!B2:F",
  "CIRCADIA (16)!B2:F",
  "QUANTUM (18)!B2:F",
  "DEVOTION (12)!B2:F",
  "BELIEVE (12)!B2:F",
  "PASSPORT (13)!B2:F",
  "SPECTACLE (16)!B2:F"
];

var trialSpreadsheetID = [
  
  '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
];

/*
var trialRanges = [
  
  'ALL TRIALS!A2:E',
  'ALL TRIALS!F2:J',
  'ALL TRIALS!K2:O',
  'ALL TRIALS!P2:T',
  'ALL TRIALS!U2:Y',
  'ALL TRIALS!Z2:AD',
  'ALL TRIALS!AE2:AI',
  'ALL TRIALS!AJ2:AN',
  'ALL TRIALS!AO2:AS',
  'ALL TRIALS!AT2:AX',
  "ALL TRIALS!AY2:BC",
  "ALL TRIALS!BD2:BH",
  "ALL TRIALS!BI2:BM",
  "ALL TRIALS!BN2:BR",
  "ALL TRIALS!BS2:BW",
  "Sheet1!A2:E",
  "Sheet1!F2:J",
  "Sheet1!K2:Q",
  "Sheet1!P2:T",
  "Sheet1!U2:Y",
  "Sheet1!Z2:AD",
  "Sheet1!AE2:AI",
  "Sheet1!AJ2:AN",
  "Sheet1!AO2:AS",
  "Sheet1!AT2:AX",
  "Sheet1!AY2:BC"
];

var trialSpreadsheetID = [
  
  '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1BBJdSJJDMPFKAFMPwVyyh7o7M4kvs-BMikzt8xmSghs",
  "1BBJdSJJDMPFKAFMPwVyyh7o7M4kvs-BMikzt8xmSghs",
  "1BBJdSJJDMPFKAFMPwVyyh7o7M4kvs-BMikzt8xmSghs",
  "1BBJdSJJDMPFKAFMPwVyyh7o7M4kvs-BMikzt8xmSghs",
  "1BBJdSJJDMPFKAFMPwVyyh7o7M4kvs-BMikzt8xmSghs",
  "1BBJdSJJDMPFKAFMPwVyyh7o7M4kvs-BMikzt8xmSghs",
  "1BBJdSJJDMPFKAFMPwVyyh7o7M4kvs-BMikzt8xmSghs",
  "1BBJdSJJDMPFKAFMPwVyyh7o7M4kvs-BMikzt8xmSghs",
  "1BBJdSJJDMPFKAFMPwVyyh7o7M4kvs-BMikzt8xmSghs",
  "1BBJdSJJDMPFKAFMPwVyyh7o7M4kvs-BMikzt8xmSghs",
  "1BBJdSJJDMPFKAFMPwVyyh7o7M4kvs-BMikzt8xmSghs",
];
*/

  for (var i = 0; i < listOfTrials.length;i++)
  {
  console.log("Beginning " + listOfTrials[i]);

  //get the list of players
  var trialPlayerList = wait.for(newGetTrials, getauth, trialRanges[i],trialSpreadsheetID[i]);


  console.log(listOfTrials[i] +" LIST RETRIEVED!");
  //for each player
  if (trialPlayerList && trialPlayerList.length)
  {
    console.log("Retrieving " + listOfTrials[i] + " player info...");
    trialPlayerList.map((row) => {
      var playerName = wait.for(trialGetSpreadsheetRowNameValue,row);
      var playerRank = wait.for(trialGetSpreadsheetRowRankValue,row);
      var playerScore = wait.for(trialGetSpreadsheetRowScoreValue,row);
      var playerDiff = wait.for(trialGetSpreadsheetRowDiffValue,row);
      var playerTwitter = wait.for(trialGetSpreadsheetRowTwitterHandleValue,row);
      var playerRival = wait.for(trialGetSpreadsheetRowRivalCodeValue,row);


      if ((playerName != "" && playerName != undefined) &&
          (playerRank != "" && playerRank != undefined) &&
          (playerScore != "" && playerScore != undefined) )
      {
        
          //check for player in trials DB
          var trialresults = wait.for(trialCheckForExistingTrial, playerName, listOfTrials[i]);
          if (trialresults && trialresults.length)
          {
            console.log("Player " + playerName + " exists! Check for update!");
            if (playerScore == trialresults[0].playerScore &&
              playerRank == trialresults[0].playerRank)
            {
              console.log("Player has same score!");
            }
            else
            {
              console.log("Player score update!");
              var updateresults = wait.for(updateTrialRecord, trialresults[0].playerTrialRankID, playerName, playerRival,playerRank, playerScore, playerDiff,playerTwitter);
              console.log("Player trial insert complete!");
              trialresults = wait.for(trialCheckForExistingTrial, playerName, listOfTrials[i]);
              insertresults = wait.for(insertNewTrialAuditRecord, trialresults[0].playerTrialRankID,playerRank, playerScore, playerDiff);
              console.log("Audit update complete!");
              var inserttrial = wait.for(insertTrialInQueue,playerName,"UPDATE",trialresults[0].playerTrialRankID);
              console.log("Queue updated!");


            }
          }
          else
          {
            console.log("Player does not exist! Inserting new record!");
            var insertresults = wait.for(insertNewTrialRecord, playerName, playerRival, listOfTrials[i],playerRank, playerScore, playerDiff,playerTwitter);
            trialresults = wait.for(trialCheckForExistingTrial, playerName, listOfTrials[i]);
            console.log("Insert complete! Preparing audit update");
            insertresults = wait.for(insertNewTrialAuditRecord, trialresults[0].playerTrialRankID,playerRank, playerScore, playerDiff);
            console.log("Insert complete!");
            //var playerNumberRanking = wait.for(getranks, listOfTrials[i],playerName);
            //console.log("Numerical rank retrieved!");
            var inserttrial = wait.for(insertTrialInQueue,playerName,"NEW",trialresults[0].playerTrialRankID);
            console.log("Queue updated!");

          }
      }

    });
  }

  console.log(listOfTrials[i] + " complete!");

}

console.log("Trials are complete!");


console.log("Begin limited trials!");

var nameOfLimitedTrial = "HALLOWED (13)";

var rankList = [
  "Wood/Bronze/Silver",
  "Gold",
  "Diamond",
  "Cobalt",
  "Amethyst and Above"
];

var trialRanges = [
  
  'HAL Silver!A2:F',
  'HAL Gold!A2:F',
  'HAL Diamond!A2:F',
  'HAL Cobalt!A2:F',
  'HAL Amethyst!A2:F'
];

var trialSpreadsheetID = '1Qj6wJRZCDs2DY8wVw2JPjCgdCzqmtLVkJJV0dL8d12c';

console.log(nameOfLimitedTrial +" TIME!");

for (var i = 0; i < rankList.length;i++)
{
 console.log("Beginning " + rankList[i]);
  var trialSpecialPlayerList = wait.for(newGetLimitedTrials, getauth, trialRanges[i],trialSpreadsheetID);

  //for each player
  if (trialSpecialPlayerList && trialSpecialPlayerList.length)
  {

    console.log("Retrieving " + trialSpecialPlayerList[i] + " player info...");
    trialSpecialPlayerList.map((row) => {

      var playerName = wait.for(trialEventGetSpreadsheetRowNameValue,row);
      var playerRank = rankList[i];
      var playerScore = wait.for(trialEventGetSpreadsheetRowScoreValue,row);
      var playerDiff = wait.for(trialEventGetSpreadsheetRowDiffValue,row);
      var playerTwitter = wait.for(trialEventGetSpreadsheetRowTwitterHandleValue,row);
      var playerRival = wait.for(trialEventGetSpreadsheetRowRivalCodeValue,row);

      if ((playerName != "" && playerName != undefined) &&
      (playerRank != "" && playerRank != undefined) &&
      (playerScore != "" && playerScore != undefined) )
      {   
    
        //check for player in trials DB
        var trialresults = wait.for(trialCheckForExistingTrial, playerName, nameOfLimitedTrial);
        if (trialresults && trialresults.length)
        {
          console.log("Player " + playerName + " exists! Check for update!");
          if (playerScore == trialresults[0].playerScore)
          {
            console.log("Player has same score!");
          }
          else
          {
            console.log("Player score update!");
            var updateresults = wait.for(updateTrialRecord, trialresults[0].playerTrialRankID, playerName, playerRival,playerRank, playerScore, playerDiff,playerTwitter);
            console.log("Player trial insert complete!");
            trialresults = wait.for(trialCheckForExistingTrial, playerName, nameOfLimitedTrial);
            insertresults = wait.for(insertNewTrialAuditRecord, trialresults[0].playerTrialRankID,playerRank, playerScore, playerDiff);
            console.log("Audit update complete!");
            var inserttrial = wait.for(insertTrialEventInQueue,playerName,"UPDATE",trialresults[0].playerTrialRankID);
            console.log("Queue updated!");

          }
        }
        else
        {
          console.log("Player does not exist! Inserting new record!");
          var insertresults = wait.for(insertNewTrialRecord, playerName, playerRival, nameOfLimitedTrial,playerRank, playerScore, playerDiff,playerTwitter);
          trialresults = wait.for(trialCheckForExistingTrial, playerName, nameOfLimitedTrial);
          console.log("Insert complete! Preparing audit update");
          insertresults = wait.for(insertNewTrialAuditRecord, trialresults[0].playerTrialRankID,playerRank, playerScore, playerDiff);
          console.log("Insert complete!");
          var inserttrial = wait.for(insertTrialEventInQueue,playerName,"NEW",trialresults[0].playerTrialRankID);
          console.log("Queue updated!");

        }
      }







    });
  }

}


console.log("Ending limited trials!");

console.log("LIFE4 bot update complete!");
}
connection.end();
}

//function newauthorize(credentials, callback) {
  function newauthorize(callback) {

  //const {client_secret, client_id, redirect_uris} = credentials.installed;
  
  const client_secret = process.env.G_CLIENT_SECRET;
  const client_id = process.env.G_CLIENT_ID;
  const redirect_uris = process.env.G_REDIRECT;
  
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);   

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(null,oAuth2Client);
  });


};


//authorize the app
function authorize(credentials, callback) {

  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });


};

//get google token
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function newGetPlayersFromSheets(auth,callback)
{
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1FPiO1h9XDSeTB6tWmRi7ursSqFOBYitiVweu3eOQ8tg',
    range: 'User List!A2:E',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    callback(null,rows);
  });
}

function newGetTrials(auth,trialRange, spreadsheetID,callback)
{

  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetID,
    range: trialRange,
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    callback(null,rows);
  });
}

function newGetLimitedTrials(auth,trialRange, spreadsheetID,callback)
{

  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetID,
    range: trialRange,
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    callback(null,rows);
  });
}


wait.launchFiber(LIFE4sequence);
