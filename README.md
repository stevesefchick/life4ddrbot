# LIFE4 BOT/BACKEND CODE
## APIs
### GET ALL PLAYERS
```
/api/players/all
```
This API returns a list of all players.

### GET SINGLE PLAYER
```
/api/player?name=[name]
```
This API returns basic information for a single player.
The "name" query must be passed to the API call.

### GET TOP TRIALS
```
/api/trial?name=[trialname]&limit=[limit]
```
This API accepts any trial using all lowercase without the number entries. For example: "HEARTBREAK (12)" is entered in the API as "heartbreak". 
The "trialname" query is required and defines the trial queried.
The "limit" query is optional, and returns the number of top results.