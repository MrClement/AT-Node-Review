const express = require('express');
const colors = require('colors');
const mongoose = require('mongoose');

const snowSchema = mongoose.Schema({
  inches: Number
});

const Snow = mongoose.model('Snow', snowSchema);

mongoose.connect('mongodb://localhost/node-review', function(err) {
  if (err) {
    throw err;
  } else {
    console.log("Database connection successful".rainbow);
  }
});

const app = express();

app.get('/', function(request, response) {
  console.log('GET /'.blue);
  response.send('<h1>HELLO</h1>');
});

app.get('/moarSNOW', function(req, res) {
  Snow.create({
      inches: Math.random() * 45
    },
    function(err, newSnow) {
      if (err) throw err;
      res.send("" + newSnow.inches);
    });
});

app.get('/snow', function(req, res) {
  Snow.find({}, function(err, snows) {
    if (err) throw err;
    res.send(snows);
  });
});

app.listen(3000);
