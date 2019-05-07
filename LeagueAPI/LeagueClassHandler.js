const https = require('./HttpsCaller');
const GET_VERSION_URL = 'https://ddragon.leagueoflegends.com/api/versions.json';
const ddragonURL = 'https://ddragon.leagueoflegends.com/cdn';
const localURL = '.';

const mapJsonURI = '%url%/%apiversion%/data/en_US/map.json';
const summonerJsonURI = '%url%/%apiversion%/data/en_US/summoner.json';
const championJsonURI = '%url%/%apiversion%/data/en_US/champion.json';
const runesJsonURI = '%url%/%apiversion%/data/en_US/runesReforged.json';
const profileIconURI = '%url%/%apiversion%/data/en_US/profileicon.json';

// There is no official endpoint for the stat modifiers.
const unofficalPerkURI = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json'
const localPerkURI = '%url%/%apiversion%/data/en_US/perksFull.json';

module.exports = function getClassesDataFromJSON()
{
	return new Promise(function(resolve, reject)
	{
		getLatestApiVersion().then(function(latestApiVersion) {
			const mapObj = getLeagueObject(latestApiVersion, mapJsonURI);
			mapObj.getByKey = createFindByFunction('MapId');
			
			const summonerObj = getLeagueObject(latestApiVersion, summonerJsonURI);
			summonerObj.getByKey = createFindByFunction('key');
			
			const championObj = getLeagueObject(latestApiVersion, championJsonURI);
			championObj.getByKey = createFindByFunction('key');
			
			const runesPerksObj = getLeagueObject(latestApiVersion, runesJsonURI);
			runesPerksObj.getByKey = function(idValue) { 
				let objs = Object.values(this);
				
				return Object.values(objs).find(c => {return c['id'] == idValue});
			}
			
			const fullPerkObj = getLeagueFullPerksObject(latestApiVersion);
			fullPerkObj.getByKey = createFindByFunction('id');
			
			const profileIconObj = getLeagueObject(latestApiVersion, profileIconURI).data;
			profileIconObj.getByKey = function(id) { return profileIconObj[id]; };
			
			const teamObj = {'200': 'red', '100': 'blue'};
			teamObj.getByKey = function getByKey(id) { if (id == '200') return 'red'; else if (id == 100) return 'blue'; };

			resolve({'map': mapObj, 'summoner': summonerObj, 'champion': championObj, 'team': teamObj,
				'profileIcon' : profileIconObj, 'runes': runesPerksObj, 'fullPerks': fullPerkObj});
		})
		.catch(reject);
	});
};

// TODO: Faster way would be to keep an Array, and get by the index instead of invoking Object.values() every time.
function createFindByFunction(keyNameToFindBy)
{
	return function(key)
	{
		const objs = Object.values(this);
		
		if (Array.isArray(key))
		{
			const foundObjects = [];
			
			for (let i = 0; i < key.length; i++)
			{
				foundObjects.push(findBy(objs, keyNameToFindBy, key[i]));
			}
			
			return foundObjects;
		}
		
		return findBy(objs, keyNameToFindBy, key);
	}
}

function findBy(propertyArray, keyNameToFindBy, keyToFind)
{
	let foundSummonerObj;
	for (var i=0; i<propertyArray.length; i++)
	{
		foundSummonerObj = Object.values(propertyArray[i]).find(c => {return c[keyNameToFindBy] == keyToFind});
		if (foundSummonerObj)
		{
			break;
		}
	}
	
	return foundSummonerObj;
}

// Full perk information is special since there is no official API for it.
function getLeagueFullPerksObject(latestApiVersion)
{
	let url = transformURL(localPerkURI, localURL, latestApiVersion);
	let leagueObject = tryToResolveImport(url);
	if (!leagueObject)
	{
		leagueObject = https.makeAnHTTPSCall(unofficalPerkURI);
	}
	
	return leagueObject;
}

function getLeagueObject(latestApiVersion, objectJSONUrl)
{
	let url = transformURL(objectJSONUrl, localURL, latestApiVersion);
	let leagueObject = tryToResolveImport(url);
	if (!leagueObject)
	{
		url = transformURL(objectJSONUrl, ddragonURL, latestApiVersion);
		leagueObject = https.makeAnHTTPSCall(url);
	}
	
	return leagueObject;
}

function getLatestApiVersion()
{
	return new Promise(function(resolve, reject) {
		https.makeAnHTTPSCall(GET_VERSION_URL)
		.then(function(data) {
			resolve(data[0]);
		})
		.catch(reject);
	});
}

function transformURL(url, prefixURL, apiVersion)
{
	return url.replace('%url%', prefixURL).replace('%apiversion%', apiVersion);
}

function tryToResolveImport(importUrl)
{
	let result;
	
	try 
	{
		result = require(importUrl);
	}
	catch (e) 
	{
		if (e instanceof Error && e.code === "MODULE_NOT_FOUND")
		{
			console.log("WARNING: Cannot load import: " + importUrl);
		}
		else
		{
			throw e;
		}
	}
	
	return result;
}