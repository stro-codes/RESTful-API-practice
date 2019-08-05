// library handling
var http = require('http');
var url = require('url');
var fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
var app = express();

var mongo = ('mongodb');
var MongoClient = require('mongodb').MongoClient;

// urls
var servurl = "mongodb://localhost:27017/";
var dburl = "mongodb://localhost:27017/mydb";

// load server and startup page
http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname + ".html";

    fs.readFile(filename, function(err, data) {
        if(err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 File Not Found.");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });

    console.log("server loaded");
}).listen(8080);

// create mongodb database
MongoClient.connect(dburl, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});
    
// establishing a collection with documents 
MongoClient.connect(servurl, function(err, db) {
    if (err) throw err;
    // get database
    var dbo = db.db("mydb");
    // create collection
    dbo.createCollection("tests", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
    // insert 1 document
    var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("tests").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
    // insert 14 documents
    var myobj = [
        { name: 'John', address: 'Highway 71'},
        { name: 'Peter', address: 'Lowstreet 4'},
        { name: 'Amy', address: 'Apple st 652'},
        { name: 'Hannah', address: 'Mountain 21'},
        { name: 'Michael', address: 'Valley 345'},
        { name: 'Sandy', address: 'Ocean blvd 2'},
        { name: 'Betty', address: 'Green Grass 1'},
        { name: 'Richard', address: 'Sky st 331'},
        { name: 'Susan', address: 'One way 98'},
        { name: 'Vicky', address: 'Yellow Garden 2'},
        { name: 'Ben', address: 'Park Lane 38'},
        { name: 'William', address: 'Central st 954'},
        { name: 'Chuck', address: 'Main Road 989'},
        { name: 'Viola', address: 'Sideway 1633'}
    ];
    dbo.collection("tests").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    console.log(res.insertedIds);
    db.close();
    });
});
