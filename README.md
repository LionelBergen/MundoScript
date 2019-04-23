# LeagueReddit
Wrapper for all API methods

Usage:
let LeagueAPI = require('./LeagueAPI/LeagueAPI.js');
LeagueAPI = new LeagueAPI(LeagueApiKey, Region.NA);

LeagueAPI.getSummonerByName('LeagueOfSausage', function(e) {
	console.log(e);
});

Still underconstruction goal is to have all API calls included. Master branch should always be in a working state.

Feel free to make suggestions on features/etc.
