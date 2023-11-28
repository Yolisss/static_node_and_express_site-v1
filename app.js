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

app.get("/", (req, res) => {
  res.render("index");
});

//setting up dev server using listen method
app.listen(3000);
