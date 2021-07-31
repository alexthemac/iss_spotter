const request = require('request-promise-native');//This request is different from the iss.js request.

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json') //This request is different from the iss.js request, does not have error, body etc..
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body)["ip"]
  return request(`https://freegeoip.app/json/${ip}`) 
};

const fetchISSFlyOverTimes = function(body) {
  // use request to fetch ISS flyover times by location
  const coords = { 
    latitude: JSON.parse(body)["latitude"],
    longitude: JSON.parse(body)["longitude"]
  }

  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords['latitude']}&lon=${coords['longitude']}`)

}

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  });
};


// const bod = JSON.parse(body);
//     //Pass null error and the response array to callback.
//     callback(null, bod["response"]);


module.exports = { nextISSTimesForMyLocation };




