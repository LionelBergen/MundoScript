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

# Methods

<details><summary>initialize</summary>

<p>

####

```javascript
LeagueAPI.initialize()
    .then() {
        // Objects will now contain full objects, instead of id's. 
	// E.G from 'mapId: 12' to 'mapObject: { id: 12 name: howlingAbyss ... }'
    })
    .catch(console.log);
```
</p>
</details>

####

<details><summary>setFullyLoadClasses(boolean)</summary>

<p>

####

```javascript
// Setting initialize() sets to true.
// Must call initialize if setting this to true
LeagueAPI.setFullyLoadClasses(false);
```
</p>
</details>

<details><summary>changeRegion(Region)</summary>

<p>

####

```javascript
// Changed Region for API calls
LeagueAPI.changeRegion(Region.NA);
```
</p>
</details>


####

<details><summary>getThirdPartyCode(AccountObject)</summary>

<p>

####

```javascript
LeagueAPI.getSummonerByName('LeagueOfSausage')
	.then(function(accountInfo) { return LeagueAPI.getThirdPartyCode(accountInfo) })
	.then(function(data) {
		console.log(data);
	})
	.catch(console.log);
```
</p>
</details>


####

<details><summary>getStatus()</summary>
	
<p>
	
####
```javascript
// Returns the status of the LeagueAPI endpoints 
LeagueAPI.getStatus()
	.then(console.log)
	.catch(console.log);
```
</p>
</details>

<details><summary>getFeaturedGames()</summary>
	
<p>
	
####
```javascript
// Returns the current featured games on League
LeagueAPI.getFeaturedGames()
	.then(console.log)
	.catch(console.log);
```
</p>
</details>

<details><summary>getMatch(matchId)</summary>
	
<p>
	
####
```javascript
// matchId taken from a getMatchList call
// Gets the MAtch object for the ID passed
LeagueAPI.getMatch(2970107953)
	.then(console.log)
	.catch(console.log);
```
</p>
</details>


# Disclaimer

`MundoScript` is **not** endorsed by Riot Games and does **not** reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.


*Feel free to make suggestions on features/etc.*
