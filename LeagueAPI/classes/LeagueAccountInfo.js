class LeagueAccountInfo
{
  constructor(id, accountId, puuid, name, profileIconId, summonerLevel)
  {
    this.id = id;
    this.accountId = accountId;
    this.puuid = puuid;
    this.name = name;
    this.profileIconId = profileIconId;
    this.summonerLevel = summonerLevel;
  }
	
  static from(json)
  {
    return Object.assign(new LeagueAccountInfo(), json);
  }
}

module.exports = LeagueAccountInfo;