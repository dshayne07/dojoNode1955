// require express
var express = require("express");
// set up our project path
var path = require("path");
// require mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/1955DB');
// create the express app
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// Create a Schema for Peoples
var PeopleSchema = new mongoose.Schema({
    name: {type: String}
}, {timestamps: true});
// Store the Schema under the name 'People'
mongoose.model('People', PeopleSchema);
// Retrieve the Schema called 'People' and store it to the variable People
var People = mongoose.model('People');
// root route to render the index.ejs view
app.get('/', function(req, res) {
    People.find({}, function(err, people) {
        // Retrieve an array of Peoples
        // This code will run when the DB is done attempting to retrieve all matching records to {}
        res.json({message: "Success", data: people});
    }).sort({_id:-1});
});
app.get('/new/:name', function(req, res){
    var people = new People({name:req.params.name});
    people.save(function(err){
        if(err){
            console.log("Something went wrong!");
        } else{
            console.log("Success!")
            res.redirect('/');
        }
    });
});
app.get('/delete/:name', function(req, res){
    People.remove({name:req.params.name}, function(err){
        res.redirect('/');
    })
});
app.get('/:name', function(req, res){
    People.find({name:req.params.name}, function(err, people){
        res.json({message: "Success", data: people})
    })
});
// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});