require('./classes');
const https = require('./HttpsCaller');

// Riot specifies this as a sample regexp to validate names
// any visible Unicode letter characters, digits (0-9), spaces, underscores, and periods.
const NAME_REGEXP = new RegExp('^[0-9\\p{L} _\\.]+$');

// Champion-Mastery V4
const GET_CHAMPION_MASTERY_URL = 'https://%region%.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/%name%?api_key=%apikey%';
const GET_CHAMPION_MASTERY_WITH_CHAMPION_URL = 'https://%region%.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/%name%/by-champion/%championid%?api_key=%apikey%';
const GET_CHAMPION_MASTER_TOTAL_URL = 'https://%region%.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/%name%?api_key=%apikey%';

// CHAMPION-V3
const GET_CHAMPION_ROTATION_URL = 'https://%region%.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=%apikey%';

// CLASH-V1 (2/5)
const GET_CLASH_BY_SUMMONER_ID_URL = 'https://%region%.api.riotgames.com/lol/clash/v1/players/by-summoner/%summoner_id%?api_key=%apikey%';
const GET_CLASH_TOURNAMENTS_URL = 'https://%region%.api.riotgames.com/lol/clash/v1/tournaments?api_key=%apikey%';

// LEAGUE-EXP-V4 (0/1) Not gunna bother with this, says it's experimental

// LEAGUE-V4 (1/6)
const GET_LEAGUE_BY_SUMMONER_URL = 'https://%region%.api.riotgames.com/lol/league/v4/entries/by-summoner/%summoner_id%?api_key=%apikey%';

// LOL-STATUS-V3
const GET_STATUS_URL = 'https://%region%.api.riotgames.com/lol/status/v3/shard-data?api_key=%apikey%';

// MATCH-V4
const GET_MATCH_URL = 'https://%region%.api.riotgames.com/lol/match/v4/matches/%matchid%?api_key=%apikey%';
const GET_MATCHLIST_URL = 'https://%region%.api.riotgames.com/lol/match/v4/matchlists/by-account/%accountid%?api_key=%apikey%'
const GET_MATCH_TIMELINE_URL = 'https://%region%.api.riotgames.com/lol/match/v4/timelines/by-match/%matchid%?api_key=%apikey%';
const GET_MATCH_BY_TOURNAMENT_CODE_URL = 'https://%region%.api.riotgames.com/lol/match/v4/matches/by-tournament-code/%tournamentcode%/ids?api_key=%apikey%';
const GET_MATCH_BY_MATCH_ID_AND_TOURNAMNET_CODE_URL = 'https://%region%.api.riotgames.com/lol/match/v4/matches/%matchid%/by-tournament-code/%tournamentcode%?api_key=%apikey%';

// SPECTATOR-v4
const GET_ACTIVE_GAME_URL = 'https://%region%.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/%name%?api_key=%apikey%';
const GET_FEATURED_GAMES_URL = 'https://%region%.api.riotgames.com/lol/spectator/v4/featured-games?api_key=%apikey%';

// SUMMONOR-V4 (1/4, rest are get by accountId, puuid, summonerId)
const GET_SUMMONER_BY_NAME_URL = 'https://%region%.api.riotgames.com/lol/summoner/v4/summoners/by-name/%name%?api_key=%apikey%';

// THIRD_PARTY_CODE-V4
const GET_THIRD_PARTY_CODE_URL = 'https://%region%.api.riotgames.com/lol/platform/v4/third-party-code/by-summoner/%summonerid%?api_key=%apikey%';

// TOURNAMENT-STUB-V4
// TOURNAMENT-V4

let map;
let summoner;
let champion;
let team;
let profileIcon;
let runes;
let fullPerks;

class LeagueAPI
{
	constructor(apiKey, region)
	{
		this.apiKey = apiKey;
		this.region = region;
		this.fullyLoadClasses = false;
	}
	
	/**
	 * Uses local or DDragon JSON files to create Objects used in results
	 * For example, this will changed 'mapId: 12' to 'mapObject: { id: 12 name: howlingAbyss ... }
	*/
	initialize()
	{
		var thisPointer = this;
		return new Promise(function(resolve, reject) {
      const getClassesDataFromJSON = require('./LeagueClassHandler.js');
      
			getClassesDataFromJSON().then(function(leagueClasses) {
				map = leagueClasses.map;
				summoner = leagueClasses.summoner;
				champion = leagueClasses.champion;
				team = leagueClasses.team;
				profileIcon = leagueClasses.profileIcon;
				runes = leagueClasses.runes;
				fullPerks = leagueClasses.fullPerks;
			})
			.then(function() {
				console.log('Set fully load classes to true');
				thisPointer.fullyLoadClasses = true;
				resolve();
			})
			.catch(reject);
		});
	}
	
