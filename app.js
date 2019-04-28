require('./LeagueAPI/classes');
const APIKeys = require('./apiKeys.js');
let LeagueAPI = require('./LeagueAPI/LeagueAPI.js');
LeagueAPI = new LeagueAPI(APIKeys.LeagueApiKey, Region.NA);

// Example usage:
/*LeagueAPI.getSummonerByName('LeagueOfSausage').then(function(data) {
	return LeagueAPI.getMatchList(data);
})
.then(console.log)
.catch(console.log);*/

var summonerObject;

LeagueAPI.getSummonerByName('LeagueOfSausage').then(function(data) {
	summonerObject = data;
	return LeagueAPI.getActiveGames(data);
})
.then(console.log)
.catch(console.log);


/*Promise.all([LeagueAPI.getSummonerByName(), LeagueAPI.getMatchList()]).then(function(result) {
	console.log(result);
}).catch(console.log);
*/