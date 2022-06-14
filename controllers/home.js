const { response } = require("express");
const path = require("path");


const Home = function(req, res = response) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
}


module.exports = Home;