	setFullyLoadClasses(fullyLoadClasses)
	{
		this.fullyLoadClasses = fullyLoadClasses;
	}
	
	changeRegion(region)
	{
		this.region = region;
	}
	
	getThirdPartyCode(accountObj)
	{
		let summonerId = getSummonerIdFromParam(accountObj);
		
		return makeAnHTTPSCall(getThirdPartyCode(summonerId, this.apiKey, this.region));
	}
	
	getStatus()
	{
		return makeAnHTTPSCall(getURLStatus(this.apiKey, this.region));
	}
	
	getFeaturedGames()
	{
		return createPromiseContainingLoadedData(getURLFeaturedGames(this.apiKey, this.region), this.fullyLoadClasses);
	}
	
	getMatch(matchId)
	{
		const apiKey = this.apiKey;
		const region = this.region;
		
		return createPromiseContainingLoadedData(getMatchURL(matchId, this.apiKey, this.region), this.fullyLoadClasses);
	}
	
	getMatchByTournament(matchId, tournamentCode)
	{
		const url = getURLMatchByTournamentCodeAndMatchId(tournamentCode, matchId, this.apiKey, this.region);
		return createPromiseContainingLoadedData(url, this.fullyLoadClasses);
	}
	
	getMatchIdsByTournament(tournamentCode)
	{
		const url = getURLMatchByTournamentCode(tournamentCode, this.apiKey, this.region);
		return createPromiseContainingLoadedData(url, this.fullyLoadClasses);
	}

	getSummonerByName(summonerName)
	{
		const url = getURLSummonerByName(summonerName, this.apiKey, this.region);
		
		return createPromiseContainingLoadedData(url, this.fullyLoadClasses, LeagueAccountInfo);
	}
	
	getActiveGames(accountObj)
	{
		const summonerId = getSummonerIdFromParam(accountObj);
		const url = getURLActiveGames(summonerId, this.apiKey, this.region);
		
		return createPromiseContainingLoadedData(url, this.fullyLoadClasses, MatchInfo);
	}
	
	getMatchList(accountObj)
	{
		const accountId = getAccountIdFromParam(accountObj);
		const url = getURLMatchList(accountId, this.apiKey, this.region);
		
		return createPromiseContainingLoadedData(url, this.fullyLoadClasses);
	}
	
	getMatchTimeline(matchId)
	{
		return makeAnHTTPSCall(getURLMatchTimeline(matchId, this.apiKey, this.region));
	}
  
  getLeagueRanking(accountObj) 
  {
		const summonerId = getSummonerIdFromParam(accountObj);
    const url = getURLLeagueBySummoner(summonerId, this.apiKey, this.region);
    
    return makeAnHTTPSCall(url);
  }
	
	getChampionMasteryTotal(accountObj)
	{
		let summonerId = getSummonerIdFromParam(accountObj);
		
		return makeAnHTTPSCall(getURLMasteryTotal(summonerId, this.apiKey, this.region));
	}

	getChampionMastery(accountObj)
	{
		const summonerId = getSummonerIdFromParam(accountObj);
		const apiKey = this.apiKey;
		const region = this.region;
		
		return createPromiseContainingLoadedData(getURLChampionMastery(summonerId, apiKey, region), this.fullyLoadClasses);
	}
	
	getChampionMasteryByChampion(accountObj, championObj)
	{
		const summonerId = getSummonerIdFromParam(accountObj);
		const championId = getChampionIdFromParam(championObj);
		const url = getURLChampionMasteryByChampion(summonerId, championId, this.apiKey, this.region);
		
		return createPromiseContainingLoadedData(url, this.fullyLoadClasses);
	}
  
  getClash(accountObj)
  {
    const summonerId = getSummonerIdFromParam(accountObj);
    
    return makeAnHTTPSCall(getURLClashBySummonerId(summonerId, this.apiKey, this.region));
  }
  
  getClashTournament()
  {
    const url = getURLClashTournament(this.apiKey, this.region);

    return makeAnHTTPSCall(url);
  }
	
