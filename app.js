//1.
const express = require("express");
const projects = require("./data.json").projects;
const path = require("path");

//returns express application
const app = express();

//#6 part B => static middleware
//renders css in browser
app.use("/static", express.static("public"));

//2. set your 'view enginer' to 'pug'
//using pug format when we render content from server to browser
app.set("view engine", "pug");

//app.use(project);

//#6 D setting routes; use get method on app obj
//home page
app.get("/", (req, res) => {
  //passing in index file, passing in 'projs'
  //var since it gives us access to data.json
  //this will then allow us to render data in index.js
  //and begin filling out what's asking us to grab
  res.render("index", { projects });
});
//about page
app.get("/about", (req, res) => {
  res.render("about");
});

//in 'card template' video
//mentioned something about req.query
//req.params

//route param from URL will be stored in req obj params prop
//using a colon tells express to treat this part of the URL
//as a var or a route param name id
//the value for the route param from the URL will be stored in the req
//obj params property
app.get("/project/:id", (req, res, next) => {
  const projectId = parseFloat(req.params.id);
  const project = projects.find((project) => project.id === projectId);
  console.log(projects);
  console.log(typeof projectId);
  if (project) {
    res.render("project", { project });
  } else {
    const err = new Error();
    err.status = 404;
    err.message = "Sorry, project cannot be found";
    next(err);
  }
});

//#7 A; creating a custom error obj
app.use((req, res, next) => {
  const err = new Error("Sorry, page not found");
  err.status = 404;
  res.send("Sorry, page does not exist");
  //next(err);
});

//#7 B global error
app.use((err, req, res, next) => {
  err.status = err.status || 500;
  err.message = err.message || "Internal Server Error";
  res.send(`Error: ${err.message}, Status: ${err.status}`);
});

//setting up dev server using listen method
app.listen(3000);
