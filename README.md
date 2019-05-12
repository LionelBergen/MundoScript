# LeagueAPIWrapper (Node.JS)
Simple Wrapper for all League Of Legends API methods

![https://www.npmjs.com/package/leagueapiwrapper](https://nodei.co/npm/leagueapiwrapper.png)

<details><summary>Example get accountInfo object to be used in other methods:</summary>

<p>

####

```javascript
let LeagueAPI = require('leagueapiwrapper');
LeagueAPI = new LeagueAPI(leagueAPIKey, Region.NA);

LeagueAPI.getSummonerByName('LeagueOfSausage')
    .then(function(accountInfo) {
        // do something with accountInfo
	console.log(accountInfo);
    })
    .catch(console.log);
```
</p>
</details>

*Feel free to make suggestions on features/etc.*
