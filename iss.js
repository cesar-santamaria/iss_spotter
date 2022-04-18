const request = require('request'); //npm package that allows for easier HTTP requests.
const IP = '66.115.147.85';

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

 const nextISSTimesForMyLocation = function(callback) {
  // empty for now
  fetchMyIP((error, ip) => {
    if (error) {
      return console.log("It didn't work!" , error);
    }
    fetchCoordsByIP(IP, (error, coordinates) => {
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }
      fetchISSFlyOverTimes(coordinates,(error, passTimes) => {
        if (error) {
          console.log("It didn't work!" , error);
          return;
        }
        callback(null, passTimes);
      });
    });
  });
}

module.exports = { nextISSTimesForMyLocation };