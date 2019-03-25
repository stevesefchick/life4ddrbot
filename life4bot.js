//Life4DDRBot
//Created by Steve Sefchick - 2019
//Tweets to @Life4DDRBot
//build using NodeJS

//update readme

const fs = require('fs');
var twit = require('twit');
var config = require('./config.js');
var Twitter = new twit(config);
//var Discord = require('discord.js');
//var bot = new Discord.Client();


//bot.on('ready', () => {
 //   console.log(`Logged in as ${bot.user.tag}!`);
 // });


  /*
  bot.on('message', msg => {
    if (msg.content === 'ping') {
      msg.reply('Pong!');
    }
  });
*/

require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}!`));

/*
var heckPromise = function()
{
    return new Promise((resolve,reject) => {
      getSpreadsheet((err) => {
        if (error) reject (err);
        else resolve();
      });
    });

}
*/

//add get from spreadsheet
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


    /*
    (async () => {
      console.log("heck");
      const promise1 = await heckPromise();
      console.log("heck");
    })
    */

    /*
    heckPromise()
    .then(content =>
      {
        console.log("heck it's done");
        return "dang";
      })
    .catch(err => console.log(err));
*/

/*
return new Promise((resolve, reject) => {
  console.log('App is running!!! heck');
  resolve();
})
*/
}

/*
(async () => {
  console.log("heck");
  const promise1 = await heckPromise();
  console.log("heck");
  const runthething = await heckPromise();
})
*/

life4actionTime();

//setTimeout(botJoinDiscordChannel, 5000);
