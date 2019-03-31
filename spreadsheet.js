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
    twitterImageURL = './rankup_images/W1.png';
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


  return discordemoji;
}

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = 'token.json';



function readSecretsFromFile()
{
  //load client secrets
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), getFromPlayerSpreadsheet);
    });

}

function readSecretsFromFileForTrials()
{
  //load client secrets
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      authorize(JSON.parse(content), getFromTrialSpreadsheet);
    });

}


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

function trialSequence()
{
  console.log("Trials starting");
  var getTrialJSON = wait.for(getCredentials);
  console.log("JSON Cred object retrieved!");
  var getauth = wait.for(newauthorize,getTrialJSON);
  console.log("Authorization complete! Hot damn!");
  var getTrialListHeartbreak = wait.for(newGetTrials,getauth);
  console.log("HEARTBREAK(12) LIST RETRIEVED!");
  console.log(getTrialListHeartbreak);
  //get player details
  //check for player trial entry
  //insert if doesn't exist
  //update if does exist
}

function newauthorize(credentials, callback) {

  const {client_secret, client_id, redirect_uris} = credentials.installed;
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

//check to see if a player has deranked
var checkForDerank = function(existingRank,newRank)
{
  console.log("Old Rank = " + existingRank);
  console.log("New Rank = " + newRank);

  if (existingRank == "Wood II (P)" && newRank =="Wood I")
  {
    return true;
  }
  else if (existingRank == "Wood III (P)" && newRank =="Wood II")
  {
    return true;
  }
  else if (existingRank == "Bronze I (P)" && newRank =="Wood III")
  {
    return true;
  }
  else if (existingRank == "Bronze II (P)" && newRank =="Bronze I")
  {
    return true;
  }
  else if (existingRank == "Bronze III (P)" && newRank =="Bronze II")
  {
    return true;
  }
  else if (existingRank == "Silver I (P)" && newRank =="Bronze III")
  {
    return true;
  }
  else if (existingRank == "Silver II (P)" && newRank =="Silver I")
  {
    return true;
  }
  else if (existingRank == "Silver III (P)" && newRank =="Silver II")
  {
    return true;
  }
  else if (existingRank == "Gold I (P)" && newRank =="Silver III")
  {
    return true;
  }
  else if (existingRank == "Gold II (P)" && newRank =="Gold I")
  {
    return true;
  }
  else if (existingRank == "Gold III (P)" && newRank =="Gold II")
  {
    return true;
  }
  //for testing
  else if (existingRank == "Diamond I (P)" && newRank =="Gold III")
  {
    return true;
  }

  return false;
}


//for player ranks! retrieve from the spreadsheet
function getFromPlayerSpreadsheet(auth) {

  
  connection = mysql.createConnection({
    host     : process.env.MYSQLHOST,
    user     : process.env.MYSQLUSER,
    password : process.env.MYSQLPW,
    database : process.env.MYSQLPLAYERDB
  });

  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1FPiO1h9XDSeTB6tWmRi7ursSqFOBYitiVweu3eOQ8tg',
    range: 'User List!A2:E',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;

    console.log('BEGINNING PLAYER RANK FUNCTION');


    if (rows.length) {

      connection.connect();



      rows.map((row) => {


        
        var playerName = `${row[0]}`;
        var playerRank = `${row[1]}`;
        var playerRivalCode = `${row[2]}`;
        var playerTwitterHandle = `${row[3]}`;
        var playerDateEarned = `${row[4]}`;

        if (playerName === undefined || playerRank === undefined || (playerRank === undefined && playerName === undefined))
        {
          console.log("This is undefined!");
        }
        else
        {


        var playerquery = "SELECT playerName, playerRank, playerID, playerDateEarned from playerList WHERE playerName = '" + playerName + "'";
        var insertplayerquery = "INSERT INTO playerList (playerName, playerRank, playerRivalCode, twitterHandle, playerDateEarned) VALUES ('" + playerName + "','" + playerRank + "','" + playerRivalCode + "','"+playerTwitterHandle+"','" + playerDateEarned + "')";

        //not used
        //var playerCountQuery = "select COUNT(*) AS playercount from playerList";


        connection.query(playerquery, function (error, results) {
          if (error) throw error;
          //player exists!
          if (results && results.length)
          {
            console.log("Player " + playerName +" exists!");
            console.log(results);

            //query for update inserts!
            var playerHistoryInsert = "INSERT INTO playerHistory (playerID, playerRank, playerUpdate) VALUES ('" + results[0].playerID + "','" +results[0].playerRank + "', now())";


            //check for rank-up
            if (results[0].playerRank == playerRank)
            {
                //rank is the same!
                console.log(playerName +"'s rank has not changed!");
            }
            else
            {
                //rank change!
                console.log(playerName +"'s rank has changed! Was: " + playerRank + " | is now: " + results[0].playerRank);
                var updateplayerquery = "UPDATE playerList set playerRank='" + playerRank + "', playerRivalCode='"+playerRivalCode+"', twitterHandle='"+ playerTwitterHandle + "', playerDateEarned='" + playerDateEarned + "' where playerName = '" + playerName +"'";
                console.log(updateplayerquery);



                //run the main table update
                connection.query(updateplayerquery, function (ierror,iresults) {
                  if (ierror) throw ierror;
                  console.log("Player " + playerName + " rank updated!");

                  //derank check
                  var isDerank = checkForDerank(results[0].playerRank, playerRank);

                  var twitterpost ="";
                  var discordpost = "";
                  if (playerTwitterHandle != "")
                  {
                    if (isDerank == true)
                    {
                      twitterpost = "Player " + playerName + " (" + playerTwitterHandle + ") has de-ranked out of their placement rank to " + playerRank +". Don't give up, you can do it!";
                    }
                    else
                    {
                      twitterpost = "Player " + playerName + " (" + playerTwitterHandle + ") has earned a new rank! They are now " + playerRank +"! Congratulations! ";
                    }
                  }
                  else
                  {
                    if (isDerank == true)
                    {
                      twitterpost = "Player " + playerName + " has de-ranked out of their placement rank to " + playerRank +". Don't give up, you can do it! ";
                    }
                    else
                    {
                      twitterpost = "Player " + playerName + " has earned a new rank! They are now " + playerRank +"! Congratulations! ";
                    }
                  }

                  if (isDerank == true)
                  {
                    discordpost = "Player " + playerName + " has de-ranked out of their placement rank to " + playerRank +". Don't give up, you can do it!" + getDiscordIcon(playerRank);
                  }
                  else
                  {
                    discordpost = "Player " + playerName + " has earned a new rank! They are now " + playerRank +"! Congratulations! "  + getDiscordIcon(playerRank);
                  }



                  //update don't do anything if it's a derank!
                  if (isDerank == false)
                  {

                  
                  // read the file
                  var b64content = fs.readFileSync(getTwitterImageURL(playerRank), { encoding: 'base64' })
                  
                  // get the new image media on twitter!
                  Twitter.post('media/upload', { media_data: b64content }, function (err, data, response) {
                    var mediaIdStr = data.media_id_string
                    var altText = "Player rank"
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



                  const channel = bot.channels.find('name', 'rankups')
                  channel.send(discordpost)
                  .then(message => console.log(discordpost))
                  .catch(console.error);
                  
                }


                //run the history table query
                connection.query(playerHistoryInsert, function(error,results2)
                {
                  if (error) throw error;
                  console.log(results2);
                });
                
              });


            }
          }
          //player doesn't exist! Create a record and tweet it out!
          else
          {
            console.log("Player " + playerName + " does not exist!");

            connection.query(insertplayerquery, function (ierror,iresults) {
                if (ierror) throw ierror;
                console.log("Player " + playerName + " created!");
                //var post = playerName + " has joined LIFE4!";

                var twitterpost ="";
                var discordpost = "";
                if (playerTwitterHandle != "")
                {
                  twitterpost = "Player " + playerName + " (" + playerTwitterHandle + ") has joined LIFE4! Their current rank is " + playerRank + "!";
                }
                else
                {
                  twitterpost = "Player " + playerName + " has joined LIFE4! Their current rank is " + playerRank + "!";
                }

                discordpost = "Player " + playerName + " has joined LIFE4! Their current rank is " + playerRank + "! Welcome! " + getDiscordIcon(playerRank);

                  // read the file
                  var b64content = fs.readFileSync(getTwitterImageURL(playerRank), { encoding: 'base64' })
                  
                  // get the new image media on twitter!
                  Twitter.post('media/upload', { media_data: b64content }, function (err, data, response) {
                    var mediaIdStr = data.media_id_string
                    var altText = "Player rank"
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

                const channel = bot.channels.find('name', 'rankups')
                channel.send(discordpost)
                .then(message => console.log(discordpost))
                .catch(console.error);


            });


            //GET THE PLAYER ID
            var getPlayerID = "SELECT playerID from playerList where playerName='" + playerName + "'";
            connection.query(getPlayerID, function(error,results3)
            {
              if (error) throw error;
                //DO THE INSERT
                var playerHistoryInsert = "INSERT INTO playerHistory (playerID, playerRank, playerUpdate) VALUES ('" + results3[0].playerID + "','" + playerRank + "', now())";
                connection.query(playerHistoryInsert, function(error,results4)
                {
                  if (error) throw error;
                  console.log(results4);
                });            
          });
            



            //check counts!
            /*
            connection.query(playerCountQuery, function (error, results) {
              if (error) throw error;
              if (results && results.length)
              {
                var count = results[0].playercount;

                console.log(count);

                if (count % 50 == 0)
                {
                    var milestoneposttwitter = "Wow! " + count + " players have joined @LIFE4DDR!";
                    var milestonepostdiscord = "Wow! " + count + " players have joined LIFE4!";

                    Twitter.post('statuses/update', {status: milestoneposttwitter}, function(err, data, response) {
                        console.log(data)
                    });

                    const channel = bot.channels.find('name', 'general')
                    channel.send(milestonepostdiscord)
                    .then(message => console.log(milestonepostdiscord))
                    .catch(console.error);
                }
                else if (count == 420)
                {
                  var milestoneposttwitter = "Wow! " + count + " players have joined @LIFE4DDR! Nice.";
                  var milestonepostdiscord = "Wow! " + count + " players have joined LIFE4!";

                  Twitter.post('statuses/update', {status: milestoneposttwitter}, function(err, data, response) {
                      console.log(data)
                  });

                  const channel = bot.channels.find('name', 'general')
                  channel.send(milestonepostdiscord)
                  .then(message => console.log(milestonepostdiscord))
                  .catch(console.error);
                }
              }
            })
            */


          }
          console.log(`${row[0]}, ${row[1]}`);

        });

      //connection.end();

      }


      });

      connection.end();


    } else {
      console.log('No data found.');
    }


  });



}


function newGetTrials(auth,callback)
{
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
    range: 'ALL TRIALS!A2:C',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    callback(null,rows);
  });
}

function getFromTrialSpreadsheet(auth)
{

  //MYSQL connection
  connection = mysql.createConnection({
    host     : process.env.MYSQLHOST,
    user     : process.env.MYSQLUSER,
    password : process.env.MYSQLPW,
    database : process.env.MYSQLPLAYERDB
  });

  console.log('BEGINNING PLAYER TRIAL FUNCTION');

  const sheets = google.sheets({version: 'v4', auth});

  /*
    HEARTBREAK(12)
  */
  sheets.spreadsheets.values.get({
    spreadsheetId: '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
    range: 'ALL TRIALS!A2:C',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;

    console.log("Heartbreak(12)");



    if (rows.length) {

      connection.connect();

      rows.map((row) => {
        var heartbreakName = `${row[0]}`;
        var heartbreakRank = `${row[1]}`;
        var heartbreakScore = `${row[2]}`;
        var heartbreakDiff = heartbreakScore.substr(heartbreakScore.indexOf('('), heartbreakScore.indexOf(')'));
        heartbreakScore = heartbreakScore.substr(0, heartbreakScore.indexOf(' '));


        console.log(heartbreakName + "|" + heartbreakRank + "|" + heartbreakScore + "|" + heartbreakDiff);

        //check for undefined
        if (heartbreakName === undefined || heartbreakRank === undefined || heartbreakScore === undefined)
        {
          console.log("This is undefined!");
        }
        else
        {

          //check for player and get player details
          var playerquery = "SELECT playerName, playerRank, playerID, playerDateEarned FROM playerList WHERE playerName = '" + heartbreakName + "'";
    
          //FIRST check if player exists
          connection.query(playerquery, function (error, results) {
            if (error) throw error;
            //player exists!
            if (results && results.length)
            {
              var checkfortrialquery = "SELECT playerTrialRankID FROM playertrialrank where playerID = " + results[0].playerID + " and trialName = 'Heartbreak(12)'";


                //CHECK IF EXISTS
                connection.query(checkfortrialquery, function (ierror,iresults) {
                  if (ierror) throw ierror;
                  //EXISTS! UPDATE!
                  if (iresults && iresults.length)
                  {
                    console.log("Player exists for Heartbreak(12)!");

                    //CHECK FOR HIGHER RANK

                    //TWEET/DISCORD
                  }
                  //DOES NOT EXIST! INSERT!
                  else{
                    console.log("Player does not exist for this trial!");

                      var inserttrialplayerquery = "INSERT INTO playertrialrank (playerID, trialName, playerRank, playerScore, playerDiff, playerUpdateDate) VALUES ("+results[0].playerID+", 'Heartbreak(12)', '" + heartbreakRank + "', " + heartbreakScore + ", '" + heartbreakDiff + "', now())";

                      connection.query(inserttrialplayerquery, function (ierror,iresults) {
                        if (ierror) throw ierror;
                        console.log("Player " + heartbreakName + " new trial entry added!");

                        //GET TRIAL ID

                        //UPDATE AUDIT

                        //TWEET/DISCORD
                      });
                  }




                });



            }
          });  

        }

      });

      //connection.end();

    } else {
      console.log('No data found for Heartbreak(12)');
    }
  });


    /*
    CELESTIAL(13)
  */
 /*
 sheets.spreadsheets.values.get({
  spreadsheetId: '1RfhOYUMcFoqfvaNG153YfE-bfeItMP0-ziGco5H-Gz4',
  range: 'ALL TRIALS!F2:H',
}, (err, res) => {
  if (err) return console.log('The API returned an error: ' + err);
  const rows = res.data.values;

  console.log("Celestial(13)");

  if (rows.length) {

    //connection.connect();

    rows.map((row) => {
      var celeName = `${row[0]}`;
      var celeRank = `${row[1]}`;
      var celeScore = `${row[2]}`;
      console.log(celeName + celeRank + celeScore);

      //check for undefined
      if (celeName === undefined || celeRank === undefined || celeScore === undefined)
      {
        console.log("This is undefined!");
      }
      else
      {
        console.log("doing stuff!");
      }





    });
    
    //connection.end();

  } else {
    console.log('No data found for Heartbreak(12)');
  }
});

*/




  //FOR EACH TRIAL
  //read from spreadsheet
  //check db for player info and retrieve it
  //check in db for existing trial entry
  //if new, insert into audit and playertrial
  //announce
  //if updated, insert into playertrial and audit
  //announce
}


/*
async function f() {

  let promise = new Promise((resolve, reject) => {
    readSecretsFromFileForTrials(() => resolve("done!"), 100000)
  });

  let result = await promise; // wait till the promise resolves (*)

  console.log(result); // "done!"
}

f();
*/

//(async () => {

  //await readSecretsFromFile();
  //await readSecretsFromFileForTrials();

//})();

// RUN THE STUFF HERE
//readSecretsFromFile();


wait.launchFiber(trialSequence);

//readSecretsFromFileForTrials();