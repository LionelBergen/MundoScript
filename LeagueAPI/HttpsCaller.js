const https = require('https');
function makeAnHTTPSCall(URL)
{
  return new Promise(function(resolve, reject) {
    https.get(URL, (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      resp.on('end', () => {
        let parsedData = JSON.parse(data);

        if (parsedData.status)
        {
          if (parsedData.status.status_code == '403')
          {
            reject('Forbidden. Ensure api key is up to date.');
          }
          else
          {
            reject(parsedData);
          }
        }
        else
        {
          resolve(parsedData);
        }
      });
    }).on("error", (err) => {
      reject("Error: " + err.message);
    });
  });
}

module.exports = {makeAnHTTPSCall : makeAnHTTPSCall };