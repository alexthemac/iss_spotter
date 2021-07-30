// // index.js
// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// //Calling the function with anonymous callback function.
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// let ip = 'ip goes here, removed for safety'

// //Calling the function with ip string and anonymous callback function.
// fetchCoordsByIP(ip, (error, latLong) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned lat/long:' , latLong);
// });

// let LAT = 'latitude goes here, removed for safety';
// let LON = 'longitude goes here, removed for safety';

// const coord = {
//   'latitude': LAT,
//   'longitude': LON
// };

// //Calling the function with coord object and anonymous callback function.
// fetchISSFlyOverTimes(coord, (error, flyOverTime) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned fly over times:' , flyOverTime);
// });

//Previous 3 assignments used the functions calls above and did not use the function call below.
//The function calls above are now implemented nested within the iss.js nextISSTimesForMyLocation function for ISS Spotter IV assignemnt.

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!w
  console.log(passTimes);
});