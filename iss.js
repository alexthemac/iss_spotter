//To run his code, run index.js, not iss.js. This is just the function declarations.
const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    //If error, send callback function error and null data
    if (error) {
      callback(error, null);
      return;
    }
    //If not a normal return response, send callback function Error(msg) and null data
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    //If normal data, format data into string.
    const bod = JSON.parse(body);
    const ip = bod["ip"];
    //Pass null error and ip string as data to callback
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  // use request to fetch coords from ip address
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    //If error, send callback function error and null data
    if (error) {
      callback(error, null);
      return;
    }
    //If not a normal return response, send callback function Error(msg) and null data
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    //If normal data, format data into object.
    const bod = JSON.parse(body);
    const lat = bod["latitude"].toString();
    const long = bod["longitude"].toString();
    const latLong = {
      latitude: lat,
      longitude: long
    };
    //Pass null error and latLong object as data to callback
    callback(null, latLong);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  // use request to fetch ISS flyover times by location
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords['latitude']}&lon=${coords['longitude']}`, (error, response, body) => {
    //If error, send callback function error and null data
    if (error) {
      callback(error, null);
      return;
    }
    //If not a normal return response, send callback function Error(msg) and null data
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    //If normal data, format data into object.
    const bod = JSON.parse(body);
    //Pass null error and the response array to callback.
    callback(null, bod["response"]);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  //Call the fetchMyIp function. If error, send the error and null data to the callback function
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    //If no error, call the fetchCoordsByIP function and pass it the ip from fetchMyIP
    fetchCoordsByIP(ip, (error, latLong) => {
      if (error) {
        return callback(error, null);
      }
      //If no error, call the fetchISSFlyOverTimes function and pass it the latitude and longitude from fetchCoordsByIP
      fetchISSFlyOverTimes(latLong, (error, flyOverTime) => {
        if (error) {
          return callback(error, null);
        }
        //If no erro, pass the callback function the data from the fetchISSFlyOverTimes function.
        return callback(null, flyOverTime);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };