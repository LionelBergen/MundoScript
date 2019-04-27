require('./LeagueAPI/classes');
const APIKeys = require('./apiKeys.js');
let LeagueAPI = require('./LeagueAPI/LeagueAPI.js');
LeagueAPI = new LeagueAPI(APIKeys.LeagueApiKey, Region.NA);

/*LeagueAPI.getSummonerByName('LeagueOfSausage', function(accountInfo) {
	LeagueAPI.getChampionMastery(accountInfo, console.log);
	LeagueAPI.getChampionMasteryByChampion(accountInfo, Champion.DRMUNDO, console.log);
});*/

LeagueAPI.getStatus().then(console.log).catch(console.log);



// TODO: add mapping classes
//LeagueAPI.getMatch(3027357391, console.log);
//LeagueAPI.getFeaturedGames(console.log);
//LeagueAPI.getMatchTimeline(3027357391, console.log);