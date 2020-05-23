/** @format */
//nodemon server.js -e js,hbs
const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
var app = express();

app.set("view engine", "hbs");

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  var now = new Date().toString();

  var log = `${now}: ${req.method} ${req.url}`;
  console.log("TCL:: log", log);

  fs.appendFile("server.log", log + "\n", (err) => {
    if (err) {
      console.log("TCL:: err", err);
    }
  });

  next();
});

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  // console.log("TCL:: req", req);
  // console.log("TCL:: res", res);
  // res.send("<h1>Hello express!</h1>");
  // res.send({
  //   name: "Gaurav",
  //   likes: [1, 2, 3, 4],
  // });
  res.render("home.hbs", {
    pageTitle: "Home",
    welcomeMessage: "Welcome to my website",
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About page",
  });
});

app.get("/bad", (req, res) => {
  res.json({
    error: "Bad request",
  });
});

//
app.listen(3000, () => console.log("server is up on port 3000"));
