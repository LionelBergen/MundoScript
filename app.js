require('./LeagueAPI/classes');
const APIKeys = require('./apiKeys.js');
let LeagueAPI = require('./LeagueAPI/LeagueAPI.js');
LeagueAPI = new LeagueAPI(APIKeys.LeagueApiKey, Region.NA);

// Example usage:
LeagueAPI.getSummonerByName().then(function(data) {
	return LeagueAPI.getMatchList(data);
})
.then(console.log)
.catch(console.log);