	getFreeChampionRotation()
	{
		return createPromiseContainingLoadedData(getURLChampRotation(this.apiKey, this.region), this.fullyLoadClasses);
	}
}

function createPromiseContainingLoadedData(url, fullyLoadClasses, objectMappingClass)
{
	return new Promise(function(resolve, reject) {
		makeAnHTTPSCall(url)
		.then(function(data) 
		{
			if (objectMappingClass)
			{
				data = objectMappingClass.from(data);
			}
			loadObject(data, fullyLoadClasses);
			resolve(data);
		})
		.catch(reject);
	});
}

function loadObject(data, fullyLoadClasses)
{
	if (fullyLoadClasses)
	{
		replaceObjectKeysWithValues(data);
	}
}

function getChampionIdFromParam(param)
{
	championId = getNumberFromParam(param);
	
	if (!championId)
	{
		championId = getNumberFromParam(param.key);
		
		if (!championId)
		{
			championId = getNumberFromParam(param.championId)
			
			if (!championId)
			{
				throw 'invalid argument, requires championId or Champion object';
			}
		}
	}
	
	return championId;
}

function getSummonerIdFromParam(param)
{
	summonerId = '';
	
	if (param instanceof LeagueAccountInfo)
	{
		summonerId = getStringFromParam(param.id);
	}
	else
	{
		summonerId = getStringFromParam(param);
	}
	
	if (!summonerId)
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
		accountId = getStringFromParam(param.accountId);
	}
	else
	{
		accountId = getStringFromParam(param);
	}
	
	if (!accountId)
	{
		throw 'invalid argument, requires accountId or LeagueAccountInfo object';
	}
	
	return accountId;
}

function getStringFromParam(param)
{
	let paramType = typeof param;
	
	if (param && paramType == 'string')
	{
		return param;
	}
}

function getNumberFromParam(param)
{
	let paramType = typeof param;
	
	if (param && (paramType == 'string' || paramType == 'number') && isNumeric(param))
	{
		return param;
	}
}

function getMatchURL(matchId, apiKey, region)
{
	return getURLWithRegionAndAPI(GET_MATCH_URL, apiKey, region).replace('%matchid%', matchId);
}

function getURLMatchList(summonerId, apiKey, region)
{
	return getURLWithRegionAndAPI(GET_MATCHLIST_URL, apiKey, region).replace('%accountid%', summonerId);
}

function getURLMatchTimeline(matchId, apiKey, region)
{
	return getURLWithRegionAndAPI(GET_MATCH_TIMELINE_URL, apiKey, region).replace('%matchid%', matchId);
}

function getURLMatchByTournamentcode(tournamentCode, apiKey, region)
{
	return getURLWithRegionAndAPI(GET_MATCH_BY_TOURNAMENT_CODE_URL, apiKey, region).replace('%tournamentcode%', tournamentCode);
}

function getURLMatchByTournamentCodeAndMatchId(tournamentCode, matchId, apiKey, region)
{
	return getURLWithRegionAndAPI(GET_MATCH_BY_MATCH_ID_AND_TOURNAMNET_CODE_URL, apiKey, region).replace('%tournamentcode%', tournamentCode).replace('%matchid', matchId);
}

function getURLMasteryTotal(summonerId, apiKey, region)
{
	return getURLWithRegionAndAPI(GET_CHAMPION_MASTER_TOTAL_URL, apiKey, region).replace('%name%', summonerId);
}

function getURLActiveGames(summonerId, apiKey, region)
{
	return getURLWithRegionAndAPI(GET_ACTIVE_GAME_URL, apiKey, region).replace('%name%', summonerId);
}

function getURLFeaturedGames(apiKey, region)
{
	return getURLWithRegionAndAPI(GET_FEATURED_GAMES_URL, apiKey, region);
}

function getURLLeagueBySummoner(summonerId, apiKey, region)
{
  return getURLWithRegionAndAPI(GET_LEAGUE_BY_SUMMONER_URL, apiKey, region).replace('%summoner_id%', summonerId);
}

function getURLStatus(apiKey, region)
{
	return getURLWithRegionAndAPI(GET_STATUS_URL, apiKey, region);
}

function getURLChampionMastery(summonerName, apiKey, region)
{
	return getURLWithRegionAndAPI(GET_CHAMPION_MASTERY_URL, apiKey, region).replace('%name%', summonerName);
}

