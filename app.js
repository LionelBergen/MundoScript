const APIKeys = require('./apiKeys.js');
let LeagueAPI = require('./LeagueAPI/LeagueAPI.js');
LeagueAPI = new LeagueAPI(APIKeys.LeagueApiKey, Region.NA);

//LeagueAPI.getFreeChampionRotation(console.log);

// test gameId = 2970053337
/*LeagueAPI.getMatch(2970053337, function(data) { 
	console.log(data);
	for (var i = 0; i < data.length; i++)
	{
		console.log(data[i]);
	}
});*/

LeagueAPI.getSummonerByName('LeagueOfSausage', function(e) {
	LeagueAPI.getMatchList(e, function(d) { console.log(d); })
});

//console.log(Region.NA);