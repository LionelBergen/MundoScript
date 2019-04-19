const APIKeys = require('./apiKeys.js');
const LeagueAPI = require('./LeagueAPI/LeagueAPI.js');

LeagueAPI.getSummonerByName(APIKeys.LeagueApiKey, 'LeagueOfSausage', function(e) { console.log(e); });

