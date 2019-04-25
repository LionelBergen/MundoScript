# LeagueAPIWrapper (Node.JS)
Wrapper for all API methods

Usage:
```
let LeagueAPI = require('./LeagueAPI/LeagueAPI.js');
LeagueAPI = new LeagueAPI(LeagueApiKey, Region.NA);

LeagueAPI.getSummonerByName('LeagueOfSausage', function(e) {
	console.log(e);
});

```

*App.js is used for my own testing. Will be changed to an example usage file in the future.*

*Still underconstruction goal is to have all API calls included. 
Master branch should always be in a working state.*

*Feel free to make suggestions on features/etc.*
