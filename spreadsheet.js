//Life4DDRBot
//Created by Steve Sefchick
//Program curated by the LIFE4 Admin Team
//2019 - 2021
//Tweets to @Life4DDRBot
//built using NodeJS

//TODO: Update spreadsheet columns based on new ranks
//TODO: Update actual spreadsheet source for Wood-->Copper

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
    twitterImageURL = './rankup_images/Gold I.webp';
  }
  else if (rank == "Gold II" || rank ==  "Gold II (P)")
  {
    twitterImageURL = './rankup_images/Gold II.webp';
  }
  else if (rank == "Gold III" || rank ==  "Gold III (P)")
  {
    twitterImageURL = './rankup_images/Gold III.webp';
  }
  else if (rank == "Gold IV" || rank ==  "Gold IV (P)")
  {
    twitterImageURL = './rankup_images/Gold IV.webp';
  }
  else if (rank == "Gold V" || rank ==  "Gold V (P)")
  {
    twitterImageURL = './rankup_images/Gold V.webp';
  }
  else if (rank == "Silver I" || rank == "Silver I (P)")
  {
    twitterImageURL = './rankup_images/Silver I.webp';
  }
  else if (rank == "Silver II"  || rank ==  "Silver II (P)")
  {
    twitterImageURL = './rankup_images/Silver II.webp';
  }
  else if (rank == "Silver III"  || rank ==  "Silver III (P)")
  {
    twitterImageURL = './rankup_images/Silver III.webp';
  }
  else if (rank == "Silver IV"  || rank ==  "Silver IV (P)")
  {
    twitterImageURL = './rankup_images/Silver IV.webp';
  }
  else if (rank == "Silver V"  || rank ==  "Silver V (P)")
  {
    twitterImageURL = './rankup_images/Silver V.webp';
  }
  else if (rank == "Bronze I"  || rank ==  "Bronze I (P)")
  {
    twitterImageURL = './rankup_images/Bronze I.webp';
  }
  else if (rank == "Bronze II"  || rank ==  "Bronze II (P)")
  {
    twitterImageURL = './rankup_images/Bronze II.webp';
  }
  else if (rank == "Bronze III"  || rank ==  "Bronze III (P)")
  {
    twitterImageURL = './rankup_images/Bronze III.webp';
  }
  else if (rank == "Bronze IV"  || rank ==  "Bronze IV (P)")
  {
    twitterImageURL = './rankup_images/Bronze IV.webp';
  }
  else if (rank == "Bronze V"  || rank ==  "Bronze V (P)")
  {
    twitterImageURL = './rankup_images/Bronze V.webp';
  }
  else if (rank == "Diamond I")
  {
    twitterImageURL = './rankup_images/Diamond I.webp';
  }
  else if (rank == "Diamond II")
  {
    twitterImageURL = './rankup_images/Diamond II.webp';
  }
  else if (rank == "Diamond III")
  {
    twitterImageURL = './rankup_images/Diamond III.webp';
  }
  else if (rank == "Diamond IV")
  {
    twitterImageURL = './rankup_images/Diamond IV.webp';
  }
  else if (rank == "Diamond V")
  {
    twitterImageURL = './rankup_images/Diamond V.webp';
  }
  else if (rank == "Cobalt I")
  {
    twitterImageURL = './rankup_images/Cobalt I.webp';
  }
  else if (rank == "Cobalt II")
  {
    twitterImageURL = './rankup_images/Cobalt II.webp';
  }
  else if (rank == "Cobalt III")
  {
    twitterImageURL = './rankup_images/Cobalt III.webp';
  }
  else if (rank == "Cobalt IV")
  {
    twitterImageURL = './rankup_images/Cobalt IV.webp';
  }
  else if (rank == "Cobalt V")
  {
    twitterImageURL = './rankup_images/Cobalt V.webp';
  }
  else if (rank == "Copper I" || rank ==  "Copper I (P)")
  {
    twitterImageURL = './rankup_images/Copper I.webp';
  }
  else if (rank == "Copper II" || rank ==  "Copper II (P)")
  {
    twitterImageURL = './rankup_images/Copper II.webp';
  }
  else if (rank == "Copper III" || rank ==  "Copper III (P)")
  {
    twitterImageURL = './rankup_images/Copper III.webp';
  }
  else if (rank == "Copper IV" || rank ==  "Copper IV (P)")
  {
    twitterImageURL = './rankup_images/Copper IV.webp';
  }
  else if (rank == "Copper V" || rank ==  "Copper V (P)")
  {
    twitterImageURL = './rankup_images/Copper V.webp';
  }
  else if (rank == "Amethyst I")
  {
    twitterImageURL = './rankup_images/Amethyst I.webp';
  }
  else if (rank == "Amethyst II")
  {
    twitterImageURL = './rankup_images/Amethyst II.webp';
  }
  else if (rank == "Amethyst III")
  {
    twitterImageURL = './rankup_images/Amethyst III.webp';
  }
  else if (rank == "Amethyst IV")
  {
    twitterImageURL = './rankup_images/Amethyst IV.webp';
  }
  else if (rank == "Amethyst V")
  {
    twitterImageURL = './rankup_images/Amethyst V.webp';
  }
  else if (rank == "Emerald I")
  {
    twitterImageURL = './rankup_images/Emerald I.webp';
  }
  else if (rank == "Emerald II")
  {
    twitterImageURL = './rankup_images/Emerald II.webp';
  }
  else if (rank == "Emerald III")
  {
    twitterImageURL = './rankup_images/Emerald III.webp';
  }
  else if (rank == "Emerald IV")
  {
    twitterImageURL = './rankup_images/Emerald IV.webp';
  }
  else if (rank == "Emerald V")
  {
    twitterImageURL = './rankup_images/Emerald V.webp';
  }
  else if (rank == "Platinum I")
  {
    twitterImageURL = './rankup_images/Platinum I.webp';
  }
  else if (rank == "Platinum II")
  {
    twitterImageURL = './rankup_images/Platinum II.webp';
  }
  else if (rank == "Platinum III")
  {
    twitterImageURL = './rankup_images/Platinum III.webp';
  }
  else if (rank == "Platinum IV")
  {
    twitterImageURL = './rankup_images/Platinum IV.webp';
  }
  else if (rank == "Platinum V")
  {
    twitterImageURL = './rankup_images/Platinum V.webp';
  }
  else if (rank == "Onyx I")
  {
    twitterImageURL = './rankup_images/Onyx I.webp';
  }
  else if (rank == "Onyx II")
  {
    twitterImageURL = './rankup_images/Onyx II.webp';
  }
  else if (rank == "Onyx III")
  {
    twitterImageURL = './rankup_images/Onyx III.webp';
  }
  else if (rank == "Onyx IV")
  {
    twitterImageURL = './rankup_images/Onyx IV.webp';
  }
  else if (rank == "Onyx V")
  {
    twitterImageURL = './rankup_images/Onyx V.webp';
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
  else if (rank == "Gold IV" || rank ==  "Gold IV (P)")
  {
    discordemoji = "<:g4:825469563965407283>";
  }
  else if (rank == "Gold V" || rank ==  "Gold V (P)")
  {
    discordemoji = "<:g5:825469581481082940>";
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
  else if (rank == "Silver IV"  || rank ==  "Silver IV (P)")
  {
    discordemoji = "<:s4:825469523855540274>";
  }
  else if (rank == "Silver V"  || rank ==  "Silver V (P)")
  {
    discordemoji = "<:s5:825469538685419550>";
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
  else if (rank == "Bronze IV"  || rank ==  "Bronze IV (P)")
  {
    discordemoji = "<:b4:825469480623931482>";
  }
  else if (rank == "Bronze V"  || rank ==  "Bronze V (P)")
  {
    discordemoji = "<:b5:825469496742903828>";
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
  else if (rank == "Diamond IV")
  {
    discordemoji = "<:d4:825469702008340550>";
  }
  else if (rank == "Diamond V")
  {
    discordemoji = "<:d5:825469716003815465>";
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
  else if (rank == "Cobalt IV")
  {
    discordemoji = "<:c4:825469738154852362>";
  }
  else if (rank == "Cobalt V")
  {
    discordemoji = "<:c5:825469750825189427>";
  }
  else if (rank == "Copper I" || rank ==  "Copper I (P)")
  {
    discordemoji = "<:cp1:540808051284901898>";
  }
  else if (rank == "Copper II" || rank ==  "Copper II (P)")
  {
    discordemoji = "<:cp2:540808115994492948>";
  }
  else if (rank == "Copper III" || rank ==  "Copper III (P)")
  {
    discordemoji = "<:cp3:540808178108203018>";
  }
  else if (rank == "Copper IV" || rank ==  "Copper IV (P)")
  {
    discordemoji = "<:cp4:825469237954084893>";
  }
  else if (rank == "Copper V" || rank ==  "Copper V (P)")
  {
    discordemoji = "<:cp5:825469270259269672>";
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
  else if (rank == "Amethyst IV")
  {
    discordemoji = "<:a4:825469782458499083>";
  }
  else if (rank == "Amethyst V")
  {
    discordemoji = "<:a5:825469797906645022>";
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
  else if (rank == "Emerald IV")
  {
    discordemoji = "<:e4:825469824347406348>";
  }
  else if (rank == "Emerald V")
  {
    discordemoji = "<:e5:825469838125826093>";
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
  else if (rank == "Platinum IV")
  {
    discordemoji = "<:p4:825469652532592681>";
  }
  else if (rank == "Platinum V")
  {
    discordemoji = "<:p5:825469675420385371>";
  }
  else if (rank == "Onyx I")
  {
    discordemoji = "<:on1:825471342387134474>";
  }
  else if (rank == "Onyx II")
  {
    discordemoji = "<:on2:825471359408275516>";
  }
  else if (rank == "Onyx III")
  {
    discordemoji = "<:on3:825471377259626566>";
  }
  else if (rank == "Onyx IV")
  {
    discordemoji = "<:on4:825471394988294156>";
  }
  else if (rank == "Onyx V")
  {
    discordemoji = "<:on5:825471412578811955>";
  }


  return discordemoji;
}

var getTrialDiscordIcon = function(rank)
{
  var discordemoji="";

  if (rank == "Gold")
  {
    discordemoji = "<:g5:825469581481082940>";
  }
  else if (rank == "Silver")
  {
    discordemoji = "<:s5:825469538685419550>";
  }
  else if (rank == "Bronze")
  {
    discordemoji = "<:b5:825469496742903828>";
  }
  else if (rank == "Diamond")
  {
    discordemoji = "<:d5:825469716003815465>";
  }
  else if (rank == "Platinum")
  {
    discordemoji = "<:p5:825469675420385371>";
  }
  else if (rank == "Cobalt")
  {
    discordemoji = "<:c5:825469750825189427>";
  }
  else if (rank == "Amethyst")
  {
    discordemoji = "<:a5:825469797906645022>";
  }
  else if (rank == "Emerald")
  {
    discordemoji = "<:e5:825469838125826093>";
  }
  else if (rank == "Onyx")
  {
    discordemoji = "<:on5:825471412578811955>";
  }

  //special
  else if (rank == "Wood/Bronze/Silver")
  {
    discordemoji ="<:cp3:540808178108203018> <:b3:530665367417389097> <:s3:530666660051419136>";
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

//TODO: Add Discord Handle
function updatePlayerRecord(playerName, playerRank, playerRival, playerTwitter,callback){

  setTimeout( function(){

    var updateplayerquery = "UPDATE playerList set playerRank='" + playerRank + "', playerRivalCode='"+playerRival+"', twitterHandle='"+ playerTwitter + "', playerDateEarned=now() where playerName = '" + playerName +"'";
    connection.query(updateplayerquery, function (error, results) {
        if (error) throw error;
        callback(null,results)

      });


}, 250);

}

//TODO: Add Discord Handle
function insertNewPlayerRecord(playerName, playerRank, playerRival, playerTwitter,callback){

  setTimeout( function(){

    var insertplayerquery = "INSERT INTO playerList (playerName, playerRank, playerRivalCode, twitterHandle, playerDateEarned) VALUES ('" + playerName + "','" + playerRank + "','" + playerRival + "','"+playerTwitter+"', now())";
    connection.query(insertplayerquery, function (error, results) {
        if (error) throw error;
        callback(null,results)

      });


}, 250);

}

//TODO: Add Discord Handle
function insertNewTrialRecord(playerName,playerRivalCode,trialName,playerRank,playerScore,playerDiff,playerTwitterHandle, callback){

  setTimeout( function(){

    var insertquery = "INSERT INTO playertrialrank (playerName, playerRivalCode, trialName, playerRank, playerScore, playerDiff, playerTwitterHandle, playerUpdateDate) VALUES ('"+playerName+"','"+playerRivalCode+"','"+trialName+"','"+playerRank+"','"+playerScore+"','"+playerDiff+"','"+playerTwitterHandle+"',now())";
    connection.query(insertquery, function (error, results) {
        if (error) throw error;
        callback(null,results)

      });


}, 250);

}

//TODO: Add Discord Handle
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


//TODO: Add Onyx
var getTwitterTrialImageURL = function(trial,rank)
{
  var twitterImageURL = "";

  //HEARTBREAK(12)
  if (rank == "Silver" && trial == "HEARTBREAK (12)")
  {
    twitterImageURL = './trial_images/HEARTBREAK/Heartbreak Silver.webp';
  }
  else if (rank == "Gold" && trial == "HEARTBREAK (12)")
  {
    twitterImageURL = './trial_images/HEARTBREAK/Heartbreak Gold.webp';
  }
  else if (rank == "Diamond" && trial == "HEARTBREAK (12)")
  {
    twitterImageURL = './trial_images/HEARTBREAK/Heartbreak Diamond.webp';
  }
  else if (rank == "Cobalt" && trial == "HEARTBREAK (12)")
  {
    twitterImageURL = './trial_images/HEARTBREAK/Heartbreak Cobalt.webp';
  }
  else if (rank == "Amethyst" && trial == "HEARTBREAK (12)")
  {
    twitterImageURL = './trial_images/HEARTBREAK/Heartbreak Amethyst.webp';
  }
  else if (rank == "Emerald" && trial == "HEARTBREAK (12)")
  {
    twitterImageURL = './trial_images/HEARTBREAK/Heartbreak Emerald.webp';
  }
  else if (rank == "Platinum" && trial == "HEARTBREAK (12)")
  {
    twitterImageURL = './trial_images/HEARTBREAK/Heartbreak Platinum.webp';
  }
  else if (rank == "Onyx" && trial == "HEARTBREAK (12)")
  {
    twitterImageURL = './trial_images/HEARTBREAK/Heartbreak Onyx.webp';
  }

//CELESTIAL(13)
else if (rank == "Silver" && trial == "CELESTIAL (13)")
{
  twitterImageURL = './trial_images/CELESTIAL/Celestial Silver.webp';
}
else if (rank == "Gold" && trial == "CELESTIAL (13)")
{
  twitterImageURL = './trial_images/CELESTIAL/Celestial Gold.webp';
}
else if (rank == "Diamond" && trial == "CELESTIAL (13)")
{
  twitterImageURL = './trial_images/CELESTIAL/Celestial Diamond.webp';
}
else if (rank == "Cobalt" && trial == "CELESTIAL (13)")
{
  twitterImageURL = './trial_images/CELESTIAL/Celestial Cobalt.webp';
}
else if (rank == "Amethyst" && trial == "CELESTIAL (13)")
{
  twitterImageURL = './trial_images/CELESTIAL/Celestial Amethyst.webp';
}
else if (rank == "Emerald" && trial == "CELESTIAL (13)")
{
  twitterImageURL = './trial_images/CELESTIAL/Celestial Emerald.webp';
}
else if (rank == "Platinum" && trial == "CELESTIAL (13)")
{
  twitterImageURL = './trial_images/CELESTIAL/Celestial Platinum.webp';
}
else if (rank == "Onyx" && trial == "CELESTIAL (13)")
{
  twitterImageURL = './trial_images/CELESTIAL/Celestial Onyx.webp';
}

//DAYBREAK(14)
else if (rank == "Silver" && trial == "DAYBREAK (14)")
{
  twitterImageURL = './trial_images/DAYBREAK/Daybreak Silver.webp';
}
else if (rank == "Gold" && trial == "DAYBREAK (14)")
{
  twitterImageURL = './trial_images/DAYBREAK/Daybreak Gold.webp';
}
else if (rank == "Diamond" && trial == "DAYBREAK (14)")
{
  twitterImageURL = './trial_images/DAYBREAK/Daybreak Diamond.webp';
}
else if (rank == "Cobalt" && trial == "DAYBREAK (14)")
{
  twitterImageURL = './trial_images/DAYBREAK/Daybreak Cobalt.webp';
}
else if (rank == "Amethyst" && trial == "DAYBREAK (14)")
{
  twitterImageURL = './trial_images/DAYBREAK/Daybreak Amethyst.webp';
}
else if (rank == "Emerald" && trial == "DAYBREAK (14)")
{
  twitterImageURL = './trial_images/DAYBREAK/Daybreak Emerald.webp';
}
else if (rank == "Platinum" && trial == "DAYBREAK (14)")
{
  twitterImageURL = './trial_images/DAYBREAK/Daybreak Platinum.webp';
}
else if (rank == "Onyx" && trial == "DAYBREAK (14)")
{
  twitterImageURL = './trial_images/DAYBREAK/Daybreak Onyx.webp';
}

//HELLSCAPE(15)
else if (rank == "Silver" && trial == "HELLSCAPE (15)")
{
  twitterImageURL = './trial_images/HELLSCAPE/Hellscape Silver.webp';
}
else if (rank == "Gold" && trial == "HELLSCAPE (15)")
{
  twitterImageURL = './trial_images/HELLSCAPE/Hellscape Gold.webp';
}
else if (rank == "Diamond" && trial == "HELLSCAPE (15)")
{
  twitterImageURL = './trial_images/HELLSCAPE/Hellscape Diamond.webp';
}
else if (rank == "Cobalt" && trial == "HELLSCAPE (15)")
{
  twitterImageURL = './trial_images/HELLSCAPE/Hellscape Cobalt.webp';
}
else if (rank == "Amethyst" && trial == "HELLSCAPE (15)")
{
  twitterImageURL = './trial_images/HELLSCAPE/Hellscape Amethyst.webp';
}
else if (rank == "Emerald" && trial == "HELLSCAPE (15)")
{
  twitterImageURL = './trial_images/HELLSCAPE/Hellscape Emerald.webp';
}
else if (rank == "Platinum" && trial == "HELLSCAPE (15)")
{
  twitterImageURL = './trial_images/HELLSCAPE/Hellscape Platinum.webp';
}
else if (rank == "Onyx" && trial == "HELLSCAPE (15)")
{
  twitterImageURL = './trial_images/HELLSCAPE/Hellscape Onyx.webp';
}

//CLOCKWORK(15)
else if (rank == "Silver" && trial == "CLOCKWORK (15)")
{
  twitterImageURL = './trial_images/CLOCKWORK/Clockwork Silver.webp';
}
else if (rank == "Gold" && trial == "CLOCKWORK (15)")
{
  twitterImageURL = './trial_images/CLOCKWORK/Clockwork Gold.webp';
}
else if (rank == "Diamond" && trial == "CLOCKWORK (15)")
{
  twitterImageURL = './trial_images/CLOCKWORK/Clockwork Diamond.webp';
}
else if (rank == "Cobalt" && trial == "CLOCKWORK (15)")
{
  twitterImageURL = './trial_images/CLOCKWORK/Clockwork Cobalt.webp';
}
else if (rank == "Amethyst" && trial == "CLOCKWORK (15)")
{
  twitterImageURL = './trial_images/CLOCKWORK/Clockwork Amethyst.webp';
}
else if (rank == "Emerald" && trial == "CLOCKWORK (15)")
{
  twitterImageURL = './trial_images/CLOCKWORK/Clockwork Emerald.webp';
}
else if (rank == "Platinum" && trial == "CLOCKWORK (15)")
{
  twitterImageURL = './trial_images/CLOCKWORK/Clockwork Platinum.webp';
}
else if (rank == "Onyx" && trial == "CLOCKWORK (15)")
{
  twitterImageURL = './trial_images/CLOCKWORK/Clockwork Onyx.webp';
}

//PHARAOH(15)
else if (rank == "Silver" && trial == "PHARAOH (15)")
{
  twitterImageURL = './trial_images/PHARAOH/Pharaoh Silver.webp';
}
else if (rank == "Gold" && trial == "PHARAOH (15)")
{
  twitterImageURL = './trial_images/PHARAOH/Pharaoh Gold.webp';
}
else if (rank == "Diamond" && trial == "PHARAOH (15)")
{
  twitterImageURL = './trial_images/PHARAOH/Pharaoh Diamond.webp';
}
else if (rank == "Cobalt" && trial == "PHARAOH (15)")
{
  twitterImageURL = './trial_images/PHARAOH/Pharaoh Cobalt.webp';
}
else if (rank == "Amethyst" && trial == "PHARAOH (15)")
{
  twitterImageURL = './trial_images/PHARAOH/Pharaoh Amethyst.webp';
}
else if (rank == "Emerald" && trial == "PHARAOH (15)")
{
  twitterImageURL = './trial_images/PHARAOH/Pharaoh Emerald.webp';
}
else if (rank == "Platinum" && trial == "PHARAOH (15)")
{
  twitterImageURL = './trial_images/PHARAOH/Pharaoh Platinum.webp';
}
else if (rank == "Onyx" && trial == "PHARAOH (15)")
{
  twitterImageURL = './trial_images/PHARAOH/Pharaoh Onyx.webp';
}

//PARADOX(16)
else if (rank == "Gold" && trial == "PARADOX (16)")
{
  twitterImageURL = './trial_images/PARADOX/Paradox Gold.webp';
}
else if (rank == "Diamond" && trial == "PARADOX (16)")
{
  twitterImageURL = './trial_images/PARADOX/Paradox Diamond.webp';
}
else if (rank == "Cobalt" && trial == "PARADOX (16)")
{
  twitterImageURL = './trial_images/PARADOX/Paradox Cobalt.webp';
}
else if (rank == "Amethyst" && trial == "PARADOX (16)")
{
  twitterImageURL = './trial_images/PARADOX/Paradox Amethyst.webp';
}
else if (rank == "Emerald" && trial == "PARADOX (16)")
{
  twitterImageURL = './trial_images/PARADOX/Paradox Emerald.webp';
}
else if (rank == "Platinum" && trial == "PARADOX (16)")
{
  twitterImageURL = './trial_images/PARADOX/Paradox Platinum.webp';
}
else if (rank == "Onyx" && trial == "PARADOX (16)")
{
  twitterImageURL = './trial_images/PARADOX/Paradox Onyx.webp';
}

//INHUMAN(16)
else if (rank == "Gold" && trial == "INHUMAN (16)")
{
  twitterImageURL = './trial_images/INHUMAN/Inhuman Gold.webp';
}
else if (rank == "Diamond" && trial == "INHUMAN (16)")
{
  twitterImageURL = './trial_images/INHUMAN/Inhuman Diamond.webp';
}
else if (rank == "Cobalt" && trial == "INHUMAN (16)")
{
  twitterImageURL = './trial_images/INHUMAN/Inhuman Cobalt.webp';
}
else if (rank == "Amethyst" && trial == "INHUMAN (16)")
{
  twitterImageURL = './trial_images/INHUMAN/Inhuman Amethyst.webp';
}
else if (rank == "Emerald" && trial == "INHUMAN (16)")
{
  twitterImageURL = './trial_images/INHUMAN/Inhuman Emerald.webp';
}
else if (rank == "Platinum" && trial == "INHUMAN (16)")
{
  twitterImageURL = './trial_images/INHUMAN/Inhuman Platinum.webp';
}
else if (rank == "Onyx" && trial == "INHUMAN (16)")
{
  twitterImageURL = './trial_images/INHUMAN/Inhuman Onyx.webp';
}

//CHEMICAL(17)
else if (rank == "Diamond" && trial == "CHEMICAL (17)")
{
  twitterImageURL = './trial_images/CHEMICAL/Chemical Diamond.webp';
}
else if (rank == "Cobalt" && trial == "CHEMICAL (17)")
{
  twitterImageURL = './trial_images/CHEMICAL/Chemical Cobalt.webp';
}
else if (rank == "Amethyst" && trial == "CHEMICAL (17)")
{
  twitterImageURL = './trial_images/CHEMICAL/Chemical Amethyst.webp';
}
else if (rank == "Emerald" && trial == "CHEMICAL (17)")
{
  twitterImageURL = './trial_images/CHEMICAL/Chemical Emerald.webp';
}
else if (rank == "Platinum" && trial == "CHEMICAL (17)")
{
  twitterImageURL = './trial_images/CHEMICAL/Chemical Platinum.webp';
}
else if (rank == "Onyx" && trial == "CHEMICAL (17)")
{
  twitterImageURL = './trial_images/CHEMICAL/Chemical Onyx.webp';
}

//ORIGIN(18)
else if (rank == "Diamond" && trial == "ORIGIN (18)")
{
  twitterImageURL = './trial_images/ORIGIN/Origin Diamond.webp';
}
else if (rank == "Cobalt" && trial == "ORIGIN (18)")
{
  twitterImageURL = './trial_images/ORIGIN/Origin Cobalt.webp';
}
else if (rank == "Amethyst" && trial == "ORIGIN (18)")
{
  twitterImageURL = './trial_images/ORIGIN/Origin Amethyst.webp';
}
else if (rank == "Emerald" && trial == "ORIGIN (18)")
{
  twitterImageURL = './trial_images/ORIGIN/Origin Emerald.webp';
}
else if (rank == "Platinum" && trial == "ORIGIN (18)")
{
  twitterImageURL = './trial_images/ORIGIN/Origin Platinum.webp';
}
else if (rank == "Onyx" && trial == "ORIGIN (18)")
{
  twitterImageURL = './trial_images/ORIGIN/Origin Onyx.webp';
}


//ASCENSION (17)
else if (rank == "Diamond" && trial == "ASCENSION (17)")
{
  twitterImageURL = './trial_images/ASCENSION/Ascension Diamond.webp';
}
else if (rank == "Cobalt" && trial == "ASCENSION (17)")
{
  twitterImageURL = './trial_images/ASCENSION/Ascension Cobalt.webp';
}
else if (rank == "Amethyst" && trial == "ASCENSION (17)")
{
  twitterImageURL = './trial_images/ASCENSION/Ascension Amethyst.webp';
}
else if (rank == "Emerald" && trial == "ASCENSION (17)")
{
  twitterImageURL = './trial_images/ASCENSION/Ascension Emerald.webp';
}
else if (rank == "Platinum" && trial == "ASCENSION (17)")
{
  twitterImageURL = './trial_images/ASCENSION/Ascension Platinum.webp';
}
else if (rank == "Onyx" && trial == "ASCENSION (17)")
{
  twitterImageURL = './trial_images/ASCENSION/Ascension Onyx.webp';
}

//COUNTDOWN (14)
else if (rank == "Silver" && trial == "COUNTDOWN (14)")
{
  twitterImageURL = './trial_images/COUNTDOWN/Countdown Silver.webp';
}
else if (rank == "Gold" && trial == "COUNTDOWN (14)")
{
  twitterImageURL = './trial_images/COUNTDOWN/Countdown Gold.webp';
}
else if (rank == "Diamond" && trial == "COUNTDOWN (14)")
{
  twitterImageURL = './trial_images/COUNTDOWN/Countdown Diamond.webp';
}
else if (rank == "Cobalt" && trial == "COUNTDOWN (14)")
{
  twitterImageURL = './trial_images/COUNTDOWN/Countdown Cobalt.webp';
}
else if (rank == "Amethyst" && trial == "COUNTDOWN (14)")
{
  twitterImageURL = './trial_images/COUNTDOWN/Countdown Amethyst.webp';
}
else if (rank == "Emerald" && trial == "COUNTDOWN (14)")
{
  twitterImageURL = './trial_images/COUNTDOWN/Countdown Emerald.webp';
}
else if (rank == "Platinum" && trial == "COUNTDOWN (14)")
{
  twitterImageURL = './trial_images/COUNTDOWN/Countdown Platinum.webp';
}
else if (rank == "Onyx" && trial == "COUNTDOWN (14)")
{
  twitterImageURL = './trial_images/COUNTDOWN/Countdown Onyx.webp';
}


  //TODO: Add updated images

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

//TODO: Add updated images

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
 //TODO: Add updated images

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

  //TODO: Add updated images

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

  //TODO: Add updated images

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

  //TODO: Add updated images

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

  //TODO: Add updated images

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

  //TODO: Add updated images

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

  //TODO: Add updated images

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

  //TODO: Add updated images

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

  //TODO: Add updated images

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

  //TODO: Add updated images

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

  //TODO: Add updated images

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

  //TODO: Add updated images

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

  //TODO: Add updated images

//GOSPEL (13)
else if (rank == "Silver" && trial == "GOSPEL (13)")
{
  twitterImageURL = './trial_images/GOSPEL/gospel_silver.jpg';
}
else if (rank == "Gold" && trial == "GOSPEL (13)")
{
  twitterImageURL = './trial_images/GOSPEL/gospel_gold.png';
}
else if (rank == "Diamond" && trial == "GOSPEL (13)")
{
  twitterImageURL = './trial_images/GOSPEL/gospel_diamond.png';
}
else if (rank == "Cobalt" && trial == "GOSPEL (13)")
{
  twitterImageURL = './trial_images/GOSPEL/gospel_cobalt.png';
}
else if (rank == "Amethyst" && trial == "GOSPEL (13)")
{
  twitterImageURL = './trial_images/GOSPEL/gospel_amethyst.png';
}
else if (rank == "Emerald" && trial == "GOSPEL (13)")
{
  twitterImageURL = './trial_images/GOSPEL/gospel_emerald.png';
}

  //TODO: Add updated images

//MYTHOS (15)
else if (rank == "Silver" && trial == "MYTHOS (15)")
{
  twitterImageURL = './trial_images/MYTHOS/mythos_silver.jpg';
}
else if (rank == "Gold" && trial == "MYTHOS (15)")
{
  twitterImageURL = './trial_images/MYTHOS/mythos_gold.png';
}
else if (rank == "Diamond" && trial == "MYTHOS (15)")
{
  twitterImageURL = './trial_images/MYTHOS/mythos_diamond.png';
}
else if (rank == "Cobalt" && trial == "MYTHOS (15)")
{
  twitterImageURL = './trial_images/MYTHOS/mythos_cobalt.png';
}
else if (rank == "Amethyst" && trial == "MYTHOS (15)")
{
  twitterImageURL = './trial_images/MYTHOS/mythos_amethyst.png';
}
else if (rank == "Emerald" && trial == "MYTHOS (15)")
{
  twitterImageURL = './trial_images/MYTHOS/mythos_emerald.png';
}

  //TODO: Add updated images

//RENDITION (15)
else if (rank == "Silver" && trial == "RENDITION (15)")
{
  twitterImageURL = './trial_images/RENDITION/rendition_silver.jpg';
}
else if (rank == "Gold" && trial == "RENDITION (15)")
{
  twitterImageURL = './trial_images/RENDITION/rendition_gold.png';
}
else if (rank == "Diamond" && trial == "RENDITION (15)")
{
  twitterImageURL = './trial_images/RENDITION/rendition_diamond.png';
}
else if (rank == "Cobalt" && trial == "RENDITION (15)")
{
  twitterImageURL = './trial_images/RENDITION/rendition_cobalt.png';
}
else if (rank == "Amethyst" && trial == "RENDITION (15)")
{
  twitterImageURL = './trial_images/RENDITION/rendition_amethyst.png';
}
else if (rank == "Emerald" && trial == "RENDITION (15)")
{
  twitterImageURL = './trial_images/RENDITION/rendition_emerald.png';
}

  //TODO: Add updated images

//SUPERSTAR (14)
else if (rank == "Silver" && trial == "SUPERSTAR (14)")
{
  twitterImageURL = './trial_images/SUPERSTAR/superstar_silver.jpg';
}
else if (rank == "Gold" && trial == "SUPERSTAR (14)")
{
  twitterImageURL = './trial_images/SUPERSTAR/superstar_gold.png';
}
else if (rank == "Diamond" && trial == "SUPERSTAR (14)")
{
  twitterImageURL = './trial_images/SUPERSTAR/superstar_diamond.png';
}
else if (rank == "Cobalt" && trial == "SUPERSTAR (14)")
{
  twitterImageURL = './trial_images/SUPERSTAR/superstar_cobalt.png';
}
else if (rank == "Amethyst" && trial == "SUPERSTAR (14)")
{
  twitterImageURL = './trial_images/SUPERSTAR/superstar_amethyst.png';
}
else if (rank == "Emerald" && trial == "SUPERSTAR (14)")
{
  twitterImageURL = './trial_images/SUPERSTAR/superstar_emerald.png';
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

//TODO: Add general discord handling when player id isn't found

//TODO: Add Discord Handle
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

//TODO: Add Discord Handle
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

//TODO: Add Discord Handle
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

//TODO: Add Discord Handle
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


      //TODO: Add Discord info to this call
      var trialInfo = wait.for(getTrialQueueInfo,queueResults[0].trialID);
        console.log("Trial #" + queueResults[0].trialID + "  retrieved!");

        var playerNumberRanking = wait.for(getranks, trialInfo[0].trialName,trialInfo[0].playerName);
        console.log("Ranking retrieved");

        if (queueResults[0].updateType == "NEW")
        {
          var twitterannounce = wait.for(announceNewPlayerTrialTwitter, trialInfo[0].playerName, trialInfo[0].playerRank,trialInfo[0].playerScore,trialInfo[0].playerDiff, trialInfo[0].playerTwitterHandle, trialInfo[0].trialName,playerNumberRanking);
          console.log("Twitter announcement complete!");
          //TODO: Add discord handle
          var discordannounce = wait.for(announceNewPlayerTrialDiscord, trialInfo[0].playerName, trialInfo[0].playerRank,trialInfo[0].playerScore,trialInfo[0].playerDiff, trialInfo[0].trialName,playerNumberRanking);
          console.log("Discord announcement complete!");
        }
        else if (queueResults[0].updateType == "UPDATE")
        {
          var twitterannounce = wait.for(announceUpdatePlayerTrialTwitter, trialInfo[0].playerName, trialInfo[0].playerRank,trialInfo[0].playerScore,trialInfo[0].playerDiff, trialInfo[0].playerTwitterHandle, trialInfo[0].trialName,playerNumberRanking);
          console.log("Twitter announcement complete!");
          //TODO: Add discord handle
          var discordannounce = wait.for(announceUpdatePlayerTrialDiscord, trialInfo[0].playerName, trialInfo[0].playerRank,trialInfo[0].playerScore,trialInfo[0].playerDiff, trialInfo[0].trialName,playerNumberRanking);
          console.log("Discord announcement complete!");

        }




    }
        //TODO: Add name check for ' for TRIAL EVENTS
    //trial event
    else if (queueResults[0].updateCategory == "TRIALEVENT")
    {
      console.log("Trial Event identified!");

      //TODO: Add discord handle to returned info
      var trialInfo = wait.for(getTrialQueueInfo,queueResults[0].trialID);
        console.log("Trial #" + queueResults[0].trialID + "  retrieved!");

        var playerNumberRanking = wait.for(getranksevent, trialInfo[0].trialName,trialInfo[0].playerName,trialInfo[0].playerRank);
        console.log("Ranking retrieved");


        if (queueResults[0].updateType == "NEW")
        {
          var twitterannounce = wait.for(announceNewPlayerTrialTwitter, trialInfo[0].playerName, trialInfo[0].playerRank,trialInfo[0].playerScore,trialInfo[0].playerDiff, trialInfo[0].playerTwitterHandle, trialInfo[0].trialName,playerNumberRanking);
          console.log("Twitter announcement complete!");
          //TODO: Add discord handle to this
          var discordannounce = wait.for(announceNewPlayerTrialDiscord, trialInfo[0].playerName, trialInfo[0].playerRank,trialInfo[0].playerScore,trialInfo[0].playerDiff, trialInfo[0].trialName,playerNumberRanking);
          console.log("Discord announcement complete!");
        }
        else if (queueResults[0].updateType == "UPDATE")
        {
          var twitterannounce = wait.for(announceUpdatePlayerTrialTwitter, trialInfo[0].playerName, trialInfo[0].playerRank,trialInfo[0].playerScore,trialInfo[0].playerDiff, trialInfo[0].playerTwitterHandle, trialInfo[0].trialName,playerNumberRanking);
          console.log("Twitter announcement complete!");
          //TODO: Add Discord handle to this
          var discordannounce = wait.for(announceUpdatePlayerTrialDiscord, trialInfo[0].playerName, trialInfo[0].playerRank,trialInfo[0].playerScore,trialInfo[0].playerDiff, trialInfo[0].trialName,playerNumberRanking);
          console.log("Discord announcement complete!");

        }
    }
    //player queue
    else if (queueResults[0].updateCategory == "PLAYER")
    {
        console.log("Player identified!");

        //TODO: Get discord handle to playerinfo
        var playerInfo = wait.for(getPlayerQueueInfo,queueResults[0].playerID);
        var playerName = wait.for(playerUpdateName, playerInfo[0].playerName);

        console.log("Player " + playerName + " retrieved!");
        
        if (queueResults[0].updateType == "NEW")
        {
          var twitterannounce = wait.for(announceNewPlayerTwitter, playerName, playerInfo[0].playerRank, playerInfo[0].twitterHandle);
          console.log("Twitter announcement complete!");
          //TODO: Add discord handle
          var discordannounce = wait.for(announceNewPlayerDiscord, playerName, playerInfo[0].playerRank);
          console.log("Discord announcement complete!");
        }
        else if (queueResults[0].updateType == "UPDATE")
        {
          var twitterannounce = wait.for(announcePlayerRankupTwitter, playerName, playerInfo[0].playerRank, playerInfo[0].twitterHandle);
          console.log("Twitter announcement complete!");
          //TODO: Add discord handle
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
      //TODO: Add discord to this
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

//TODO: Add new trials!
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
  "SPECTACLE (16)",
  "GOSPEL (13)",
  "SUPERSTAR (14)",
  "MYTHOS (15)",
  "RENDITION (15)"
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
  "SPECTACLE (16)!B2:F",
  "GOSPEL (13)!B2:F",
  "SUPERSTAR (14)!B2:F",
  "MYTHOS (15)!B2:F",
  "RENDITION (15)!B2:F"
];

/*
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
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4",
  "1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4"
];
*/

  for (var i = 0; i < listOfTrials.length;i++)
  {
  console.log("Beginning " + listOfTrials[i]);

  //get the list of players
  var trialPlayerList = wait.for(newGetTrials, getauth, trialRanges[i]);


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
      //TODO: Add discord tag
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
            if (playerScore <= trialresults[0].playerScore &&
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
      //TODO: Add discord tag
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

//TODO: update get spreadsheet
function newGetTrials(auth,trialRange,callback)
{

  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
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
