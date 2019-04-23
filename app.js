require('./LeagueAPI/classes');
const APIKeys = require('./apiKeys.js');
let LeagueAPI = require('./LeagueAPI/LeagueAPI.js');
LeagueAPI = new LeagueAPI(APIKeys.LeagueApiKey, Region.NA);

console.log('--- testing getSummonerByName ---');
LeagueAPI.getSummonerByName('LeagueOfSausage', function(accountInfo) {
	console.log(accountInfo);
	
	console.log('--- testing getChampionMasteryTotal ---');
	LeagueAPI.getChampionMasteryTotal(accountInfo, function(thirdPartyCodeInfo) { 
		console.log(thirdPartyCodeInfo);
	});
});