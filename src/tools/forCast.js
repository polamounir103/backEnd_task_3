const request = require("request");
const forCast = (lon, lat, callback) => {
  const url =
    "http://api.weatherapi.com/v1/current.json?key=ec7a576d0ae347e3bef203829242802&q=" +
    lat +
    "," +
    lon;

  request({ url, json: true }, (error, response) => {
    
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback(response.body.error.message, undefined);
    } else {
      callback(undefined, {
        location: response.body.location.name,
        temperature: response.body.current.temp_c,
        cast: response.body.current.condition.text,
        icon: response.body.current.condition.icon,
      });
    }
  });
};

module.exports = forCast;
