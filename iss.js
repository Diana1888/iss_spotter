/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api64.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching IP. Response ${body}`), null);
      return;
    }

    const data = JSON.parse(body);
    callback(null, data.ip);
  });
};


const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(null, error);
      return;
    }
    // parse the returned body so we can check its information
    const data = JSON.parse(body);
    // check if "success" is true or not
    if (!data.success) {
      callback(Error(`Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`, null));
      return;
    }

    const { latitude, longitude } = data;
    callback(null, { latitude, longitude });
  });

};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(null, error);
      return;
    }


  
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`, null));
      return;
    }


    const data = JSON.parse(body);
    callback(null, data.response);

  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };