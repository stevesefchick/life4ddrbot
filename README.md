# LIFE4 BOT/BACKEND CODE
## APIs
### GET ALL PLAYERS
```
/api/players/all
```
This API returns a list of all players.

### GET SINGLE PLAYER
```
/api/player/[name]
```
This API returns basic information for a single player.

### GET TOP TRIALS
```
/api/trial/[trialname]/[topnumber]
```
This API accepts any trial using all lowercase without the number entries. For example: "HEARTBREAK (12)" is entered in the API as "heartbreak". The top number is the limit of results to return (Top 5, Top 10, etc.).