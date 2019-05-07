require('./LeagueAPI/classes');
const APIKeys = require('./apiKeys.js');
let LeagueAPI = require('./LeagueAPI/LeagueAPI.js');

LeagueAPI = new LeagueAPI(APIKeys.LeagueApiKey, Region.NA);

// Test without initialize: 
//LeagueAPI.getMatch(3036405264).then(console.log).catch(console.log);

// Test with initialize:
LeagueAPI.initialize().then(function() {
	//LeagueAPI.getFeaturedGames().then(console.log).catch(console.log);
	//LeagueAPI.getMatch(3036405264).then(console.log).catch(console.log);
	//LeagueAPI.getPositionalRankQueues().then(console.log).catch(console.log);
	
	//LeagueAPI.getMatchTimeline(3036405264).then(console.log).catch(console.log);
	//LeagueAPI.getFreeChampionRotation().then(console.log).catch(console.log);
	
	return LeagueAPI.getSummonerByName('LeagueOfSausage');
})
.then(function(accountObject) {
	//console.log(accountObject);
	//LeagueAPI.getActiveGames(accountObject).then(console.log).catch(console.log);
	//LeagueAPI.getMatchList(accountObject).then(console.log).catch(console.log);
	
	//LeagueAPI.getChampionMasteryTotal(accountObject).then(console.log).catch(console.log);
	
	LeagueAPI.getChampionMastery(accountObject).then(function(data) {
		let trynd = data[0].championObject;
		
		LeagueAPI.getChampionMasteryByChampion(accountObject, trynd).then(console.log).catch(console.log);
	}).catch(console.log);
	
	/*LeagueAPI.getThirdPartyCode(accountObject).then(function(data) {
		console.log('get third party code:');
		console.log(data);
	}).catch(console.log);
	
	LeagueAPI.getStatus().then(function(data) {
		console.log('get status:');
		console.log(data);
	}).catch(console.log);
	
	LeagueAPI.getFeaturedGames().then(function(data) {
		console.log('get featured games:');
		console.log(data);
	}).catch(console.log);*/
	
	//return accountObject;
	
	/*LeagueAPI.getFeaturedGames().then(function(data) { 
		console.log(data);
	});*/
	
	/*LeagueAPI.getMatch('3036405264').then(function(data) {
		console.log(data.participantIdentities[0]);
	});*/
	
	/*LeagueAPI.getPositionalRankQueues().then(function(data) {
		console.log(data);
	});*/
})
.catch(console.log);





// Example usage:
/*LeagueAPI.getSummonerByName('LeagueOfSausage').then(function(data) {
	return LeagueAPI.getMatchList(data);
})
.then(console.log)
.catch(console.log);*/