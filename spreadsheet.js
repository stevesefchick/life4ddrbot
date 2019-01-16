const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
require('dotenv').config();







//mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.MYSQLHOST,
  user     : process.env.MYSQLUSER,
  password : process.env.MYSQLPW,
  database : process.env.MYSQLPLAYERDB
});




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






function getFromSpreadsheet(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1FPiO1h9XDSeTB6tWmRi7ursSqFOBYitiVweu3eOQ8tg',
    range: 'User List!A2:B',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;



    if (rows.length) {

      //connect to db
      connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected to MySQL!");
      });


      console.log('Name, Rank:');



      rows.map((row) => {


        
        var playerName = `${row[0]}`;
        var playerRank = `${row[1]}`;
        var playerquery = "SELECT playerName, playerRank from playerList WHERE playerName = '" + playerName + "'";
        var insertplayerquery = "INSERT INTO playerList (playerName, playerRank) VALUES ('" + playerName + "','" + playerRank + "')";

        connection.query(playerquery, function (error, results) {
          if (error) throw error;
          if (results && results.length)
          {
            console.log("Player " + playerName +" exists!");
            console.log(results);
          }
          else
          {
            console.log("Player " + playerName + " does not exist!");
            connection.query(insertplayerquery, function (ierror,iresults) {
              if (ierror) throw ierror;
              console.log("Player " + playerName + "created!");
            })
            //console.log(insertplayerquery);
          }
          console.log(`${row[0]}, ${row[1]}`);

        });

      });
      connection.end();

    } else {
      console.log('No data found.');
    }
  });
}