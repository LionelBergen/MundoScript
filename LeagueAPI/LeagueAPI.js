const https = require('https');

// Riot specifies this as a sample regexp to validate names
// any visible Unicode letter characters, digits (0-9), spaces, underscores, and periods.
const NAME_REGEXP = '^[0-9\\p{L} _\\.]+$';
const GET_SUMMONER_BY_NAME_URL = 'https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/%name%?api_key=%apikey%';

module.exports = {
	getSummonerByName
}

function getURLSummonerByName(apiKey, summonerName)
{
	return GET_SUMMONER_BY_NAME_URL.replace('%name%', summonerName).replace('%apikey%', apiKey);
}

function getSummonerByName(apiKey, summonerName, callback)
{
	makeAnHTTPSCall(getURLSummonerByName(apiKey, summonerName), callback);
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
		callback(JSON.parse(data));
	  });

	// TODO: Errors are important, save to a database or Log file
	}).on("error", (err) => {
	  console.log("Error: " + err.message);
	});
}