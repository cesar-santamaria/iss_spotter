const request = require('request'); //npm package that allows for easier HTTP requests.

const fetchMyIP = function(callback) {
  const URL = 'https://api.ipify.org/?format=json';
  // use request to fetch IP address from API.
  request(URL, function(error, response, body) {
    const IP = JSON.parse(body).ip;
    const statusCode = response.statusCode;
    if (error) {
      callback(error, null);
    }
    if (statusCode !== 200) {
      const msg = `status code: ${statusCode} when fetching IP address: ${body}`;
      callback(msg, null);
    }
    callback(null, IP);
  });
};

const fetchCoordsByIP = function(IP, callback) {
  const URL = `https://freegeoip.app/json/${IP}`;

  request(URL, function(error, response, body) {
    const statusCode = response.statusCode;

    if (error) {
      callback(error, null);
      return;
    }
    if (statusCode !== 200) {
      const msg = `status code: ${statusCode} when fetching geo coordinates (longitude, latitude): ${body}`;
      callback(msg, null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, {latitude, longitude});
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const URL = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(URL, function(error, response, body) {
    const statusCode = response.statusCode;

    if (error) {
      callback(error, null);
      return;
    }
    if (statusCode !== 200) {
      const msg = `status code: ${statusCode} when fetching geo coordinates (longitude, latitude): ${body}`;
      callback(msg, null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };