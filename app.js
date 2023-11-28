//1.
const express = require("express");
const dataJson = require("./data.json");

//returns express application
const app = express();

//#6 part B => static middleware
//renders css in browser
app.use("/static", express.static("public"));

//2. set your 'view enginer' to 'pug'
//using pug format when we render content from server to browser
app.set("view engine", "pug");

//#6 D setting routes; use get method on app obj
//home page
app.get("/", (req, res) => {
  res.render("index");
});
//about page
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/project/:id", (req, res) => {
  res.render("project");
});

//setting up dev server using listen method
app.listen(3000);
