var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

var PORT = 3000;

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


// Connect to the Mongo DB
//mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });

app.get("/scrape", function (req, res) {
    axios.get("http://www.rotoworld.com/headlines/nba/0/basketball-headlines").then(function (response) {
        var $ = cheerio.load(response.data);

        $(".player").each(function (i, element) {
            var result = {};
            //const link = $(element).html()
            //console.log(link, "link\n")
            result.title = $(element)
                .children("a")
                .text();

            result.link = $(element)
                .children("a")
                .attr("href");

            console.log(result);

            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });

        // Send a message to the client
        res.send("Scrape Complete");
    });
})