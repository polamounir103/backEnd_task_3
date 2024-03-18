const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
//////////////////////////////////////////////////////

const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));
////////////////////////////////////////
app.set("view engine", "hbs");
const viewsDirectory = path.join(__dirname, "../temp/views");
app.set("views", viewsDirectory);
///////////////////////////////////////////
var hbs = require("hbs");
const partialsDirectory = path.join(__dirname, "../temp/partials");
hbs.registerPartials(partialsDirectory);
////////////////////////////////////////

// Pages EndPoints //
app.get("/", (req, res) => {
  res.render("index", {
    title: "Home page",
    message: "This page is Home Page",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    message: "This page is About Page",
  });
});


  //////////////////////////////////////////////
 //         Weather Page && Tools            //
//////////////////////////////////////////////
const geoCode = require("./tools/geoCode")
const forCast = require("./tools/forCast")

app.get("/weather", (req, res) => {
  if(!req.query.address) {
    res.render("weather", {
      message: "Please enter address "
    });
  }

  // res.send({
  //   message: `Here Is the Weather of : ${req.query.address}`,
  //   location: req.query.address,
  //   weather: "Hot",
  // })


  // res.render("weather", {
  //   message:`Here Is the Weather of : ${req.query.address}`
  // })


  geoCode(req.query.address, (error , data) =>{
    if(error) {
      return res.send({
        error: error
      })
    }
    forCast(data.lon ,data.lat, (error, data) => {
      
      if (error) {
        return res.send({
          error: error
        })
      }
      res.send({
        message: `Here Is the Weather of : ${req.query.address}`,
        name: req.query.address,
        location: data.location,
        temperature: data.temperature,
        weatherCast: data.cast,
        icon: data.icon,
      })
    })
  })
});
////////////////////////////////////////////////////////





app.get("/*", (req, res) => {
  res.render("none", {
    title: "page Not Found",
    message: "Please check your URL and try again",
  });
});

// ***********************************
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
