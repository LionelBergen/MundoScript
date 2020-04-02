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
			const mapPromise = getLeagueObject(latestApiVersion, mapJsonURI);
			const summonerPromise = getLeagueObject(latestApiVersion, summonerJsonURI);
			const championPromise = getLeagueObject(latestApiVersion, championJsonURI);
			const runesPerksPromise = getLeagueObject(latestApiVersion, runesJsonURI);
			const fullPerkPromise = getLeagueFullPerksObject(latestApiVersion);
      const profileIconPromise = getLeagueObject(latestApiVersion, profileIconURI);

      Promise.all([mapPromise, summonerPromise, championPromise, runesPerksPromise, fullPerkPromise, profileIconPromise]).then(function(data) {
        const mapObj = data[0];
        const summonerObj = data[1];
        const championObj = data[2];
        const runesPerksObj = data[3];
        const fullPerkObj = data[4];
        const profileIconObj = data[5];

        mapObj.getByKey = createFindByFunction('MapId');
        summonerObj.getByKey = createFindByFunction('key');
			  championObj.getByKey = createFindByFunction('key');
        runesPerksObj.getByKey = function(idValue) { let objs = Object.values(this); return Object.values(objs).find(c => {return c['id'] == idValue});	}
			  fullPerkObj.getByKey = createFindByFunction('id');
        profileIconObj.getByKey = function(id) { return profileIconObj[id]; };

        const teamObj = {'200': 'red', '100': 'blue'};
        teamObj.getByKey = function getByKey(id) { if (id == '200') return 'red'; else if (id == 100) return 'blue'; };

        resolve({'map': mapObj, 'summoner': summonerObj, 'champion': championObj, 'team': teamObj,
          'profileIcon' : profileIconObj, 'runes': runesPerksObj, 'fullPerks': fullPerkObj});
      });
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
  return new Promise(function(resolve, reject) {
    let url = transformURL(localPerkURI, localURL, latestApiVersion);
    let leagueObject = tryToResolveImport(url);
    
    if (!leagueObject)
    {
      https.makeAnHTTPSCall(unofficalPerkURI).then(function(data) {
        resolve(data);
      });
    }
    else
    {
      resolve(leagueObject);
    }
  });
}

function getLeagueObject(latestApiVersion, objectJSONUrl)
{
  return new Promise(function(resolve, reject) {
    let url = transformURL(objectJSONUrl, localURL, latestApiVersion);
    let leagueObject = tryToResolveImport(url);
    
    // Object could not be resolved. E.G we don't have the files for the latest version
    if (!leagueObject)
    {
      url = transformURL(objectJSONUrl, ddragonURL, latestApiVersion);
      https.makeAnHTTPSCall(url).then(function(data) {
        resolve(data);
      }).catch(reject);
    } 
    else 
    {
      resolve(leagueObject);
    }
  });
}

/**
 * Gets latest api version based on the get version url. E.G 9.9.1
*/
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

/**
 * replaces '%url%' and '%apiversion%' with the paramaters passed
*/
function transformURL(url, prefixURL, apiVersion)
{
	return url.replace('%url%', prefixURL).replace('%apiversion%', apiVersion);
}

/**
 * Given the import URL, tries to 'require()' it. If Module is not found, returns null/undefined.
*/
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