//jshint esversion:6

// get modules
const express = require("express");
const https = require("https");
// module to get data from html
const bodyParser = require("body-parser");

// init app
const app = express();
// init body-parser
app.use(bodyParser.urlencoded({extended: true}));

// on first visit display html page with form to input city name of city they want
// the weather request for
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");

});

// once a post has been recieved
app.post("/", function(req,res){

  // the start of the url needed for api
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  // get city from html form
  const query = req.body.cityName;
  // unit of meassure to display
  const unit = "metric";
  // api key
  const apiKey = "";

  // full url
  const url = baseUrl + query + "&appid=" + apiKey + "&units=" + unit ;

  // call https get function to get api data
  https.get(url, function(response){
    //console.log(response.statusCode);

    // when we recieve data do the following using "on"
    response.on("data", function(data){
      // parse the data using JSON.parse
      const weatherData = JSON.parse(data);
      // get temperture data from JSON
      const temp = weatherData.main.temp;
      // get weather description data
      const weatherDescription = weatherData.weather[0].description;
      // weather icon
      const weatherIcon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";

      // display results using res.write and one res.send
      // display Temperature
      res.write("<h1> Temperature in "+ query + " is currently: " + temp + " celcius</h1>");
      // display description
      res.write("<p> Description of weather: " + weatherDescription + "</p>");
      // display image
      res.write("<img src=" + iconUrl + ">");
      res.send();
    });
  });
});


 app.listen(3000, function() {
   console.log("Server is running");
 });
