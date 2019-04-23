const https = require('https');
const URL = 'https://ddragon.leagueoflegends.com/cdn/9.8.1/data/en_GB/champion.json';

makeAnHTTPSCall(URL, function(data) {
	Object.keys(data).forEach(key => {
		console.log(key.toUpperCase() + ": {" + "value: " + data[key].key + ", label: \'" + data[key].name + "\' },");
	});
});

function makeAnHTTPSCall(URL, callback)
{
	https.get(URL, (resp) => {
	  let data = '';

	  // A chunk of data has been recieved.
	  resp.on('data', (chunk) => {
		data += chunk;
	  });

	  // The whole response has been received.
	  resp.on('end', () => {
		  	let parsedData = JSON.parse(data);
			parsedData = parsedData.data;
			
			callback(parsedData);
	  });

	// TODO: Errors are important, save to a database or Log file
	}).on("error", (err) => {
	  console.log("Error: " + err.message);
	});
}