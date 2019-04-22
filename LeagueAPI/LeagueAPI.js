require('./classes');
const https = require('https');

// Riot specifies this as a sample regexp to validate names
// any visible Unicode letter characters, digits (0-9), spaces, underscores, and periods.
const NAME_REGEXP = '^[0-9\\p{L} _\\.]+$';
const GET_SUMMONER_BY_NAME_URL = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/%name%?api_key=%apikey%';
const GET_CHAMPION_MASTERY_URL = 'https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/%name%?api_key=%apikey%';

class LeagueAPI
{
	constructor(apiKey)
	{
		this.apiKey = apiKey;
	}

	getSummonerByName(summonerName, callback)
	{
		makeAnHTTPSCall(getURLSummonerByName(this.apiKey, summonerName), LeagueAccountInfo, callback);
	}

	getChampionMastery(summonerName, callback)
	{
		makeAnHTTPSCall(getURLChampionMastery(this.apiKey, summonerName), LeagueAccountInfo, callback);
	}
}

function getURLChampionMastery(apiKey, summonerName)
{
	return GET_CHAMPION_MASTERY_URL.replace('%name%', summonerName).replace('%apikey%', apiKey);
}

function getURLSummonerByName(apiKey, summonerName)
{
	return GET_SUMMONER_BY_NAME_URL.replace('%name%', summonerName).replace('%apikey%', apiKey);
}

function hasError(jsonData)
{
	return jsonData.status ? true : false;
}

function makeAnHTTPSCall(URL, objectType, callback)
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
			  callback(objectType.from(parsedData));
		  }
	  });

	// TODO: Errors are important, save to a database or Log file
	}).on("error", (err) => {
	  console.log("Error: " + err.message);
	});
}

module.exports = LeagueAPI;