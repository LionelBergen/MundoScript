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

<details><summary>Get featured games, populated with DDRagon data</summary>

<p>

####

```javascript
LeagueAPI.initialize()
    .then(function(){ return LeagueAPI.getFeaturedGames() })
    .then(function(data) {
        console.log(data);
    })
    .catch(console.log);
```
</p>
</details>


# Disclaimer

`MundoScript` is **not** endorsed by Riot Games and does **not** reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.


*Feel free to make suggestions on features/etc.*
