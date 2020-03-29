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
// Objects will now contain full objects, instead of id's. 
// E.G from 'mapId: 12' to 'mapObject: { id: 12 name: howlingAbyss ... }'
LeagueAPI.initialize()
    .then() {
    	// LeagueAPI returned objects will now have details from DDRagon API.
    })
    .catch(console.log);
```
</p>
</details>

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
// Returns thirdPartyCode. Note: will 'Forbidden' if no thirdPartyCode is available for the accountInfo/accountId
// Note: I don't have an accountId example that works here
LeagueAPI.getThirdPartyCode(accountId)
	.then(function(data) {
		console.log(data);
	})
	.catch(console.log);
```
</p>
</details>

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
// Gets the Match object for the ID passed
LeagueAPI.getMatch(2970107953)
	.then(console.log)
	.catch(console.log);
```
</p>
</details>

<details><summary>getMatchByTournament(matchId, tournamentCode)</summary>
	
<p>
	
####
```javascript
// Gets the Match object for the ID passed with tournamentCode. Note: I don't have an example tournament code
LeagueAPI.getMatchByTournament(2970107953, tournamentCode)
	.then(console.log)
	.catch(console.log);
```
</p>
</details>

<details><summary>getMatchIdsByTournament(tournamentCode)</summary>
	
<p>

####
```javascript
// Gets the Match ids for the tournamentCode. Note: I don't have an example tournament code
LeagueAPI.getMatchIdsByTournament(tournamentCode)
	.then(console.log)
	.catch(console.log);
```
</p>
</details>

<details><summary>getClash(accountObj)</summary>
	
<p>

####
```javascript
LeagueAPI.getClash(accountObj)
	.then(console.log)
	.catch(console.log);
```
</p>
</details>

<details><summary>getClashTournament()</summary>

<p>

####
```javascript
LeagueAPI.getClashTournament()
	.then(console.log)
	.catch(console.log);
```
</p>
</details>

<details><summary>getLeagueRanking(accountObject)</summary>

<p>

####
```javascript
LeagueAPI.getSummonerByName('LeagueOfDrMundo').then(function(accountObject) {
	LeagueAPI.getLeagueRanking(accountObject)
		.then(console.log)
		.catch(console.log);
});
```
</p>
</details>

<details><summary>getSummonerByName(summonerName)</summary>
	
<p>

####
```javascript
// Returns an accountObject which can be used in other methods, or view account information on
LeagueAPI.getSummonerByName('LeagueOfDrMundo')
	.then(function(accountObject) {
		console.log(accountObject);
	})
	.catch(console.log);
```
</p>
</details>

<details><summary>getActiveGames(accountObject)</summary>
	
<p>
	
####
```javascript
LeagueAPI.getSummonerByName('LeagueOfDrMundo')
	.then(function(accountObject) {
		// Gets active games. Will return 404 if not currently in an active game
		return LeagueAPI.getActiveGames(accountObject);
	})
	.then(function(activeGames) { 
		console.log(activeGames);
	})
	.catch(console.log);
```
</p>
</details>

<details><summary>getMatchList(accountObject)</summary>
	
<p>
	
####
```javascript
LeagueAPI.getSummonerByName('LeagueOfDrMundo')
	.then(function(accountObject) {
		// Gets match list for the account
		return LeagueAPI.getMatchList(accountObject);
	})
	.then(function(activeGames) { 
		console.log(activeGames);
	})
	.catch(console.log);
```
</p>
</details>

<details><summary>getMatchTimeline(matchId)</summary>
	
<p>
	
####
```javascript
// Returns a timeline of the match
LeagueAPI.getMatchTimeline(3026936146)
	.then(console.log)
	.catch(console.log);
```
</p>
</details>

<details><summary>getChampionMasteryTotal(accountObject)</summary>
	
<p>
	
####
```javascript
LeagueAPI.getSummonerByName('LeagueOfSausage')
	.then(function(accountObj) {
		// Returns the total champion master (sum of all champion mastery for all champions)
		return LeagueAPI.getChampionMasteryTotal(accountObj);
	})
	.then(function(championMasteryTotal)
	{
		console.log(championMasteryTotal);
	})
	.catch(console.log);
```
</p>
</details>

<details><summary>getChampionMastery(accountObject)</summary>
	
<p>
	
####
```javascript
LeagueAPI.getSummonerByName('LeagueOfDrMundo')
	.then(function(accountObj) {
		// Returns a list of every single champion played by the account, along with mastery details
		return LeagueAPI.getChampionMastery(accountObj);
	})
	.then(function(championMasteryList)
	{
		console.log(championMasteryList);
	})
	.catch(console.log);
```
</p>
</details>

<details><summary>getChampionMasteryByChampion(accountObject, championObj)</summary>
	
<p>
	
####
```javascript
const drMundoChampId = 36;
const leagueOfDrMundoSummonerId = 'IE2WdICfZnhEWYPIBfHio7jxCeo1IFynclJAPquqENRrpeYK';

// Returns the championMastery details for the given account/accountId and champion/championId
LeagueAPI.getChampionMasteryByChampion(leagueOfDrMundoSummonerId, drMundoChampId)
	.then(console.log)
	.catch(console.log);
```
</p>
</details>

<details><summary>getFreeChampionRotation()</summary>
	
<p>
	
####
```javascript

// Returns details for the current champion rotation. Initialize first for details on each champion
LeagueAPI.getFreeChampionRotation()
	.then(console.log)
	.catch(console.log);
```
</p>
</details>

# Disclaimer

`MundoScript` is **not** endorsed by Riot Games and does **not** reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.


*Feel free to make suggestions on features/etc.*
