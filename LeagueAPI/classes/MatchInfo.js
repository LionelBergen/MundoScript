class MatchInfo
{
  constructor(gameId, mapId, gameMode, gameType, gameQueueConfigId,
    participants, observers, platformId, bannedChampions, gameStartTime,
    gameLength)
  {
    this.gameId = gameId;
    this.mapId = mapId;
    this.gameMode = gameMode;
    this.gameType = gameType;
    this.gameQueueConfigId = gameQueueConfigId;
    this.participants = participants;
    this.observers = observers;
    this.platformId = platformId;
    this.bannedChampions = bannedChampions;
    this.gameStartTime = gameStartTime;
    this.gameLength = gameLength;
  }
	
  static from(json)
  {
    return Object.assign(new MatchInfo(), json);
  }
}

module.exports = MatchInfo;