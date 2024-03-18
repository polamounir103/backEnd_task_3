const request = require("request");
const geoCode = (address, callback) => {
  const geoUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1Ijoiam9obm1vdW5pcjEwMyIsImEiOiJjbHQ3NWd0Z3owanNoMm1tc2Jyb2FlM2k0In0.hQjol28bPyCN7ceZzA2WPQ";
  request({ url: geoUrl, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to Mapbox", undefined);
    } else if (response.body.message) {
      callback(response.body.message, undefined);
    } else if (response.body.features.length === 0) {
      callback("Wrong Country Name", undefined);
    } else {
      callback(undefined, {
        lon: response.body.features[0].center[0],
        lat: response.body.features[0].center[1],
      });
    }
  });
};
module.exports = geoCode;
