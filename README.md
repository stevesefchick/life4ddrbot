# LIFE4 BOT/BACKEND CODE
## APIs
### GET ALL PLAYERS
```
GET
/api/players/all
```
This API returns a list of all players.

### GET SINGLE PLAYER
```
GET
/api/player?name=[name]
```
This API returns basic information for a single player.
The "name" query must be passed to the API call.

### GET TOP TRIALS
```
GET
/api/trial?name=[trialname]&limit=[limit]
```
This API accepts any trial using all lowercase without the number entries. For example: "HEARTBREAK (12)" is entered in the API as "heartbreak". 
The "trialname" query is required and defines the trial queried.
The "limit" query is optional, and returns the number of top results.


### GET APP STATUS
```
GET
/api/app/status
```
This API returns the current bot status. "ON" is the normal state, where it will run every time the heroku schedule kicks off. "OFF" is a manual state in which the app is temporarily off while updates are being made.