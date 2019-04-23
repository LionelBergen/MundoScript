Champion = require('./Champion.js');

class ChampionRotation
{
	constructor(freeChampions, freeChampionsForNewPlayers, maxNewPlayerLevel)
	{
		this.freeChampions = freeChampions;
		this.freeChampionsForNewPlayers = freeChampionsForNewPlayers;
		this.maxNewPlayerLevel = maxNewPlayerLevel;
	}
	
	static from(json)
	{
		let freeChampions = [];
		let freeChampionsForNewPlayers = [];
		let maxNewPlayerLevel = json.maxNewPlayerLevel;
		
		for (var i = 0; i < json.freeChampionIds.length; i++)
		{
			freeChampions.push(Champion.findById(json.freeChampionIds[i]));
		}
		
		for (var i = 0; i < json.freeChampionIdsForNewPlayers.length; i++)
		{
			freeChampionsForNewPlayers.push(Champion.findById(json.freeChampionIdsForNewPlayers[i]));
		}
		
		return new ChampionRotation(freeChampions, freeChampionsForNewPlayers, maxNewPlayerLevel);
	}
}

module.exports = ChampionRotation;