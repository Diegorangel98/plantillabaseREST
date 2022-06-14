const { response } = require("express");



const Home = function(req, res = response) {
    res.send("Hello World!");
}


module.exports = Home;