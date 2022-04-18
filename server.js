//this is a server running with Node and Express
//start the server with: "node server.js"
//for testing and debugging in the frontend are browser based on chromium recomended; like Brave, Chrome, Edge, ...

//config values:

//the port 80 is set, cause browsers addressing this port by default
//e.g. if you open the url "http://localhost" you dont have to call a port like "http://localhost:3000" (for port = 3000;)
const port = 80;//port 80 is http; port 443 is https

//INITILISE
//Load the Express library
const express = require("express");
//initialize express
const app = express();
//load the parse functionality of express, so json data can be parsed to javascript opject
app.use(express.json());

//Load some other packages
const path = require('path');//This package is for handeling paths

//SETUP SERVER
//every file in the public folder is accessible with 'https://localhost/webpages/SELECT_FOLDER/SELECT_FILES'
app.use(express.static(path.join(__dirname, 'public')));

//FUNCTIONALITY
//this is executed if you open "http://localhost"
app.get("/", (req, res) => {
    //if someone load the webpage redirect the user to the home.html
    res.redirect('/webpages/html/home.html');
});

//START SERVER
app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`)
});