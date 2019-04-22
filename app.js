const APIKeys = require('./apiKeys.js');
let LeagueAPI = require('./LeagueAPI/LeagueAPI.js');
LeagueAPI = new LeagueAPI(APIKeys.LeagueApiKey);

LeagueAPI.getChampionMastery('n-zcEtpy2E4JUt8AksUMpkEB9SsBw51-6b6rDF27wvZ1YYw', function(e) { console.log(e); });
