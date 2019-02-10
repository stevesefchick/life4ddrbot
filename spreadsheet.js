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

bot.login(process.env.DISCORD_BOT_TOKEN);

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
  });


//mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.MYSQLHOST,
  user     : process.env.MYSQLUSER,
  password : process.env.MYSQLPW,
  database : process.env.MYSQLPLAYERDB
});

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

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content), getFromSpreadsheet);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
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
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
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



function getFromSpreadsheet(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1FPiO1h9XDSeTB6tWmRi7ursSqFOBYitiVweu3eOQ8tg',
    range: 'User List!A2:E',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;



    if (rows.length) {



      console.log('Name, Rank:');



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


        var playerquery = "SELECT playerName, playerRank from playerList WHERE playerName = '" + playerName + "'";
        var insertplayerquery = "INSERT INTO playerList (playerName, playerRank, playerRivalCode, twitterHandle, playerDateEarned) VALUES ('" + playerName + "','" + playerRank + "','" + playerRivalCode + "','"+playerTwitterHandle+"','" + playerDateEarned + "')";

        //console.log(insertplayerquery);

        connection.query(playerquery, function (error, results) {
          if (error) throw error;
          //player exists!
          if (results && results.length)
          {
            console.log("Player " + playerName +" exists!");
            console.log(results);

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


                //old twitter post
                //Twitter.post('statuses/update', {status: twitterpost}, function(err, data, response) {
                //    console.log(data)
                //});


                const channel = bot.channels.find('name', 'rankups')
                channel.send(discordpost)
                .then(message => console.log(discordpost))
                .catch(console.error);


            });


            //console.log(insertplayerquery);
          }
          console.log(`${row[0]}, ${row[1]}`);

        });


      }


      });
      //connection.end();

    } else {
      console.log('No data found.');
    }

    
  });
}