const request = require('request'); //npm package that allows for easier HTTP requests.

const fetchMyIP = function(callback) {
  const URL = 'https://api.ipify.org/?format=json';
  // use request to fetch IP address from API.
  request(URL, function(error, response, body) {
    const IP = JSON.parse(body).ip;
    const statusCode = JSON.parse(response.statusCode);
    if (error) {
      callback(error, null);
    }
    if (statusCode !== 200) {
      const msg = `status code: ${statusCode} when fetching IP address: ${body}`
      callback(msg, null)
    }
    console.log(`status code: ${statusCode}`);
    callback(null, IP);
  });
};

/* 
There can be a situation where no error is sent by the request function, but there's still a problem in the response. We should always check the HTTP status code which comes back as part of the HTTP Response.

The response.statusCode indicates the HTTP response code, and we should check it for a 200.

Instruction
Within the fetchMyIP function, add error handling logic for both scenarios.
*/

module.exports = { fetchMyIP };