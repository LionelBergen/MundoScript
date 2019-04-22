Champion = require('./Champion.js');

class ChampionMastery
{
	constructor(championId, championLevel, championPoints, lastPlayTime, championPointsSinceLastLevel, 
		championPointsUntilNextLevel, chestGranted, tokensEarned, summonerId)
	{
		this.championLevel = championLevel;
		this.championPoints = championPoints;
		this.lastPlayTime = new Date(lastPlayTime);
		this.champion = Champion[championId];
	}
	
	static from(json)
	{
		return new ChampionMastery(json.championId, json.championLevel, json.championPoints, 
			json.lastPlayTime, json.championPointsSinceLastLevel, 
			json.championPointsUntilNextLevel, json.chestGranted, json.tokensEarned, json.summonerId);
	}
}

module.exports = ChampionMastery;