function getURLChampionMasteryByChampion(summonerName, championId, apiKey, region)
{
	return getURLWithRegionAndAPI(GET_CHAMPION_MASTERY_WITH_CHAMPION_URL, apiKey, region).replace('%name%', summonerName).replace('%championid%', championId);
}

function getURLSummonerByName(summonerName, apiKey, region)
{
	return getURLWithRegionAndAPI(GET_SUMMONER_BY_NAME_URL, apiKey, region).replace('%name%', summonerName);
}

function getURLChampRotation(apiKey, region)
{
	return getURLWithRegionAndAPI(GET_CHAMPION_ROTATION_URL, apiKey, region);
}

/** CLASH-V1 **/
function getURLClashBySummonerId(summonerId, apiKey, region)
{
  return getURLWithRegionAndAPI(GET_CLASH_BY_SUMMONER_ID_URL, apiKey, region).replace('%summoner_id%', summonerId);
}

function getURLClashTournament(apiKey, region)
{
  return getURLWithRegionAndAPI(GET_CLASH_TOURNAMENTS_URL, apiKey, region);
}
/** end CLASH-V1 **/

function getThirdPartyCode(summonerId, apiKey, region)
{
	return getURLWithRegionAndAPI(GET_THIRD_PARTY_CODE_URL, apiKey, region).replace('%summonerid%', summonerId);
}

// All endpoint URL's contain APIKey and Region
function getURLWithRegionAndAPI(url, apiKey, region)
{
	return url.replace('%apikey%', apiKey).replace('%region%', region);
}

function isNumeric(n) 
{
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function makeAnHTTPSCall(url)
{
	return https.makeAnHTTPSCall(url);
}

// Replaces object values such as MapId = 12 with the corresponding Object, such as MapId = { Howling abyss... };
// TODO: Load the returned values from map, summoner, etc.
function replaceObjectKeysWithValues(obj) 
{
	replaceObjectFoundByKey(obj, 'teamId', 'team', team);
	replaceObjectFoundByKeyRunes(obj);
	replaceObjectFoundByKey(obj, 'mapId', 'mapObject', map);
	replaceObjectFoundByKey(obj, 'spell1Id', 'spell1', summoner);
	replaceObjectFoundByKey(obj, 'spell2Id', 'spell2', summoner);
	replaceObjectFoundByKey(obj, 'championId', 'championObject', champion);
	replaceObjectFoundByKey(obj, 'champion', 'championObject', champion);
	replaceObjectFoundByKey(obj, 'freeChampionIds', 'freeChampions', champion);
	replaceObjectFoundByKey(obj, 'freeChampionIdsForNewPlayers', 'freeChampionsForNewPlayers', champion);
	
	replaceObjectFoundByKey(obj, 'profileIconId', 'profileIconObject', profileIcon);
	replaceObjectFoundByKey(obj, 'profileIcon', 'profileIconObject', profileIcon);
}

// Runes have many functions to find by keys
function replaceObjectFoundByKeyRunes(obj)
{
	const pointersToObjectsFound = [];
	
	for (var key in obj) 
	{
		var value = obj[key];

    if (typeof value === 'object') 
    {
      replaceObjectFoundByKeyRunes(value);
    }

		if (key === 'perkIds')
		{
			obj[key] = fullPerks.getByPerkIds(obj[key]);
			renamePropertyOnObject(obj, 'perkIds', 'perkObjects');
    }
		else if (key == 'perkStyle' || key == 'perkSubStyle')
		{
			obj[key] = runes.getByKey(obj[key]);
			// don't rename the key
			renamePropertyOnObject(obj, 'key', 'key');
		}
  }
	
	return pointersToObjectsFound;
}

function replaceObjectFoundByKey(obj, oldkey, newKey, classContainingReplacement)
{
	const pointersToObjectsFound = [];
	
	for (var key in obj) 
	{
		var value = obj[key];
    
    if (typeof value === 'object') 
    {
        replaceObjectFoundByKey(value, oldkey, newKey, classContainingReplacement);
    }

    if (key === oldkey) 
    {
		  obj[key] = classContainingReplacement.getByKey(obj[key]);
		  renamePropertyOnObject(obj, key, newKey);
    }
  }
	
	return pointersToObjectsFound;
}

function renamePropertyOnObject(object, oldKey, newKey)
{
	if (oldKey !== newKey) 
	{
		Object.defineProperty(object, newKey,
		Object.getOwnPropertyDescriptor(object, oldKey));
		delete object[oldKey];
	}
}

module.exports = LeagueAPI;
