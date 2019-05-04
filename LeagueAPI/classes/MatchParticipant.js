class MatchParticipant
{
	constructor(teamId, spell1Id, spell2Id, championId,
		profileIconId, summonerName, isBot, summonerId, gameCustomizationObjects,
			perks)
	{
		this.teamId = teamId;
		this.spell1Id = spell1Id;
		this.spell2Id = spell2Id;
		this.championId = championId;
		this.profileIconId = profileIconId; 
		this.summonerName = summonerName; 
		this.isBot = isBot; 
		this.summonerId = summonerId; 
		this.gameCustomizationObjects = gameCustomizationObjects;
		this.perks = perks;
	}
	
	static from(json)
	{
		return Object.assign(new MatchParticipant(), json);
	}
}

module.exports = MatchParticipant;