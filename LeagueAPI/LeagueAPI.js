require('./classes');
const https = require('https');

// Riot specifies this as a sample regexp to validate names
// any visible Unicode letter characters, digits (0-9), spaces, underscores, and periods.
const NAME_REGEXP = new RegExp('^[0-9\\p{L} _\\.]+$');

const GET_SUMMONER_BY_NAME_URL = 'https://%region%.api.riotgames.com/lol/summoner/v4/summoners/by-name/%name%?api_key=%apikey%';
const GET_CHAMPION_MASTERY_URL = 'https://%region%.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/%name%?api_key=%apikey%';
const GET_CHAMPION_ROTATION_URL = 'https://%region%.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=%apikey%';
const GET_QUEUES_WITH_RANKS_URL = 'https://%region%.api.riotgames.com/lol/league/v4/positional-rank-queues?api_key=%apikey%';
const GET_STATUS_URL = 'https://%region%.api.riotgames.com/lol/status/v3/shard-data?api_key=%apikey%';
const GET_ACTIVE_GAME_URL = 'https://%region%.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/%name%?api_key=%apikey%';
const GET_MATCHLIST_URL = 'https://%region%.api.riotgames.com/lol/match/v4/matchlists/by-account/%accountid%?api_key=%apikey%'
const GET_MATCH_URL = 'https://%region%.api.riotgames.com/lol/match/v4/matches/%matchid%?api_key=%apikey%';

class LeagueAPI
{
	constructor(apiKey, region)
	{
		this.apiKey = apiKey;
		this.region = region;
	}
	
	changeRegion(region)
	{
		this.region = region;
	}
	
	getStatus(callback)
	{
		makeAnHTTPSCall(getURLStatus(this.apiKey, this.region), callback);
	}
	
	getMatch(matchId, callback)
	{
		makeAnHTTPSCall(getMatchURL(matchId, this.apiKey, this.region), callback);
	}
	
	getPositionalRankQueues(callback)
	{
		makeAnHTTPSCall(getURLQueuesWithRanks(this.apiKey, this.region), callback);
	}

	getSummonerByName(summonerName, callback)
	{
		makeAnHTTPSCall(getURLSummonerByName(summonerName, this.apiKey, this.region), function(data) {
			callback(LeagueAccountInfo.from(data));
		});
	}
	
	getActiveGames(accountObj, callback)
	{
		let summonerId = getSummonerIdFromParam(accountObj);
		
		makeAnHTTPSCall(getURLActiveGames(summonerId, this.apiKey, this.region), callback);
	}
	
	getMatchList(accountObj, callback)
	{
		let accountId = getAccountIdFromParam(accountObj);
		
		makeAnHTTPSCall(getURLMatchList(accountId, this.apiKey, this.region), callback);
	}

	getChampionMastery(accountObj, callback)
	{
		let summonerId = getSummonerIdFromParam(accountObj);
		
		makeAnHTTPSCall(getURLChampionMastery(summonerId, this.apiKey, this.region), function(data) {
			let championMasterObjects = [];
			for (var i=0; i < data.length; i++)
			{
				championMasterObjects.push(ChampionMastery.from(data[i]));
			}
			callback(championMasterObjects);
		});
	}
	
	getFreeChampionRotation(callback)
	{
		makeAnHTTPSCall(getURLChampRotation(this.apiKey, this.region), function(data) { 
			callback(ChampionRotation.from(data));
		});
	}
}

function getSummonerIdFromParam(param)
{
	summonerId = '';
	
	if (param instanceof LeagueAccountInfo)
	{
		summonerId = param.id;
	}
	else if (param instanceof String)
	{
		summonerId = param;
	}
	else
	{
		throw 'invalid argument, requires summonerId or LeagueAccountInfo object';
	}
	
	return summonerId;
}

function getAccountIdFromParam(param)
{
	accountId = '';
	
	if (param instanceof LeagueAccountInfo)
	{
		accountId = param.accountId;
	}
	else if (param instanceof String)
	{
		accountId = param;
	}
	else
	{
		throw 'invalid argument, requires accountId or LeagueAccountInfo object';
	}
	
	return accountId;
}

function getMatchURL(matchId, apiKey, region)
{
	return getURLWithRegionAndAPI(GET_MATCH_URL, apiKey, region).replace('%matchid%', matchId);
}

function getURLMatchList(summonerId, apiKey, region)
{
	return getURLWithRegionAndAPI(GET_MATCHLIST_URL, apiKey, region).replace('%accountid%', summonerId);
}

function getURLActiveGames(summonerId, apiKey, region)
{
	return getURLWithRegionAndAPI(GET_ACTIVE_GAME_URL, apiKey, region).replace('%name%', summonerId);
}

function getURLStatus(apiKey, region)
{
	return getURLWithRegionAndAPI(GET_STATUS_URL, apiKey, region);
}

function getURLQueuesWithRanks(apiKey, region)
{
	return getURLWithRegionAndAPI(GET_QUEUES_WITH_RANKS_URL, apiKey, region);
}

function getURLChampionMastery(summonerName, apiKey, region)
{
	return getURLWithRegionAndAPI(GET_CHAMPION_MASTERY_URL, apiKey, region).replace('%name%', summonerName);
}

function getURLSummonerByName(summonerName, apiKey, region)
{
	return getURLWithRegionAndAPI(GET_SUMMONER_BY_NAME_URL, apiKey, region).replace('%name%', summonerName);
}

function getURLChampRotation(apiKey, region)
{
	return getURLWithRegionAndAPI(GET_CHAMPION_ROTATION_URL, apiKey, region);
}

// All endpoint URL's contain APIKey and Region
function getURLWithRegionAndAPI(url, apiKey, region)
{
	return url.replace('%apikey%', apiKey).replace('%region%', region);
}

function hasError(jsonData)
{
	return jsonData.status ? true : false;
}

function makeAnHTTPSCall(URL, callback)
{
	https.get(URL, (resp) => {
	  let data = '';

	  // A chunk of data has been recieved.
	  resp.on('data', (chunk) => {
		data += chunk;
	  });

	  // The whole response has been received.
	  resp.on('end', () => {
		  	let parsedData = JSON.parse(data);

			if (hasError(parsedData))
			{
				console.log('failed: ');
				console.log(parsedData);
			}
			else
			{
				callback(parsedData);
			}
	  });

	// TODO: Errors are important, save to a database or Log file
	}).on("error", (err) => {
	  console.log("Error: " + err.message);
	});
}

module.exports = LeagueAPI;