/*
to use for latest patch
*/

/*
replace wood with copper
*/
update playerList set playerRank = 'Copper I' where playerRank = 'Wood I'
update playerList set playerRank = 'Copper II' where playerRank = 'Wood II'
update playerList set playerRank = 'Copper III' where playerRank = 'Wood III'

update playerHistory set playerRank = 'Copper I' where playerRank = 'Wood I'
update playerHistory set playerRank = 'Copper II' where playerRank = 'Wood II'
update playerHistory set playerRank = 'Copper III' where playerRank = 'Wood III'